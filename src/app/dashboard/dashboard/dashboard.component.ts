import { Component, OnInit } from '@angular/core';
import { ChartColor, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { ChartType } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BusService } from 'src/app/service/BusService';
import { ChauffeurService } from 'src/app/service/ChauffeurService';
import { LigneService } from 'src/app/service/LigneService';
import { VoyageService } from 'src/app/service/VoyageService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  usersList: AngularFireList<any>;

  // Nombre de véhicules
  vehiculesNumber: number = 0;
   // Nombre de chauffeurs
  chauffeursNumber: number = 0;
   // Nombre de lignes
   lignesNumber: number = 0;
    // Nombre de voyages
    voyagesNumber: number = 0;

  /* Charts */

  // Chart colors 
  // chartColors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','#444141a2', '#4caf4fe0', '#f44336c7'];
  chartColors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','#444141a2', '#4caf4fe0', '#f44336c7'];

  //line chart
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'nombre voyages par mois' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  //doughnut chart
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [];

  
  // bar chart
  barChartOptions: ChartOptions = {
    responsive: true,

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [];


  barChartData: ChartDataSets[] = [
    { data: [], label: 'Nombre des Voyages' }
  ];

   //bubble
    bubbleChartOptions: ChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: 50,
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 50,
          }
        }]
      }
    };
    bubbleChartType: ChartType = 'bubble';
    bubbleChartLegend = true;

    bubbleChartData: ChartDataSets[] = [
      {
        data: [
          { x: 15, y: 15, r: 15 },
          { x: 25, y: 15, r: 25 },
          { x: 36, y: 12, r: 33 },
          { x: 10, y: 18, r: 18 },
        ],
        label: 'Investment Equities',
      },
    ];


  constructor(private firebase: AngularFireDatabase, private busService: BusService,private chauffeurService: ChauffeurService,
    private ligneService: LigneService , private voyageService: VoyageService) {
    this.getVehiculeCount();
    this.getChauffeurCount();
    this.getLigneCount();
    this.getVoyageCount();
  }


  ngOnInit() {
    // Get voyage list
    this.initGetVoyage();
  }

  
  // Count vehicle number from database
  getVehiculeCount() {
    this.busService.getBus().subscribe((data: any) => {
      this.vehiculesNumber = data.length;
      // console.log(this.vehiculesNumber);
    }, err => {
      console.log(err);
    })
  }





 getChauffeurCount() {
   this.chauffeurService.getChauffeur().subscribe((data: any) => {
     this.chauffeursNumber = data.length;
   
   }, err => {
     console.log(err);
   })
 }

 getLigneCount() {
  this.ligneService.getLigne().subscribe((data: any) => {
    this.lignesNumber = data.length;
  
  }, err => {
    console.log(err);
  })
}
getVoyageCount() {
  this.voyageService.getVoyage().subscribe((data: any) => {
    this.voyagesNumber = data.length;
  
  }, err => {
    console.log(err);
  })
}


// Get voayges 
initGetVoyage() {

  this.voyageService.getVoyage().subscribe((item: any) => {
 
    let array = item.map(item => {
      return {
        key: item.key,
        ...item.payload.val()
      };
    });

    // Bar chart
    this.getVoyageStatsData(array);

    // Donuts chart
    this.getMostVisitedLines(array);
  
  }, err => {
    console.log("Erro getting voyages list");
  });

}

  // Bar chart stats
  // Init set voayge stats data for bar chart 

  getVoyageStatsData(data) {

    let array = data;
      // Unique stations
      var uniqueStations = [...new Set(array.map(item => item.stationarrivee))];
      // console.log(uniqueStations);

      // Count the occurence of stations
      var countStations = []; 

      uniqueStations.forEach(element => {
        let c = array.filter((obj) => obj.stationarrivee === element).length;
        countStations.push(c);
      }) 

      // console.log("Stations occurences");
      // console.log(countStations);

      
      // let ba = ['Gafsa', 'Sfax', 'Nabeul', 'Tunis', 'Bizert', 'Sidi Bouzid'];
      // let da = [5, 9, 1, 7, 6, 3];

      // Get random color for each element
      var stationsColors = []; 
      var hoverStationsColors = []; 

      uniqueStations.forEach(element => {
        // Get random color min 0 and max is the number of stations
        let r = this.getRandomNumber(0, this.chartColors.length);
        let color = this.chartColors[r];
        stationsColors.push(color);

        let color2 = this.chartColors[r];
        hoverStationsColors.push(color2);

      }) 

      // console.log("Stations colors");
      // console.log(stationsColors);
  

      // Set chart data
      this.setVoyageStatsChart(uniqueStations, countStations, stationsColors);
    
  }

  setVoyageStatsChart(labels, data, colorsArray?, hoverColorAray?) {
    

    this.barChartLabels = labels;
    this.barChartData[0].data = data;

    /*
      backgroundColors: array of colors for the bar charts
      hoverBackgroundColor: arrya of colors when hover on the bar charts
     */
    var barChartColors: Color[] = [
      {
        backgroundColor: colorsArray,
        hoverBackgroundColor: hoverColorAray
      }
    ];

    this.barChartColors = barChartColors;

  }

  // get most used travel line for the donut chart 
  // Donut charts 
  getMostVisitedLines(data) {

    var array = data;
    console.log(array);

      // Unique stations
      var allLines = [...new Set(array.map(item => item.ligne))];
      // ONly first 3 lines
      var uniqueLines = allLines.slice(0, 3);

      console.log("Unique ligne");
      console.log(uniqueLines);

      // Count the occurence of lines
       
      var countLines = []; 

      uniqueLines.forEach(element => {
        let c = array.filter((obj) => obj.ligne === element).length;
        countLines.push(c);
      }) 

      console.log("Ligne occurences");
      console.log(countLines);
 
      // Get random color for each element
      var linesColors = []; 
      var hoverLinesColors = []; 

      uniqueLines.forEach(element => {
        // Get random color min 0 and max is the number of stations
        let r = this.getRandomNumber(0, this.chartColors.length);
        let color = this.chartColors[r];
        linesColors.push(color);

        let color2 = this.chartColors[r];
        hoverLinesColors.push(color2);

      }) 
 
      // Set chart data
       this.setMostVisitedLines(uniqueLines, countLines, linesColors);
     
  }

  setMostVisitedLines(labels, data, colorsArray?, hoverColorAray?) {
    

    this.doughnutChartLabels = labels;
    this.doughnutChartData = data;

    /*
      backgroundColors: array of colors for the bar charts
      hoverBackgroundColor: arrya of colors when hover on the bar charts
     */
    var doughnutChartColors: Color[] = [
      {
        backgroundColor: colorsArray,
        hoverBackgroundColor: hoverColorAray
      }
    ];

    this.doughnutChartColors = doughnutChartColors;

  }



  // Get rundom number between 2 values
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min; 
  }



 /* this.usersList = this.firebase.list('test/268468451');
 
   this.usersList.push({
     name: "ryhem"
   })
   this.usersList.update('268468451', {
     name: "ryhem",
     role: "admin"
   })
 
  busList: AngularFireList<any>;




 constructor(private firebase: AngularFireDatabase) {
   
  this.busList = this.firebase.list('test/268468451');

  this.busList.push({
    name: "ryhem"
  })
  this.busList.update('268468451', {
    name: "ryhem",
    role: "admin"
  })

 } */

}
