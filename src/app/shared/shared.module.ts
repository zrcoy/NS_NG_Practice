import { NgModule } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from "@nativescript/angular";

import { ActionBarComponent } from "./ui/action-bar/action-bar.component";

// @NgModule({
//   imports: [NativeScriptCommonModule, NativeScriptRouterModule],
//   declarations: [ActionBarComponent],
//   exports: [ActionBarComponent]
// })
// export class SharedModule {}

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent]
})
export class SharedModule {}
