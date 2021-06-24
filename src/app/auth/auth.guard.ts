import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, UrlTree } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Observable, of } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser || !currentUser.token) {
          return this.authService.autoLogin();
        }
        return of(true);
      }),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(["./auth"]);
        }
      })
    );
  }
}
