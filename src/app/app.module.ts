import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { GridLayoutAssignComponent } from "./layouts/grid-layout-assign/grid-layout-assign.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule],
  declarations: [AppComponent, GridLayoutAssignComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
