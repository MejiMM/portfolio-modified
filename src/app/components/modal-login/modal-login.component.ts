import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  preserveWhitespaces: false,
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  
  formVisibility :boolean = true;
  form :FormGroup;
  isLogged? :boolean;

  constructor(private formBuilder :FormBuilder, private loginService :LoginService) { 
    //Login form constructor
    this.form = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required, Validators.minLength(9)]
      }
    )

    this.loginService.getSession().subscribe( e => {
      if(e.tokenDeAcceso) {
        this.isLogged = true;
      }
      else{this.isLogged = false};
    })
  }

  ngOnInit(): void {
  }

  //Manages whether the login form is shown or not
  toggleFormLogin() {
    this.formVisibility = !this.formVisibility;
  }

  //Close button function
  close() {
    this.formVisibility = false;
  }

  loginUser() {
    //The necessary data for the login is saved
    const credenciales = {
      username : this.form.get("username")?.value,
      password : this.form.get("password")?.value
    }
    
    this.isLogged = false;
    //The service is called for login
    this.loginService.login(credenciales).subscribe();
    
    //Close the form once the login is done
    this.formVisibility = false;
  }
  
  logout() {

    const decision = confirm("Esta seguro de cerrar sesion?");

    if(decision) {
      sessionStorage.removeItem("user");
      window.location.reload();
    }
  }
}
