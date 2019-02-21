import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { ArticlesService } from '../service/articles.service';
import { Article } from '../shared/article';
import {Acc} from '../shared/acc';
import {fromEvent, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  is_admin = false;
  is_mobile = false;
  acc: Acc;
  content : string;

  constructor(private auth: AuthenticationService,
              private articles: ArticlesService,
              private route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getArticle();
    this.checkIsAdmin();
    this.AddListener()
  }
  deviceMotionHandler(event){
    let acc = new Acc();
    acc.x = event.alpha;
    acc.y = event.beta;
    acc.z = event.gamma;
    this.acc = acc;
    console.log(acc);
  }
  AddListener(){
    if (DeviceOrientationEvent) {
      console.log("mobile!");
      const source = fromEvent(window,'deviceorientation')
        .pipe(debounce(()=>timer(500)));
      const subscrible = source.subscribe(this.deviceMotionHandler);
    // }
    // if (DeviceOrientationEvent) {
    //   console.log("Mobile!");
    //   window.addEventListener('deviceorientation', this.deviceMotionHandler,false);
    //   this.is_mobile = true;
    //   if (this.article) {
    //     if (!this.content) {
    //       this.content = this.article.content;
    //     }
    //     this.article.content = this.content + this.acc.print();
    //   }
    }else {
      console.log("not Mobile!");
    }
  }


  getArticle() {
    const article_id = this.route.snapshot.paramMap.get('article_id');
    //this.article = this.articles.getArticle(article_id);
    this.articles.getArticle(article_id).subscribe(data => {
      console.log(data);
      this.article = data;
    },
    error => {
      console.log(error);
    });
  }

  checkIsAdmin() {
    this.auth.isAdmin().subscribe(is_admin => this.is_admin = is_admin);
  }

}
