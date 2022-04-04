import React from "react";

import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import imgSource from "../assets/images/Vector.png";

const EditButton = () => {
  const { onOpen } = useDisclosure();
  const { t } = useTranslation();

  return (
    <Flex align="center">
      <Image onClick={onOpen} src={imgSource} alt="image" mr="1" />
      <Text onClick={onOpen} className="edit-txt">
        {t("startup.popup.service.details.content.edit.text")}
      </Text>
    </Flex>
  );
};

export default EditButton;
