import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/LoginService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@Output() isLogout = new EventEmitter<void>()
  showFiller = true;
  nabvarMode = "side";

  constructor(public loginService: LoginService, private router: Router) {
    this.onResize();
  }

  ngOnInit() {
    
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      if(window.innerWidth < 800) {
        this.nabvarMode = "over";
      } else {
        this.nabvarMode = "side";
      }

    }
    
    logout(){
      console.log("Loggin out");
      this.loginService.removeUserStorage();
      
      this.loginService.logout().then(data => {
        
        setTimeout(()=>{
          this.router.navigate(["login"]);
        },100);
    
      }, err => {
        console.log("We cant logout", err);
      });
    }


    ngOnDestroy() {
      this.logout();
    }

}
