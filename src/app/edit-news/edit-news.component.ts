import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NewsService } from "../services/news.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-edit-news",
  templateUrl: "./edit-news.component.html",

  styleUrls: ["./edit-news.component.scss"]
})
export class EditNewsComponent implements OnInit {
  news: any;
  url: String;
  myForm: FormGroup;
  parentNews = this.news;

  // For Preview data variable
  newImageUrl: String;
  newNewsDetail: String;
  newNewsTitle: String;
  newCategory: String;
  myTextarea: String;
  constructor(
    public route: ActivatedRoute,
    public newsService: NewsService,
    public router: Router
  ) {}

  ngOnInit() {
    this.checkTimestampValidChild();
    if (this.newsService.previewBackClick) {
      this.newsService.previewBackClick = false;
      this.news = this.newsService.previewNewsData;
      this.loadFormData();
    } else {
      this.newsService.previewBackClick = false;
      this.route.params.subscribe((param: Params) => {
        this.newsService.getNews(param.id).subscribe(data => {
          let resp = data.json();
          this.news = resp[0];
          console.log(">>>>>>>>>>>>>>", this.news);
          this.loadFormData();
          // this.loader = false;
        });
      });
    }
  }
  loadFormData() {
    var imageLinkForData = "";
    if (this.news.imageLink.includes(this.newsService.serverAddess)) {
      imageLinkForData = this.news.imageLink;
    } else {
      imageLinkForData = this.newsService.serverAddess + this.news.imageLink;
    }
    this.myForm = new FormGroup({
      news_title: new FormControl(this.news.header),
      source: new FormControl(this.news.source),
      old_Image_Link: new FormControl(imageLinkForData),
      new_Image_Link: new FormControl(imageLinkForData),
      detail: new FormControl(this.news.detail),
      category: new FormControl()
    });
    this.loadImage(this.myForm);
  }
  onSubmit(form: FormGroup) {
    console.log("Valid?", form.valid); // true or false
    console.log("Name", form.value.news_title);
    console.log("Email", form.value.source);
    console.log("Old Image Link", form.value.old_Image_Link);
    console.log("New Image Link", form.value.new_Image_Link);

    this.news.header = form.value.news_title;
    this.news.imageLink = form.value.new_Image_Link;
    this.news.detail = form.value.detail;
    this.news.category = "";
    this.navigateToPreview();
  }
  navigateToPreview() {
    console.log(">>>>>>>>>>>>>" + this.news);
    console.log("<><>><><>><><><><>><><>><><><>><><><><<><><><><<>");
    // console.log(this.news);
    this.newsService.previewNewsData = this.news;
    this.router.navigate([`/preview`]);
    // this.router.navigate([`/preview/${this.news}`,{state:this.news}])
  }
  loadImage(form: FormGroup) {
    this.newImageUrl = form.value.new_Image_Link;
  }
  loadDataAgain() {
    this.ngOnInit();
  }
  changeCategory(e) {
    console.log(e.value);
    // this.cityName.setValue(e.target.value, {
    //   onlySelf: true
    // })
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
