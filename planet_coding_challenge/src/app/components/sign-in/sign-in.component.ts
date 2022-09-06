import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Crew } from '../../core/models/crew';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrewService } from '../../core/services/crew.service';
import { TypeOfUser } from '../../core/models/typeOfUser';
import { LocalService } from '../../core/services/local.service';
import { GlobalConstants } from '../../utils/global-constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit, AfterViewInit {

  typeOfUserKey: string = GlobalConstants.TYPE_OF_USER;
  crewID: string = GlobalConstants.CREW_ID;
  dataSourceRobots: MatTableDataSource<any>;
  displayedColumns: string[] = ['name'];
  CrewFormGroup: FormGroup;
  typeOfUserEnum = TypeOfUser;
  selectedUserType: string;
  selectedCrew: any;
  crews: Crew [];
  submitted: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSourceRobots.paginator = this.paginator;
  }

  constructor(private router: Router, private crewService: CrewService, private localStorage: LocalService) { }

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
    this.selectedCrew = this.crews.find(x => x.crewID === selectedCrewID);
    if(this.selectedCrew !== undefined){
      console.log("SelectedCrew: ", this.selectedCrew);
      this.dataSourceRobots = new MatTableDataSource(this.selectedCrew.robots.split(','));
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
    this.selectedUserType = event.target.value;
    console.log("Type Of User: ", this.selectedUserType);
  }

  goToAllPlanets(): void{
    this.submitted = true;
    if(this.CrewFormGroup.invalid){
      return;
    }
    else{
      this.localStorage.saveData(this.typeOfUserKey, this.selectedUserType);
      this.localStorage.saveData(this.crewID, String(this.selectedCrew.crewID));
      this.router.navigate(['/all-planets']); //, {  queryParams: { typeOfUser: this.selectedUser} });
    }
  }

  getAllCrews(): void{
    this.crewService.getCrews().subscribe((crews: Crew[]) => {
      console.log("Service crews: ", crews);
      this.crews = crews;
    });
  }

  get getForm() {
    return this.CrewFormGroup.controls;
  }
}
