import moment from "moment";

import { graphCMSRequest } from "../service/graphCMS";
import { Authentication } from "../service/authentication";
import { Industry } from "./industry";
import { Location } from "./location";
import { Service } from "./service";

export class Map {
  id: string;
  name: string;
  description: string;
  mapStatus: string;
  owner: any;
  creationDate: moment.Moment;
  lastModificationDate: moment.Moment;
  industries: Industry[];
  locations: Location[];
  services: Service[];
  filters: any;

  constructor({
    id = null,
    name,
    description = "",
    mapStatus = "",
    owner = null,
    creationDate = moment(),
    lastModificationDate = moment(),
    locations = [],
    industries = [],
    filters = {},
    services = [],
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.mapStatus = mapStatus;
    this.owner = owner;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
    this.locations = locations;
    this.industries = industries;
    this.filters = filters;
    this.services = services;
  }

  static createMapFromAPI({ map }) {
    return new Map({
      id: map.id,
      name: map.name,
      description: map.description,
      mapStatus: map.mapStatus,
      creationDate: map.creation,
      lastModificationDate: map.lastModification,
      locations: map.location,
      industries: map.industry,
      services: map.service,
    });
  }

  /**
   * Get all the maps linked to the connected user.
   * @return {array<Map>} An array of maps.
   */
  static async getMapsByUser() {
    const query = `
      query getAllUserMaps {
        ecosystemMaps(where: {owner: {id: "${
          Authentication.getCurrentUser().id
        }"}}) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner {
            profileName
          }
          location {
            id
            continent
            country
            region
            city
          }
          industry {
            id
            mainIndustry
            subIndustry
          }
          service {
            id
          }
        }
      }
    `;

    const res = (await graphCMSRequest(query)).ecosystemMaps;

    return res.map((map) => Map.createMapFromAPI({ map: map }));
  }

  // TODO Check the result and pass all services inside the service model.
  /**
   *  Get a map by its id.
   * @param id The id of the map to get.
   * @return {Map} An instance of Map.
   */
  static async getMapById({ id }) {
    const query = ` 
      query getMapById {
        ecosystemMap(where: {id:"${id}"}) {
          title
          filters
          service {
            id
            serviceName
            serviceFocus
            ownerOrganization {
              profileName
            }
            serviceApplication
            servicePhaseRange {
              id
              startPhase
              endPhase
            }
            serviceTime {
              id
              startTime
              endTime
            }
            serviceLink
            serviceLocation {
              id
              continent
              country
              region
              city
            }
            serviceAudience
            serviceBudget {
              budgetTitle
              budgetValue
              budgetCurrency
              id
            }
            serviceDescription
            serviceOutcomes
            previousService {
              id
              serviceName
            }
            followingService {
              id
              serviceName
            }
            serviceStatus
            serviceOrder
          }
        }
      }
    `;

    return await graphCMSRequest(query);
  }
}
