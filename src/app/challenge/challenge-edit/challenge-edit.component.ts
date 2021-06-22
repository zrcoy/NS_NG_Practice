import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "@nativescript/angular";
import { take } from "rxjs/operators";

import { ChallengeService } from "../challenge.service";

@Component({
  selector: "ns-challenge-edit",
  templateUrl: "./challenge-edit.component.html",
  styleUrls: ["./challenge-edit.component.scss"]
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true;
  title = "";
  description = "";

  constructor(
    private pageRoute: PageRoute,
    private activatedRoute: ActivatedRoute,
    private router: RouterExtensions,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    // this.pageRoute.activatedRoute.subscribe(activatedRoute => {
    //   activatedRoute.paramMap.subscribe(paramMap => {
    //     console.log(paramMap.get("mode"));
    //   });
    // });
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("mode")) {
        this.isCreating = true;
      } else {
        this.isCreating = paramMap.get("mode") !== "edit";
      }

      if (!this.isCreating) {
        this.challengeService.CurrentChallenge.pipe(take(1)).subscribe(
          challenge => {
            challenge.title = this.title;
            challenge.description = this.description;
          }
        );
      }
    });
  }

  onSubmit(title: string, des: string) {
    if (this.isCreating) {
      this.challengeService.createChallenge(title, des);
    } else {
      this.challengeService.updateChallenge(title, des);
    }
    this.router.backToPreviousPage();
  }
}
