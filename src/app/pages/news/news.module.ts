import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { NewsService } from './services/news.service';
import { FullNewsComponent } from './full-news/full-news.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [SharedModule, NewsRoutingModule],
  exports: [],
  declarations: [
    NewsComponent,
    LatestNewsComponent,
    AddNewsComponent,
    FullNewsComponent,
  ],
  providers: [NewsService],
})
export class NewsModule {}
