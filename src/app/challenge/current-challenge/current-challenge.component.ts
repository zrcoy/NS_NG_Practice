import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "@nativescript/angular";
import { UIService } from "~/app/shared/ui/ui.service";
import { DayModalComponent } from "../day-modal/day-modal.component";

@Component({
  selector: "ns-current-challenge",
  templateUrl: "./current-challenge.component.html",
  styleUrls: ["./_current-challenge.component.common.scss"]
})
export class CurrentChallengeComponent implements OnInit {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days: { dayInMonth: number; dayInWeek: number }[] = [];
  private _currentYear: number;
  private _currentMonth: number;

  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService
  ) {}

  ngOnInit() {}

  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekdayOfThisMonth = new Date(
      this._currentYear,
      this._currentMonth,
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
        console.log(status);
      });
  }
}
