import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'side-nav';
  
  isSignedIn = false;
  showFiller = true;
  nabvarMode = "side";

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.showFiller = false;
      if(window.innerWidth < 800) {
        this.nabvarMode = "over";
      } else {
        this.nabvarMode = "side";
      }

    }

}
