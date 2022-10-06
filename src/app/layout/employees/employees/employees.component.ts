import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(employees => {
        if(employees !== undefined) {
          this.employees = employees;
          this.messageService.add('Fetched employee success.')
        }
      });
  }

  add(EmpName: string, EmpAddress: string): void {
    EmpName = EmpName.trim();
    EmpAddress = EmpAddress.trim();
    if (!EmpName && !EmpAddress) {
      return;
    }
    this.employeeService
      .addEmployee({ EmpName, EmpAddress } as Employee)
      .subscribe(employee => {
        if(employee !== undefined) {
          this.employees.push(employee);
          this.messageService.add('Adding employee success.')
        }
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter((emp) => emp !== employee);
    this.employeeService.deleteEmployee(employee.Id).subscribe(result => {
      if(result !== undefined) {
        this.messageService.add(`Delete ${employee.EmpName} success.`)
      }
    });
  }
}
