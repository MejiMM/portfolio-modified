import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private isLogged: boolean = false;
  user!: User;
  loading?: boolean = true;

  constructor(private portfolioServ: PortfolioService, private login: LoginService) {

    this.login.currentLoaderSubject.asObservable().subscribe(e => this.loading = e);

    this.login.getSession().subscribe(e => {
      if (e.tokenDeAcceso) {
        this.isLogged = true
      };
    })
  }

  ngOnInit(): void {
    //Bring the user data to later show in the template
    this.portfolioServ.getUser().subscribe(e => {

      this.user = {
        nombre: e[0].nombre,
        apellido: e[0].apellido,
        descripcion: e[0].descripcion
      }
    });
  }

  getIsLogged() {
    return this.isLogged;
  }

}
