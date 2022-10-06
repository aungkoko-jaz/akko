import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeserviceService {

  constructor() { }

  makeNode(text, value, checked) {
    return {text: text, value: value, checked: checked, children: []};
  }	
  
  filterJson(jsonobj: any, field: string, value: number  ) {
    return jsonobj.filter(s => s[field] == value);
  }
  
  createSingleDataTreeView( data, ParentID, resultdata, level = 0, index = [], RootNodeName = 'Application Menu'): any {
    let node;
    let ID;
    let Name;
    if (resultdata.length == 0) {
      ID = 0;
      Name = RootNodeName;
      resultdata = this.makeNode(Name, ID, false);
    }
    if (data.length > 0) {
      node = this.filterJson(data, 'ParentID', ParentID);
      if (node.length > 0) {
        level++;
        for (let i = 0; i < node.length; i++ ) {
          let nodeChecked;
          index[level] = i;
          ID = node[i].ID;
          Name = node[i].Name;
          Name = Name.substring(0, 1).toUpperCase() + Name.substring(1);
          nodeChecked = node[i].Checked == 1 ? true : false;
          let tmp = 'resultdata';
          for (let j = 1; j < level; j++) {
            tmp = tmp + '.children[' + index[j] + ']';
          }
          tmp = tmp + '.children';
          try {
            eval(tmp).push(this.makeNode(Name, ID, nodeChecked));
          } catch {
            return resultdata;
          }
          ParentID = ID;
          this.createSingleDataTreeView(data, ParentID, resultdata, level, index, RootNodeName);
        }
      }
    }
    return resultdata;
  }
}
