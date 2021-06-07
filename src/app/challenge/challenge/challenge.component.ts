import { Component, Input } from "@angular/core";
import { ItemEventData } from "@nativescript/core";

@Component({
  selector: "ns-challenge",
  templateUrl: "./challenge.component.html",
  styleUrls: ["./challenge.component.css"]
})
export class ChallengeComponent {
  @Input() challenges: string[] = [];

  onItemTap(args: ItemEventData) {}
}
