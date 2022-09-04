export class Crew {
  public crewID: number;
  public name: string;
  public captain: string;
  public robots: Array<string>;
  public shuttle: string;

  constructor(crewID: number, name: string, captain: string, robots: Array<string>, shuttle: string){
    this.crewID = crewID;
    this.name = name;
    this.captain = captain;
    this.shuttle = shuttle;
    this.robots= new Array<string>;
    this.robots = robots.slice();
  }
}
