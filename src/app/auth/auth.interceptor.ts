import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if (!token) return next(req)

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token))
    .pipe(
      catchError(e => {
        if (e.status === 403) {
          //Новый стрим
          return refreshAndProceed(authService, req, next)
        }
        return throwError(e)

      })
    )
}


const refreshAndProceed = (authService: AuthService,
                           req: HttpRequest<any>,
                           next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken()
      .pipe(
        switchMap(res => {
          isRefreshing = false;
          return next(addToken(req, res.access_token))
        })
      )

  }
  return next(addToken(req, authService.refreshToken!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
