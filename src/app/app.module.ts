import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptFormsModule,
  NativeScriptHttpClientModule,
  NativeScriptModule
} from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AppRoutingModule } from "./app-routing.module";
import { DayModalComponent } from "./challenge/day-modal/day-modal.component";
import { SharedModule } from "./shared/shared.module";
import { ChallengeActionsModule } from "./challenge/challenge-actions/challenge-actions.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    SharedModule,
    ChallengeActionsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, AuthComponent, DayModalComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DayModalComponent]
})
export class AppModule {}
