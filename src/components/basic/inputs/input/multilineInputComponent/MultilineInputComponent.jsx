import React, { useState } from "react";

import { Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";

function MultilineInputComponent(props) {
  const { initialValue, onChange, placeholder } = props;
  const [value, setValue] = useState(initialValue);

  function handleOnChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <Textarea
      border="2px solid"
      borderColor="blackAlpha.500"
      _hover={{
        borderColor: "brand.300",
      }}
      _focus={{
        borderColor: "brand.500",
      }}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
    />
  );
}

MultilineInputComponent.propTypes = {
  /**
   * Initial value of the input.
   */
  initialValue: PropTypes.string.isRequired,
  /**
   * Text displayed if the input is empty to indicate the user what to type.
   */
  placeholder: PropTypes.string.isRequired,
  /**
   * Function to be called when the value of the input is changed.
   */
  onChange: PropTypes.func.isRequired,
};

export default MultilineInputComponent;
