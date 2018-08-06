import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../shared/article';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient,
              private auth: AuthenticationService) { }

  getArticle(article_id: string) {
    return this.http.get<any>('https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/article/' + article_id);
    /*
    for (const article of this.dummy_articles) {
      if (article.article_id === article_id) {
        return article;
      }
    }
    */
  }

  getAllArticles() {
    return this.http.get<any>('https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/articles');
    //return this.dummy_articles;
  }

  createArticle(title, content) {
    const today = Date.now();
    const id = today.toString() + title + this.auth.getAuthenticatedUser().getUsername()
    const article: Article = {
      article_id: id,
      title: title,
      author: this.auth.getAuthenticatedUser().getUsername(),
      update_date: today,
      content: content
    };
    const url = 'https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/create-article'
    return this.http.post<any>(url, article)
  }

  updateArticle(article) {
    article.update_date = Date.now();
    const url = 'https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/update-article'
    console.log('to update');
    console.log(article)
    return this.http.put<any>(url, article)
  }

}
