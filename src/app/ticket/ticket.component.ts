import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VirtualTimeScheduler } from 'rxjs';
import { BusService } from '../service/BusService';
import { VoyageService } from '../service/VoyageService';
import { ImprimerTicketComponent } from '../imprimer-ticket/imprimer-ticket.component';
import { DialogService } from '../service/dialog.service';

const dialogConfig = new MatDialogConfig();

// Ticket model 
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
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  voyagesList = [];
  selectVoyageValueEnabled: boolean = false;
  dummyVoyage: any;
  passagerTypes: any[] = [{
        voyagerType: 'Majeur',
        reductionPercentage: 0, // reduction percentage  ?% 
      },{
        voyagerType: 'Enfant',
        reductionPercentage: 75, // reduction percentage  ?% 
        isSelected: true,
      },{
        voyagerType: 'Police',
        reductionPercentage: 25, // reduction percentage  ?% 
      },{
        voyagerType: 'Handicapé',
        reductionPercentage: 100, // reduction percentage  ?% 
      },];

  pickedPassagerType: any = this.passagerTypes[0];
    
  // final price the ticket 
  finalPrice: number = 0;

  selectMatriculeValueEnabled: boolean = false;
  selectVillearriveeValueEnabled: boolean = false;
  /**
   * Select Menu for bus mat should be disabled untill the data is loaded
   */
  busList = [];
  voyageList= [];

  voyage:any;
  voyageListArray: any[];

  // AVAILABLE PLACES 
  availablePlaces: number = 0;
  //dialogService: any;

  constructor(private busService: BusService, private voyageService: VoyageService , public dialogRef: MatDialogRef<TicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
    dialogService : DialogService) {

      //console.log("******");
     
      this.voyage = data;  // 
      console.log(this.voyage);

      // Set final price the same as ticket's price  
      this.finalPrice = this.voyage.tarifs;

      //this.getBusList(); 
    // this.getVoyageList();
    this.dummyVoyage = data;
    console.log("-------ryhem-------");
    console.log(this.dummyVoyage);
    console.log("-------ryhem-------");

// get liste voyage
    this.voyageList = (data.voyages)? data.voyages : [];
    this.selectVoyageValueEnabled = false;
  
    this.voyageService.getVoyage().subscribe( (data: any) => {
      console.log("Voyage list:");
      // console.log(data);
      
      // ENABLE SELECT MENU
      this.selectVoyageValueEnabled = true;
  
      let array = data.map(item => { 
        return {
         key: item.key,
          ...item.payload.val()
        };
      });
  
      this.voyagesList = array;
      console.log("-------------------")
      console.log( this.voyagesList);

     //find key
      var item = array.find(item => item.key);
      console.log("Key voyage :" + item.key);
  
    }, err => {
      console.log("Error", err);
    })
  }

  ngOnInit() {
 
    // CALL CALCULATE FINAL PRCOE FUNCTION
    this.calculateFinalPrice();
  }
  
  getVoyages() {
    if(!this.dummyVoyage.voyages) return;
    console.log("-------ryhem-------");

    console.log(this.dummyVoyage.voyages);
  }




// Reserver ticket
bookTicketOld(element) {
  console.log(element);
  // var dummyElement = element; // SAME REFERENCE // HNA 3mamna copiel el refenrem mta3 l objet, hadha a3leh  
  
  // DIFFERNT REFERENCE
  var dummyElement = JSON.parse(JSON.stringify(element));

  // ki tbadel f copie jdid tetbadel fel gdima 
  // choufi 

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
    this.voyageService.updateVoyage(dummyElement);
   

  }else {
    alert("There is no places left for this trip");
  }
}

bookTicket() {
  console.log("booking ticket");
  // construction de ticket object , fr 3al eng 3la 3arbi xd chway  wnekteblk bel latinos hhhh aady xd 
  
  // confirmation de reservation, na3mlouha b native browser confirm dialog men ba3d nabdlouha beli nhebou,

  var r = confirm("Confirmation de reservation!"); //hna
  //var r =this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet élement ?')
  if (r == true) {
    
    var dateReservation_ = Date.now(); 
    var ticketId_ = this.createID();
    var tempData = this.pickedPassagerType; 
    delete tempData.isSelected; // removing isSelected key w
    var clientData_ = tempData;
    
  
    var ticket: any = {
      ticketId: ticketId_,
      dateReservation: dateReservation_, 
      ticket: {
        clientData: clientData_,
        price: this.finalPrice
      }
    }
    
    var givemedata = true;

     // Get voyage and sous voyages

     if(givemedata) {
      this.voyageService.getCurrentVoyageList().subscribe( list => {

        if(!givemedata) return;

 

        let array = list;

        console.log(array);

        console.log("--------------");
        
      

        console.log(this.voyage);
        
        
        console.log("--------------");


        var exactTrips = this.getExactTrips(this.voyage.key, array);

        if(exactTrips.length==0) {
          alert("Something went wrong");
          return;
        }


        console.log("EXact trips");
        console.log(exactTrips);

 
        // update all exact trips 

        exactTrips.forEach(element => {

          let updateKey = element.key;

          console.log(element);

          
              // Checking if there are places left on the bus
              var dummyElement = JSON.parse(JSON.stringify(element));
              // console.log(Object.keys(dummyElement));
              
              // console.log(dummyElement);
  
              
              if(dummyElement.nombreplacedisponible > 0) {

                // UPDATE voyage
                dummyElement.nombreplacedisponible -= 1;
                dummyElement.nombreplacereservee += 1;
                // console.log("After updating trip");
                // console.log(dummyElement);

                // ADD tiket to ticekts colelction
                if(dummyElement.tickets) {
                  // Adding ticket if tickets collection already exists
                  console.log("Ticket collection exists");
                  dummyElement.tickets.push(ticket);
                }
                else {
                  // create new tickets table and add ticket to it
                  console.log("Ticket collection not exists, creating new one");
                  dummyElement.tickets = [ticket];
                }

                console.log(dummyElement);
                console.log(this.voyage);
      
                this.voyageService.updateVoyageTicket(dummyElement);
                // this.voyageService.updateVoyage(dummyElement);

            
              }else {
                alert("There is no places left for this trip");
                return;
              }



        })

       // close dialog after update 
         var rr = confirm("Télécharger ticket?"); //hna
         if (rr == true) {
         console.log("Imprimer ticket");

         // l code l gdim trah helih ak l sajelnah hhh ki
         
         
         console.log('************************');
         console.log(this.voyage);

        
        this.closeDialog();

         var r = ticket;
         r.ligneData = {
           ligne : this.voyage.ligne,
           stationarrivee : this.voyage.stationarrivee,
           stationdepart : this.voyage.stationdepart,
           heuredepart : this.voyage.heuredepart,
           dateVoyage : this.voyage.dateVoyage,
         } 

          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.width= "600px";
          dialogConfig.data= r;
          this.dialog.open(ImprimerTicketComponent,dialogConfig);

       
        
        givemedata = false;

      } else {
        this.closeDialog();
        givemedata = false;
        return;
      }

      }, err => {
        console.log(err);
      }) 
    }

  }



}
 

// Get trips with the same key or voyageParent key as the voaygeTicketKey
getExactTrips(ticketKey, array) {

	// console.log(array);
  
  var lookup = []; // Temp array to hold the trips
  
  for (var i=0; i<array.length; i++) {
  
    let v = array[i];
		
    if(v.key == ticketKey) {
    
      if(v.voyageParent == "") {

      // Have no childs
      	console.log("have no childs")
        
        // Get all childs with the same key if exists
        let y = v.key;
        for (var j=0; j<array.length; j++) {
  
    			let vvv = array[j];
          
        	if( (vvv.key == y) || (vvv.voyageParent == y)) {
          	// console.log(vvv);
            lookup.push(vvv);
          }
          
        }
        

      } else {

			console.log("have childs")
        // Have childs
        let x = v.voyageParent;
        console.log(x);
        // Looking for any trip key =  x or voayegParent = x
        
        for (var k=0; k<array.length; k++) {
  
    			let vv = array[k];
          
        	if( (vv.key == x) || (vv.voyageParent == x)) {
          	// console.log(vv);
            lookup.push(vv);
          }
          
        }
				
      }
    
    }
    
    
  }

	return lookup;
}



closeDialog() {
  this.dialogRef.close();
}


/*onCheckboxChange() {
  console.log(this.seasons);
}*/


 //passager
 _passagerlist:passager[];
 getpassagers(){
   this._passagerlist=[
     {id:1,name:"Enfant",isselected:false},
     {id:2,name:"Majeur",isselected:false},
     {id:3,name:"Handicapé",isselected:false},
     {id:4,name:"Police",isselected:false},
   ]
 }

 onchange($event){
   console.log(this.pickedPassagerType);

   this.calculateFinalPrice();

   // Calculate the final price 
   // Error when picking "mineur" , "majeur" 
 }
 
 calculateFinalPrice() {
  console.log("Final price", this.finalPrice);

  var ticketPrice = this.voyage.tarifs;

  this.finalPrice = ticketPrice - ( (ticketPrice * this.pickedPassagerType.reductionPercentage) / 100);
  console.log("Price after reduction", this.finalPrice);

 }
 
 createID() {
    return Array(16)
      .fill(0)
      .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
      .join('') + 
      Date.now().toString(24);
  }

  // Get all voyage liste 


} 



class passager {
  id: number;
  name: string;
  isselected: boolean;
}



/**
 * Ticket collection
 * voayge {
 * ... 
 * tickets: [{
 *  dateReservation: timestamp,
 *  vaygerData: {
 *    voyagerType: 'Majeur',
      reductionPercentage: 0,
 * },
 * ticketPrice: 15.25
 * }]
 * }
 */ 
 
      /* 
      
        // GET voyage from data;
        this.voyageService.getOneTrip(this.voyage.key).once('value', data => {

          var result = data.val();
          
          console.log(result);

            // Checking if there are places left on the bus
            var dummyElement = JSON.parse(JSON.stringify(result));
            // console.log(Object.keys(dummyElement));
            
            if(dummyElement.nombreplacedisponible > 0) {

              // UPDATE voyage
              dummyElement.nombreplacedisponible -= 1;
              dummyElement.nombreplacereservee += 1;
              // console.log("After updating trip");
              // console.log(dummyElement);

              // ADD tiket to ticekts colelction
              if(dummyElement.tickets) {
                // Adding ticket if tickets collection already exists
                console.log("Ticket collection exists");
                dummyElement.tickets.push(ticket);
              }
              else {
                // create new tickets table and add ticket to it
                console.log("Ticket collection not exists, creating new one");
                dummyElement.tickets = [ticket];
              }

              console.log(dummyElement);
              console.log(this.voyage);
    
              this.voyageService.updateVoyagePromis(this.voyage.key, dummyElement).then(data => {
                console.log("Book ticket successfully");
                console.log(data);

                
                // close dialog after update 
                var rr = confirm("Imprimer ticket?");
                if (rr == true) {
                  console.log("Imprimer ticket");
                this.closeDialog();

                var r = dummyElement;
                r.ligneData = {
                  ligne : this.voyage.ligne,
                  stationarrivee : this.voyage.stationarrivee,
                  stationdepart : this.voyage.stationdepart,
                }
            
                dialogConfig.disableClose = false;
                dialogConfig.autoFocus = true;
                dialogConfig.width= "600px";
                dialogConfig.data= r;
                this.dialog.open(ImprimerTicketComponent,dialogConfig);
            
              } else {
                  this.closeDialog()
                }

                


              }, err => {
                console.log("Booking ticket failed");

              });

          
            }else {
              alert("There is no places left for this trip");
            }



        }, err => {
          console.log("Can't get ligne for the update");
        })


        */