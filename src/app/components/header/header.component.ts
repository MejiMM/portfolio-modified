import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  preserveWhitespaces: false,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor( public login :LoginService) {
  }
  
  ngOnInit(): void { 
  }

  
}
