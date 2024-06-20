import { Component } from '@angular/core';
import { EmployeeInterface, EMPLOYEE_DATA } from '../../../assets/constants/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

  addEmployee(): void {
    const newEmployee: EmployeeInterface = {
      id: EMPLOYEE_DATA.length + 1,
      username: 'new.user',
      firstName: 'New',
      lastName: 'User',
      email: 'new.user@example.com',
      birthDate: new Date('1995-08-15'),
      basicSalary: 75000.50,
      status: 'Active',
      group: 'developer',
      description: new Date('2024-01-01')
    };


    EMPLOYEE_DATA.push(newEmployee);
  }

  ngOnInit(){
    this.addEmployee()
  }

}
