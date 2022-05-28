import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryProjectIDService {
  private projectID = new BehaviorSubject<string>('-1');

  private artProjectID = new BehaviorSubject<string>('-1');

  private blogID = new BehaviorSubject<string>('-1');

  private blogMgmnID = new BehaviorSubject<string>('-1');

  constructor() {}

  // *** Used for Art Project
  public getArtMessage(): Observable<string> {
    return this.artProjectID.asObservable();
  }

  public updateArtMessage(message: string): void {
    this.artProjectID.next(message);
  }

  // Used for gallery Project
  public getMessage(): Observable<string> {
    return this.projectID.asObservable();
  }

  public updateMessage(message: string): void {
    this.projectID.next(message);
  }

  // Used for Blogs
  public getBlogMessage(): Observable<string> {
    return this.blogID.asObservable();
  }

  public updateBlogMessage(message: string): void {
    this.blogID.next(message);
  }


  // Used for Blogs management
  public getBlogMgmnMessage(): Observable<string> {
    return this.blogMgmnID.asObservable();
  }

  public updateBlogMgmnMessage(message: string): void {
    this.blogMgmnID.next(message);
  }
}
