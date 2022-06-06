import { Component, OnInit } from '@angular/core';
import { LigneService} from '../../service/LigneService';
import { NotificationService } from '../../service/NotificationService';
import { MatDialogRef } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-ligne',
  templateUrl: './add-ligne.component.html',
  styleUrls: ['./add-ligne.component.scss']
})
export class AddLigneComponent implements OnInit {
  foods: Food[] = [
    {value: 'Gafsa', viewValue: 'Gafsa'},
    {value: 'Gabes', viewValue: 'Gabes'},
    {value: 'Sfax', viewValue: 'Sfax'},
    {value: 'Tunis', viewValue: 'Tunis'},
    {value: 'Sousse', viewValue: 'Sousse'},
    {value: 'Monastir', viewValue: 'Monastir'},
    {value: 'Sidi Bouzid', viewValue: 'Sidi Bouzid'},
    {value: 'Kasserine', viewValue: 'Kasserine'},
    {value: 'Kébili', viewValue: 'Kébili'},
    {value: 'Kairouan', viewValue: 'Kairouan'},
    {value: 'Nabeul', viewValue: 'Nabeul'},
  ];
  foodss: Food[] = [
    {value: 'Gafsa', viewValue: 'Gafsa'},
   
  ];
  constructor(public service: LigneService,  private notifactionService: NotificationService,
    public dialogRef: MatDialogRef<AddLigneComponent>) { }

  ngOnInit(){
    this.service.getLigne();
  }
  
  onSubmit(){

    console.log(this.service.form.value);
    //var ligne = this.service.form.value;
    if(this.service.form.valid){
      if (!this.service.form.get('key').value)
        this.service.insertLigne(this.service.form.value);
      else
        this.service.updateLigne(this.service.form.value);

      //this.service.insertLigne(ligne);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notifactionService.success('opération terminée avec succès');
      this.onClose();
    }
  }
    
  updateLigne() {
    console.log("Update ligne");
  }


  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    window.location.reload();
  }
}
