import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';
import { BlogService } from '../services/blog.service';
import { BlogDetails } from '../models/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private ProjectIDService: GalleryProjectIDService,
    private blogService: BlogService
  ) {}

  // **** variable which stores current BLOG ID from subscribe
  // **** Provided by the parent component
  curBlog: string = '';

  // **** VIEW CHILD USED FOR IMAGE MODAL
  @ViewChild('imgModal') imgModal!: ElementRef;

  // **** VARIABLES USED FOR OPENING THE IMAGE PROPERLY
  curImgLink: string = '';
  curImgStatus: string = 'some wonderful text';

  blogProject: BlogDetails = {
    id: '0',
    blogName: '',
    blog_sections: [],
    isPublished: false,
  };

  ngOnInit(): void {
    // Setting the service for BLOG ID subscription
    this.ProjectIDService.getBlogMessage().subscribe((msg) => {
      this.curBlog = msg;
      this.initializerBlogData();
    });
  }

  initializerBlogData() {


    if(this.curBlog != '-1'){
      try {
        let that = this;
        this.blogService.getSingleBlogDetails(this.curBlog).subscribe({
          next(res) {
            that.blogProject = res;
            console.log(that.blogProject);
          },
          error(msg) {
            // alert(`Error occurred: ${msg.status} : ${msg.details}`)
            console.log(msg);
          },
        });
        
      } catch (error) {
      }
    }

  }

  // Function to open image
  openImage(imgUrl: string, imgDetails: string) {
    this.imgModal.nativeElement.classList.toggle('active');
    this.curImgLink = imgUrl;
    this.curImgStatus = imgDetails;
  }

  // FUNCTION TO CLOSE THE IMAGE
  closeModalImage() {
    this.imgModal.nativeElement.classList.toggle('active');
  }
}
