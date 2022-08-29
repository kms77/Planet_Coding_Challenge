export enum Status{
  ok = "OK",
  not_ok = "!OK",
  to_do = "TODO",
  en_route = "En route"
}

export class Planet {
  public planetID: string;
  public name: string;
  public visitedBy: string;
  public status: Status;
  public description: string;
  public imageURL: string;
  public numberOfRobots: number;
}
