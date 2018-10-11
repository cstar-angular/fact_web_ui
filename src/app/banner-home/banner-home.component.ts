import { Component, OnInit, HostListener } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

import
{
	HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
	HttpResponse, HttpUserEvent, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import 'rxjs/add/operator/do';
import { AuthService } from '../core/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NewsStorage } from '../storage/news.storage';
import { NewsService } from '../services/news/news.service';

@Component({
	selector: 'app-banner-home',
	templateUrl: './banner-home.component.html',
	styleUrls: ['./banner-home.component.css'],
})

export class BannerHomeComponent implements OnInit
{

	// public result = this.auth.topNews();
	public topNews = this._http.get('http://api.fact.mk/api/home_news_feed');
	public carouselOne;

	constructor(private _newsList: NewsService, private newsStorage: NewsStorage, public auth: AuthService, public _http: HttpClient) { }

	ngOnInit()
	{
		this._newsList.getTopNews().subscribe(data => {
			this.topNews = data;
			console.log(data);
		});
		this.carouselOne = {
			grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
			slide: 1,
			speed: 400,
			interval: 40000,
			point: {
				visible: true
			},
			load: 2,
			touch: true,
			loop: true,
			custom: 'banner'
		};
	}
}
