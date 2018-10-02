import { Component, OnInit,HostListener } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';
import { KeysPipe } from '../core/keys-pipe.pipe';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';
import {AnalyticService} from "../core/analytics.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LeftSidenavComponent } from '../left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from '../right-sidenav/right-sidenav.component';
import { HomeMainsectionComponent } from '../home-mainsection/home-mainsection.component';
import { SignupComponent } from '../signup/signup.component';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { NewsService } from '../services/news/news.service';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-other-news',
  templateUrl: './other-news.component.html',
  styleUrls: ['./other-news.component.css']
})
export class OtherNewsComponent implements OnInit {
    public carouselOne: NgxCarousel;
    user_categories : Array<any>;
    categories : Array<any>;
    sources : Array<any>;
    selected_categories : Array<any> = [];
    q : string = '';
    result : Array<any> = [];
    selected_sources : Array<any> = [];
    user_sources : Array<any>;
    twitter_feed : Array<any>;

    itemsPerPage : number = 0;
    auth : number = 0;
    no_data : number = 0;

    page = 1;
    current_page : number = 0;
    last_page : number = 0;
    nextpage : number = 0;
    selected_category : Array<any> = [];
    selected_source : Array<any> = [];
    filter_type : number = 1;

    banner_width : number = 1;
    constructor(
        private router: Router,
        private token: TokenStorage,
        private _newsService: NewsService,
        private authService: AuthService,
        private _flashMessagesService: FlashMessagesService,
        private analytics: AnalyticService
    ) { }

    ngOnInit() {

        this.analytics.updateStats('other');
        this.carouselOne = {
            grid: {xs: this.banner_width, sm: 2, md: 2, lg: 2, all: 0},
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
        }
        this.news();
        if (this.token.getToken() != null){
            this.auth = 1;
            this.authService.attemptUserCategory().subscribe(
              data => {
                  this.user_categories = data.user_categories;
                  for(var i = 0;i < this.user_categories.length;i++){
                      this.selected_categories.push(this.user_categories[i].category_id);
                  }
              });
            this.authService.attemptUserSource().subscribe(
              data => {
                  this.user_sources = data.user_sources;
                  for(var i = 0;i < this.user_sources.length;i++){
                      this.selected_sources.push(this.user_sources[i].source_id);
                  }
              });

        }else{
            this.auth = 0;
        }

        this.applyFilter('onload');
        this.authService.attemptSource().subscribe(
          data => {
              this.sources = data.data;
              for(var i = 0;i < this.sources.length;i++){
                  if(this.selected_sources.indexOf(this.sources[i]['id']) >= 0){
                      this.sources[i]['selected'] = true;
                  }else{
                      this.sources[i]['selected'] = false;
                  }
              }
          },
          error => {
              this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
          }
        );
        this.authService.attemptCategory().subscribe(
          data => {
              this.categories = data.data;
              for(var i = 0;i < this.categories.length;i++){
                  if(this.selected_categories.indexOf(this.categories[i]['id']) >= 0){
                      this.categories[i]['selected'] = true;
                  }else{
                      this.categories[i]['selected'] = false;
                  }
              }
          },
          error => {
              this.router.navigate(['']);
              this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
          }
        );
    }

    shareOnMyWall(post_id,status :  number){
        if(post_id){
            let type : string = 'share';
            if(status == 1){
                type = 'remove';
            }
            swal({
                title: status == 0 ? 'Are you sure you want to share this on your wall?' : 'Are you sure you want to remove from your wall',
                //text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: status == 1 ? 'Remove' : 'Share'
              }).then((result) => {
                  if(result.value){
                  this.authService.shareOnWall(post_id,type).subscribe(
                        data => {
                            this.page = 0,
                            this.itemsPerPage = 0;
                            scroll(0, 0);
                            this.news();

                                swal(
                                  'This post has been shared on your wall',
                                  '',
                                  'success'
                                )
                        }
                      );
                  }

            });
        }
    }
    news(): void {
      this._newsService.getNews({ page: this.page }).subscribe(
        data => {
            console.log(data);
            // this.page = data.pagination.page;
            // this.itemsPerPage = data.pagination.items_per_page;
            this.result = data.other_news.data;
        });
      }

      loadIframe(id : number){
          if(id){
              this.authService.updateReadCount(id).subscribe(data => {
                  if(data.status == 200){
                      this.router.navigate(['/iframe/'+id]);
                  }
              });
          }
      }
      myWall(){
          this.authService.myWall().subscribe(
            data => {

                this.result = data.data;
            });
          }

      applyLoggedInFilter(filter_code : number){
          var filter = document.getElementsByClassName("logged_in_filter");
          for(var i = 0;i < filter.length;i++){
              if(filter[i]['value'] == filter_code){
                  filter[i]['checked'] = true;
              }else{
                  filter[i]['checked'] = false;
              }
          }
          this.applyFilter('manual');
      }
      applyFilter(status : string){
          this.q = $('#js-query-q').val().trim();
          this.selected_category = [];
          var category = document.getElementsByClassName("js-query-search-category");
          for(var i = 0;i < category.length;i++){
              if(category[i]['checked'] == true){
                  this.selected_category.push(category[i]['value']);
              }
          }
          this.selected_source = [];
          var source = document.getElementsByClassName("js-query-search-source");
          for(var i = 0;i < source.length;i++){
              if(source[i]['checked'] == true){
                  this.selected_source.push(source[i]['value']);
              }
          }
          var type = document.getElementsByClassName("logged_in_filter");
          for(var i = 0;i < type.length;i++){
              if(type[i]['checked'] == true){
                  this.filter_type = type[i]['value'];
              }
          }
          if(status != 'interval'){
              this.authService.otherFeedPaginate(this.q,this.selected_category,this.selected_source,this.filter_type,this.page,status).subscribe(
                data => {
                    this.result = data.news.data;
                    this.last_page = data.news.last_page;
               });
          }

      }
      lazyload(ev){
          this.applyFilter('interval');
          if(ev.target.offsetHeight + ev.target.scrollTop >= ev.target.scrollHeight + 15){
              if(this.nextpage <= this.last_page){
                  this.authService.otherFeedPaginate(this.q,this.selected_category,this.selected_source,this.filter_type,this.nextpage,'manual').subscribe(
                    data => {
                        if(data){
                            for(var i = 0;i < data.news.data.length;i++){
                                this.result.push(data.news.data[i]);
                            }
                        }
                        this.nextpage += 1;
                        this.last_page = data.news.last_page;
                    },
                    error => {
                      this.router.navigate(['']);
                    }
                  );
              }
          }
      }

}
