import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentPage = "1";
  headers: Headers;
  constructor(public http: Http) { }

  getNewsData(pageNo) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    let option= new RequestOptions({headers:this.headers})
    let body = { page: pageNo }
    return this.http.post("https://defencenewsscrap.000webhostapp.com/readAllNews.php", body, option)
  }

  getNews(newsId) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    let option= new RequestOptions({headers:this.headers})
    let body = { id: newsId }
    return this.http.post("https://defencenewsscrap.000webhostapp.com/readSpecificNews.php", body, option)
  }
}
