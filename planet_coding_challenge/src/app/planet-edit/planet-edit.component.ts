import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Planet } from '../core/models/planet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanetService } from '../core/services/planet.service';
import { Status } from '../core/models/status';

@Component({
  selector: 'app-planet-edit',
  templateUrl: './planet-edit.component.html',
  styleUrls: ['./planet-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanetEditComponent implements OnInit {

  selectedPlanet: Planet;
  PlanetFormGroup: FormGroup;
  status = Status;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PlanetEditComponent>,
    private planetService: PlanetService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.selectedPlanet === undefined) {
        this.selectedPlanet = {
          planetID: '',
          name: '',
          visitedBy: '',
          status: '',
          description: '',
          imageURL: '',
          numberOfRobots: 0
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

  onSave(): void{
    if (this.PlanetFormGroup.invalid){
      return;
    }
    else{
      var editedPlanet = this.PlanetFormGroup.value as Planet;
      if(this.selectedPlanet.planetID === ''){
        console.log("Planet Added!");
      }
      else{
        editedPlanet.planetID = this.selectedPlanet.planetID;
        console.log("Planet Updated!");
      }
      this.dialogRef.close();
    }
  }
}
