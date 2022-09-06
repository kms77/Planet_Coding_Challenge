import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Planet } from '../../core/models/planet';
import { PlanetService } from '../../core/services/planet.service';
import { GlobalConstants } from '../../utils/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlanetEditComponent } from '../planet-edit/planet-edit.component';
import { Crew } from '../../core/models/crew';
import { Status } from '../../core/models/status';
import { LocalService } from '../../core/services/local.service';
import { TypeOfUser } from '../../core/models/typeOfUser';

@Component({
  selector: 'app-all-planets',
  templateUrl: './all-planets.component.html',
  styleUrls: ['./all-planets.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AllPlanetsComponent implements OnInit {
  addPlanetType: string = GlobalConstants.ADD;
  editPlanetType: string = GlobalConstants.EDIT;
  captainUser: string = GlobalConstants.CAPTAIN;
  typeOfUserKey: string = GlobalConstants.TYPE_OF_USER;
  typeOfUser: string | null;
  status = Status;
  selectedPlanet: Planet;
  planets: Planet[];


  constructor(private router: Router, private planetService: PlanetService, private localService: LocalService,  public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllPlanets();
    this.typeOfUser = this.localService.getData(this.typeOfUserKey);
    console.log("This.typeOfUser: ", this.typeOfUser);
    // this.getTypeOfUser();
  }

  // getTypeOfUser(): void{
  //   this.route.queryParams
  //     .subscribe(params => {
  //       console.log("Params: ", params);
  //       this.typeOfUser = params['typeOfUser'];
  //       console.log("Type of user: ", this.typeOfUser);
  //     });
  // }

  // get all planets from the database and save them in the planets array
  getAllPlanets(): void{
    this.planetService.getPlanets().subscribe({
      next: (data) => {
        this.planets = data;
        console.log("Get All Planets: ", data);
      },
      error: (Error) => console.error(Error)
    });
  }

  // check if user has the rights to access the edit modal and open it if so
  editPlanet(planetToEdit: Planet){
    if(this.typeOfUser === this.captainUser){
      this.selectedPlanet = planetToEdit;
      this.openModalPlanet(this.editPlanetType);
    }
  }

  // method to config and open the modal component
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
    this.dialog.open(PlanetEditComponent, dialogConfig).afterClosed().subscribe( () => {
      this.getAllPlanets();
    });
  }

  // clear the local storage and go to the sign-in page
  backToSignIn(): void{
    this.localService.clearData();
    this.router.navigate(['/sign-in']);
  }

}
