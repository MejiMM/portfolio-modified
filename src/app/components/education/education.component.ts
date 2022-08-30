import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  preserveWhitespaces: false,
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  
  educacions :any = [];
  isLogged :boolean = false;
  formEd :boolean = false;
  loading :boolean = false;
  
  constructor(private portfolioServ :PortfolioService, private login :LoginService) {

    //Bring the elements of education to be displayed
    this.portfolioServ.getEducacion().subscribe( e => {

      this.educacions = e; 
    });

    //Detect changes in the token to render the portfolio edition
    this.login.getSession().subscribe(e => {
      if(e.tokenDeAcceso) {
        this.login.currentLoaderSubject.asObservable().subscribe(e => this.loading = e);
        this.isLogged = true;
      }
    });
  }
  
  ngOnInit(): void { }

  deleteEducacion(id :number) :void {
    this.portfolioServ.deleteEd(id).subscribe( e => this.educacions = e);
  }

}
