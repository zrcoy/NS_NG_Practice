import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {}
