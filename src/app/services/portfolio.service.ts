import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Educacion } from './educacion.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl :String = "https://josem-portfolio.herokuapp.com";

  constructor(private http: HttpClient) {  }

  /**
   * 
   * @returns List of users from BBDD My SQL
   */
  getUser() :Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`);
  }

  /**
   * 
   * @param user Model schema of user
   * @returns User that was entered
   */
  addUser(user :User) :Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuario-nuevo`, user);
  }

  /**
   * 
   * @param id Index number of the user to delete
   * @returns Observable
   */
  deleteUser(id :number) :Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/borrar-usuario/${id}`);
  }

  /**
   * 
   * @param id User index number to edit
   * @param user Schema of the user that is used to update
   * @returns 
   */
  editUser(id :number, user :User) :Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/editar/${id}`, user);
  }

  /**
   * 
   * @returns List with the elements of education
   */
  getEducacion() :Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiUrl}/educacion`);
  }

  /**
   * 
   * @param ed Scheme with the education data to add
   * @returns 
   */
  addEd(ed :Educacion) :Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiUrl}/agregar-educacion`, ed);
  }

  /**
   * 
   * @param id Index number of the education element to delete
   * @returns
   */
  deleteEd(id :number) :Observable<Educacion> {
    return this.http.delete<Educacion>(`${this.apiUrl}/borrar-educacion/${id}`);
  }
  
}
