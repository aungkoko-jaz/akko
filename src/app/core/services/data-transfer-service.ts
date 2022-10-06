import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Admin } from "../models/admin";

@Injectable({
     providedIn: 'root'
})

export class DataTransferService {      // it is uset to transfer data between defference components

     private isSaved = new BehaviorSubject(false);
     currentValue = this.isSaved.asObservable();

     private editData = new BehaviorSubject({});
     currentEditData = this.editData.asObservable();

     private extraData = new BehaviorSubject({});
     public currentExtraData: any = this.extraData.asObservable();

     constructor() {}

     isSavedAdmin(isSaved: boolean) {
          this.isSaved.next(isSaved);
     }

     TransgerEditData(editData: any) {
          this.editData.next(editData);
     }

     TransferExtraData (extraData: any) {
          this.extraData.next(extraData)
     }

}