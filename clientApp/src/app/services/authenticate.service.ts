import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  url:string = environment.baseServerURL;

  performLogin(username:string,password:string): Observable<any>{
    return this.http.post(this.url + 'token',{username,password}); 
  }


  refreshToken(refresh:string): Observable<any>{
    return this.http.post(this.url+'refresh',{refresh:refresh});
  }
}
