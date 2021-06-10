import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptFormsModule,
  NativeScriptModule
} from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppComponent } from "./app.component";
import { CurrentChallengeComponent } from "./challenge/current-challenge/current-challenge.component";
import { ChallengeEditComponent } from "./challenge/challenge-edit/challenge-edit.component";
import { TodayComponent } from "./challenge/today/today.component";
import { AuthComponent } from "./auth/auth.component";
import { AppRoutingModule } from "./app-routing.module";
import { ActionBarComponent } from "./shared/ui/action-bar/action-bar.component";
import { ChallengeTabsComponent } from "./challenge/challenge-tabs/challenge-tabs.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    ChallengeEditComponent,
    TodayComponent,
    AuthComponent,
    ActionBarComponent,
    ChallengeTabsComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
