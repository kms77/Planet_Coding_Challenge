import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Crew } from '../core/models/crew';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrewService } from '../core/services/crew.service';
import { TypeOfUser } from '../core/models/typeOfUser';
import { RobotService } from '../core/services/robot.service';

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
  typeOfUser = TypeOfUser;
  dataSourceRobots: MatTableDataSource<any>;
  crews: Crew [];
  // = [
  // new Crew(1, "Crew no.1", "Jack", ["Robot1", "Robot2"],"Spaceship1"),
  // new Crew(2, "Crew no.2", "Mike", ["Robot3", "Robot4", "Robot5", "Robot6", "Robot7"],"Spaceship2"),
  // new Crew(3, "Crew no.3", "Adam", ["Robot8", "Robot9", "Robot10"],"Spaceship3")
  // ];
  submitted: boolean = false;
  CrewFormGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSourceRobots.paginator = this.paginator;
  }

  constructor( private router: Router, private crewService: CrewService, private robotService: RobotService) { }

  ngOnInit(): void {
    this.getAllCrews();
    this.dataSourceRobots = new MatTableDataSource();
    this.CrewFormGroup = new FormGroup({
      crew: new FormControl('', Validators.required),
      typeOfUser: new FormControl('', Validators.required),
      captain: new FormControl('', Validators.required),
      shuttle: new FormControl('', Validators.required)
    });
  }

  onSelectedCrew(event: any): void{
    var selectedCrewID = Number(event.target.value) || 0;
    console.log("SelectedCrew: ", selectedCrewID);
    this.selectedCrew = this.crews.find(x => x.crewID === selectedCrewID);
    if(this.selectedCrew !== undefined){
      console.log("SelectedCrew: ", this.selectedCrew);
      this.dataSourceRobots = new MatTableDataSource(this.selectedCrew.robots);
      this.CrewFormGroup.patchValue({
        crew: this.selectedCrew.name,
        captain: this.selectedCrew.captain,
        shuttle: this.selectedCrew.shuttle
      });
    }
    else{
      return;
    }
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
    this.crewService.getCrews().subscribe((crews: []) => {
      console.log("Service crews: ", crews);
      this.crews = crews;
    });
    const one: number = 1;
    this.robotService.getRobotsOfCrew(one).subscribe((robots: []) => {
      console.log("Robots of crew: 1 are: ", robots);
    });
    // console.log("All Crews: ", this.crews);
    // this.crews.map((crew: Crew) => (this.crewService.getRobotsOfCrew(crew.crewID).subscribe((robots: []) => {
    //   console.log("Robots of crew: ", crew.name, " are: ", robots);
    //   crew.robots = robots;
    // })));
  }

  get getForm() {
    return this.CrewFormGroup.controls;
  }
}
