import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '../utils/storage';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(private router: Router, private storage: Storage) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const token = localStorage.getItem('token');
        const user = this.storage.getStorage('user');

        if (user) {
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + user
                }
            });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event—>>>', event);
                }

                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);

                if (error.status === 401) {
                    this.router.navigate(['/']);
                }

                if (error.status === 400) {
                    alert(error.error);
                }
                return throwError(error);
            }));
    }
}