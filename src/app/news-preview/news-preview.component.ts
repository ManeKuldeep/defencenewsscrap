import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NewsService } from "../services/news.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-news-preview",
  templateUrl: "./news-preview.component.html",

  styleUrls: ["./news-preview.component.scss"]
})
export class NewsPreviewComponent implements OnInit {
  news: any;
  loader = true;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public newsService: NewsService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.checkTimestampValidChild();
    this.loader = false;
    this.news = this.newsService.previewNewsData;
    console.log(this.news.link);
  }
  navigateTo() {
    this.router.navigate([`/home`]);
  }
  backClick() {
    this.newsService.previewBackClick = true;
    this._location.back();
  }
  saveButtonClick() {
    console.log("Save Button CLicked");
    this.newsService.updateSpecficNews(this.news).subscribe(data => {
      console.log("data>>>>>>>>>>>>>>", data);
      let resp = JSON.parse(JSON.stringify(data || null));

      // let resp = data.json();
      console.log(">>>>>>>>>>>>>>>>", resp);
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
}
