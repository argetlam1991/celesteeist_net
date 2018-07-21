import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './service/authentication.service';
import { ArticlesService } from './service/articles.service';
import { ArticleListComponent } from './article-list/article-list.component';
import { RegisterComponent } from './register/register.component';
import { ArticleComponent } from './article/article.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { AuthGuard } from './service/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/article-list',
    pathMatch: 'full'
  },
  {
    path: 'article/:article_id', component: ArticleComponent
  },
  {
    path: 'article-editor',
    canActivate: [AuthGuard],
    component: ArticleEditorComponent
  },
  {
    path: 'article-editor/:article_id',
    canActivate: [AuthGuard],
    component: ArticleEditorComponent
  },
  {
    path: 'article-list',
    component: ArticleListComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleListComponent,
    RegisterComponent,
    ArticleComponent,
    ArticleEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    QuillModule
  ],
  providers: [AuthenticationService,
              ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
