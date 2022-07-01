import axios from "axios";

/**
 * Location model that represent one location.
 * This location will have an id, continent, country, region and a city.
 */
export class Location {
  id: string;
  continent: string;
  country: string;
  region: string;
  city: string;

  constructor({ id, continent, country, region, city }) {
    this.id = id;
    this.continent = continent;
    this.country = country;
    this.region = region;
    this.city = city;
  }

  /**
   * Create an location instance from the location API response.
   * @param location An location API response.
   * @return {Location} An instance of Location.
   */
  createLocationFromAPI(location: any): Location {
    return new Location({
      id: location.locationId,
      continent: location.continent,
      country: location.country,
      region: location.region,
      city: location.city,
    });
  }

  /**
   * Get request to retrieve all the locations and then format them through the model.
   * @return {array<Location>} An array of Location.
   */
  getAllLocations(): Promise<Location[]> {
    const res: any = axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/locations.json`,
    });

    return res.locations.map((location) => {
      return this.createLocationFromAPI(location);
    });
  }
}
