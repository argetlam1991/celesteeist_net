import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { ArticlesService } from '../service/articles.service';
import { Article } from '../shared/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  is_admin = false;

  constructor(private auth: AuthenticationService,
              private articles: ArticlesService,
              private route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getArticle();
    this.checkIsAdmin();
  }

  getArticle() {
    const article_id = this.route.snapshot.paramMap.get('article_id');
    this.article = this.articles.getArticle(article_id);
  }

  checkIsAdmin() {
    this.auth.isAdmin().subscribe(is_admin => this.is_admin = is_admin);
  }

}
