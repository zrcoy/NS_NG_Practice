import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-challenge-tabs",
  templateUrl: "./challenge-tabs.component.html",
  styleUrls: ["./challenge-tabs.component.css"]
})
export class ChallengeTabsComponent implements OnInit {
  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.navigate(
      [
        {
          outlets: { currentChallenge: ["current-challenge"], today: ["today"] }
        }
      ],
      { relativeTo: this.route }
    );
  }
}
