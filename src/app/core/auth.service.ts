import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../core/token.storage';

import { setting } from '../core/setting';
import { environment } from '../../environments/environment';
import { lang } from 'moment';

@Injectable()
export class AuthService
{
    language: string = localStorage.getItem('language');

    constructor(private http: HttpClient, private token: TokenStorage)
    {
    }

    //private userprofileUrl = 'http://factapi.venturedemos.com/api/profile';

    attemptAuth(l_username: string, l_password: string, client_secret: string, grant_type: string, client_id: string): Observable<any>
    {
        const credentials = { username: l_username, password: l_password, client_secret: client_secret, grant_type: grant_type, client_id: client_id };
        return this.http.post<any>(setting.apiSiteUrl + 'oauth/token', credentials);
    }

    attemptRegister(first_name: string, last_name: string, email: string, gender: string, dob: string, username: string, password: string): Observable<any>
    {
        const credentials = { first_name: first_name, last_name: last_name, email: email, username: username, gender: gender, password: password };
        return this.http.post<any>(setting.apiUrl + 'signup', credentials);
    }

    attemptProfile(): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'profile');
    }

    topNews(): Observable<any>
    {
        return this.http.get<any>(setting.apiSiteUrl + 'top_news', {params: {'language': this.language }});
    }
    twitter(): Observable<any>
    {
        return this.http.get<any>(setting.apiSiteUrl + 'twitter_feed', {params: {'language': this.language }});
    }
    getLogoutProfile(): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'logout');
    }
    updateProfile(image: any): Observable<any>
    {
        return this.http.post<any>(setting.apiUrl + 'updateprofile', image);
    }
    updateProfileCover(image: any): Observable<any>
    {
        return this.http.post<any>(setting.apiUrl + 'update_profile_cover', image);
    }
    updateProfilename(name: string): Observable<any>
    {
        const credentials = { name: name };
        return this.http.post<any>(setting.apiUrl + 'updateprofile', credentials);
    }
    attemptCategory(): Observable<any>
    {
        return this.http.get<any>(environment.api + 'category', {params: {'language': this.language }});
    }
    attemptUserCategory(): Observable<any>
    {
        return this.http.get<any>(environment.api + 'user_category', {params: {'language': this.language }});
    }
    updateUserCategory(selected_user_categories: Array<any>): Observable<any>
    {
        const credentials = { selected_user_categories: selected_user_categories };
        return this.http.post<any>(environment.api + 'update_user_category', credentials);
    }
    search(q: string, category: Array<any>, source: Array<any>, type: string): Observable<any>
    {
        const credentials = { q: q, category: category, source: source, type: type, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'search_news', credentials);
    }
    attemptSource(): Observable<any>
    {
        return this.http.get<any>(environment.api + 'sourceindex', {params: {'language': this.language }});
    }
    attemptUserSource(): Observable<any>
    {
        return this.http.get<any>(environment.api + 'user_source', {params: {'language': this.language }});
    }
    updateUserSource(selected_user_sources: Array<any>): Observable<any>
    {
        const credentials = { selected_user_sources: selected_user_sources };
        return this.http.post<any>(environment.api + 'update_user_source', credentials);
    }
    globalSearch(q: any, title_all: any, title_sort: any, title_source: any, title_category: any, content_all: any, content_sort: any, content_source: any, content_category: any): Observable<any>
    {
        const credentials = {
            q: q,
            title_all: title_all,
            title_sort: title_sort,
            title_source: title_source,
            title_category: title_category,
            content_all: content_all,
            content_sort: content_sort,
            content_source: content_source,
            content_category: content_category,
            language: this.language
        };
        return this.http.post<any>(setting.apiUrl + 'global_search', credentials);
    }
    shareOnWall(post_id: any, type: any): Observable<any>
    {
        const credentials = { post_id: post_id, type: type, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'share_on_wall', credentials);
    }
    myWall(): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'mywall', {params: {'language': this.language }});
    }
    iframe(id: number): Observable<any>
    {
        const credentials = { id: id, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'iframe', credentials);
    }
    updateReadCount(id: number): Observable<any>
    {
        const credentials = { id: id };
        return this.http.post<any>(setting.apiUrl + 'update_read_count', credentials);
    }
    updateClickCount(id: number): Observable<any>
    {
        const credentials = { id: id };
        return this.http.post<any>(setting.apiUrl + 'update_adclick', credentials);
    }
    profileFeed(type: string): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'latest_news_profile?type=' + type + '&language=' + this.language);
    }
    profileFeedPaginate(page: number, type: string = null): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'latest_news_profile?page=' + page + '&type=' + type + '&language=' + this.language);
    }
    homeFeedPaginate(q: string, selected_category: Array<any>, selected_source: Array<any>, filter_type: number, page: number, status: string): Observable<any>
    {
        const credentials = { q: q, selected_category: selected_category, selected_source: selected_source, filter_type: filter_type, status: status, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'home_news_feed?page=' + page, credentials);
    }
    otherFeedPaginate(q: string, selected_category: Array<any>, selected_source: Array<any>, filter_type: number, page: number, status: string): Observable<any>
    {
        const credentials = { q: q, selected_category: selected_category, selected_source: selected_source, filter_type: filter_type, status: status, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'other_news_feed?page=' + page, credentials);
    }
    articleAds(type: number): Observable<any>
    {
        return this.http.get<any>(setting.apiUrl + 'ad/view/' + type + 'language=' + this.language);
    }
    analytics(page: string): Observable<any>
    {
        const credentials = { page: page, language: this.language };
        return this.http.post<any>(setting.apiUrl + 'analytics', credentials);
    }
    facebook_api(fb_id: any, accessToken: any, first_name: any, last_name: any, email: any, image: any): Observable<any>
    {
        const credentials = { fb_id: fb_id, accessToken: accessToken, first_name: first_name, last_name: last_name, email: email, image: image, login_by: 'facebook', language: this.language };
        return this.http.post<any>(setting.apiUrl + 'auth/facebook', credentials);
    }
    google_api(fb_id: any, accessToken: any, first_name: any, last_name: any, email: any, image: any): Observable<any>
    {
        const credentials = { fb_id: fb_id, accessToken: accessToken, first_name: first_name, last_name: last_name, email: email, image: image, login_by: 'facebook', language: this.language };
        return this.http.post<any>(setting.apiUrl + 'auth/google', credentials);
    }
}
