import React, { useState } from "react";

import { ProSidebar } from "react-pro-sidebar";
import { Box, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import { SliderButton } from "helper/constant";
import "react-pro-sidebar/dist/css/styles.css";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="l-pad" style={{ zIndex: "100" }}>
      <Box pos="relative" h="100%">
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="toggleBtn"
        >
          {!collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          <Image
            src={SliderButton.default}
            alt="image"
            className="sidebarButton"
          />
        </div>
        <ProSidebar collapsed={collapsed}>
          {!collapsed && (
            <div className="mg-left">
              <p className="heading-sidebar">Service templates</p>
              <p className="sidebar-desc">
                {t("mapping.home.page.side.bar.content")}
              </p>
            </div>
          )}
        </ProSidebar>
      </Box>
    </div>
  );
};

export default SideBar;
