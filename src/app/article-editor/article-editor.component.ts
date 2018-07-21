import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { AuthenticationService } from '../service/authentication.service';
import { ArticlesService } from '../service/articles.service';
import { Article } from '../shared/article';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  content: any;
  article: Article;
  editor: any;
  title: string;

  constructor(private quill: QuillModule,
              private auth: AuthenticationService,
              private articles: ArticlesService,
              private route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getArticle();
    if (this.article) {
      this.title = this.article.title;
    }
  }

  editorOnInit(event) {
    if (this.article) {
      event.clipboard.dangerouslyPasteHTML(0, this.article.content);
    }
    this.editor = event;
  }

  getArticle() {
    const article_id = Number(this.route.snapshot.paramMap.get('article_id'));
    if (article_id) {
      this.article = this.articles.getArticle(article_id);
    }
  }

  submit() {
    this.articles.createArticle(this.title, this.editor.root.innerHTML);
    this._router.navigateByUrl('/article-list');
  }

}
