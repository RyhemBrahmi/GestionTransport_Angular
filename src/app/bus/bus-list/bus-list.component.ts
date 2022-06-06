import { Component, OnInit, ViewChild } from '@angular/core';
import { BusService } from 'src/app/service/BusService';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog"
import { AddBusComponent } from '../add-bus/add-bus.component'
import { NotificationService } from 'src/app/service/NotificationService';
import { DialogService } from 'src/app/service/dialog.service';

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})


export class BusListComponent implements OnInit {

  constructor(private service: BusService,
    private dialog: MatDialog,
    private NotificationService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['numS','marque','modele','wifi','clim','dateMiseS','nbrVoy','disPar','nbrP','statut','voyAc','actions'];
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey: string;

  ngOnInit() {
    this.service.getBus().subscribe(
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
    this.listData.filter = this.searchkey.trim().toLowerCase(); //voila hhhh lkol hakak eyy ken fel ionic mbadla tchargy bel haja .. n7elhalek ?ay kima thbe 
  }

  onCreate(){
    this.service.initializeFormGroup();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%";
    this.dialog.open(AddBusComponent,dialogConfig);
  }

  onEdit(row: any){
    console.log("Editing row: ", row);
    this.service.populateForm(row);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%";
    this.dialog.open(AddBusComponent,dialogConfig);
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
          this.service.deleteBus($key);
          this.NotificationService.warn('Supprimé avec succès');
     }
   })
  }
}
