import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectGLRY, ProjectModel, ServerData } from '../models/project-contents';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryDataService {

  dataLink:string = environment.baseServerURL;


  home_URLS_list!: string[];
  project_URLS_list!: string[];

  constructor(private httpClient: HttpClient) {}

  // This gets the list of all URLS on for main page.
  getUrls() {
    let listOfURLs = ['/home', '/about', '/contact'];
    return listOfURLs;
  }

  // This gets list of all projects available in gallery
  getGalleryProject() {
    let listOfProjectURLs = ['project 1', 'project 2', 'project 3'];
    return listOfProjectURLs;
  }

  getGalleryData(projectID:string): Observable<ProjectGLRY> {
    return this.httpClient.get<ProjectGLRY>(this.dataLink + `single-project/${projectID}`);
  }

  getProjectList():Observable<ProjectModel[]>{
    return this.httpClient.get<ProjectModel[]>(this.dataLink + 'project-list');
  }
}
