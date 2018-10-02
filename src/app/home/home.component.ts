import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeysPipe } from '../core/keys-pipe.pipe';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';
import { AnalyticService } from '../core/analytics.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import swal from 'sweetalert2';
import { NewsStorage } from '../storage/news.storage';
import { NgxCarousel } from 'ngx-carousel';
import { NewsService } from '../services/news/news.service';
import { HttpClient } from '@angular/common/http';

declare var jquery: any;
declare var $: any;

interface article
{
    category: string;
    content: string;
    created_at: Date;
    title: string;
    description: string;
    id: string
    image_url: string;
    url: string
}
@Injectable()

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit
{
    public carouselOne: NgxCarousel;
    public check_data_storage = 1;
    public user_categories: Array<any>;
    public categories: Array<any>;
    public sources: Array<any>;
    public q = '';
    public result: Array<any> = [];
    public other_news: Array<any> = [];
    public user_sources: Array<any>;
    public twitter_feed: Array<any>;
    public itemsPerPage = 0;
    public auth = 0;
    public no_data = 0;
    public page = 1;
    public current_page = 1;
    public last_page = 1;
    public nextpage = 2;
    public selected_category: Array<any> = [];
    public selected_source: Array<any> = [];
    public filter_type = 1;
    public scroll_value = 0;
    public left_ad: any;
    public right_ad: any;
    public activeCelebsTab = 2;
    public banner_width = 1;
    public isLoading: boolean = false;
    public allNewsUrls = [
        {
            sourceName: 'Kanal5',
            categories: [
                {
                    name: 'News',
                    url: 'https://kanal5.com.mk/rss.aspx?id=1'
                },
                {
                    name: 'Macedonia',
                    url: 'https://kanal5.com.mk/rss.aspx?id=2'
                },
                {
                    name: 'World',
                    url: 'https://kanal5.com.mk/rss.aspx?id=3'
                },
                {
                    name: 'Culture',
                    url: 'https://kanal5.com.mk/rss.aspx?id=7'
                },
                {
                    name: 'Magazine',
                    url: 'https://kanal5.com.mk/rss.aspx?id=25'
                },
                {
                    name: 'Fun',
                    url: 'https://kanal5.com.mk/rss.aspx?id=4'
                },
                {
                    name: 'ShowBiz',
                    url: 'https://kanal5.com.mk/rss.aspx?id=5'
                },
                {
                    name: 'Life',
                    url: 'https://kanal5.com.mk/rss.aspx?id=6'
                },
                {
                    name: 'Automotive',
                    url: 'https://kanal5.com.mk/rss.aspx?id=26'
                },
                {
                    name: 'Health',
                    url: 'https://kanal5.com.mk/rss.aspx?id=27'
                },
                {
                    name: 'Sport',
                    url: 'https://kanal5.com.mk/rss.aspx?id=8'
                },
                {
                    name: 'Football',
                    url: 'https://kanal5.com.mk/rss.aspx?id=9'
                },
                {
                    name: 'Basketball',
                    url: 'https://kanal5.com.mk/rss.aspx?id=10'
                },
                {
                    name: 'Handball',
                    url: 'https://kanal5.com.mk/rss.aspx?id=11'
                },
                {
                    name: 'F1',
                    url: 'https://kanal5.com.mk/rss.aspx?id=12'
                },
                {
                    name: 'Ski',
                    url: 'https://kanal5.com.mk/rss.aspx?id=13'
                },
                {
                    name: 'Tennis',
                    url: 'https://kanal5.com.mk/rss.aspx?id=14'
                },
                {
                    name: 'NBA',
                    url: 'https://kanal5.com.mk/rss.aspx?id=15'
                },
                {
                    name: 'Other sports',
                    url: 'https://kanal5.com.mk/rss.aspx?id=16'
                }
            ]
        },
        {
            sourceName: 'Press24',
            categories: [
                {
                    name: 'Macedonia',
                    url: 'http://press24.mk/taxonomy/term/3/feed'
                },
                {
                    name: 'Politics',
                    url: 'http://press24.mk/taxonomy/term/12/feed'
                },
                {
                    name: 'Business',
                    url: 'http://press24.mk/taxonomy/term/4/feed'
                },
                {
                    name: 'World',
                    url: 'http://press24.mk/taxonomy/term/6/feed'
                },
                {
                    name: 'Region',
                    url: 'http://press24.mk/taxonomy/term/11/feed'
                },
                {
                    name: 'Sport',
                    url: 'http://press24.mk/taxonomy/term/10/feed'
                },
                {
                    name: 'Fun',
                    url: 'http://press24.mk/taxonomy/term/9/feed'
                },
                {
                    name: 'Tech',
                    url: 'http://press24.mk/taxonomy/term/7/feed'
                },
                {
                    name: 'Interview',
                    url: 'http://press24.mk/taxonomy/term/14/feed'
                }
            ]
        },
        {
            sourceName: 'MakFaks',
            categories: [
                {
                    name: 'Macedonia',
                    url: 'https://makfax.com.mk/makedonija/feed/'
                },
                {
                    name: 'Politics',
                    url: 'https://makfax.com.mk/politika/feed/'
                },
                {
                    name: 'Region',
                    url: 'https://makfax.com.mk/regioni/feed/'
                },
                {
                    name: 'Skopje',
                    url: 'https://makfax.com.mk/skopje/feed/'
                },
                {
                    name: 'Svet',
                    url: 'https://makfax.com.mk/svet/feed/'
                },
                {
                    name: 'Europe',
                    url: 'https://makfax.com.mk/svet/evropa/feed/'
                },
                {
                    name: 'Economics',
                    url: 'https://makfax.com.mk/ekonomija/feed/'
                },
                {
                    name: 'Stocks',
                    url: 'https://makfax.com.mk/ekonomija/berzi/feed/'
                },
                {
                    name: 'Sport',
                    url: 'https://makfax.com.mk/sport/feed/'
                },
                {
                    name: 'Culture',
                    url: 'https://makfax.com.mk/kultura/feed/'
                },
                {
                    name: 'Fun',
                    url: 'https://makfax.com.mk/zanimlivosti/feed/'
                },
            ]
        },
        {
            sourceName: 'Faktor',
            categories: [
                {
                    name: 'Economics',
                    url: 'https://faktor.mk/feed/ekonomija',
                },
                {
                    name: 'Finance',
                    url: 'https://faktor.mk/feed/finansii',
                },
                {
                    name: 'Macedonia',
                    url: 'https://faktor.mk/feed/makedonija',
                },
                {
                    name: 'Region',
                    url: 'https://faktor.mk/feed/balkan',
                },
                {
                    name: 'World',
                    url: 'https://faktor.mk/feed/svet',
                },
                {
                    name: 'Style',
                    url: 'https://faktor.mk/feed/stil',
                },
            ]
        }
    ];

    public categoriesArr = [];
    constructor(
        private _http: HttpClient,
        private router: Router,
        private token: TokenStorage,
        private authService: AuthService,
        private _newsService: NewsService,
        private _newsStore: NewsStorage,
        private analytics: AnalyticService,
        private newsStorage: NewsStorage,
        private _flashMessagesService: FlashMessagesService
    )
    { }


    ngOnInit()
    {
        // this._http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftime.mk%2Frss%2Fmakedonija')
        //     .subscribe(data => console.log(data), error => console.log(error));
        this._newsService.getCategories()
            .subscribe(response => this.categories = response.data);

        this._newsService.getSources()
            .subscribe(response => this.sources = response.data);

        this.carouselOne = {
            grid: { xs: this.banner_width, sm: 2, md: 2, lg: 2, all: 0 },
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

        this.analytics.updateStats('home');
        if (this.token.getToken() != null)
        {
            this.auth = 1;
            this.authService.attemptUserCategory().subscribe(
                data =>
                {
                    this.user_categories = data.user_categories;
                    for (let i = 0; i < this.user_categories.length; i++)
                    {
                        this.selected_category.push(this.user_categories[i].category_id);
                    }
                    const category: any = document.getElementsByClassName("js-query-search-category");

                    for (var i = 0; i < category.length; i++)
                    {
                        if (this.selected_category.find(id => category[i].value == id))
                        {
                            category[i].checked = true;
                        }
                        if (category[i]['checked'] == true)
                        {
                            this.selected_category.push(category[i]['value']);
                        }
                    }
                });
            this.authService.attemptUserSource().subscribe(
                data =>
                {
                    this.user_sources = data.user_sources;
                    for (let i = 0; i < this.user_sources.length; i++)
                    {
                        this.selected_source.push(this.user_sources[i].source_id);
                    }
                    const source: any = document.getElementsByClassName("js-query-search-source");

                    for (var i = 0; i < source.length; i++)
                    {
                        if (this.selected_source.find(id => source[i].value == id))
                        {
                            source[i].checked = true;
                        }
                        if (source[i]['checked'] == true)
                        {
                            this.selected_category.push(source[i]['value']);
                        }
                    }

                });

        } else
        {
            this.auth = 0;
        }
        this.applyFilter('onload');
        this.twitter_api();
        this.authService.articleAds(1).subscribe(data =>
        {
            this.left_ad = data.ads_left[0];
            this.right_ad = data.ads_right[0];
        }, error =>
            {
                console.log(error);
            });

    }
    twitter_api()
    {
        this.authService.twitter().subscribe(
            data =>
            {
                this.twitter_feed = data;
            });
    }
    shareOnMyWall(post_id, status: number)
    {
        if (post_id)
        {
            let type: string = 'share';
            if (status == 1)
            {
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
            }).then((result) =>
            {
                if (result.value)
                {
                    this.authService.shareOnWall(post_id, type).subscribe(
                        data =>
                        {
                            this.page = 0,
                                this.itemsPerPage = 0;
                            this.applyFilter('onload');
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

    loadIframe(id: number)
    {
        if (id && this.token.getToken() != null)
        {
            this.authService.updateReadCount(id).subscribe(data =>
            {
                if (data.status === 200)
                {
                    this.router.navigate(['/iframe/' + id]);
                }
            });
        } else
        {
            this.router.navigate(['/iframe/' + id]);
        }
    }
    myWall()
    {
        this.authService.myWall().subscribe(
            data =>
            {

                this.result = data.data;
                // this.newsStorage.saveStore(data.data);
            });
    }

    applyLoggedInFilter(filter_code: number)
    {
        var filter = document.getElementsByClassName("logged_in_filter");
        for (var i = 0; i < filter.length; i++)
        {
            if (filter[i]['value'] == filter_code)
            {
                filter[i]['checked'] = true;
            } else
            {
                filter[i]['checked'] = false;
            }
        }
        this.applyFilter('manual');
    }
    applyFilter(status: string)
    {
        this.q = $('#js-query-q').val().trim();
        this.selected_category = [];
        var category = document.getElementsByClassName("js-query-search-category");
        for (var i = 0; i < category.length; i++)
        {
            if (category[i]['checked'] == true)
            {
                this.selected_category.push(category[i]['value']);
            }
        }
        this.selected_source = [];
        var source = document.getElementsByClassName("js-query-search-source");
        for (var i = 0; i < source.length; i++)
        {
            if (source[i]['checked'] == true)
            {
                this.selected_source.push(source[i]['value']);
            }
        }

        // if (this.user_categories.length && this.user_categories.length > 0)
        // {
        this.updateType('category');
        // }

        // if (this.user_sources.length && this.user_sources.length > 0)
        // {
        this.updateType('source');
        // }

        var type = document.getElementsByClassName("logged_in_filter");
        for (var i = 0; i < type.length; i++)
        {
            if (type[i]['checked'] == true)
            {
                this.filter_type = type[i]['value'];
            }
        }
        if (status != 'interval')
        {
            this.authService.homeFeedPaginate(this.q, this.selected_category, this.selected_source, this.filter_type, this.page, status).subscribe(
                data =>
                {
                    this.result = data.news.data;
                    this.newsStorage.saveStore(data.news.data);

                    this.other_news = data.other_news.data;
                    this.last_page = data.news.last_page;
                });
        }
    }
    lazyload(ev)
    {
        this.applyFilter('interval');

        this.isLoading = true;
        let loadMoreBtn = document.getElementById("js-load-more");
        $('html, body').animate({
            scrollTop: $(loadMoreBtn).offset().top - window.innerHeight + 300 + 'px'
        }, 200);

        // this.allNewsUrls
        //     .forEach(source => source.categories
        //         .forEach(cat =>
        //         {
        //             this._http.get(cat.url).subscribe(response =>
        //             {
        //                 console.log(response);
        //                 // const parser = new DOMParser();
        //                 // const xml = parser.parseFromString(this.xml, 'text/xml');
        //                 // const obj = this.ngxXml2jsonService.xmlToJson(xml);
        //                 // console.log(obj);
        //                 this.isLoading = false;
        //             });
        //             if (this.categoriesArr.indexOf(cat.name) === -1)
        //             {
        //                 this.categoriesArr.push(cat.name);
        //             }
        //         }));

        if (this.nextpage <= this.last_page)
        {
            // this._newsService.getNews({ page: this.nextpage }).subscribe(data => data.news.last_page);
            this.authService.homeFeedPaginate(this.q, this.selected_category, this.selected_source, this.filter_type, this.nextpage, 'manual').subscribe(
                data =>
                {
                    console.log(data);
                    this.isLoading = false;
                    if (data)
                    {
                        // this.newsStorage.saveStore(data.data);
                        for (let i = 0; i < data.news.data.length; i++)
                        {

                            this.result.push(data.news.data[i]);
                        }
                        this.other_news = data.other_news.data;
                        // if(this.other_news.length <= 0){
                        //     $('body').addClass('add-sticky');
                        // }else{
                        //     $('body').removeClass('add-sticky');
                        // }

                        // var scroll = $(window).scrollTop();
                        // $('html, body').animate({
                        //     scrollTop: scroll
                        // }, 1000);
                    }
                    this.nextpage += 1;
                    this.last_page = data.news.last_page;
                },
                error =>
                {
                    this.isLoading = false;
                    this.router.navigate(['']);
                }
            );
        } else
        {
            $('#js-load-more').html('That\'s all');
            this.isLoading = false;
        }
    }

    public handleCelebsTabClick(celebTab: any)
    {
        this.activeCelebsTab = celebTab;
    }

    updateType(type: string)
    {
        if (type === 'category')
        {
            if (this.selected_category.length > 0)
            {
                this.authService.updateUserCategory(this.selected_category).subscribe(data =>
                {
                    if (data)
                    {
                        this.selected_category.splice(0, this.selected_category.length);
                    }
                }, error =>
                    {
                        console.log(error);
                    }
                );
            } else
            {
                scroll(0, 0);
                this._flashMessagesService.show('Please select atleast one category !', { cssClass: 'alert-danger', timeout: 5000 });
            }
        } else if (type === 'source')
        {
            if (this.selected_source.length > 0)
            {
                this.authService.updateUserSource(this.selected_source).subscribe(data =>
                {
                    if (data)
                    {
                        this.selected_source.splice(0, this.selected_source.length);
                    }
                }, error =>
                    {
                        console.log(error);
                    }
                );
            } else
            {
                scroll(0, 0);
                this._flashMessagesService.show('Please select atleast one source !', { cssClass: 'alert-danger', timeout: 5000 });
            }
        }
    }

}
