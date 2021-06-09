import { Component, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { isAndroid } from "@nativescript/core/platform";

declare var android: any;

@Component({
  selector: "ns-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.css"]
})
export class ActionBarComponent {
  @Input() title = "";
  @Input() showBackButton = true;

  constructor(private page: Page, private router: RouterExtensions) {}

  onLoadActionBar() {
    if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor("#0059e8"),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onBack() {
    this.router.backToPreviousPage();
  }
}
