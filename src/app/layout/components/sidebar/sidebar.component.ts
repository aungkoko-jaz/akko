import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../core/services/localstorage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    showFirst = false;
    menu = [];
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        private localstorageService: LocalStorageService,
        public router: Router
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        const menulist = JSON.parse(this.localstorageService.getItem('menuList'));
        if (menulist) {
            this.menu = this.createMenuTree(menulist, 0);
        }
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any, menu_ui_sref: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            if (menu_ui_sref != '#') {
                this.router.navigate([menu_ui_sref]);
            } else {
                this.showMenu = element;
                this.showFirst = true;
            }
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        this.localstorageService.clearAll();
    }

    // set menu
    createMenuTree(db_data, ParentID) {
        let nodes, node_item, menu_id;
        // let sub_nodes = ''  ,
        let menu_ui_sref_text, label_text, parent_id, tree_icon_text, permission;
        const i = 0;
        const nodeObj = [];
        nodes = this.filterJson(db_data, 'ParentID', ParentID);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes.length > 0) {
                node_item = nodes[i];
                menu_id = node_item['MenuID'];
                menu_ui_sref_text = node_item['ControllerName'];
                label_text = node_item['MenuName'];
                parent_id = node_item['ParentID'];
                tree_icon_text = node_item['Icon'];
                permission = node_item['Permission'];

                nodeObj.push({
                    label: label_text,
                    menu_ui_sref: menu_ui_sref_text,
                    tree_icon: tree_icon_text,
                    menu_permission: permission,
                    menu_parent: parent_id
                });
                nodeObj[i].children = this.createMenuTree(db_data, menu_id);
            }
        }
        return nodeObj;
    }

    // json filter
    filterJson(jsonobj: any, field: string, value: number) {
        return jsonobj.filter((s) => s[field] == value);
    }
}
