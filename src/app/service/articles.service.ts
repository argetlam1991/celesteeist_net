import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../shared/article';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  assigned_id = 0;

  dummy_articles: Article[] = [{
      article_id: 1,
      title: 'dummy_1',
      author: 'celesteeist',
      date: 1234567890,
      content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod turpis ut erat ullamcorper pellentesque. Aenean a neque libero. Integer at augue porttitor, euismod dolor vel, scelerisque dui. Fusce orci ligula, volutpat eu lobortis at, volutpat id sapien. Nunc pulvinar porta libero, et posuere ante gravida ac. Aenean ornare orci et ullamcorper accumsan. Sed nec efficitur tortor, at scelerisque orci. Sed ut pretium velit. Etiam nibh sem, mollis vel euismod id, posuere vel purus. Nullam erat ante, ultrices at quam eget, iaculis viverra ligula. Etiam ac cursus neque. Donec eu semper felis. Aenean laoreet elementum urna a finibus. Etiam libero nulla, bibendum vulputate dictum vitae, pretium eget dolor.</p><p>Praesent pharetra metus vitae faucibus rutrum. Duis varius faucibus tellus sit amet auctor. Praesent eget nunc sed quam convallis luctus. Curabitur posuere diam mauris, ut fermentum dolor efficitur vitae. Sed nec dapibus orci. Curabitur id urna feugiat, consequat metus et, rhoncus nisl. Morbi fermentum tortor lorem, at fringilla metus dapibus eu. Duis a blandit leo. Sed suscipit enim enim, hendrerit condimentum ante finibus ut. Duis gravida nunc cursus, finibus eros quis, euismod augue. Vivamus aliquet dui sit amet porta egestas. Sed ipsum leo, lobortis vitae nibh quis, vulputate pellentesque ipsum. Nulla vel tellus massa. In mollis justo et egestas sagittis. Sed faucibus quis lorem mollis malesuada. Morbi ac sollicitudin eros, nec aliquam urna.</p><p>Sed ultricies massa id purus hendrerit, quis dictum felis ullamcorper. Quisque suscipit dictum eros, quis ornare ante sodales ut. Proin id eros pulvinar, pharetra mauris id, malesuada ligula. Nam sed ultrices sem, dignissim pharetra diam. Morbi nec leo ante. Ut eget auctor urna. Morbi eleifend gravida erat, vitae ullamcorper orci posuere et. Integer volutpat mauris ut mollis tristique. Pellentesque ultrices neque lorem. Curabitur ut erat vitae quam viverra scelerisque. Donec placerat condimentum tempor. Sed felis erat, auctor non lorem in, malesuada porttitor tellus. In tempus, mauris et posuere tempus, urna nibh dignissim odio, at viverra mi neque eget massa. Nam eros tellus, porta ut feugiat in, ultricies quis lorem.</p><p>Suspendisse efficitur magna purus, eget blandit felis suscipit quis. Vivamus in ante risus. Maecenas fermentum, lorem non eleifend varius, turpis turpis tincidunt lectus, sit amet egestas enim ligula nec velit. Suspendisse eleifend iaculis congue. Cras feugiat lacinia posuere. Nullam varius nunc sed libero bibendum, in viverra ante mollis. Aliquam ut purus nec nulla vestibulum hendrerit eu non felis. Mauris malesuada purus vitae rhoncus varius. Morbi placerat nisl ac mauris convallis, sit amet luctus magna semper. Proin quis ligula ut velit interdum tincidunt. Maecenas pulvinar velit ac justo lacinia, ac elementum ex volutpat. Etiam interdum elit ut neque porttitor, id vestibulum elit rutrum.</p><p>Nam suscipit ipsum id orci suscipit, non condimentum elit fermentum. Phasellus mattis tellus id rutrum ullamcorper. Nam tincidunt mauris pellentesque ante sollicitudin convallis. In suscipit mollis ante quis laoreet. Sed metus nibh, fermentum vitae efficitur id, scelerisque eu nisl. Duis sed enim sit amet ligula imperdiet bibendum eu nec nisi. Nam lorem odio, varius vel tempus quis, varius nec erat. Nunc mauris ligula, egestas vitae semper et, semper at tortor. Nam et dapibus elit, eget dictum magna. Proin fringilla mollis sapien, vel mattis lorem interdum ullamcorper. Integer pellentesque metus arcu, ut venenatis urna ullamcorper eget. Morbi pretium iaculis mattis. Aliquam ornare lectus vel eros laoreet aliquam. Suspendisse ac enim ipsum. Donec et tortor non odio pretium lacinia non non lectus. Nullam imperdiet arcu vel eros interdum fringilla.</p>'
  }];

  constructor(private http: HttpClient,
              private auth: AuthenticationService) { }

  getArticle(article_id: number) {
    //return this.http.get<any>('https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/article');
    for (const article of this.dummy_articles) {
      if (article.article_id === article_id) {
        return article;
      }
    }
  }

  getAllArticles() {
    //return this.http.get<any>('https://ur15zg4ns3.execute-api.ap-northeast-1.amazonaws.com/dev/articles');
    return this.dummy_articles;
  }

  createArticle(title, content) {
    const today = Date.now();
    const article: Article = {
      article_id: this.assigned_id + 1,
      title: title,
      author: this.auth.getAuthenticatedUser().getUsername(),
      date: today,
      content: content
    };
    this.dummy_articles.push(article);
    this.assigned_id += 1;
  }

  updateArticle(id, title, content) {

  }

}
