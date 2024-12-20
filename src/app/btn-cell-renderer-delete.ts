import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn btn-danger" (click)="btnClickedHandl($event)"><i class="bi bi-trash"></i></button>
  `,
})
export class BtnCellRendererDelete implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandl(event: any) {
    this.params.clicked(this.params.data.id);
  }

  refresh() {
    return false;
  }
}
