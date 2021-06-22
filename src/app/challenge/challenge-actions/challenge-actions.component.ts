import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";
import { DayStatus } from "../day.model";

@Component({
  selector: "ns-challenge-actions",
  templateUrl: "./challenge-actions.component.html",
  styleUrls: ["./challenge-actions.component.scss"]
})
export class ChallengeActionsComponent implements OnChanges {
  @Output("action-challenge-select") action_selection_event = new EventEmitter<
    DayStatus
  >();
  @Input() dynamicCancelText = "Cancel";
  @Input() actionChoice: "complete" | "fail" = null;
  @Input() startDone = false;
  action: "complete" | "fail" = null;
  done: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    //if there's any changes on actionChoice variable
    if (changes.actionChoice) {
      this.action = changes.actionChoice.currentValue;
      if (changes.actionChoice.currentValue === null) {
        this.done = false;
      }
    }
    //if there's any changes on startDone variable
    if (changes.startDone) {
      if (changes.startDone.currentValue) {
        this.done = true;
      }
    }
  }

  onAction(action: "complete" | "fail" | "cancel") {
    this.done = true;
    let dayStatus = DayStatus.Open;
    if (action === "complete") {
      dayStatus = DayStatus.Completed;
      this.action = "complete";
    } else if (action === "fail") {
      dayStatus = DayStatus.Failed;
      this.action = "fail";
    } else if (action === "cancel") {
      action = null;
      this.done = false;
    }
    this.action_selection_event.emit(dayStatus);
  }
}
