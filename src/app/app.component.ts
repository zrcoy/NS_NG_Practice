import { Component } from "@angular/core";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  activeChallenges: string[] = [];

  setChallenge(challenge: string) {
    this.activeChallenges.push(challenge);
  }
}
