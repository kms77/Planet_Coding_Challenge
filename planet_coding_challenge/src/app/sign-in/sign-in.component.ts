import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSource_robots.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
    this.dataSource_robots = new MatTableDataSource(this.NameOfRobots);
  }

}
