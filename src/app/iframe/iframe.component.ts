import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import {AnalyticService} from "../core/analytics.service";
import { HeaderComponent } from '../header/header.component';
import { SafePipe } from '../core/safe-pipe.pipe';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {

  constructor(private authService: AuthService,private route: ActivatedRoute,private analytics: AnalyticService) { }
  id : number;
  url : string;
  loading : number = 0;
  ads : Array<any> = [];
  left_ad : any;
  right_ad : any;
  ngOnInit() {
      this.analytics.updateStats('iframe');
      this.id = this.route.snapshot.params.id;
      this.authService.iframe(this.id).subscribe(data => {
          this.url = data.data.url.trim();
          var iframe = document.createElement('iframe');
          iframe.setAttribute("src", this.url);
          this.loading = 1;
      },error=>{
            //console.log(error);
      });
      this.authService.articleAds(2).subscribe(data => {
         this.left_ad = data.ads_left[0];
         this.right_ad = data.ads_right[0];
      },error=>{
            //console.log(error);
      });

  }
  updateClick(ad_id,external_url){
      this.authService.updateClickCount(ad_id).subscribe(data => {
          if(data.status == 200){
              window.open(external_url);
          }
      });
  }

}
