export class Planet {
  public planetID: string;
  public name: string;
  public visitedBy: string;
  public status: string;
  public description: string;
  public imageURL: string;
  public numberOfRobots: number;

  constructor(planetID: string, name: string, visitedBy: string, status: string, description: string, imageURL: string, numberOfRobots: number){
    this.planetID = planetID;
    this.name = name;
    this.visitedBy = visitedBy;
    this.status = status;
    this.description = description;
    this.imageURL = imageURL;
    this.numberOfRobots = numberOfRobots;
  }
}
