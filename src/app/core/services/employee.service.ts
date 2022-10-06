import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.apiService.get(`/Employee`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.apiService.get(`/Employee/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.apiService.postJson(`/Employee/AddEmployee/`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.apiService.putJson(`/Employee/UpdateEmployee/${employee.Id}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.apiService.delete(`/Employee/DeleteEmployee/${id}`);
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.apiService.postJson('/Employee/search', {"term": term});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }
}
