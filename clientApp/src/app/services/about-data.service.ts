import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { About } from '../models/about';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutDataService {

  constructor(private httpClient: HttpClient) { }


  dataLink:string = environment.baseServerURL;

  getAboutData(): Observable<About[]>{
    return this.httpClient.get<About[]>(this.dataLink + 'about');
  }
}
