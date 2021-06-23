import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { Challenge } from "./challenge.model";
import { DayStatus } from "./day.model";
import { Day } from "./day.model";

@Injectable({
  providedIn: "root"
})
export class ChallengeService {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get CurrentChallenge() {
    //asObservable make it concealed from outside, so outside can't call next() on this observable
    return this._currentChallenge.asObservable();
  }

  fetchCurrentChallenge() {
    return this.authService.user.pipe(
      switchMap(currentUser => {
        return this.http.get<{
          title: string;
          description: string;
          month: number;
          year: number;
          _days: Day[];
        }>(
          `https://ns-ng-course-d4ef6-default-rtdb.firebaseio.com/challenge.json?auth=${currentUser.token}`
        );
      }),
      tap(res => {
        if (res) {
          console.log("get result succeed!");
          //need to new a challenge instead of just a js obj, because not only the properties we need, but also,
          //we need the methods inside Challenge obj
          const challenge = new Challenge(
            res.title,
            res.description,
            res.year,
            res.month,
            res._days
          );
          this._currentChallenge.next(challenge);
        }
      })
    );
  }

  createChallenge(title: string, des: string) {
    const challenge = new Challenge(
      title,
      des,
      new Date().getFullYear(),
      new Date().getMonth()
    );

    //save it to the server
    this.saveToServer(challenge);
    this._currentChallenge.next(challenge);
  }

  updateChallenge(title: string, des: string) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      //keep days, year, month the same
      challenge.title = title;
      challenge.description = des;
      //then send to a server
      this.saveToServer(challenge);
      this._currentChallenge.next(challenge);
    });
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
      this.saveToServer(challenge);
    });
  }

  private saveToServer(challenge: Challenge) {
    this.http
      .put(
        "https://ns-ng-course-d4ef6-default-rtdb.firebaseio.com/challenge.json",
        challenge
      )
      .subscribe(res => {
        //console.log(res);
      });
  }
}
