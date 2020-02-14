import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  currentPage = "1";
  headers: Headers;
  previewNewsData: any;
  previewBackClick: Boolean;
  loginTimestampPlus1: any;
  serverAddess = "https://defencenewsscrap.000webhostapp.com/";
  // serverAddess = "https://defence24x7.com/";

  constructor(public http: Http) {}

  getNewsData(pageNo) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    let option = new RequestOptions({ headers: this.headers });
    let body = { page: pageNo };
    return this.http.post(
      this.serverAddess + "gateway/readAllNews.php",
      body,
      option
    );
  }

  getNews(newsId) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    let option = new RequestOptions({ headers: this.headers });
    let body = { id: newsId };
    return this.http.post(
      this.serverAddess + "/gateway/readSpecificNews.php",
      body,
      option
    );
  }

  getNewsSpecificForEdit(newsId) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    let option = new RequestOptions({ headers: this.headers });
    let body = { id: newsId };
    return this.http.post(
      this.serverAddess + "gateway/readSpecificNews.php",
      body,
      option
    );
  }

  checkIsTimestampValidParent() {
    let timestampAdded = this.loginTimestampPlus1;
    let currentTimestamp = new Date().getTime() / 1000;
    if (timestampAdded != null && timestampAdded > currentTimestamp) {
      return true;
    } else {
      return false;
    }
  }

  updateSpecficNews(news) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    let option = new RequestOptions({ headers: this.headers });
    let body = JSON.stringify(news);
    console.log(body);
    console.log(this.serverAddess + "gateway/updateSpecificNews.php");
    return this.http.post(
      this.serverAddess + "gateway/updateSpecificNews.php",
      body,
      option
    );
  }

  loginWithCredetials(username, password) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    let option = new RequestOptions({ headers: this.headers });
    let body = { username: username, password: password };
    console.log(body);
    return this.http.post(
      this.serverAddess + "gateway/login.php",
      body,
      option
    );
  }
}
