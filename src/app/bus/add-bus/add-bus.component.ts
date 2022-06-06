import { Component, OnInit } from '@angular/core';
import { BusService} from '../../service/BusService';
import { NotificationService } from '../../service/NotificationService';
import { MatDialogRef } from '@angular/material/dialog';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.scss']
})
export class AddBusComponent implements OnInit {
  foods: Food[] = [
    {value: 'Autobus standard', viewValue: 'Autobus standard'},
    {value: 'Autocar standard', viewValue: 'Autocar standard'},
    {value: 'Autocar long', viewValue: 'Autocar long'},
    {value: 'Midibus', viewValue: 'Midibus'},
    {value: 'Minibus', viewValue: 'Minibus'},
    {value: 'Midicar', viewValue: 'Midicar'},
    {value: 'Car court', viewValue: 'Car court'},
  ];
  foodss: Food[] = [
    {value: 'Iveco Bus', viewValue: 'Iveco Bus'},
    {value: 'Heuliez Bus', viewValue: 'Heuliez Bus'},
    {value: 'Mercedes-Benz', viewValue: 'Mercedes-Benz'},
    {value: 'Solaris', viewValue: 'Solaris'},
    {value: 'Fiat', viewValue: 'Fiat'},
    {value: 'Volkswagen', viewValue: 'Volkswagen'},
    {value: 'Peugeot', viewValue: 'Peugeot'},
  ];

  constructor(public service: BusService,  private notifactionService: NotificationService,
    public dialogRef: MatDialogRef<AddBusComponent>) { }

  ngOnInit() {
    this.service.getBus();
  }
  
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  
  onSubmit(){

    console.log(this.service.form.value);
    //var bus = this.service.form.value;
    if(this.service.form.valid){
      if (!this.service.form.get('key').value) {

        var d = this.service.form.get("dateMiseS").value;
        var da = d.toString();
        this.service.form.controls['dateMiseS'].setValue(da);

        
      console.log(da);

      console.log(this.service.form.value);

        this.service.insertBus(this.service.form.value);

        
      }
      else
      {
        var d = this.service.form.get("dateMiseS").value;
        var da = d.toString();

        console.log(da);
         
        this.service.form.controls['dateMiseS'].setValue(da);

        this.service.updateBus(this.service.form.value);
      }

      //this.service.insertBus(bus);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notifactionService.success('opération terminée avec succès');
      this.onClose();
    }
  }

  // Implement this later :x 
  updateBus() {
    console.log("Update bus");
  }


  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
