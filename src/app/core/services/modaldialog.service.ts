import { Injectable } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../../dialog/dialog.component';

@Injectable()
export class ModaldialogService {

  constructor(config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = false;
    config.keyboard = false;
  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    ): Promise<boolean> {
    const modalRef = this.modalService.open(DialogComponent, {  });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public messageDialogOkBox(message: string, title: string) {
    const modalRef = this.modalService.open(DialogComponent, {  });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = "OK";
    modalRef.componentInstance.btnCancelText = "";
    return modalRef.result;
  }

}