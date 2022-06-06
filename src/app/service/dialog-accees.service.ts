import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogAcceesService {

  constructor(private dialog: MatDialog) { }
  openConfirmDialog(msg){
    return this.dialog.open(MatDialogComponent,{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position :{ top: "10px"},
       data :{
         message : msg
       }
     });
   }
}
