import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news:any;
  loader = true;

  constructor(public route: ActivatedRoute, public newsService: NewsService, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params)=>{
      this.newsService.getNews(param.id).subscribe(data=>{
        let resp = data.json()
        this.news = resp[0]
        this.loader = false;
      })
    })
  }

  navigateTo(){
    this.router.navigate([`/home/${this.newsService.currentPage}`])
  }

}
