import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AuthComponent } from "./auth/auth.component";
import { ChallengeEditComponent } from "./challenge/challenge-edit/challenge-edit.component";
import { ChallengeTabsComponent } from "./challenge/challenge-tabs/challenge-tabs.component";
import { CurrentChallengeComponent } from "./challenge/current-challenge/current-challenge.component";
import { TodayComponent } from "./challenge/today/today.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "edit-challenge", component: ChallengeEditComponent },
  {
    path: "tabs-challenge",
    component: ChallengeTabsComponent,
    children: [
      { path: "today", component: TodayComponent, outlet: "today" },
      {
        path: "current-challenge",
        component: CurrentChallengeComponent,
        outlet: "currentChallenge"
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
