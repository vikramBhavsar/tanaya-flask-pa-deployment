import { Component, OnInit } from '@angular/core';
import { AboutDataService } from '../services/about-data.service';
import { About } from '../models/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private aboutDataService : AboutDataService) { }

  aboutContents:About[] = [{
    about_heading :'',
    about_content :'',
    mediaFile :'',
  }]
  ngOnInit(): void {

    this.initializeData();
  }


  // This will initial the page with about content
  initializeData(){

    let that = this;
    this.aboutDataService.getAboutData().subscribe({
      next(res){
        that.aboutContents = res;
      },
      error(msg){
        alert(`ERROR OCURRED: ${msg.status} - ${msg.details}`);
        console.log(msg)
      }
    });

    this.aboutDataService.getAboutData().subscribe(res =>{

    })
  }

}
