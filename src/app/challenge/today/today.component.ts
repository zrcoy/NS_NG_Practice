import { Component } from "@angular/core";

@Component({
  selector: "ns-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.scss"]
})
export class TodayComponent {
  onHandleActions(action: "complete" | "fail" | "cancel") {
    console.log("today: " + action);
  }
}
