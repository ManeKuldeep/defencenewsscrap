import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NewsService } from "../services/news.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as sha1 from "js-sha1";

@Component({
  selector: "app-news-details",
  templateUrl: "./news-details.component.html",
  styleUrls: ["./news-details.component.scss"]
})
export class NewsDetailsComponent implements OnInit {
  news: any;
  loader = true;
  display = "none";
  myForm: FormGroup;
  constructor(
    public route: ActivatedRoute,
    public newsService: NewsService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadLoginFormData();
    this.route.params.subscribe((param: Params) => {
      this.newsService.getNews(param.id).subscribe(data => {
        let resp = data.json();
        this.news = resp[0];
        this.loader = false;
      });
    });
  }
  openModal() {
    this.display = "block";
  }
  closeModal() {
    this.display = "none";
  }

  loadLoginFormData() {
    this.myForm = new FormGroup({
      inputUsername: new FormControl(),
      inputPassword: new FormControl()
    });
  }
  onLogin(form: FormGroup) {
    this.loader = true;
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
      // open login dashboard page
      // console.log(parseInt((new Date().getTime() / 1000).toString()));
      this.newsService.loginTimestampPlus1 = parseInt(
        (new Date().getTime() / 1000 + 86400).toString()
      );
      this.router.navigate([`/login`]);
    } else {
      // Show alert Dialog
      alert("Invalid Username or Password, Please try with valid credentials");
    }
  }
  navigateTo() {
    this.router.navigate([`/home/${this.newsService.currentPage}`]);
  }
}
