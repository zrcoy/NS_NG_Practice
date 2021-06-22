import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { ChallengeService } from "../challenge.service";

@Component({
  selector: "ns-challenge-tabs",
  templateUrl: "./challenge-tabs.component.html",
  styleUrls: ["./challenge-tabs.component.css"]
})
export class ChallengeTabsComponent implements OnInit {
  isLoading = false;

  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private page: Page,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.challengeService.fetchCurrentChallenge().subscribe(
      res => {
        console.log("fetch challenge...");
        this.isLoading = false;
        this.loadTabRoutes();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.loadTabRoutes();
      }
    );

    this.page.actionBarHidden = true;
  }

  private loadTabRoutes() {
    // a little bit delay to make sure router get navigated after successfully fetching the data
    setTimeout(() => {
      this.router.navigate(
        [
          {
            outlets: {
              currentChallenge: ["current-challenge"],
              today: ["today"]
            }
          }
        ],
        { relativeTo: this.route }
      );
    }, 10);
  }
}
