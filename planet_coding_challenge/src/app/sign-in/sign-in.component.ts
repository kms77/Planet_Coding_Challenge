import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Crew } from '../core/models/crew';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit, AfterViewInit {

  NameOfRobots: string[] = ["R1_pfkm4", "R2_43f23", "R3_fsr32", "R4_vowew"];
  displayedColumns: string[] = ['name'];
  dataSource_robots : MatTableDataSource<any>;
  initialCrew: string;
  crews: Crew[] = [
  new Crew("crew1_4f44rf", "Jack", ["Robot1", "Robot2"],"Spaceship1"),
  new Crew("crew2_4f44rf", "Mike", ["Robot3", "Robot4", "Robot5", "Robot6", "Robot7"],"Spaceship2"),
  new Crew("crew3_4f44rf", "Adam", ["Robot8", "Robot9", "Robot10"],"Spaceship3")
  ];

  CrewFormGroup: FormGroup;
  emptyCrew: Crew = {
    captain: '',
    crew_id: '',
    robots: [],
    shuttle: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSource_robots.paginator = this.paginator;
  }

  constructor( private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataSource_robots = new MatTableDataSource(this.NameOfRobots);
    this.CrewFormGroup = this.formBuilder.group({
      crew: ''
    });
    this.initialCrew = '';
  }

  goToAllPlanets(){
    this.router.navigateByUrl('/all-planets');
  }

}
