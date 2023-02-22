import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './components/exam/exam.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ViewExamComponent } from './components/view-exam/view-exam.component';

const routes: Routes = [
  {path:'subjects', component: SubjectsComponent, pathMatch:'full' },
  {path:'signup', component: SignUpComponent, pathMatch:'full' },
  {path:'login', component: LogInComponent, pathMatch:'full' },
  {path:'new_exam', component: ExamComponent, pathMatch:'full' },
  {path:'subjects/exam/:id', component: ViewExamComponent, pathMatch:'full' },
  {path:'students', component: StudentsComponent, pathMatch:'full' },
  {path:'**', redirectTo: 'subjects'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
