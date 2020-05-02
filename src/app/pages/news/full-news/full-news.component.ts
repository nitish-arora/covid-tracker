import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* --- local dependencies -- */
import { INews } from 'src/app/shared/interfaces/INews';
import { NewsService } from '../services/news.service';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

/**
 * Component for showing the full news information
 */
@Component({
  selector: 'app-full-news',
  templateUrl: 'full-news.component.html',
  styleUrls: ['./full-news.component.css'],
})
export class FullNewsComponent implements OnInit {
  public news: INews;
  notFound: boolean = false; // variable for checking if news not exist with particular id coming form route
  buttonText: string = 'Go To News';
  errorDescription: string = 'No news exist with this ID';

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  /**
   * fetching news information based on news id as user can also directly hit the url without going to latest news page
   */
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.notFound = false;
    this.newsService.getNewsById(id).subscribe((news) => {
      if (news) {
        this.news = news;
      } else {
        this.notFound = true;
      }
    });
  }

  backToNews() {
    this.router.navigate([`/${APP_ROUTES.NEWS}`]);
  }
}
