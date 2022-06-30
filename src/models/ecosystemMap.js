import moment from "moment";
import { graphCMSRequest } from "../service/graphCMS";
import { Authentication } from "../service/authentication";

export class Map {
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

  static createMapFromAPI({ mapQuery }) {
    return new Map({
      id: mapQuery.id,
      name: mapQuery.name,
      description: mapQuery.description,
      mapStatus: mapQuery.mapStatus,
      creationDate: mapQuery.creation,
      lastModificationDate: mapQuery.lastModification,
      locations: mapQuery.location,
      industries: mapQuery.industry,
      services: mapQuery.service,
    });
  }

  /**
   * Get all the maps linked to the connected user.
   * @return {Promise<{connect: [{id: *}]}>}
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

    return (await graphCMSRequest(query)).ecosystemMaps;
  }

  // TODO Check the result and pass all services inside the service model.
  /**
   *
   * @param id
   * @return {Promise<any>}
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
