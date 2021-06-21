import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DayStatus } from "../day.model";

@Component({
  selector: "ns-challenge-actions",
  templateUrl: "./challenge-actions.component.html",
  styleUrls: ["./challenge-actions.component.scss"]
})
export class ChallengeActionsComponent {
  @Output("action-challenge-select") action_selection_event = new EventEmitter<
    DayStatus
  >();
  @Input() dynamicCancelText = "Cancel";
  action: "complete" | "fail" = null;

  onAction(action: "complete" | "fail" | "cancel") {
    let dayStatus = DayStatus.Open;
    if (action === "complete") {
      dayStatus = DayStatus.Completed;
      this.action = "complete";
    } else if (action === "fail") {
      dayStatus = DayStatus.Failed;
      this.action = "fail";
    } else if (action === "cancel") {
      action = null;
    }
    this.action_selection_event.emit(dayStatus);
  }
}
