import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UIService {
  private _drawerState = new BehaviorSubject<void>(null);
  private _rootVCRef: ViewContainerRef;

  get drawerState() {
    return this._drawerState;
  }

  toggleDrawer() {
    this._drawerState.next(null);
  }

  setRootVCRef(vc: ViewContainerRef) {
    this._rootVCRef = vc;
  }

  getRootVCRef() {
    return this._rootVCRef;
  }
}
