import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService : LocalStorageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {};
        const token = this.localStorageService.getItem('authorizationData');
        
        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
        } 

        const request = req.clone({ setHeaders: headersConfig });
        
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // process successful responses here
                    const newToken = event.headers.get('newToken');
                    if (newToken) {
                        this.localStorageService.setItemString('authorizationData', newToken);
                    }
                }
            }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        if (error.error.message == 'The Token has expired') {
                            this.router.navigate(['/login']);
                        } else {
                            this.router.navigate(['/access-denied']);
                        }
                    }
                    else {
                        console.log(error);
                    }
                }
            }
        ));
    }
}

