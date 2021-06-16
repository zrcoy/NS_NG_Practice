import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "ns-challenge-actions",
  templateUrl: "./challenge-actions.component.html",
  styleUrls: ["./challenge-actions.component.scss"]
})
export class ChallengeActionsComponent {
  @Output("action-challenge-select") action_selection_event = new EventEmitter<
    "complete" | "fail" | "cancel"
  >();
  @Input() dynamicCancelText = "Cancel";

  onAction(action: "complete" | "fail" | "cancel") {
    this.action_selection_event.emit(action);
  }
}
