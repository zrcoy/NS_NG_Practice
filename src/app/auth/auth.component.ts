import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "ns-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  isLogin = true;
  isLoading = false;
  emailControlIsValid = true;
  passwdControlIsValid = true;
  @ViewChild("passwdEl") passwdEl: ElementRef<TextField>;
  @ViewChild("emailEl") emailEl: ElementRef<TextField>;

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get("email").statusChanges.subscribe(status => {
      this.emailControlIsValid = status === "VALID";
    });
    this.form.get("password").statusChanges.subscribe(status => {
      this.passwdControlIsValid = status === "VALID";
    });
  }

  onSignin() {
    this.router.navigate(["/today"], { clearHistory: true });
  }

  onSubmit() {
    this.loseFocusToTriggerUpdate();

    if (!this.form.valid) {
      return;
    }

    const email = this.form.get("email").value;
    const password = this.form.get("password").value;
    this.resetAll();
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(email, password).subscribe(
        resData => {
          this.router.navigate(["./challenges"]);
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        resData => {
          this.router.navigate(["./challenges"]);
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  resetAll() {
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwdControlIsValid = true;
  }

  loseFocusToTriggerUpdate() {
    this.emailEl.nativeElement.focus();
    this.passwdEl.nativeElement.focus();
    this.passwdEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
