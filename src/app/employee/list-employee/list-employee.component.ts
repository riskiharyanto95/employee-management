import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { GroupInterface, GROUP_DATA } from '../../../assets/constants/groups';
import { EmployeeInterface, EMPLOYEE_DATA } from '../../../assets/constants/employee';
import { formatAmountToIDR } from '../../../helpers/amount';
import { formatDateDDMMYYYY } from '../../../helpers/datetime';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})

export class ListEmployeeComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {}

  originalEmployeeList: EmployeeInterface[] = EMPLOYEE_DATA;
  resultList: EmployeeInterface[] = [];
  groupOptions: GroupInterface[] = GROUP_DATA;
  sortByOptions : any = [
    {value: 'username', label: 'Username'},
    {value: 'birthDate', label: 'Birth Date'}
  ];
  sortOptions : any = [
    {value: 'asc', label: 'Ascending (A-Z)'},
    {value: 'desc', label: 'Descending (Z-A)'}
  ];
  statusOptions : any = [
    {value: 'Inactive', label: 'Inactive'},
    {value: 'Active', label: 'Active'}
  ];

  displayedColumns: string[] = ['no', 'username', 'email', 'group', 'basic_salary','birth_date', 'status', 'action'];
  displayedList: any = [];
  pagination: any = {
    length: 0,
    currentPage: 1,
    countPerPage: 10,
    countPerPageOptions: [5, 10, 25, 100]
  };
  isListMode: boolean = true;
  isLoading: boolean = false;
  isShowReset: boolean = false;
  username: string = "";
  group: string = "";
  birthDate: string = ""
  sortBy: string = "";
  sort: string = "";
  filters: any = {
    username: null,
    group: null,
    birth_date: null,
    sorty_by: null,
    sort: null,
  }
  details: any = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    group: "",
    basicSalary: 0,
    birthDate: "",
    description: "",
    status:"",
  }
  
  gotoAddEmployee() {
    this.router.navigate(['/employee/add']);
  }

  gotoListEmployee() {
    this.isListMode = true;
  }

  gotoEditEmployee(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: { title: 'Edit Data', content: 'Apakah anda yakin akan mengubah data?' }
    });
  }

  gotoDeleteEmployee(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: { title: 'Delete Data', content: 'Apakah anda yakin akan menghapus data?' }
    });
  }

  gotoDetailEmployee(employee: any) {
    this.details = {
      username: employee.username,
      email:employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      group: employee.groups,
      basicSalary: employee.basic_salary,
      birthDate: this.convertDate(employee.birthDate),
      description: this.convertDate(employee.description),
      status: employee.status,
    }

    this.isListMode = false;
  }

  getGroupLabel(groupValue: string): string {
    const group = GROUP_DATA.find(item => item.value === groupValue);
    return group ? group.label : '';
  }

  onGroupChange(group: any){
    this.group = group;
  }

  convertDate(date: Date){
    const selectedDate = new Date(date)
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);
    const convertedDate = `${year}-${month}-${day}`;

    return convertedDate
  }

  onBirthDateChange(date: Date){
    this.birthDate = this.convertDate(date)
  }

  onSortByChange(sortBy: any){
    this.sortBy = sortBy;
  }

  onSortChange(sort: any){
    this.sort = sort;
  }

  applyFilterAndSorting(){
    let paramQuery: any = {};
    if(this.username !=='') paramQuery.username = this.username;
    if(this.group !== '') paramQuery.group = this.group;
    if(this.birthDate !== '') paramQuery.birthdate = this.birthDate;
    if(this.sortBy !== '') paramQuery.sortby = this.sortBy;
    if(this.sort !== '') paramQuery.sort = this.sort;
    this.router.navigate(['/employee'], { 
      queryParams: paramQuery
    });
    this.fetchEmployeeList()
  }

  resetFilterAndSorting(){
    this.filters = {
      username: null,
      group:  null,
      birth_date:  null,
      sorty_by:  null,
      sort: null,
    }
    this.username = '';
    this.birthDate = '';
    this.group = '';
    this.sortBy =  '';
    this.sort = '';
    this.router.navigate(['/employee'],{
      queryParams:{}
    });
    this.fetchEmployeeList()
  }

  handleChangePage(e: PageEvent){
    this.pagination = {
      length: e.length,
      currentPage: e.pageIndex+1,
      countPerPage: e.pageSize,
      countPerPageOptions: [5, 10, 25, 100]
    };
    this.fetchEmployeeList()
  }

  handleFiltersAndSorting(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.filters = {
        username: params['username'] ?? null,
        group: params['group'] ?? null,
        birth_date: params['birthdate'] ?? null,
        sorty_by: params['sortby'] ?? null,
        sort: params['sort'] ?? null,
      }
      this.username = this.filters.username ?? '';
      this.birthDate = this.filters.birth_date ?? '';
      this.group = this.filters.group ?? '';
      this.sortBy = this.filters.sorty_by ?? '';
      this.sort = this.filters.sort ?? '';
      this.isShowReset = this.username || this.group || this.birthDate || this.sortBy || this.sort ? true : false;
      this.fetchEmployeeList()
    });
  }

  processFiltering(resultListEmployee: EmployeeInterface[] =[]){
    const indexGroup = this.group ? -1 : -2;
    const indexUserName = this.username ? -1 : -2;
    const indexBirthDate = this.birthDate ? -1 : -2;
    const resultFilter = resultListEmployee.filter(
      employee => (
        employee.group.indexOf(this.filters.group) > indexGroup && 
        employee.username.indexOf(this.filters.username) >  indexUserName && 
        employee.birthDate.toISOString().indexOf(this.filters.birth_date) >  indexBirthDate 
      )
    );

    return resultFilter;
  }

  processSorting(resultListEmployee: EmployeeInterface[] =[]){
    let sortBy = this.filters.sorty_by ?? 'id';
    let sort = this.filters.sort ?? 'desc';
    let resultSort = resultListEmployee;

    if (sortBy == 'username'){
      resultSort = resultSort.sort((a, b) => {
        if (a.username < b.username) {
          return sort == 'asc' ? -1 : 1;
        }
        if (a.username > b.username) {
          return sort == 'asc' ? 1 : -1;
        }

        return 0;
      });
    } else if (sortBy == 'birthDate'){
      resultSort = resultSort.sort((a, b) => {
        if (sort == 'asc'){
          return a.birthDate.getTime() - b.birthDate.getTime();
        } else {
          return b.birthDate.getTime() - a.birthDate.getTime();
        }
      });
    } else {
      resultSort = resultSort.sort((a, b) => {
        if (a.id < b.id) {
          return sort == 'asc' ? -1 : 1;
        }
        if (a.id > b.id) {
          return sort == 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    return resultSort
  }

  processPaging(resultListEmployee: EmployeeInterface[] =[]){
    const startOfIndex = (this.pagination.currentPage - 1) * this.pagination.countPerPage;
    const endOfIndex = this.pagination.currentPage * this.pagination.countPerPage;
    const resultPaging = resultListEmployee.slice(startOfIndex, endOfIndex);

    return resultPaging;
  }


  fetchEmployeeList(){
    this.isLoading = true;

    let resultListEmployee = this.processFiltering(this.originalEmployeeList);
    this.pagination.length = resultListEmployee.length;
    resultListEmployee = this.processSorting(resultListEmployee);
    resultListEmployee = this.processPaging(resultListEmployee);
    this.resultList = resultListEmployee;
    this.mappingEmployeeList();
    this.isLoading = false;
  }

  mappingEmployeeList(){
    let dumpDisplayedList: any = []
    const indexRunning = (this.pagination.currentPage - 1) * this.pagination.countPerPage;

    this.resultList.forEach((employee, index) => {
      const groupLabel = this.getGroupLabel(employee.group);
      dumpDisplayedList.push({
        no:indexRunning+(index+1),
        id: employee.id,
        username: employee.username,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        group: groupLabel,
        groups: employee.group,
        basic_salary: formatAmountToIDR(employee.basicSalary),
        basicSalary: employee.basicSalary,
        birth_date: formatDateDDMMYYYY(employee.birthDate),
        birthDate: employee.birthDate,
        description: employee.description,
        status: employee.status,
        action: '',
      })
    });
    this.displayedList = dumpDisplayedList;
  }

  ngOnInit(){
    this.handleFiltersAndSorting();
  }

}
