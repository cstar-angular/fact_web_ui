import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth.service';
@Injectable()
export class AnalyticService {
    constructor(private authService: AuthService) { }
    updateStats(page: string) {
        if (page) {
            this.authService.analytics(page).subscribe(
            data => {

            });
        }
    }
}
