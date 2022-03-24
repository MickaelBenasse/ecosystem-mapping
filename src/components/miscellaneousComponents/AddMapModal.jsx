import React, { useEffect, useState } from "react";

import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SelectLocationComponent from "../regionComponents/SelectLocationComponent";
import SelectIndustry from "../IndustryComponant/SelectIndustry";
import Service from "../../service/RegionServices";
import { isLoggedIn } from "../../service/AuthenticationService";
import "../../assets/fonts/fonts.css";

const headerStyle = {
  fontFamily: "Ubuntu",
  fontSize: "64px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "90px",
  letterSpacing: "0em",
  textAlign: "left",
};

const htagStyle = {
  fontFamily: "Ubuntu",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "28px",
  letterSpacing: "0em",
  textAlign: "left",
  mt: "24px",
};
const modalWidth = {
  maxWidth: "704px",
};

const CreateButton = chakra(IconButton, {
  baseStyle: {
    backgroundColor: "transparent !important",
    border: "none !important",
    boxShadow: "none !important",
    isRound: "true",
    margin: "auto",
    display: "block",
    cursor: "pointer",
    marginTop: "15px",
    size: "lg",
  },
});

const AddMapModal = ({ isEdit, data, isAdd, notifyParent, isHome }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();
  const [mapName, setMapName] = useState();
  const [locationData, setLocationData] = useState({});
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCites] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [subIndustries, setSubIndustries] = useState([]);

  const setInitialLocation = (locData) => {
    const allRegions = Service.getregions();
    const allCountries = Service.getCountriesByRegion(locData.region);
    const getStatesByCountry = Service.getStatesByCountry(
      locData.region,
      locData.country
    );

    const getCities = Service.getCitiesByState(
      locData.region,
      locData.country,
      locData.state
    );

    const allIndustries = Service.getIndustries();
    const getSubIndustriesByIndustry = Service.getSubIndustriesByIndustry(
      locData.industry
    );

    setRegions(allRegions);
    setCountries(allCountries);
    setStates(getStatesByCountry);
    setCites(getCities);
    setIndustries(allIndustries);
    setSubIndustries(getSubIndustriesByIndustry);
  };

  const handleLocationDataValidate = () => {
    const requiredLocationKeys = ["name", "region"];
    const locationKeys = Object.keys(locationData);
    locationData.inValidFields = requiredLocationKeys.filter(
      (key) => !locationKeys.includes(key) || locationData[key] === ""
    );
    setLocationData(locationData);
  };

  const handleIndustryChange = (key, value) => {
    locationData[key] = value;
    setLocationData(locationData);
    handleLocationDataChange(locationData);
  };

  const handleLocationDataChange = (locData) => {
    setInitialLocation(locData);
    handleLocationDataValidate();
  };

  const handleLocationChange = (key, value) => {
    let locData = locationData;
    locData[key] = value;
    if (key === "region") {
      locData.country = "";
      locData.state = "";
      locData.city = "";
    }
    if (key === "country") {
      locData.state = "";
      locData.city = "";
    }
    if (key === "state") {
      locData.city = "";
    }
    setLocationData(locData);
    handleLocationDataChange(locData);
  };

  const handleAddMap = () => {
    let location = locationData;
    location.name = mapName;
    handleLocationDataValidate();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Service.addEcoMap(location).then((res) => {
        if (res.id !== undefined) {
          toast({
            title: t("startup.toast.create"),
            description: t("startup.toast.create.map.message"),
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
          onClose();
          history.push({
            pathname: "/services/" + res.id,
            state: { mapName: mapName },
          });
        }
      });
    } else {
      toast({
        description: t("startup.toast.create.map.select.location"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleEdit = () => {
    onOpen();
    handleLocationDataChange(data);
    setMapName(data.name);
    setLocationData(data);
  };

  const EditMap = () => {
    handleLocationDataValidate();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Service.editEcoMap(locationData).then((res) => {
        if (res !== undefined) {
          toast({
            title: t("startup.toast.update"),
            description: t("startup.toast.update.map.message"),
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        }
        notifyParent();
        onClose();
      });
    } else {
      toast({
        description: t("startup.toast.create.map.select.location"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMapName({ mapName: mapName });
  };

  const handleOpenModal = () => {
    if (isLoggedIn()) {
      setInitialLocation(locationData);
      onOpen();
    } else {
      toast({
        description: t("startup.toast.sign.in"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Service.listAllRegions();
      await Service.listAllIndustries();
      setInitialLocation(locationData);
    };

    fetchData().catch(console.error);
  }, [locationData, isEdit, isAdd, data, isHome]);

  return (
    <React.Fragment>
      {isHome ? (
        <Link onClick={handleOpenModal}>
          <Text color="blue" m="7px" fontSize="17px">
            {t("startup.home.page.header.add.map.link")}
          </Text>
        </Link>
      ) : isEdit ? (
        <MenuItem onClick={handleEdit}>
          {t("startup.list.map.page.map.card.edit")}
        </MenuItem>
      ) : isAdd ? (
        <CreateButton onClick={handleOpenModal} />
      ) : (
        <React.Fragment>
          <h1 style={headerStyle}>
            {t("startup.landing.page.content.welcome.message")}
          </h1>
          <h1 style={htagStyle}>
            {t("startup.landing.page.content.welcome.tagline.text")}
          </h1>
          <Flex alignItems="flex-start">
            <Button mt="30px" onClick={handleOpenModal} className="btn-ad-mp">
              {t("startup.landing.page.create.map.button")}
            </Button>
          </Flex>
        </React.Fragment>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isCentered={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent style={modalWidth}>
          {isEdit ? (
            <ModalHeader className="md-hdr-fnt">
              {t("startup.popup.ecosystem.map.heading.edit")}
            </ModalHeader>
          ) : (
            <ModalHeader className="md-hdr-fnt">
              {t("startup.popup.ecosystem.map.heading.create")}
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl onSubmit={(e) => handleSubmit(e)}>
              <FormLabel className="md-ip-lbl">
                {t("startup.popup.ecosystem.map.title")}
              </FormLabel>
              {isEdit ? (
                <Input
                  className="fm-ip-flds"
                  value={locationData["name"]}
                  onChange={(e) => {
                    setLocationData({
                      ...locationData,
                      name: e.target.value,
                    });
                  }}
                />
              ) : (
                <Input
                  className="fm-ip-flds"
                  value={locationData["name"]}
                  onChange={(e) => setMapName(e.target.value)}
                />
              )}
              <FormLabel className="md-ip-lbl" mt={4}>
                {t("startup.popup.ecosystem.map.location")}
              </FormLabel>
              <SelectLocationComponent
                locationData={locationData}
                onLocationChange={handleLocationChange}
                regions={regions}
                states={states}
                countries={countries}
                cities={cities}
              />
              <FormLabel className="md-ip-lbl" mt={4}>
                {t("startup.popup.ecosystem.map.industry")}
              </FormLabel>
              <SelectIndustry
                locationData={locationData}
                onIndustryChange={handleIndustryChange}
                industries={industries}
                subIndustries={subIndustries}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-cnl btn-fnt" onClick={onClose}>
              {t("startup.popup.ecosystem.map.button.cancel")}
            </Button>
            {isEdit ? (
              <Button
                className="btn-crt btn-crt-sty"
                colorScheme="blue"
                mr={3}
                m="0"
                onClick={() => {
                  EditMap();
                }}
              >
                {t("startup.popup.ecosystem.map.button.save")}
              </Button>
            ) : (
              <Button
                className="btn-crt btn-crt-sty"
                colorScheme="blue"
                mr={3}
                m="0"
                disabled={!mapName}
                onClick={handleAddMap}
              >
                {t("startup.popup.map.button.create")}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(AddMapModal);
