export class Planet {
  public planetID: number;
  public name: string;
  public visitedBy: number;
  public status: string;
  public description: string;
  public imageURL: string;
  public numberOfRobots: number;
  public captain: string;
  public robots: string;

  constructor(planetID: number, name: string, visitedBy: number, status: string, description: string, imageURL: string, numberOfRobots: number, captain: string, robots: string){
    this.planetID = planetID;
    this.name = name;
    this.visitedBy = visitedBy;
    this.status = status;
    this.description = description;
    this.imageURL = imageURL;
    this.numberOfRobots = numberOfRobots;
    this.captain=captain;
    this.robots=robots;
  }
}
