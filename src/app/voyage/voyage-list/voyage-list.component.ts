import { Component, OnInit, ViewChild } from '@angular/core';
import { VoyageService } from 'src/app/service/VoyageService';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog"
import { AddVoyageComponent } from '../add-voyage/add-voyage.component'
import { NotificationService } from 'src/app/service/NotificationService';
import { LigneService } from 'src/app/service/LigneService';
import { DialogService } from 'src/app/service/dialog.service';

const dialogConfig = new MatDialogConfig();
export interface PeriodicElement {
  dateReservation: number;
}
@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.scss']
})
export class VoyageListComponent implements OnInit {

  constructor(private service: VoyageService,
    private dialog: MatDialog,
    private NotificationService: NotificationService, private ligneService: LigneService,
    private dialogService: DialogService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'ligne','dateVoyage','stationarrivee','heuredepart','heurearrivee','matriculebus','tarifs','nombreplacedisponible','nombreplacereservee','actions'];
  //@ViewChild(MatSort) sort: MatSort;'voyageParent','stationdepart',
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey: string;
  
  ngOnInit() {
    this.service.getVoyage().subscribe(
      list => {
        
        let array = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });

         //console.log(array);

        this.listData = new MatTableDataSource(array);
        //this.listData.sort = this.sort;
        //this.listData.paginator = this.paginator;
        //this.listData.filterPredicate = (data,filter) => {
        // return this.displayedColumns.some(ele => {
           //return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
         //});
       // };
      });
  }
  onSearchClear(){
    this.searchkey= "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "50%";
    this.dialog.open(AddVoyageComponent,dialogConfig);
  }
  onEdit(row: any){
    console.log("Editing row: ", row);
    var newRow = row; 
    delete newRow.tickets;
    this.service.populateForm(newRow);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "50%";
    this.dialog.open(AddVoyageComponent,dialogConfig);
  }
  onDelete($key){
    // console.log("Deleting", $key);
    // if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      // this.service.deleteBus($key);
      // this.NotificationService.warn('Supprimé avec succès');
    // }
 
    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet élement ?')
    .afterClosed().subscribe(res =>{
      if(res){
           this.service.deleteVoyage($key);
           this.NotificationService.warn('Supprimé avec succès');
      }
    })
   }
   /*
  onDelete($key){
    console.log("Deleting", $key);
    if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      this.service.deleteVoyage($key);
      this.NotificationService.warn('Supprimé avec succès');
    }
  }*/

  // Reserver ticket
  bookTicket(element) {
    console.log(element);
    // var dummyElement = element; // SAME REFERENCE // HNA 3mamna copiel el refenrem mta3 l objet, hadha a3leh  
    
    // DIFFERNT REFERENCE
    var dummyElement = JSON.parse(JSON.stringify(element));


    // console.log(dummyElement == element); // kani nafs reference bech tjina true ,
    // console.log(dummyElement === element); // hadhi nrmlent true 
    
    // VERIFY nombreplacedisponible BEFORE BOOKING A TICKET
    if(element.nombreplacedisponible>0) {

      // UPDATE voyage
      dummyElement.nombreplacedisponible -= 1;
      dummyElement.nombreplacereservee += 1;
      // console.log("After updating trip");
      // console.log(dummyElement);

      // UPDATEING THE DATABASE 
      this.service.updateVoyage(dummyElement);
     

    }else {
      alert("There is no places left for this trip");
    }
  }

  // Formate ligne name
  setLigneValue(a, b) {
    return a + " - " + b;
  }

  // Get depart station by ligne key
  getLigneName(key) {
    console.log(key);
 
  }


}

/**
 * 
 * 
key: "-MV8Cv97CygiA2MH83J_"
matriculebus: "-MUNi2HO5yGIstln7FHm"
nombreplacedisponible: "32"
nombreplacereservee: 0

 * Tickets booking 
 * nombreplacedisponible: "12" - First add - lazem tkoun nafs nombre de place mta l bus - Nsalhou hadhi lmara lawla men ba3d narj3ou lel lokrhine
 * nombreplacereservee: "1" - hadhi men lawel tabda 0
 * 
*/
