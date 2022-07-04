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

  constructor({ id = null, continent, country, region, city }) {
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
  private static createLocationFromAPI(location: any): Location {
    return new Location({
      id: location.locationId,
      continent: location.continent,
      country: location.country,
      region: location.region,
      city: location.city,
    });
  }

  /**
   * Get request to retrieve all the locations.
   * @return {array} An array of json object.
   */
  static getAllLocations(): Promise<[]> {
    return axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/regionselection.json`,
    })
      .then((res: any) => res.data)
      .catch((error) => console.log(error));
  }
}
