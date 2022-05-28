import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtProjectMain, ArtProjects } from '../models/art-education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtEducationService {

  dataLink:string = environment.baseServerURL;

  constructor(private httpClient:HttpClient) { }


  getArtEducationProject():Observable<ArtProjects[]>{
    return this.httpClient.get<ArtProjects[]>(this.dataLink + 'art-project-list');
  }


  getArtEducationProjectDetails(projectid:string):Observable<ArtProjectMain>{
    return this.httpClient.get<ArtProjectMain>(this.dataLink + `art-education/${projectid}`);
  }
}
