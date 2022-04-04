import React from "react";

import { Box, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SelectCity = (props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder={t("mapping.popup.component.placeholder.city.selection")}
        value={props.city}
        onChange={(e) => props.selectedCity(e.target.value)}
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p.name} key={key}>
                {p.name}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectCity;
