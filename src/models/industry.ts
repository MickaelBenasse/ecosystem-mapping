import axios from "axios";

/**
 * Industry model that represent one industry.
 * This industry will have an id, name and a list of sub-industries.
 */
export class Industry {
  id: string;
  name: string;
  subIndustries: SubIndustry[];

  constructor({ id, name, subIndustries }) {
    this.id = id;
    this.name = name;
    this.subIndustries = subIndustries;
  }

  /**
   * Create an industry instance from the industry API response.
   * @param industry An industry API response.
   * @return {Industry} An instance of Industry.
   */
  private static createIndustryFromAPI(industry: any): Industry {
    // Format the subIndustries with the model.
    const subIndustries = industry.subIndustries.map((subIndustry) => {
      return SubIndustry.createSubIndustryFromAPI(subIndustry);
    });

    return new Industry({
      id: industry.industry.industryId,
      name: industry.industry.industryName,
      subIndustries: subIndustries,
    });
  }

  /**
   * Get request to retrieve all the industries with their sub-industries.
   * @return {array} An array of Industry.
   */
  static getAllIndustries(): Promise<[]> {
    return axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/industries.json`,
    })
      .then((res: any) => res.data.industries)
      .catch((err) => console.log(err));
  }
}

/**
 * Sub-industry model that represent one sub-industry.
 * This sub-industry will have an id and a name.
 */
class SubIndustry {
  id: string;
  name: string;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  /**
   * Create a sub-industry instance from the API response.
   * @param subIndustry A sub-industry API response.
   * @return {SubIndustry} An instance of SubIndustry.
   */
  public static createSubIndustryFromAPI(subIndustry: any): SubIndustry {
    return new SubIndustry({
      id: subIndustry.industryId,
      name: subIndustry.industryName,
    });
  }
}
