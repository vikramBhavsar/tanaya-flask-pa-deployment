import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog, BlogDetails, BlogSection, BlogSectionForUpdate } from '../models/blog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  dataLink:string = environment.baseServerURL;

  constructor(private httpClient:HttpClient) { }


  getBlogsList():Observable<Blog[]>{
    // Although the link is called --create blog its calling a get function only
    return this.httpClient.get<Blog[]>(this.dataLink + 'list-blog');
  }


  getSingleBlogDetails(blogID:string):Observable<BlogDetails>{
    return this.httpClient.get<BlogDetails>(this.dataLink + `blog-detail/${blogID}`);
  }


  createNewBlog(blogDetails:Blog):Observable<Blog>{
    return this.httpClient.post<Blog>(this.dataLink + 'create-blog',blogDetails,this.httpOptions);
  }

  createBlogSection(blogSection:BlogSection):Observable<BlogSection>{
    return this.httpClient.post<BlogSection>(this.dataLink + 'create-blog-section',blogSection,this.httpOptions);
  }

  updateTextBlogSection(blogSection:BlogSectionForUpdate,id:string):Observable<BlogSection>{
    return this.httpClient.put<BlogSection>(this.dataLink + `blog-section/${id}`,blogSection,this.httpOptions);
  }

  deleteBlogSection(blogSectionID:string):Observable<any>{
    return this.httpClient.delete(this.dataLink + `blog-section/${blogSectionID}`);
  }

  deleteMediaFromMediaGroup(mediaInMediaGID:string):Observable<any>{
    return this.httpClient.delete(this.dataLink + `media-group-delete/${mediaInMediaGID}`);
  }

  // for uploading Media
  createNewImageSection(mediaFormData:FormData):Observable<any>{
    return this.httpClient.post(this.dataLink + 'create-blog-section',mediaFormData)
  }

  // for uploading Media
  createMediaGroupImageSection(mediaFormData:FormData):Observable<any>{
    return this.httpClient.post(this.dataLink + 'media-group-create',mediaFormData)
  }


  getBlogByID(blogID:string):Observable<Blog>{
    return this.httpClient.get<Blog>(this.dataLink + `blog/${blogID}`);
  }
}
