import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  matricule: string;
  np: string;
  marque: string;
  dateService: string;
}

/** Constants used to fill up our data base. */
const DATESERVICE: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NP: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-item1',
  templateUrl: './item1.component.html',
  styleUrls: ['./item1.component.scss']
})

export class Item1Component implements AfterViewInit {
  displayedColumns: string[] = ['matricule', 'np', 'marque', 'dateService'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
/** Builds and returns a new User. */
function createNewUser(matricule: number): UserData {
  const np = NP[Math.round(Math.random() * (NP.length - 1))] + ' ' +
      NP[Math.round(Math.random() * (NP.length - 1))].charAt(0) + '.';

  return {
    matricule: matricule.toString(),
    np: np,
    marque: Math.round(Math.random() * 100).toString(),
    dateService:DATESERVICE[Math.round(Math.random() * (DATESERVICE.length - 1))]
  };
}

