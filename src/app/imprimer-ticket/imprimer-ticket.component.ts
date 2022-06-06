import { Component, Inject, OnInit,ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-imprimer-ticket',
  templateUrl: './imprimer-ticket.component.html',
  styleUrls: ['./imprimer-ticket.component.scss']
})
export class ImprimerTicketComponent implements OnInit {


  ticketData;

  constructor(public dialogRef: MatDialogRef<ImprimerTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog ) {
      
      this.ticketData = data;
      console.log(this.ticketData);

    }

  ngOnInit(): void {
  }

public convertToPDF() {

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {

      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')

      let pdf = new jspdf.jsPDF('p','mm','a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('new-file.pdf');

    })
}

}
