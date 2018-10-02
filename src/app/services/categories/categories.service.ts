import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categories } from './categories.paths';

@Injectable({ providedIn: 'root' })
export class CategoriesService
{
    constructor(private _http: HttpClient) { }

    public getUserCategory = () =>
    this._http.get(environment.api + Categories.get)

    public updateUserCategories = (params: any) =>
        this._http.post(environment.api + Categories.update, params)
}

interface UpdateModel
{
    id: number;
    sensitivity_percents: number;
}
