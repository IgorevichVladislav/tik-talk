import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, throwError} from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log(req)
  // Получаем токен
  const token = authService.token
  if (!token) {
    return next(req);
  }
  req = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  })
  return next(req).pipe(
    catchError((e) => {
      if (e.status === 403) {
        return refreshAndProcced(authService)
      }
      return throwError(e);
    })
  )
}

const refreshAndProcced = () => {

}
