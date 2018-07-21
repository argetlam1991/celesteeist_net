import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { ArticlesService } from '../service/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  username: string;
  dummy_article: any;
  articles_list: any[];

  constructor(private auth: AuthenticationService,
              private articles: ArticlesService,
              private _router: Router) { }

  ngOnInit() {
    const user = this.auth.getAuthenticatedUser();
    if (user != null) {
      this.username = user.getUsername();
    } else {
      this.username = 'Guest';
    }
    this.articles_list = this.articles.getAllArticles();
    /*
    this.articles.getAllArticles().subscribe(data => {
      console.log(data);
      this.dummy_article = data;
    },
    error => {
      console.log(error);
    }); */
  }
}
