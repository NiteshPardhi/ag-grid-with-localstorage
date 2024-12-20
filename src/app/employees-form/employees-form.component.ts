import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeData: any = [];
  employees: any = [];
  employeeId: any;
  selectEmployee: any = [];
  localStoreData: any = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.employeeId = params.get('id');

      this.localStoreData = JSON.parse(localStorage.getItem('rowData') || '{}');

      this.selectEmployee = this.localStoreData.filter((data: any) => {
        return this.employeeId == data.id;
      })
    })

    this.employeeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      salary: new FormControl(''),
      designation: new FormControl(''),
      country: new FormControl(''),
    })
    
    this.employeeForm.patchValue(this.selectEmployee[0]);
  }

  onSubmit(){
    this.employees = this.employeeForm.value;

    this.employeeData = JSON.parse(localStorage.getItem('rowData') || '{}');

    if(this.employeeId != null && this.employeeId != undefined && this.employeeId != ''){
      let id = this.employeeData.findIndex((item: any) => {
        return item.id == this.employeeId;
      })
      this.employeeData[id] = {...this.employees};
      alert('Data Update Successfully...');
    }else{
      this.employeeData.push(this.employees);
      alert('Data Added Successfully...');
    }

    localStorage.setItem('employeeData', JSON.stringify(this.employeeData));
    this.router.navigate(['/employees']);
  }

}
