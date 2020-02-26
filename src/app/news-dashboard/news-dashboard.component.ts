import { Component, OnInit } from "@angular/core";
import { NewsService } from "../services/news.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Response } from "@angular/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { from } from "rxjs";
import * as sha1 from "js-sha1";

@Component({
  selector: "app-news-dashboard",
  templateUrl: "./news-dashboard.component.html",
  styleUrls: ["./news-dashboard.component.scss"]
})
export class NewsDashboardComponent implements OnInit {
  closeResult: string;

  totalLength = 0;
  newsArray = [];
  loader = true;
  lastPage: any;
  pages;
  isLogin = false;
  pageDetails = {
    page_no: 1,
    noPerPage: 10,
    totalcount: null
  };
  display = "none";
  myForm: FormGroup;

  constructor(
    public newsService: NewsService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // location.reload();
    // this.loadLoginFormData();
    this.checkIfUserLogin();
    this.route.params.subscribe((params: Params) => {
      if (params.pageNo) {
        this.newsService.currentPage = params.pageNo;
      }
      this.newsService
        .getNewsData(this.newsService.currentPage)
        .subscribe(data => {
          let resp = data.json();
          this.newsArray = resp.data;
          this.totalLength = resp.count;
          this.loader = false;
          this.setpagination(this.totalLength, this.newsService.currentPage);
        });
    });
  }

  checkIfUserLogin() {
    let loginStatus = localStorage.getItem("LoginStatus");
    if (loginStatus == "true") {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
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

  navigateTo(id) {
    this.router.navigate([`/detail/${id}`]);
  }
  setpagination(totalcount, page_no) {
    this.newsService.currentPage = page_no;
    if (totalcount !== this.totalLength) {
      this.pageDetails.totalcount = this.totalLength;
      totalcount = this.totalLength;
      Object.apply(this.pageDetails.totalcount);
    }

    this.pages = [];
    var count =
      Math.floor(totalcount % this.pageDetails.noPerPage) == 0
        ? totalcount / this.pageDetails.noPerPage
        : totalcount / this.pageDetails.noPerPage + 1;
    // var firstPage = (Math.floor((page_no - 1) / 10) * 10) + 1;
    // var lastPage = (Math.floor(count));
    // this.lastPage = lastPage;

    var firstPage;
    var lastPage;
    if (totalcount <= 50) {
      // less than 5 total pages so show all
      firstPage = 1;
      lastPage = Math.floor(count);
      this.lastPage = lastPage;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (page_no <= 3) {
        firstPage = 1;
        lastPage = 5;
        this.lastPage = lastPage;
      } else if (page_no + 2 >= count) {
        firstPage = Math.floor(count - 4);
        lastPage = Math.floor(count);
        this.lastPage = lastPage;
      } else {
        firstPage = page_no - 2;
        lastPage = page_no + 2;
        this.lastPage = lastPage;
      }
    }

    var isCurrent = false;
    if (lastPage > firstPage) {
      for (var i = firstPage; i <= lastPage; i++) {
        if (i == page_no) {
          isCurrent = true;
        } else {
          isCurrent = false;
        }
        this.pages.push({
          page_name: i.toString(),
          page_value: i,
          isCurrent: isCurrent
        });
      }
    }
  }

  getIndexDetails(page_no) {
    this.loader = true;
    this.newsService.currentPage = page_no;
    this.newsService
      .getNewsData(this.newsService.currentPage)
      .subscribe(data => {
        let resp = data.json();
        this.newsArray = resp.data;
        this.totalLength = resp.count;
        this.loader = false;
        this.pageDetails.totalcount = this.totalLength;
        this.pageDetails.page_no = page_no;
        this.setpagination(this.totalLength, this.newsService.currentPage);
      });
  }
  navigateToEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }
}
