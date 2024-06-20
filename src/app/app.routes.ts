// import { Routes } from '@angular/router';
// // import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
// import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';

// export const routes: Routes = [
//     { path: '', component: DashboardComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'employee', component: ListEmployeeComponent},
//     { path: 'employee/add', component: AddEmployeeComponent}
// ];


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: ListEmployeeComponent },
  { path: 'employee/add', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
