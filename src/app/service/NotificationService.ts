import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  config: MatSnackBarConfig<any>;

  constructor(private snackBar: MatSnackBar) {
    config: MatSnackBarConfig  
   }


  success(msg) {
    this.snackBar.open(msg, "close", {
      duration: 2000,
    });
  }

  warn(msg) {
    this.snackBar.open(msg,"close",{
      duration: 2000,
    });
  }

}
