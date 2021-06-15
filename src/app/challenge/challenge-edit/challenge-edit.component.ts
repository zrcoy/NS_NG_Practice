import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute } from "@nativescript/angular";

@Component({
  selector: "ns-challenge-edit",
  templateUrl: "./challenge-edit.component.html",
  styleUrls: ["./challenge-edit.component.scss"]
})
export class ChallengeEditComponent implements OnInit {
  finishCreating = false;

  constructor(
    private pageRoute: PageRoute,
    private activatedRoute: ActivatedRoute
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
}
