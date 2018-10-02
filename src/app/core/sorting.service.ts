import { Injectable } from '@angular/core';
import { NewsStorage } from '../storage/news.storage';

@Injectable()
export class SortingServilce
{
    private searcData = this.store.getSearchAll();
    constructor(private store: NewsStorage) { }

    private searchBy(property: string, sorting: string): any[]
    {
        let sortBy: string;
        switch (sorting)
        {
            case 'source':
                sortBy = 'source_id';
                break;
            case 'category':
                sortBy = 'category_id';
                break;
            default:
                sortBy = 'published_date_timestamp';
                break;
        }

        const PROPERTY = property === 'title' ? 'news_feed_title' : 'news_feed_content';
        const SEARCH_RESULT = this.store.getSearchAll()[PROPERTY];
        const RESULT = SEARCH_RESULT.sort((a, b) => a[sortBy] - b[sortBy]);

        return RESULT;
    }


    public filterByRecentTitle(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('title', 'date');
        return reverse ? RESULT : RESULT.reverse();
    }


    public filterBySourceTitle(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('title', 'source');
        return reverse ? RESULT : RESULT.reverse();
    }


    public filterByCategoryTitle(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('title', 'category');
        return reverse ? RESULT : RESULT.reverse();
    }


    public filterByRecentContent(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('content', 'date');
        return reverse ? RESULT : RESULT.reverse();
    }


    public filterBySourceContent(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('content', 'source');
        return reverse ? RESULT : RESULT.reverse();
    }


    public filterByCategoryContent(reverse: boolean): any[]
    {
        const RESULT = this.searchBy('content', 'category');
        return reverse ? RESULT : RESULT.reverse();
    }
}
