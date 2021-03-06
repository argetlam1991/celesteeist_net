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
  }

  editorOnInit(event) {
    if (this.article) {
      event.clipboard.dangerouslyPasteHTML(0, this.article.content);
    }
    this.editor = event;
  }

  getArticle() {
    const article_id = this.route.snapshot.paramMap.get('article_id');
    //this.article = this.articles.getArticle(article_id);
    this.articles.getArticle(article_id).subscribe(data => {
      console.log(data);
      if (data){
        this.article = data;
        this.title = this.article.title;
        this.editor.clipboard.dangerouslyPasteHTML(0, this.article.content);
      }
    },
    error => {
      console.log(error);
    });
  }

  submit() {
    console.log(this.article)
    if (this.article) {
      console.log('update article');
      this.article.title = this.title;
      this.article.content = this.editor.root.innerHTML;
      this.articles.updateArticle(this.article).subscribe(data => {
        console.log(data);
        this._router.navigateByUrl('/article-list');
      },
      error => {
        console.log(error);
        this._router.navigateByUrl('/article-list');
      });
    } else {
      console.log('create article')
      this.articles.createArticle(this.title, this.editor.root.innerHTML).subscribe(data => {
        console.log(data);
        this._router.navigateByUrl('/article-list');
      },
      error => {
        console.log(error);
        this._router.navigateByUrl('/article-list');
      });
    }
  }

}
