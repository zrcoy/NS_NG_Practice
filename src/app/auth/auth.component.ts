import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core";

@Component({
  selector: "ns-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  isLogin = true;
  emailControlIsValid = true;
  passwdControlIsValid = true;
  @ViewChild("passwdEl") passwdEl: ElementRef<TextField>;
  @ViewChild("emailEl") emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions) {}

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
    const passwd = this.form.get("password").value;
    this.resetAll();
    if (this.isLogin) {
      console.log("Logging in...");
    } else {
      console.log("Signing up...");
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
