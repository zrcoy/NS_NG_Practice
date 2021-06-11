import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "challenges",
    loadChildren: () =>
      import("./challenge/challenges.module").then(m => {
        return m.ChallengesModule;
      })
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
