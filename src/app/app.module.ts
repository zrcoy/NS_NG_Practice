import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptFormsModule,
  NativeScriptModule
} from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { GridLayoutAssignComponent } from "./layouts/grid-layout-assign/grid-layout-assign.component";
import { ChallengeComponent } from "./challenge/challenge/challenge.component";
import { ChallengeEditComponent } from "./challenge/challenge-edit/challenge-edit.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule],
  declarations: [
    AppComponent,
    GridLayoutAssignComponent,
    ChallengeComponent,
    ChallengeEditComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
