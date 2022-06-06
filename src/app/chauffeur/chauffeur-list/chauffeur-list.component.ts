import { Component, OnInit, ViewChild } from '@angular/core';
import { ChauffeurService } from 'src/app/service/ChauffeurService';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog"
import { AddChauffeurComponent } from '../add-chauffeur/add-chauffeur.component'
import { NotificationService } from 'src/app/service/NotificationService';
import { DialogService } from 'src/app/service/dialog.service';
const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-chauffeur-list',
  templateUrl: './chauffeur-list.component.html',
  styleUrls: ['./chauffeur-list.component.scss']
})
export class ChauffeurListComponent implements OnInit {

  constructor(private service: ChauffeurService,
    private dialog: MatDialog,
    private NotificationService: NotificationService,
    private dialogService: DialogService) { }
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['matricule','nom','prenom','numeroTelephone','adresse','actions'];
    //@ViewChild(MatSort) sort: MatSort;
    //@ViewChild(MatPaginator) paginator: MatPaginator;
    searchkey: string;

  ngOnInit() {
    this.service.getChauffeur().subscribe(
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
    dialogConfig.width= "60%";
    this.dialog.open(AddChauffeurComponent,dialogConfig);
  }

  onEdit(row: any){
    console.log("Editing row: ", row);
    this.service.populateForm(row);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%";
    this.dialog.open(AddChauffeurComponent,dialogConfig);
  }
/*
  onDelete($key){
    console.log("Deleting", $key);
    if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      this.service.deleteChauffeur($key);
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
           this.service.deleteChauffeur($key);
           this.NotificationService.warn('Supprimé avec succès');
      }
    })
   }
}


