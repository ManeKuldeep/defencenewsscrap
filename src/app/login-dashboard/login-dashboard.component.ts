import { Component, OnInit } from "@angular/core";
import { NewsService } from "../services/news.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Response } from "@angular/http";

@Component({
  selector: "app-login-dashboard",
  templateUrl: "./login-dashboard.component.html",
  styleUrls: ["./login-dashboard.component.scss"]
})
export class LoginDashboardComponent implements OnInit {
  totalLength = 0;
  newsArray = [];
  loader = true;
  lastPage: any;
  pages;
  pageDetails = {
    page_no: 1,
    noPerPage: 10,
    totalcount: null
  };

  constructor(
    public newsService: NewsService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkTimestampValidChild();
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
  checkTimestampValidChild() {
    if (this.newsService.checkIsTimestampValidParent()) {
      // alert("successfull login");
    } else {
      // alert("Please login again");
      this.router.navigate([`/home`]);
    }
  }

  logout() {
    this.newsService.loginTimestampPlus1 = 0;
    alert("Logout successfull");
    this.router.navigate([`/home`]);
  }
  navigateTo(id) {
    this.router.navigate([`/detail/${id}`]);
  }
  navigateToEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  navigateToAddNew() {}

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
}
