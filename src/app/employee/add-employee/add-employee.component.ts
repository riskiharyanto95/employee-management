import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeInterface, EMPLOYEE_DATA } from '../../../assets/constants/employee';
import { GroupInterface, GROUP_DATA } from '../../../assets/constants/groups';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { validateEmail } from '../../../helpers/email';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  statusOptions : any = [
    {value: 'Inactive', label: 'Inactive'},
    {value: 'Active', label: 'Active'}
  ];
  groupOptions: GroupInterface[] = GROUP_DATA;
  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  group: string = "";
  basicSalary: number = 0;
  birthDate: string = ""
  description: string = ""
  status: string = "";

  gotoListEmployee() {
    this.router.navigate(['/employee']);
  }

  onGroupChange(group: any){
    this.group = group;
  }

  onStatusChange(status: any){
    this.status = status;
  }

  onBirthDateChange(date: Date){
    this.birthDate = this.convertDate(date);
  }

  onDescriptionChange(date: Date){
    this.description = this.convertDate(date);
  }

  convertDate(date: Date){
    const selectedDate = new Date(date)
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);
    const convertedDate = `${year}-${month}-${day}`;

    return convertedDate
  }

  resetData(){
    this.username = "";
    this.email= "";
    this.firstName= "";
    this.lastName= "";
    this.group= "";
    this.basicSalary = 0;
    this.birthDate= ""
    this.description= ""
    this.status= "";
  }

  validateData(){
    if(!this.username || !this.email || !this.firstName || !this.lastName || !this.group || !this.birthDate || !this.description || !this.status){
      this.showDialog('Ada data yang belum diisi, pastikan semua data telah diisi')
    } else if (!validateEmail(this.email )) {
      this.showDialog('Format penulisan email salah')
    } else if( this.basicSalary <= 0) {
      this.showDialog('Basic Salary harus lebih dari Rp 0')
    } else {
      this.addEmployee();
    }
  }

  showDialog(msg: string = ""){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: { title: 'Data tidak sesuai', content: msg}
    });
  }

  addEmployee(): void {
    const newEmployee: EmployeeInterface = {
      id: EMPLOYEE_DATA.length + 1,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: new Date(this.birthDate),
      basicSalary: this.basicSalary,
      status: this.status,
      group: this.group,
      description: new Date(this.description)
    };

    EMPLOYEE_DATA.push(newEmployee);
    this.gotoListEmployee();
  }
}
