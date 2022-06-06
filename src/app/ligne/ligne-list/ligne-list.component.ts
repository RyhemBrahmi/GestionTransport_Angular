import { Component, OnInit, ViewChild } from '@angular/core';
import { LigneService } from 'src/app/service/LigneService';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog"
import { AddLigneComponent } from '../add-ligne/add-ligne.component'
import { NotificationService } from 'src/app/service/NotificationService';
import { StationComponent } from 'src/app/station/station.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { DialogService } from 'src/app/service/dialog.service';

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-ligne-list',
  templateUrl: './ligne-list.component.html',
  styleUrls: ['./ligne-list.component.scss']
})
export class LigneListComponent implements OnInit {

  constructor(private service: LigneService,
    private dialog: MatDialog,
    private NotificationService: NotificationService,
    private dialogService: DialogService) { }
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['villedepart','villearrivee','nombrestation','actions'];
    //@ViewChild(MatSort) sort: MatSort;
    //@ViewChild(MatPaginator) paginator: MatPaginator;
    searchkey: string;


  ngOnInit() {
    this.service.getLigne().subscribe(
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
    dialogConfig.width= "40%";
    this.dialog.open(AddLigneComponent,dialogConfig);
  }

  onEdit(row: any){
    console.log("Editing row: ", row);
    var newRow = row; // WITHOUT STATIONS 
    delete newRow.stations;
    this.service.populateForm(newRow);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "40%";
    this.dialog.open(AddLigneComponent, dialogConfig);
  }
/*
  onDelete($key){
    console.log("Deleting", $key);
    if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      this.service.deleteLigne($key);
      this.NotificationService.warn('Supprimé avec succès');
    }
  }*/
  
  onDelete($key){
    // console.log("Deleting", $key);
    // if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      // this.service.deleteBus($key);
      // this.NotificationService.warn('Supprimé avec succès');
    // }
 
    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet élement ?')
    .afterClosed().subscribe(res =>{
      if(res){
           this.service.deleteLigne($key);
           this.NotificationService.warn('Supprimé avec succès');
      }
    })
   }



  // OPEN STATIONS LIST FOR THE GIVEN ELEMENT
  openStations(element){
    // console.log(element);

    this.service.initializeFormGroup();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%";
    dialogConfig.data = element;
    this.dialog.open(StationComponent, {
        autoFocus: true,
        disableClose: true,
        width: '40%',
        data: element
      }
    );
  }

}
