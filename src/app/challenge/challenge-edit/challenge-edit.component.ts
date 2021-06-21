import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "@nativescript/angular";
import { ChallengeService } from "../challenge.service";

@Component({
  selector: "ns-challenge-edit",
  templateUrl: "./challenge-edit.component.html",
  styleUrls: ["./challenge-edit.component.scss"]
})
export class ChallengeEditComponent implements OnInit {
  finishCreating = false;

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
        this.finishCreating = false;
      } else {
        this.finishCreating = paramMap.get("mode") !== "edit";
      }
    });
  }

  onSubmit(title: string, des: string) {
    this.challengeService.createChallenge(title, des);
    this.router.backToPreviousPage();
  }
}
