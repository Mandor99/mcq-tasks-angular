import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

export interface IQs {
  question: string,
  answer1: string,
  answer2: string,
  answer3: string,
  answer4: string,
  correctAnswer: string
}

export interface IExam {
  subjectName: string,
  questions: IQs[],
  id?: number
}

export interface ISubject {
  subjectName: string,
  questions: [{question: string, answer1: string, answer2: string, answer3: string, answer4: string, correctAnswer: string, studentAnswer?: string}],
  id?: any,
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  addQuestion(model:IExam): Observable<IExam> {
    return this.http.post<IExam>(`${environment.apiURL}/subjects`, model)
  }

  updatedQuestion(id:any, model: IExam): Observable<IExam> {
    return this.http.put<IExam>(`${environment.apiURL}/subjects/${id}`, model)
  }

  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(`${environment.apiURL}/subjects`)
  }

  getSubject(id:any): Observable<ISubject> {
    return this.http.get<ISubject>(`${environment.apiURL}/subjects/${id}`)
  }

  deleteSubject(id:any): Observable<IExam> {
    return this.http.delete<IExam>(`${environment.apiURL}/subjects/${id}`)
  }
}
