import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { DayStatus } from "../day.model";
@Component({
  selector: "ns-day-modal",
  templateUrl: "./day-modal.component.html",
  styleUrls: ["./day-modal.component.scss"]
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;
  loadedStatus: "complete" | "fail" = null;
  constructor(private modalParams: ModalDialogParams) {}

  ngOnInit() {
    const params = this.modalParams.context as {
      date: Date;
      status: DayStatus;
    };
    this.loadedDate = params.date;
    if (params.status === DayStatus.Completed) {
      this.loadedStatus = "complete";
    } else if (params.status === DayStatus.Failed) {
      this.loadedStatus = "fail";
    } else {
      this.loadedStatus = null;
    }
  }

  onHandleActions(action: DayStatus) {
    this.modalParams.closeCallback(action);
  }
}
