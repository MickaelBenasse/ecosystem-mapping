import React, { useEffect, useState } from "react";

import { HStack, Spacer, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";
import { Check2Circle } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";

import {
  blueColor,
  defaultPadding,
  greyTextColor,
  smallPadding,
  verySmallPadding,
  whiteColor,
} from "../../../../helper/constant";
import FilterMenuButton from "./filtersButtons/FilterMenuButton";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import SaveFilterAlertDialog from "./SaveFilterAlertDialog";
import SavedFilterButton from "./filtersButtons/SavedFilterButton";

function FilterBar(props) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState(props.filtersState[0]);
  const [isActive, setIsActive] = useState(
    filters.some((filter) => filter.selectedFilterCount > 0)
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [value, setValue] = useState("");
  const [isSavedFilterSelected, setIsSavedFilterSelected] = useState(false);

  useEffect(() => {
    setIsSavedFilterSelected(value !== "");
  }, [value]);

  useEffect(() => {
    if (filters.some((filter) => filter.selectedFilterCount > 0)) {
      setIsActive(true);
      setIsFilterApplied(false);
    }
  }, [filters]);

  function handleFilterChange(filter, index) {
    const tempFilters = [...filters];
    tempFilters[index] = filter;
    setValue("");
    setFilters(tempFilters);
  }

  function handleApplyFilter() {
    // Update in the canvas the display of the service every filter changes
    props.filtersState[1](filters);
    setIsFilterApplied(true);
  }

  function handleClearAllFilters() {
    props.handleClearAllFilters();
    setIsActive(false);
  }

  function handleSavedFilterChange(filter) {
    const savedFiltersEntries = Object.entries(filter[1]);

    const tempFilters = [...filters];

    // Clear all fields
    tempFilters.forEach((filter) => {
      filter.isAllSelected = false;
      filter.selectedFilterCount = 0;
      filter.items.forEach((item) => (item.value = false));
    });

    // Go through all the filter saved
    savedFiltersEntries.forEach((thisFilter) => {
      // Get the value of each element in a specific filter
      thisFilter[1].items.forEach((item) => {
        const index = tempFilters[thisFilter[0]].items.findIndex(
          (thisItem) => thisItem.name === item
        );

        // Set the value to true from the specific filter
        tempFilters[thisFilter[0]].items[index].value = true;
      });

      // Set the selectedFilterCount
      tempFilters[thisFilter[0]].selectedFilterCount =
        thisFilter[1].items.length;
    });

    setFilters(tempFilters);

    setValue(filter[0]);
  }

  return (
    <HStack paddingY={smallPadding} paddingX={defaultPadding} w="100%" h="60px">
      <Text color={greyTextColor}>
        {t("mapping.navigation.filter.bar.filter.by")}
      </Text>
      {props.filtersState[0].map((filter, index) => {
        if (index === 0) {
          return (
            <SavedFilterButton
              key={filter.name}
              filter={filter}
              savedFilters={props.savedFilters}
              handleSavedFilterChange={(filter) =>
                handleSavedFilterChange(filter)
              }
              value={value}
            />
          );
        } else {
          return (
            <FilterMenuButton
              key={filter.name}
              filter={filter}
              savedFilters={props.savedFilters}
              handleFilterChange={(filter) => handleFilterChange(filter, index)}
            />
          );
        }
      })}
      {isActive && !isFilterApplied && (
        <ButtonComponent
          buttonText={"Apply Filters"}
          isWithoutBorder={true}
          isSelected={true}
          icon={<Check2Circle color={blueColor} size={25} />}
          onClick={handleApplyFilter}
        />
      )}
      <Spacer />

      {isActive && (
        <Box paddingRight={smallPadding}>
          <Text
            as="u"
            cursor="pointer"
            color={greyTextColor}
            onClick={handleClearAllFilters}
          >
            {t("mapping.navigation.bar.clear.filter.button")}
          </Text>
        </Box>
      )}
      {isActive && (
        <Box paddingRight={verySmallPadding}>
          <ButtonComponent
            buttonText={isSavedFilterSelected ? "Saved Filter" : "Save Filter"}
            isPrimary={!isSavedFilterSelected}
            isWithoutBorder={isSavedFilterSelected}
            isSelected={isSavedFilterSelected}
            icon={
              isSavedFilterSelected ? (
                <Check2Circle color={blueColor} size={25} />
              ) : (
                <Save color={whiteColor} size={25} />
              )
            }
            onClick={isSavedFilterSelected ? () => {} : onOpen}
          />
        </Box>
      )}
      <SaveFilterAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        setFilters={props.filtersState[1]}
        filters={filters}
        mapId={props.mapId}
        savedFilters={props.savedFilters}
      />
    </HStack>
  );
}

export default FilterBar;
