import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private messageService: MessageService,
    private apiservice: ApiService
  ) {}

  getHeroes(): Observable<Hero[]> {
   return this.apiservice.get(`/Hero`)
  }

  getHero(id: number): Observable<Hero> {
    return this.apiservice.get(`/Hero/${id}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.apiservice.postJson('/Hero/AddHero/', hero);
  }

  updateHero(hero: Hero): Observable<any> {
    return this.apiservice.putJson(`/Hero/UpdateHero/${hero.Id}`, hero);
  }

  deleteHero(id: number): Observable<Hero> {
    return this.apiservice.delete(`/Hero/DeleteHero/${id}`)
  }

  searchHeros(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.apiservice.postJson('/Hero/search', {"term": term});
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
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
