import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn btn-primary" (click)="btnClickedHandlerEdit($event)"><i class="bi bi-pen"></i></button>
  `,
})
export class BtnCellRendererEdit implements ICellRendererAngularComp {

  private params: any;

  constructor(private router: Router){}

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandlerEdit(event: any) {
    this.params.clicked(this.params.value);
    this.router.navigate(['/employees-form', this.params.data.id]);
  }

  refresh() {
    return false;
  }
}
