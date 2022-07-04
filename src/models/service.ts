import moment from "moment";

import { Location } from "./location";

export class Service {
  id: string;
  name: string;
  focus: string;
  // TODO change and create the own model for the ownerOrganization
  ownerOrganization: any;
  application: string;
  phasesRange: PhasesRange;
  period: Period;
  link: string;
  location: Location[];
  budget: Budget[];
  audience: string;
  description: string;
  outcomes: string;
  previousService: Service;
  followingService: Service;
  status: string;
  order: number;

  constructor({
    id,
    name,
    focus,
    ownerOrganization = null,
    application,
    phasesRange = { id: null, startPhase: -1, endPhase: 1 },
    period = { id: null, startTime: moment(), endTime: moment() },
    link = null,
    location = [
      new Location({
        continent: null,
        country: null,
        region: null,
        city: null,
      }),
    ],
    budget = [{ id: null, name: null, value: 0, currency: null }],
    audience = null,
    description = null,
    outcomes = null,
    previousService = null,
    followingService = null,
    status,
    order,
  }) {
    this.id = id;
    this.name = name;
    this.focus = focus;
    this.ownerOrganization = ownerOrganization;
    this.application = application;
    this.period = period;
    this.link = link;
    this.location = location;
    this.budget = budget;
    this.audience = audience;
    this.description = description;
    this.outcomes = outcomes;
    this.previousService = previousService;
    this.followingService = followingService;
    this.phasesRange = phasesRange;
    this.status = status;
    this.order = order;
  }
}

interface Period {
  id: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
}

interface Budget {
  id: string;
  name: string;
  value: number;
  currency: string;
}

interface PhasesRange {
  id: string;
  startPhase: number;
  endPhase: number;
}
