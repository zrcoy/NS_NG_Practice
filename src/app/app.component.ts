import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Subscription } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { UIService } from "./shared/ui/ui.service";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
  activeChallenge: string = "";
  private _drawerSub: Subscription;
  private _drawer: RadSideDrawer;

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this._drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this._drawer) {
        this._drawer.toggleDrawerState();
      }
    });
    this.uiService.setRootVCRef(this.vcRef);
  }

  ngAfterViewInit() {
    this._drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
    if (this._drawerSub) {
      this._drawerSub.unsubscribe();
    }
  }

  setChallenge(challenge: string) {
    this.activeChallenge = challenge;
  }

  onLogout() {
    this.uiService.toggleDrawer();
    this.authService.logout();
  }
}
