import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NewsService } from '../services/news/news.service';


@Component({
  selector: 'app-home-mainsection',
  templateUrl: './home-mainsection.component.html',
  styleUrls: ['./home-mainsection.component.css'],

})

export class HomeMainsectionComponent implements OnInit {

  onScroll() {
    console.log('scrolled!!');
  }

  public result : Array<any> = [];
	constructor(private authService: AuthService,private _flashMessagesService: FlashMessagesService, private _newsService: NewsService) { }

	ngOnInit() {

    this.news();
  }


  news(): void {
    this._newsService.getNews({ page: 1 }).subscribe(
      data => {

         this.result = data;
      }
    );
      /*this.http.post(url,{}).subscribe(data => {
        this.result = data;
    });*/

}

}
