// import { IUser } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface IUser {
  name:string,
  email: string,
  password: string,
  id?:number,
  subjects?: any[] | [{subjectName: string, degree: string, subjectId: number}]
}
export interface ICrtUser {
  name:string,
  email: string,
  password: string,
  role: string,
  id?: number,
  userId?: number,
  subjects?: any[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  crtUser = new Subject<ICrtUser>()

  constructor(private http: HttpClient) { }

  getUsers(role:string):Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiURL}/${role}`)
  }
  getUser(id:number):Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiURL}/students/${id}`)
  }
  updateUser(id:any, model: IUser):Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiURL}/students/${id}`, model)
  }
  createUser(model: IUser):Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiURL}/students`, model)
  }
  logInUser(model: ICrtUser): Observable<ICrtUser> {
    return this.http.put<ICrtUser>(`${environment.apiURL}/login/1`,model)
  }
  getRole(): Observable<ICrtUser> {
    return this.http.get<ICrtUser>(`${environment.apiURL}/login/1`)
  }
}
