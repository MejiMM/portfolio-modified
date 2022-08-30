import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url :String = "https://josem-portfolio.herokuapp.com";
  currentUserSubject :BehaviorSubject<any>;
  currentLoaderSubject :BehaviorSubject<boolean>;

  constructor(private http :HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("user") || "{}"));
    this.currentLoaderSubject = new BehaviorSubject<boolean>(false);
  }

  /**
   * 
   * @param credenciales Data with username and password
   * @returns 
   */
  login(credenciales :any) :Observable<any> {
    return this.http.post(`${this.url}${"/login"}`, credenciales).pipe(map( data => {
      sessionStorage.setItem("user", JSON.stringify(data));
      this.currentUserSubject.next(data);      
      
      return data;
    }));
  }

  /**
   * 
   * @returns An observable with the session data to be used later
   */
  getSession() :Observable<any> {
    return this.currentUserSubject;
  }

  /**
   * 
   * @returns Access token
   */
  getUserAuth() {
    return this.currentUserSubject.value.tokenDeAcceso;
  }

}
