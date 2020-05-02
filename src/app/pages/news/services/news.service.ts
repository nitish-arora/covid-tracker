import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* --- local dependencies -- */
import { INews } from 'src/app/shared/interfaces/INews';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class NewsService {
  private apiUrl: string = 'api/newsDetails';
  newsList: INews[];

  constructor(private http: HttpService) {}

  /**
   * method called for saving news
   * @param news : INews
   */
  saveNews(news: INews): Observable<INews> {
    return this.http.post(this.apiUrl, news);
  }

  /**
   * method called to get all the available news
   */
  getAllNews(): Observable<INews[]> {
    return this.http.get(this.apiUrl);
  }

  /**
   * method called to fetch news by specific id
   * @param id : number
   */
  getNewsById(id: number): Observable<INews> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
