import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Crew } from '../../core/models/crew';
import { CrewService } from '../../core/services/crew.service';

@Component({
  selector: 'app-all-crews',
  templateUrl: './all-crews.component.html',
  styleUrls: ['./all-crews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllCrewsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'captain', 'shuttle', 'robots'];
  dataSourceCrew: MatTableDataSource<any>;
  crews: Crew[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSourceCrew.paginator = this.paginator;

  }

  constructor(private crewService: CrewService) { }

  ngOnInit(): void {
    this.dataSourceCrew = new MatTableDataSource();
    this.getAllCrews();
  }

  getAllCrews(): void{
    this.crewService.getCrews().subscribe((crews: Crew[]) => {
      this.crews = crews;
      this.dataSourceCrew = new MatTableDataSource(this.crews);
    });


  }
}
