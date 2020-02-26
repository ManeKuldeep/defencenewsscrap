import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "./services/news.service";
// import { HeaderComponent } from "./components/header/header.component";
import { Router, ActivatedRoute, Params } from "@angular/router"; // import { Events } from "ionic-angular";
import * as sha1 from "js-sha1";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "news";
  myForm: FormGroup;
  display = "none";
  // header = HeaderComponent;
  // newsService: NewsService;

  constructor(public newsService: NewsService, public router: Router) {}
  ngOnInit() {
    this.myForm = new FormGroup({
      inputUsername: new FormControl(),
      inputPassword: new FormControl()
    });
  }
  loadLoginFormData() {
    this.myForm = new FormGroup({
      inputUsername: new FormControl(),
      inputPassword: new FormControl()
    });
  }
  openModal() {
    console.log("Displayed Modal");
    this.display = "block";
  }
  closeModal() {
    this.display = "none";
  }
  onLogin(form: FormGroup) {
    console.log("Valid?", form.valid); // true or false
    console.log("username: ", form.value.inputUsername);
    console.log("password: ", form.value.inputPassword);

    let uname = form.value.inputUsername;
    let pwd = sha1(form.value.inputPassword);

    this.newsService.loginWithCredetials(uname, pwd).subscribe(data => {
      let resp = data.json();
      // console.log("Login Response : ");
      // console.log(resp);
      this.validateLoginResponse(resp);
    });
  }

  validateLoginResponse(loginData) {
    // console.log(loginData);
    console.log(loginData.status);
    let status = loginData.status;
    if (status == "success") {
      this.display = "none";
      // this.newsService.setStatusTrueForLogin();
      // open login dashboard page
      // console.log(parseInt((new Date().getTime() / 1000).toString()));
      this.newsService.loginTimestampPlus1 = parseInt(
        (new Date().getTime() / 1000 + 86400).toString()
      );
      localStorage.setItem("LoginStatus", "true");
      this.router.navigate([`/home`]);
    } else {
      // Show alert Dialog
      alert("Invalid Username or Password, Please try with valid credentials");
    }
  }
}
