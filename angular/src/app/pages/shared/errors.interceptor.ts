import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import 'rxjs/add/operator/do';

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req_clone = req.clone();

        return next.handle(req).do(
            event => {
                console.log(event);
            }
        )
            
        // .pipe(catchError((error, caught) => {
            //     console.log(error);
            //     console.log(caught);
            // }))
    }
}