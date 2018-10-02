import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AnalyticService } from "../core/analytics.service";
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router,ActivatedRoute } from '@angular/router';
import { SortingServilce } from '../core/sorting.service';
import { NewsStorage } from '../storage/news.storage';
import { Location } from '@angular/common';
import { TokenStorage } from '../core/token.storage';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-profile',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
    public mobileTabVisible = 0;
    private titleRecentReverse = true;
    private contentRecentReverse = true;
    private titleSourceReverse = true;
    private contentSourceReverse = true;
    private titleCategoryReverse = true;
    private contentCategoryReverse = true;
    title : Array<any>;
    content : Array<any>;
    total_results : number;
    total_title : number;
    total_content : number;
    users:Array<any>;
    q : any;
    auth : number = 0;
    result :Array<any>=[];

  constructor(
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router,
      private sortingService: SortingServilce,
      private store: NewsStorage,
      private token: TokenStorage,
      private analytics: AnalyticService,
      private location: Location) { }
      public activeFilterBy = '';

  ngOnInit() {
      this.analytics.updateStats('search');
      this.q = this.route.snapshot.params.q;
      $('#site-search').val(this.q);
      this.search();
      if (this.token.getToken() != null){
        this.auth = 1;
        this.authService.attemptProfile().subscribe(data => {
            this.result = data;
            console.log(this.result)
        });
    }
  }


  filterSearch(searchBy: string) {
      this.activeFilterBy = searchBy;
    switch (searchBy) {
        case 'recent-title':
            return this.title =
                this.sortingService.filterByRecentTitle(this.titleRecentReverse = !this.titleRecentReverse);
        case 'source-title':
            return this.title =
                this.sortingService.filterBySourceTitle(this.titleSourceReverse = !this.titleSourceReverse);
        case 'category-title':
            return this.title =
                this.sortingService.filterByCategoryTitle(this.titleCategoryReverse = !this.titleCategoryReverse);
            case 'recent-content':
            return this.content =
                this.sortingService.filterByRecentContent(this.contentRecentReverse = !this.contentRecentReverse);
        case 'source-content':
            return this.content =
                this.sortingService.filterBySourceContent(this.contentSourceReverse = !this.contentSourceReverse);
        case 'category-content':
            return this.content =
                this.sortingService.filterByCategoryContent(this.contentCategoryReverse = !this.contentCategoryReverse);
        case 'all':
        default:
            return;
    }
  }

  search()
  {
      //title
      var q = $('#site-search').val();
      this.q = q;
      this.store.searchTerm = q;
      this.router.navigate(['/search/'+q]);
      var title_filter_all = $('#js-title-all').is(':checked') ? 1 : 0;
      var title_filter_sort = $('#js-title-sort').is(':checked') ? 1 : 0;
      var title_filter_source = $('#js-title-source').is(':checked') ? 1 : 0;
      var title_filter_category = $('#js-title-category').is(':checked') ? 1 : 0;
      //content
      var content_filter_all = $('#js-content-all').is(':checked') ? 1 : 0;
      var content_filter_sort = $('#js-content-sort').is(':checked') ? 1 : 0;
      var content_filter_source = $('#js-content-source').is(':checked') ? 1 : 0;
      var content_filter_category = $('#js-content-category').is(':checked') ? 1 : 0;
      this.authService.globalSearch(q,title_filter_all,title_filter_sort,title_filter_source,title_filter_category,content_filter_all,content_filter_sort,content_filter_source,content_filter_category).subscribe(data => {
          if(data){
            console.log(data);
            this.store.setSearchStore(data);
              this.content = data.news_feed_content;
              this.total_content = this.content.length;
              this.title = data.news_feed_title;
              this.total_title = this.title.length;
              this.total_results = this.content.length + this.title.length;
              this.users = data.users;
          }
      },error =>{
          console.log('Connection error');
      });
  }

  public handleCloseBtnClick() {
    this.location.back();      
  }

  public tabClick(tab) {
    this.mobileTabVisible = tab
  }
}
