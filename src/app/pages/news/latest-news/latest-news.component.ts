import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* --- local dependencies -- */
import { NewsService } from '../services/news.service';
import { INews } from 'src/app/shared/interfaces/INews';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { LOCAL_STORAGE } from 'src/app/shared/config/storage.config';

/**
 * component for showing the latest news
 */
@Component({
  selector: 'app-latest-news',
  templateUrl: 'latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
})
export class LatestNewsComponent implements OnInit {
  title: string = 'Latest News';
  latestNews: INews[];
  public newsArrayLength: number;
  isLoggedIn: boolean;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appContextService: AppContextService
  ) {}

  ngOnInit() {
    // fetching all news and reversing it to show latest one first
    this.newsService.getAllNews().subscribe((news) => {
      this.latestNews = news.reverse();
      this.newsArrayLength = this.latestNews.length;
    });

    this.isLoggedIn = !!localStorage.getItem(LOCAL_STORAGE.USERNAME_KEY);
    // subscription to subject in appcontext for checking user logged in
    this.appContextService.isUserLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  /**
   * method redirect to full news page with particular id as path variable
   * @param id : number
   */
  readFullArticle(id: number) {
    this.router.navigate([`/${APP_ROUTES.NEWS}`, id]);
  }

  /**
   * method to navigate to add news page
   */
  goToAddNewsPage() {
    this.router.navigate([`${APP_ROUTES.ADD_NEWS}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
