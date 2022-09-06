export class Crew {
  public crewID: number;
  public name: string;
  public captain: string;
  public shuttle: string;
  public robots: string;

  constructor(crewID: number, name: string, captain: string, shuttle: string, robots: string){
    this.crewID = crewID;
    this.name = name;
    this.captain = captain;
    this.shuttle = shuttle;
    this.robots= robots;
  }
}
