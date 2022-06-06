import { Component, OnInit } from '@angular/core';
import { ChauffeurService} from '../../service/ChauffeurService';
import { NotificationService } from '../../service/NotificationService';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.scss']
})
export class AddChauffeurComponent implements OnInit {

  constructor(public service: ChauffeurService,  private notifactionService: NotificationService,
    public dialogRef: MatDialogRef<AddChauffeurComponent>) { }

    ngOnInit() {
      this.service.getChauffeur();
    }
    onClear(){
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
    
    onSubmit(){
  
      console.log(this.service.form.value);
      //var bus = this.service.form.value;
      if(this.service.form.valid){
        if (!this.service.form.get('key').value)
        this.service.insertChauffeur(this.service.form.value);
        else
        this.service.updateChauffeur(this.service.form.value);
  
        //this.service.insertBus(bus);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notifactionService.success('opération terminée avec succès');
        this.onClose();
      }
    }
  
    // Implement this later :x 
    updateChauffeur() {
      console.log("Update chauffeur");
    }
  
   
    onClose(){
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
    }

}
