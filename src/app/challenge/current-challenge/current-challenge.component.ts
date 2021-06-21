import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "@nativescript/angular";
import { UIService } from "~/app/shared/ui/ui.service";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";
import { Subscription } from "rxjs";

@Component({
  selector: "ns-current-challenge",
  templateUrl: "./current-challenge.component.html",
  styleUrls: ["./_current-challenge.component.common.scss"]
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  currentChallenge: Challenge;
  private _sub_currChallenge: Subscription;

  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this._sub_currChallenge = this.challengeService.CurrentChallenge.subscribe(
      challenge => {
        this.currentChallenge = challenge;
      }
    );
  }

  ngOnDestroy() {
    if (this._sub_currChallenge) {
      this._sub_currChallenge.unsubscribe();
    }
  }

  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekdayOfThisMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getDay();
    const possibleRow = day.dayInWeek < firstWeekdayOfThisMonth ? 1 : 0;
    return startRow + weekRow + possibleRow;
  }

  onChangeStatus() {
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef()
          ? this.uiService.getRootVCRef()
          : this.vcRef,
        context: { date: new Date() }
      })
      .then((status: string) => {
        //console.log(status);
      });
  }
}
