import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Crew } from '../core/models/crew';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrewService } from '../core/services/crew.service';
import { TypeOfUser } from '../core/models/typeOfUser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit, AfterViewInit {

  nameOfRobots: string[] = ["R1_pfkm4", "R2_43f23", "R3_fsr32", "R4_vowew"];
  displayedColumns: string[] = ['name'];
  selectedUser: string;
  selectedCrew: any;
  typeOfUser= TypeOfUser;
  dataSource_robots : MatTableDataSource<any>;
  crews: Crew[]= [
  new Crew("crew1_4f44rf", "Crew no.1", "Jack", ["Robot1", "Robot2"],"Spaceship1"),
  new Crew("crew2_4f44rf", "Crew no.2", "Mike", ["Robot3", "Robot4", "Robot5", "Robot6", "Robot7"],"Spaceship2"),
  new Crew("crew3_4f44rf", "Crew no.3", "Adam", ["Robot8", "Robot9", "Robot10"],"Spaceship3")
  ];
  submitted: boolean = false;
  CrewFormGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSource_robots.paginator = this.paginator;
  }

  constructor( private router: Router, private crewService: CrewService) { }

  ngOnInit(): void {
    this.getAllCrews();
    this.dataSource_robots = new MatTableDataSource();
    this.CrewFormGroup = new FormGroup({
      crew: new FormControl('', Validators.required),
      typeOfUser: new FormControl('', Validators.required),
      captain: new FormControl('', Validators.required),
      shuttle: new FormControl('', Validators.required)
    });
  }

  onSelectedCrew(event: any): void{
    var selectedCrewID = event.target.value;
    this.selectedCrew = this.crews.find(x => x.crewID === selectedCrewID);
    console.log("SelectedCrew: ", this.selectedCrew);
    this.dataSource_robots = new MatTableDataSource(this.selectedCrew.robots);
    this.CrewFormGroup.patchValue({
      crew: this.selectedCrew.name,
      captain: this.selectedCrew.captain,
      shuttle: this.selectedCrew.shuttle
    });
  }

  updateTypeOfUser(event: any): void{
    this.selectedUser = event.target.value;
    console.log("Type Of User: ", this.selectedUser);
  }

  goToAllPlanets(): void{
    this.submitted = true;
    if(this.CrewFormGroup.invalid){
      return;
    }
    else{
      this.router.navigate(['/all-planets'], {  queryParams: { typeOfUser: this.selectedUser} });
    }
  }

  getAllCrews(): void{
    this.crewService.getCrews().subscribe((crews) => {
      this.crews = crews;
    });
  }

  get getForm() {
    return this.CrewFormGroup.controls;
  }
}
