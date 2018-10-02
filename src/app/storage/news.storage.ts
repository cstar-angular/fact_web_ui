import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NewsStorage {

    private store = [];

    public searchTerm = '';
    private searchStore: any;
    public saveStore = (news: any) => this.store = news;
    public getAll = () => new Observable(observer => observer.next(this.store));


    public setSearchStore = (search: any) => this.searchStore = search;
    public getSearchAll = () => this.searchStore;
}
