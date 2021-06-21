import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChallengeService } from "../challenge.service";
import { Day, DayStatus } from "../day.model";

@Component({
  selector: "ns-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.scss"]
})
export class TodayComponent implements OnInit, OnDestroy {
  currentDay: Day;
  private _sub_currChallenge: Subscription;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this._sub_currChallenge = this.challengeService.CurrentChallenge.subscribe(
      challenge => {
        if (challenge) {
          this.currentDay = challenge.currentDay;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this._sub_currChallenge) {
      this._sub_currChallenge.unsubscribe();
    }
  }

  onHandleActions(status: DayStatus) {
    this.challengeService.updateDayStatus(this.currentDay.dayInMonth, status);
  }
}
