import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Planet } from '../../core/models/planet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanetService } from '../../core/services/planet.service';
import { Status } from '../../core/models/status';
import { Crew } from '../../core/models/crew';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalService } from '../../core/services/local.service';
import { GlobalConstants } from '../../utils/global-constants';

@Component({
  selector: 'app-planet-edit',
  templateUrl: './planet-edit.component.html',
  styleUrls: ['./planet-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanetEditComponent implements OnInit {

  selectedPlanet: Planet;
  invalidID: number = GlobalConstants.INVALID_ID;
  crewID: number;
  PlanetFormGroup: FormGroup;
  status = Status;
  constructor(
    private localService : LocalService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PlanetEditComponent>,
    private planetService: PlanetService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.selectedPlanet === undefined) {
        this.selectedPlanet = {
          planetID: this.invalidID,
          name: '',
          visitedBy: 0,
          status: '',
          description: '',
          imageURL: '',
          numberOfRobots: 0,
          captain:'',
          robots: ''
        };
      }
      else {
        this.selectedPlanet = data.selectedPlanet;
      }
    }

  ngOnInit(): void{
    console.log("this.selectedPlanet: ", this.selectedPlanet);
    this.dialogRef.updatePosition();
    this.initializeFormGroup(this.selectedPlanet);
  }

  initializeFormGroup(planet: Planet){
    this.PlanetFormGroup = new FormGroup({
      name: new FormControl(planet.name, Validators.required),
      status: new FormControl(planet.status, Validators.required),
      description: new FormControl(planet.description),
      imageURL: new FormControl(planet.imageURL, Validators.required),
      numberOfRobots: new FormControl(planet.numberOfRobots, [Validators.required, Validators.min(2)]),
    });
  }

  get controls(){
    return this.PlanetFormGroup.controls;
  }

  // if the form group is valid than the add or update method are used
  onSave(): void{
    if (this.PlanetFormGroup.invalid){
      return;
    }
    else{
      if(this.selectedPlanet.planetID === 0){
        this.addPlanet();
      }
      else{
        this.updatePlanet();
      }
      this.dialogRef.close();
    }
  }

  // close the modal
  onClose(): void{
    this.dialogRef.close();
  }

  // create a new planet object with the form group values and adds it in the database
  addPlanet(): void{
    var addFormValues = this.controls;
    this.crewID = Number(this.localService.getData("crewID"));
    console.log("crewid ", this.crewID);
    var planet = new Planet(
      0,
      addFormValues['name'].value,
      this.crewID,
      addFormValues['status'].value,
      addFormValues['description'].value,
      addFormValues['imageURL'].value,
      addFormValues['numberOfRobots'].value,
      '',
      ''
    );
    console.log("planet ", planet);
    this.planetService.addPlanet(planet).subscribe(
      (response: Planet) => {
        console.log("Planet was added successfully!");
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  // create a new planet object with the updated form group values and updates the planet in the database
  updatePlanet(): void{
    var editFormValues = this.controls;
    this.crewID = Number(this.localService.getData("crewID"));
    console.log("crewid ", this.crewID);
    var planet = new Planet(
      this.selectedPlanet.planetID,
      this.selectedPlanet.name,
      this.selectedPlanet.visitedBy,
      editFormValues['status'].value,
      editFormValues['description'].value,
      this.selectedPlanet.imageURL,
      this.selectedPlanet.numberOfRobots,
      this.selectedPlanet.captain,
      this.selectedPlanet.robots
    );
    console.log("planet ", planet);
    this.planetService.updatePlanet(planet).subscribe(
      (response: Planet) => {
        console.log("Planet was updated successfully!");
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}
