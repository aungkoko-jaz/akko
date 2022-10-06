import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminlevelService } from '../../core/services/adminlevel.service';
import { TreeserviceService } from '../../core/services/treeservice.service';
import { isNil, remove, reverse } from 'lodash';
import { ModaldialogService } from '../../core/services/modaldialog.service';
import { TreeviewItem, TreeviewConfig, DownlineTreeviewItem, TreeviewEventParser, OrderDownlineTreeviewEventParser  } from 'ngx-treeview';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-adminlevel',
  templateUrl: './adminlevel.component.html',
  styleUrls: ['./adminlevel.component.scss'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
  ]
})
export class AdminlevelComponent implements OnInit {
  idList: number[];
  adminLevelSets;
  itemTemplate;
  items: TreeviewItem[];
  values: number;
  config = TreeviewConfig.create({  //Todo: Treeview not allow to check only parent node without checking any child.  So we still need to add List menu for readonly permission. 
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 1900,
  });
  queryString;
  editForm: FormGroup = new FormGroup({
    'AdminLevelID': new FormControl(0),
    'AdminLevelName': new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    'RestrictIPList': new FormControl(),
    'Description': new FormControl(),
    'Remark': new FormControl(),
  });
  adminLevelForm: FormGroup = new FormGroup({
    //'queryString' : new FormControl()
  })
  constructor(private adminLevelService: AdminlevelService,
    private treeviewService: TreeserviceService,
    private modaldialogService: ModaldialogService) { 
    }

  ngOnInit() {
    this.editForm.reset();
    this.adminLevelService.getAdminLevel(0)
      .subscribe(x => {
        this.adminLevelSets = x.data;
        this.adminLevelService.getAdminLevelMenu(0)
          .subscribe(x => {
            this.items = [new TreeviewItem(this.treeviewService.createSingleDataTreeView(x.data, 0, []))];
          });
      });
  }

  selectedAdminLevel(ID) {
    this.adminLevelService.getAdminLevel(ID)
      .subscribe(x => {
        this.editForm.controls['AdminLevelName'].enable();
        this.editForm.reset(x.data);
        this.adminLevelService.getAdminLevelMenu(ID)
          .subscribe(x => {
            this.items = [new TreeviewItem(this.treeviewService.createSingleDataTreeView(x.data, 0, []))];
          });
      });
  }

  // new admin level 
  newAdminLevel() {
    this.editForm.reset();
    this.adminLevelService.getAdminLevelMenu(0)
      .subscribe(x => {
        this.items = [new TreeviewItem(this.treeviewService.createSingleDataTreeView(x.data, 0, []))];
      });
  }

  saveAdminLevel() {
    this.adminLevelService.saveAdminLevel(this.editForm.value)
      .subscribe(x => {
        if (x.data > 0) {
          this.adminLevelService.saveAdminLevelMenu(x.data, this.idList.toString())
            .subscribe(x => {
              this.modaldialogService.confirm('Admin Level', 'Save Successfully', 'Ok', '');
              this.ngOnInit();
            });
        } else {
          this.modaldialogService.confirm('Admin Level', `${x.data}`, 'Ok', '');
        }
      });
    }

  // select tree view items
  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.idList = [0];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        const id = parent.item.value;
        if (this.idList.findIndex(x => x == id) === -1) {
          this.idList.push(id);
        }
        parent = parent.parent;
      }
      if (this.idList.findIndex(x => x == value) === -1) {
        this.idList.push(value);
      }
    });
  }

  public deleteConfirm() {
    const adminLevelName = this.editForm.value.AdminLevelName;
    this.modaldialogService.confirm('Please confirm...', 'Are you sure you want to delete AdminLevel ' + adminLevelName + ' ?', 'Yes', 'No')
    .then((confirmed) => this.deleteAdminLevel(confirmed))
    .catch(() => {});
  }

  deleteAdminLevel(Confirmed) {
    if(Confirmed){
      this.adminLevelService.deleteAdminLevel(this.editForm.value.AdminLevelID)
      .subscribe(x => { 
        if (x.data) {
          this.modaldialogService.confirm('AdminLevel', 'Delete Successfully', 'Ok', '');
        this.ngOnInit();
      } else {
        this.modaldialogService.confirm('Admin', 'Selected Adminlevel can\'t delete because it is already used in Other', 'Ok', '');
      }
      });
    }
  }

}
