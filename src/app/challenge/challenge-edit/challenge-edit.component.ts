import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "ns-challenge-edit",
  templateUrl: "./challenge-edit.component.html",
  styleUrls: ["./challenge-edit.component.css"]
})
export class ChallengeEditComponent {
  @Output("input") setChallengeEvent = new EventEmitter<String>();
  challengeDescription = "";

  onSetChallenge() {
    // this.currentChallenge = this.challengeDescription;
    this.setChallengeEvent.emit(this.challengeDescription);
  }
}
