import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { Challenge } from "./challenge.model";
import { DayStatus } from "./day.model";

@Injectable({
  providedIn: "root"
})
export class ChallengeService {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);
  private _testChallenge: Challenge;

  get CurrentChallenge() {
    //asObservable make it concealed from outside, so outside can't call next() on this observable
    return this._currentChallenge.asObservable();
  }

  createChallenge(title: string, des: string) {
    const challenge = new Challenge(
      title,
      des,
      new Date().getFullYear(),
      new Date().getMonth()
    );
    this._testChallenge = challenge;
    //save it to the server
    this._currentChallenge.next(challenge);
  }

  updateDayStatus(newDayInMonth: number, newStatus: DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      //validate if we do have a challenge and we want to access the day that is not exceed beyond the month length
      if (!challenge || newDayInMonth > challenge.days.length) {
        return;
      }
      //find the specific day index and update its status
      const dayIdx = challenge.days.findIndex(d => {
        return d.dayInMonth === newDayInMonth;
      });
      challenge.days[dayIdx].status = newStatus;
      this._currentChallenge.next(challenge);
    });
  }
}
