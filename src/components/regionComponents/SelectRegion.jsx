import React from "react";

import { Box, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SelectRegion = (props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder={t("mapping.popup.component.placeholder.region.selection")}
        value={props.region}
        onChange={(e) => {
          props.selectedRegion(e.target.value);
        }}
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p} key={key}>
                {p}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectRegion;
