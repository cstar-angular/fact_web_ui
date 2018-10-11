import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { News } from './news.paths';
import { setting } from '../../core/setting';

@Injectable({ providedIn: 'root' })
export class NewsService
{
  language: string = localStorage.getItem('language');
  // ______________________________________________________________________Constructor and lifecycle hooks
  constructor(private _http: HttpClient) { }

  // ______________________________________________________________________________________Private methods
  private getArticles(selectBy: string, from: string, to: string): Observable<any>
  {

    const URL = `${environment.api}stats/articles-read`;
    const PARAMS = { by: selectBy, period: `${from},${to}`, language: this.language };

    return this._http.get(URL, { params: PARAMS });
  }


  // _______________________________________________________________________________________Public methods
  public getArticlesBySource = (from: string, to: string) =>
    this.getArticles('source', from, to)


  public getArticlesByCategory = (from: string, to: string) =>
    this.getArticles('category', from, to)


  public getArticlesByGender = (from: string, to: string) =>
    this.getArticles('gender', from, to)


  public getNews(params: HomeFeedParams): Observable<any>
  {
    return this._http.get<any>(environment.api + News.get_home_feed,
      {
        params: { 'page': params.page.toString(), 'language': this.language }
      });
  }

  public getTopNews(): Observable<any>
  {
    return this._http.get<any>(environment.api + News.get_top, {params: {'language': this.language }});
  }

  public getCategories(): Observable<any>
  {
    return this._http.get<any>(environment.api + News.get_category, {params: {'language': this.language }});
  }

  public getSources(): Observable<any>
  {
    return this._http.get<any>(environment.api + News.get_source, {params: {'language': this.language }});
  }
}

interface HomeFeedParams
{
  q?: string;
  selected_category?: Array<any>;
  selected_source?: Array<any>;
  filter_type?: number;
  page: number;
  status?: string;
}
