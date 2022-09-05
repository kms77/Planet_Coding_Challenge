import { Crew } from "./crew";

export class Planet {
  public planetID: string;
  public name: string;
  public visitedBy: number;
  public status: string;
  public description: string;
  public imageURL: string;
  public numberOfRobots: number;
  public crew: Crew;

  constructor(planetID: string, name: string, visitedBy: number, status: string, description: string, imageURL: string, numberOfRobots: number, crew: Crew){
    this.planetID = planetID;
    this.name = name;
    this.visitedBy = visitedBy;
    this.status = status;
    this.description = description;
    this.imageURL = imageURL;
    this.numberOfRobots = numberOfRobots;
    this.crew = crew;
  }
}
