export class Crew {
  public crew_id: string;
  public captain: string;
  public robots: Array<string>;
  public shuttle: string;

  constructor(crew_id: string, captain: string, robots: Array<string>, shuttle: string){
    this.crew_id = crew_id;
    this.captain = captain;
    this.shuttle = shuttle;
    this.robots= new Array<string>;
    this.robots = robots.slice();
  }
}
