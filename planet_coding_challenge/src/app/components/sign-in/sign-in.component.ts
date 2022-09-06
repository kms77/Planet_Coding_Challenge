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
    // initialize the form group
    this.CrewFormGroup = new FormGroup({
      crew: new FormControl('', Validators.required),
      typeOfUser: new FormControl('', Validators.required),
      captain: new FormControl('', Validators.required),
      shuttle: new FormControl('', Validators.required)
    });
  }

   /**
   * Method to update the form group when a new crew is selected
   *
   * @param event - constains the id of the selected crew
   * @remarks
   * Not only the form group fields are updated, but also thhe mat table gets a string with the names of the robots
   *
   * @returns
   *
   */
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

  // save the selected type of the user in order to be used as local storage value when going to all planets page
  updateTypeOfUser(event: any): void{
    this.selectedUserType = event.target.value;
    console.log("Type Of User: ", this.selectedUserType);
  }

  // navigate to the all planets page if the form group values are valid
  goToAllPlanets(): void{
    this.submitted = true;
    if(this.CrewFormGroup.invalid){
      return;
    }
    else{
      // save the local storage data
      this.localStorage.saveData(this.typeOfUserKey, this.selectedUserType);
      this.localStorage.saveData(this.crewID, String(this.selectedCrew.crewID));
      this.router.navigate(['/all-planets']); //, {  queryParams: { typeOfUser: this.selectedUser} });
    }
  }

  // call service to get all the crews from the database and save them in the crews array
  getAllCrews(): void{
    this.crewService.getCrews().subscribe((crews: Crew[]) => {
      console.log("Service crews: ", crews);
      this.crews = crews;
    });
  }

  // retunrns a collection of child controls where the key for each child is the name under which it is registered.
  get getForm() {
    return this.CrewFormGroup.controls;
  }
}
