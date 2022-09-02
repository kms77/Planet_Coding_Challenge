import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Planet } from '../core/models/planet';
import { PlanetService } from '../core/services/planet.service';
import { GlobalConstants } from '../utils/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlanetEditComponent } from '../planet-edit/planet-edit.component';

@Component({
  selector: 'app-all-planets',
  templateUrl: './all-planets.component.html',
  styleUrls: ['./all-planets.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllPlanetsComponent implements OnInit {
  typeOfUser: string;
  addPlanetType: string = GlobalConstants.ADD;
  editPlanetType: string = GlobalConstants.EDIT;
  captainUser: string = GlobalConstants.CAPTAIN;
  selectedPlanet: Planet;

  planets: Planet[]= [
    new Planet("planet1_4f44rf", "Red Planet", "Jack", "!OK", "Can't sustain life.", "https://cdn.mos.cms.futurecdn.net/kCbvedK262UGLXCLFeW5oS.jpg", 2),
    new Planet("planet2_4f44rf", "Terra", "Mike", "OK", "We have found another species.","https://mediacdn.libertatea.ro/unsafe/1000x563/smart/filters:format(webp):contrast(8):quality(75)/https://static4.libertatea.ro/wp-content/uploads/2020/09/planeta-terra-sau-planeta-albastra.jpg", 5),
    new Planet("planet3_4f44rf", "Jupiter", "", "En route", "No description yet/:", "https://www.meteorologiaenred.com/wp-content/uploads/2018/07/Planeta-J%C3%BApiter.png", 3)
    ];

  constructor(private planetService: PlanetService, private route: ActivatedRoute,  public dialog: MatDialog,) { }

  ngOnInit(): void {
    //this.getAllPlanets();
    this.route.queryParams
      .subscribe(params => {
        console.log("Params: ", params);
        this.typeOfUser = params['typeOfUser'];
        console.log("Type of user: ", this.typeOfUser);
      });
  }

  getAllPlanets() {
    // this.planetService.getPlanets().subscribe({
    //   next: (data) => {
    //     this.planets = data;
    //     console.log("Get All Planets: ", data);
    //   },
    //   error: (Error) => console.error(Error)
    // });
  }

  editPlanet(planetToEdit: Planet){
    this.selectedPlanet = planetToEdit;
    this.openModalPlanet(this.editPlanetType);
  }

  openModalPlanet(typeOfEdit: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "600px";
    dialogConfig.width = "650px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if(typeOfEdit === this.addPlanetType){
      dialogConfig.data = {
        selectedPlanet: undefined
      };
    }
    else{
      dialogConfig.data = {
        selectedPlanet: this.selectedPlanet
      };
    }
    this.dialog.open(PlanetEditComponent, dialogConfig);
  }

}
