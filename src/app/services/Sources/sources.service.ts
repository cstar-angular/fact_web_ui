import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Sources } from './sources.paths';

@Injectable({ providedIn: 'root' })
export class SourcesService
{
    language: string = localStorage.getItem('language');

    constructor(private _http: HttpClient) { }

    public getUserSources = () =>
        this._http.get(environment.api + Sources.get, {params: {'language': this.language }})
    public updateUserSources = (params: any) =>
        this._http.post(environment.api + Sources.update, params)
}

interface UpdateModel
{
    id: number;
    sensitivity_percents: number;
}
