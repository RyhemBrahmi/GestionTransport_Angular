import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImprimerTicketComponent } from '../imprimer-ticket/imprimer-ticket.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const dialogConfig = new MatDialogConfig();

export interface PeriodicElement {
  dateReservation: number;
  ticketId: string;
  weight: number;
  symbol: string;
} 
export interface Ticket {
  ticketId: string, 
  userKey?: string, 
  dateReservation: number, 
  ticket: {
    clientData: any,
    price: number
  }
}


@Component({
  selector: 'app-ticket-list-dialog',
  templateUrl: './ticket-list-dialog.component.html',
  styleUrls: ['./ticket-list-dialog.component.scss']
})


export class TicketListDialogComponent implements OnInit {
  displayedColumns: string[] = ['passager','ticketId'];
  //'stationdepart','stationarrivee','dateReservation','price','actions'
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tempList : any = [];
  voyageData: any = [];
  //dataSource : any = [];
  dataSource : MatTableDataSource<any>;
  searchkey: string;
  //listData: MatTableDataSource<any>;
  constructor(public dialogRef: MatDialogRef<TicketListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog ) {
      console.log(data);
      this.voyageData = data;
      
      this.dataSource = this.voyageData.tickets;
      this.tempList = this.voyageData.tickets; ;
    }
    ngOnInit() {
      this.voyageData.paginator = this.paginator;
      
    }
    
    onSearchClear(){
      this.searchkey= "";
      this.applyFilter();
    }
  
    applyFilter(){
      // this.listData.filter = this.searchkey.trim().toLowerCase(); 
      var v = this.searchkey.trim().toLowerCase();
      // console.log(v);
     
      this.dataSource = this.tempList.filter((item) => {
        return (item.ticketId.toLowerCase().indexOf(v) > -1);
    }) }
   
  
  imprimer(row: any) {
    var r = row;
    r.ligneData = {
      ligne : this.voyageData.ligne,
      stationarrivee : this.voyageData.stationarrivee,
      stationdepart : this.voyageData.stationdepart,
    }

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "600px";
    dialogConfig.data= r;
    this.dialog.open(ImprimerTicketComponent,dialogConfig);

  }
}
