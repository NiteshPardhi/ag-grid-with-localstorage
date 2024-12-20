import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { BtnCellRendererDelete } from '../btn-cell-renderer-delete';
import { BtnCellRendererEdit } from '../btn-cell-renderer-edit';

// import employeeData from '../employees.json';

// interface Employee {  
//   id: Number;  
//   name: String;  
//   salary: Number;  
//   designation: String;  
// }  

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  emplData = require('../employees.json');
  // employees: Employee[] = employeeData; 

  emplArray: any = [];
  rowData: any[] = [];
  filterData: any = [];
  columnDefs: any[] = [];
  deleteItem: any = [];
  searchString: string = '';
  newArray: any = []

  constructor(public router: Router) { }

  ngOnInit(): void {
    // console.log('emplData', this.emplData);

    this.emplArray = JSON.parse(localStorage.getItem('employeeData') || '{}');

    this.rowData = [...this.emplArray];
    this.newArray = this.rowData
    console.log('Total Employees', this.rowData)

    localStorage.setItem('rowData', JSON.stringify(this.rowData));

    this.columnDefs = [
      { field: 'id', sortable: true, filter: true},
      { field: 'name', sortable: true, filter: true},
      { field: 'salary', sortable: true, filter: true},
      { field: 'designation', filter: true },
      { field: 'email', filter: true },
      { field: 'country', filter: true },
      {
        field: 'edit', cellRenderer: BtnCellRendererEdit, cellRendererParams: {
          clicked: (field: any) => {
          }
        }
      },
      {
        field: 'delete', cellRenderer: BtnCellRendererDelete, cellRendererParams: {
          clicked: (id: any) => {
            let index = this.rowData.findIndex((item: any) => {
              return item.id == id;
            })
            this.rowData.splice(index, 1);
            console.log('deleteItem', this.rowData)
            
            localStorage.setItem('employeeData', JSON.stringify(this.rowData));
          }
        } 
      }
    ];
    
  }

  search(event: any) {
    this.searchString = event.target.value;
    console.log('searchString', this.searchString)

    this.filterData = this.newArray.filter((data: any) => {
      return data.name.toLowerCase().includes(this.searchString.toLowerCase());
    })
    this.rowData = [...this.filterData]
  }

}
