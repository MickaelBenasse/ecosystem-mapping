import React from "react";

import { Box, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SelectSubIndustryComponent = (props) => {
  const { t } = useTranslation();
  let subIndustries;

  if (props.data.length > 0) {
    subIndustries = props.data[0].subIndustries;
  }

  return (
    <Box>
      <Select
        size="sm"
        disabled={!(subIndustries && subIndustries.length > 0)}
        placeholder={t(
          "startup.component.popup.select.sub.industry.placeholder"
        )}
        value={props.subIndustry}
        onChange={(e) => {
          props.selectedSubIndustry(e.target.value);
        }}
      >
        {subIndustries &&
          subIndustries.length > 0 &&
          subIndustries.map((subIndustry, key) => {
            return (
              <option value={subIndustry.industryName} key={key}>
                {subIndustry.industryName}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectSubIndustryComponent;
