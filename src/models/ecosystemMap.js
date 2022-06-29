import moment from "moment";

export class EcosystemMap {
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
}
