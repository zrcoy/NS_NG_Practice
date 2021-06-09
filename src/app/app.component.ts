import { Component } from "@angular/core";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  activeChallenge: string = "";

  setChallenge(challenge: string) {
    this.activeChallenge = challenge;
  }
}
