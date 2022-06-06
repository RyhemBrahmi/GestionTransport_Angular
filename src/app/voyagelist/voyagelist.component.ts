import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VoyageService } from '../service/VoyageService';
//import { Component, OnInit } from '@angular/core';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import { MatTableDataSource } from '@angular/material/table';
import { ImprimerTicketComponent } from '../imprimer-ticket/imprimer-ticket.component';
//import { VoyageService } from '../service/VoyageService';
import { TicketListDialogComponent } from '../ticket-list-dialog/ticket-list-dialog.component';
import { TicketComponent } from '../ticket/ticket.component';
//import { VoyageListComponent } from '../voyage/voyage-list/voyage-list.component';
//import { VoyagelistComponent } from '../voyagelist/voyagelist.component';

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-voyagelist',
  templateUrl: './voyagelist.component.html',
  styleUrls: ['./voyagelist.component.scss']
})
export class VoyagelistComponent implements OnInit {
  displayedColumns: string[] = ['ligne','datevoyage','stationarrivee','heuredepart','heurearrivee','matriculebus','tarifs','nombreplacedisponible','nombreplacereservee','actions'];

  //displayedColumns: string[] = ['datevoyage'];
  searcheDate;
  filteredList = [];
  tempList = [];
  searchkey: string;
   //'stationdepart','stationarrivee','dateReservation','price','actions'
   @ViewChild(MatPaginator) paginator: MatPaginator;
   dataSource : MatTableDataSource<any>;

  constructor(private voyageService : VoyageService,public dialogRef: MatDialogRef<VoyagelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog ) {
      
      this.searcheDate = data;
      this.dataSource = this.searcheDate;
      // console.log(this.searcheDate);
      this.filterVoyageListByDate(this.searcheDate);
       console.log(this.dataSource);
      
    }

    onSearchClear(){
      this.searchkey= "";
      this.applyFilter();
    }
  
    applyFilter(){
      // this.listData.filter = this.searchkey.trim().toLowerCase(); //tfadhel .. //mazalet 
      var v = this.searchkey.trim().toLowerCase();
      // console.log(v);
     
      this.filteredList = this.tempList.filter((item) => {
        return (item.stationarrivee.toLowerCase().indexOf(v) > -1);
    }) }
    filterVoyageListByDate(data) {
      this.voyageService.getVoyageValueChanges().subscribe(list => {

       // console.log(list);

       var l =[];

        list.forEach(element => {

          var d = element.dateVoyage;
          // console.log(d);
          var t = new Date(d).getTime();
          // console.log(t);
          if(t == this.searcheDate) {
            l.push(element)
          }

        })
          
        this.filteredList = l;
        this.tempList = l;
     
        console.log(this.filteredList);
        console.log('ryheeeeeeeeeeeeeeeeeem');
      }, err => {
        console.log(err)
      })
    }

  ngOnInit(): void {
  }
 
  openTicket(row: any){

    this.voyageService.initializeFormGroup();
    var newRow = row; 
    delete newRow.tickets;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "50%";
    dialogConfig.data=newRow;
    this.dialog.open(TicketComponent,dialogConfig);
    this.voyageService.populateForm(newRow);
  
  }
  
    // Get tickets list for the given trip 
    getTickets(row: any) {
       console.log(row);
      // console.log("Get tickets", row.key);
   
  
      // Open Tickets in new dialog
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width= "40%";
      dialogConfig.data= row;
      this.dialog.open(TicketListDialogComponent,dialogConfig);
  
    }
  
}

