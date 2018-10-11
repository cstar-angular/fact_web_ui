import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import
{
    HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { KeysPipe } from '../core/keys-pipe.pipe';
import { TokenStorage } from '../core/token.storage';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import { AuthService } from '../core/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var jquery: any;
declare var $: any;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_HEADER_KEY = 'Authorization';

interface FileReaderEventTarget extends EventTarget
{
    result: string
}

interface FileReaderEvent extends Event
{
    target: FileReaderEventTarget;
    getMessage(): string;
}


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
    url: any;
    result: any;
    name: any;
    auth = 0;
    username: string;
    image: any;
    categories: any;
    user_categories: any;
    selectedFile: File = null;
    show_top_category: number = 0;
    selected_user_categories: Array<any> = [];
    selected_categories: Array<any> = [];
    sources: any;
    user_sources: any;
    selected_user_sources: Array<any> = [];
    category_status: number = 0;
    user_category_status: number = 0;
    user_source_status: number = 0;
    source_status: number = 0;
    selected_sources: Array<any> = [];
    profile_feed: Array<any> = [];
    //pagination
    page: number = 1;
    current_page: number = 1;
    last_page: number = 1;
    nextpage: number = 2;
    sort_status: string = 'asc';
    profile_name: string;

    constructor(
        private http: HttpClient, private router: Router, private token: TokenStorage,
        private authService: AuthService, private _flashMessagesService: FlashMessagesService
    )
    {

    }

    ngOnInit()
    {

        $(".modal-backdrop").hide();
        //profile page
        this.getLatestFeed();
        this.authService.attemptProfile().subscribe(
            data =>
            {
                console.log('aaaaa');
                console.log(data);
                this.auth = 1;
                this.result = data;
                this.profile_name = data.first_name;
                this.name = data.username;
                this.url = data.cover_image;
            },
            error =>
            {
                this.router.navigate(['']);
            }
        );
        //user selected category


        this.getUserCategory();
        this.authService.attemptCategory().subscribe(
            data =>
            {
                this.categories = data.data;
                for (var i = 0; i < this.categories.length; i++)
                {
                    if (this.selected_categories.indexOf(this.categories[i]['id']) >= 0)
                    {
                        this.categories[i]['selected'] = true;
                    } else
                    {
                        this.categories[i]['selected'] = false;
                    }
                }
                if (this.categories.hasOwnProperty(0))
                {
                    this.category_status = 1;
                }
            },
            error =>
            {
                this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
            }
        );
        this.getUserSource();
        //sources
        this.authService.attemptSource().subscribe(
            data =>
            {
                this.sources = data.data;
                for (var i = 0; i < this.sources.length; i++)
                {
                    if (this.selected_sources.indexOf(this.sources[i]['id']) >= 0)
                    {
                        this.sources[i]['selected'] = true;
                    } else
                    {
                        this.sources[i]['selected'] = false;
                    }
                }
            },
            error =>
            {
                this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
            }
        );
        // on load ends
    }
    shareOnMyWall(post_id, status: number)
    {
        if (post_id)
        {
            let type: string = 'share';
            let message = "This post has been shared on your wall";
            if (status == 1)
            {
                type = 'remove';
                message = "This post has been removed from your wall";
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
                                scroll(0, 0);
                            this.getLatestFeed();

                            swal(
                                message,
                                '',
                                'success'
                            )
                        }
                    );
                }

            });
        }
    }
    getLatestFeed(type: string = null)
    {
        this.authService.profileFeed(type).subscribe(
            data =>
            {
                this.profile_feed = data.news_feed.data;
                this.current_page = data.news_feed.current_page;
                this.last_page = data.news_feed.last_page;
            },
            error =>
            {
                //this.router.navigate(['']);
            }
        );
    }

    updatename()
    {
        $('.user-profile-details-edit').addClass('active');
    }
    updateBxclose()
    {
        $('.user-profile-details-edit').removeClass('active');
    }

    onFileSelected(event)
    {
        this.selectedFile = <File>event.target.files[0];
    }

    store()
    {
        if (this.name)
        {
            $(".original").hide();
            if (this.selectedFile != null)
            {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name);
                this.authService.updateProfile(fd).subscribe(
                    data =>
                    {
                        $('#js-profile-image').attr('src', data['image']);
                        this.updateBxclose();
                    }, error =>
                    {

                    }
                );
            }

            this.authService.updateProfilename(this.name).subscribe(
                data =>
                {
                    this.profile_name = data['username'];
                    this.updateBxclose();
                }, error =>
                {
                    console.log(error);
                }
            );
        }
    }
    //show hide category/source
    showAllCategory()
    {
        if ($('#js-top-categories').css('display') == 'none')
        {
            $('#js-top-categories').fadeIn(400);
            $('#js-top-categories__btn').addClass('--active');
        } else
        {
            $('#js-top-categories').fadeOut(400);
            $('#js-top-categories__btn').removeClass('--active');
        }
    }
    showAllSource()
    {
        if ($('#js-top-sources').css('display') == 'none')
        {
            $('#js-top-sources').fadeIn(400);
            $('#js-top-sources__btn').addClass('--active');
        } else
        {
            $('#js-top-sources').fadeOut(400);
            $('#js-top-sources__btn').removeClass('--active');
        }
    }
    //ends
    getUserSource()
    {
        //user sources
        this.authService.attemptUserSource().subscribe(
            data =>
            {
                this.user_sources = data.user_sources;
                for (var i = 0; i < this.user_sources.length; i++)
                {
                    this.selected_sources.push(this.user_sources[i].source_id);
                }
            },
            error =>
            {
                this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
            }
        );
    }
    getUserCategory()
    {
        this.authService.attemptUserCategory().subscribe(
            data =>
            {
                this.user_categories = data.user_categories;
                for (let i = 0; i < this.user_categories.length; i++)
                {
                    this.selected_categories.push(this.user_categories[i].category_id);
                }
                if (this.user_categories.hasOwnProperty(0))
                {
                    this.user_category_status = 1;
                }

            },
            error =>
            {
                this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
            }
        );
    }
    //getting checked value on click
    checkedList(type: string, id: number = 0)
    {
        if (type == 'category')
        {
            var index = this.selected_categories.indexOf(id);
            if ($('#js-category-' + id).is(':checked'))
            {
                if (index <= -1)
                {
                    this.selected_categories.push(id);
                }
            } else
            {
                this.selected_categories.splice(index, 1);
            }
        } else if (type == 'source')
        {
            var index = this.selected_sources.indexOf(id);
            if ($('#js-source-' + id).is(':checked'))
            {
                if (index <= -1)
                {
                    this.selected_sources.push(id);
                }
            } else
            {
                this.selected_sources.splice(index, 1);
            }
        } else
        {
            console.log('type', 'type not specified');
        }
    }
    updateType(type: string)
    {
        if (type === 'category')
        {
            if (this.selected_categories.length > 0)
            {
                this.authService.updateUserCategory(this.selected_categories).subscribe(data =>
                {
                    if (data)
                    {
                        this.selected_categories.splice(0, this.selected_categories.length);
                        this.getUserCategory();
                        this.showAllCategory();
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
            if (this.selected_sources.length > 0)
            {
                this.authService.updateUserSource(this.selected_sources).subscribe(data =>
                {
                    if (data)
                    {
                        this.selected_sources.splice(0, this.selected_sources.length);
                        this.getUserSource();
                        this.showAllSource();
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
    lazyload(ev)
    {
        if (ev.body != null)
        {
            if (ev.target.offsetHeight + ev.target.scrollTop >= ev.target.scrollHeight + 2)
            {
                if (this.nextpage <= this.last_page)
                {
                    this.authService.profileFeedPaginate(this.nextpage).subscribe(
                        data =>
                        {
                            this.profile_feed.push(data.news_feed.data);
                            this.nextpage += 1;
                            this.last_page = data.news_feed.last_page;
                        },
                        error =>
                        {
                            this.router.navigate(['']);
                        });
                }
            }
        }
    }
    checkFilter(sort: string)
    {
        this.getLatestFeed(sort);
    }
    checkAll(status)
    {
        $('.js-all-recent').prop('checked', true);
    }
    onSelectFile(event)
    { // called each time file input changes      if (event.target.files && event.target.files[0]){
        var reader = new FileReader();
        this.selectedFile = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (fre: FileReaderEvent) =>
        { // called once readAsDataURL is completed
            this.url = fre.target.result;
        }
        this.updateCover();
    }
    updateCover()
    {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.authService.updateProfileCover(fd).subscribe(
            data =>
            {

            },
            error =>
            {

            }
        );
    }
}
