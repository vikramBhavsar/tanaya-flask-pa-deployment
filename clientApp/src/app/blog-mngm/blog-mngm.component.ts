import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Blog, BlogDetails, BlogSection, BlogSectionForUpdate } from '../models/blog';
import { BlogService } from '../services/blog.service';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';

@Component({
  selector: 'app-blog-mngm',
  templateUrl: './blog-mngm.component.html',
  styleUrls: ['./blog-mngm.component.scss'],
})
export class BlogMngmComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private ProjectIDService: GalleryProjectIDService
  ) {}

  // **** variable which stores current BLOG ID from subscribe
  // **** Provided by the parent component
  curBlog: string = '';

  // Variables used to add all the text
  sections: string[] = [];

  // This booleans are used for controlling form behaviour
  // ########### INFORMATION FOR THE BOOLEANS USED  // ###########
  // 0 = blog is created or not
  // 1 = create new text Section boolean.
  // 2 = edit existing text Sectoion boolean
  // 3 = create new Media Section boolean
  // 4 = Edit existing media Section booleam
  // 5 = Create new media GROUP section
  // 6 = edit new media GROUP section
  controlbooleans: boolean[] = [false, false, false, false, false];

  // Used for Creating Blog Name
  blogName = new FormControl('');

  currentBlog: BlogDetails = {
    id: '-1',
    blogName: '',
    blog_sections: [],
    isPublished: false,
  };

  // Text used for new text
  newSectionText = new FormControl('');

  // Text used when editing old text
  editingSectionText = new FormControl('');
  editingID: string ='';

  // MediaDescription
  mediaDescription = new FormControl('');

  // ** Global variable for storing the image
  imgFile?: File;

  // Used for section ID
  sectionIDforMediaGroup = new FormControl('');

  // Normal boolean to check if media type upload is video or image
  isVideo = false;

  // Video URL for video upload
  VideoURL = new FormControl('');

  ngOnInit(): void {
    // this.initializerBlogData();

    // Setting the service for BLOG ID subscription
    this.ProjectIDService.getBlogMgmnMessage().subscribe((msg) => {
      this.curBlog = msg;
      this.initializerBlogData();
    });
  }

  fileUploadInitiated(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imgFile = target.files?.item(0)!;

    if (this.imgFile) {
      console.log(this.imgFile);
    }
  }

  createTextSection() {
    this.controlbooleans[1] = !this.controlbooleans[1];
  }

  createMediaSection() {
    this.controlbooleans[3] = !this.controlbooleans[3];
  }

  createMediaGroupSection() {
    this.saveSection(true, 'MI');
  }

  createMediaGroup() {
    this.controlbooleans[5] = !this.controlbooleans[5];
  }

  editSection(idx: string) {

    for(let i = 0; i <this.currentBlog.blog_sections.length;i++ ){
      if(this.currentBlog.blog_sections[i].id == idx){
        this.editingSectionText.setValue(this.currentBlog.blog_sections[i].sectionText);
        this.controlbooleans[2] = true;
        this.editingID = idx;
      }
    }
  }

  saveSection(isNew: boolean, sectionType: string = 'T') {
    //  if default value meaning its new section to be saved
    if (isNew) {

      let blogSection: BlogSection = {
        id: '',
        sectionType: sectionType,
        sectionText: this.newSectionText.value,
        mediaURL: undefined,
        mediaDes: '',
        videoURL: '',
        blogID: this.currentBlog.id,
        media_group_section: [],
      };

      let that = this;
      this.blogService.createBlogSection(blogSection).subscribe({
        next(msg) {
          that.initializerBlogData();

          // Resetting the old values.
          that.controlbooleans[1] = false;
          that.newSectionText.setValue('');
        },
        error(msg) {
          alert(`Error Status: ${msg.status} - ${msg.details}`);
          console.log(msg);
        },
      });
    } else {
    // Empty implementation as this function is never called
    }
  }

  updateTextSection(id:string){
    for(let i = 0; i < this.currentBlog.blog_sections.length;i++){
      if(this.currentBlog.blog_sections[i].id == id){
        let blogSection:BlogSectionForUpdate  = {
          blogID: this.currentBlog.blog_sections[i].blogID,
          sectionText: this.editingSectionText.value,
          id : this.currentBlog.blog_sections[i].id
        } 
        
        //update it to database
        let that = this;
        this.blogService.updateTextBlogSection(blogSection,id).subscribe({
          next(msg) {
            that.initializerBlogData();
  
            // Resetting the old values.
            that.controlbooleans[2] = false;
            that.editingSectionText.setValue('');
          },
          error(msg) {
            alert(`Error Status: ${msg.status} - ${msg.details}`);
            console.log(msg);
          },
        });
      }
    }

  }

  saveMediaSection(isNew: boolean) {
    if (isNew) {
      if (this.isVideo) {
        // if we are uploading video

        const formData = new FormData();

        // Appending the video URL
        formData.append('videoURL',this.VideoURL.value);
        formData.append('mediaDes',this.mediaDescription.value);
        
        // Appending other values for the form
        formData.append('sectionType','V');
        formData.append('blogID', this.currentBlog.id);

        let that = this;

        //sending data to the server now.
        this.blogService.createNewImageSection(formData).subscribe({
          next(msg) {
            console.log(msg);

            // re-initializing the page data
            that.initializerBlogData();

            // Resetting the old values.
            that.isVideo = false;
            that.controlbooleans[3] = false;
            that.imgFile = undefined;
            that.mediaDescription.setValue('');
          },
          error(msg) {
            alert(`Error Reported: ${msg.status} - ${msg.details}`);
            console.log(msg);
          },
        });
      } else {
        // if we are uploading image
        const formData = new FormData();

        // Only append the file if already present
        if (this.imgFile) {
          formData.append('mediaURL', this.imgFile);

          // Appending other values for the form
          formData.append('mediaDes',this.mediaDescription.value);
          formData.append('sectionType', 'I');
          formData.append('blogID', this.currentBlog.id);

          let that = this;

          //sending data to the server now.
          this.blogService.createNewImageSection(formData).subscribe({
            next(msg) {
              console.log(msg);

              // re-initializing the page data
              that.initializerBlogData();

              // Resetting the old values.
              that.controlbooleans[3] = false;
              that.imgFile = new File([],'');
              that.mediaDescription.setValue('');
            },
            error(msg) {
              alert(`Error Reported: ${msg.status} - ${msg.details}`);
              console.log(msg);
            },
          });
        } else {
          console.log(this.imgFile);
          alert('File Not attached');
        }
      }
    }
  }

  saveMediaInGroup(isNew: boolean,sectionID:string) {

    if (isNew) {
      const formData = new FormData();

      // Only append the file if already present
      if (this.imgFile && sectionID != '') {
        formData.append('mediaURL', this.imgFile);
        formData.append('mediaDes',this.mediaDescription.value);
        // Appending other values for the form
        formData.append('sectionType', 'MI');
        formData.append('BlogSectionID',sectionID);

        let that = this;

        //sending data to the server now.
        this.blogService.createMediaGroupImageSection(formData).subscribe({
          next(msg) {
            console.log(msg);

            // re-initializing the page data
            that.initializerBlogData();

            // Resetting the old values.
            that.controlbooleans[5] = false;
            that.imgFile = new File([],'');
            that.sectionIDforMediaGroup.setValue('');
            that.mediaDescription.setValue('');
          },
          error(msg) {
            alert(`Error Reported: ${msg.status} - ${msg.details}`);
            console.log(msg);
          },
        });
      } else {
        console.log(this.imgFile);
        alert('File Not attached');
      }
    }
  }

  deleteSection(idx: string) {
    let that = this;
    this.blogService.deleteBlogSection(idx).subscribe({
      next(res) {
        that.initializerBlogData();
      },
      error(msg) {
        alert(`ERROR Occured during deletion: ${msg.status} : ${msg.details}`);
      },
    });
  }

  deleteMediaGroupElement(megroupID: string) {
    let that = this;
    this.blogService.deleteMediaFromMediaGroup(megroupID).subscribe({
      next(res) {
        that.initializerBlogData();
      },
      error(msg) {
        alert(`ERROR Occured during deletion: ${msg.status} : ${msg.details}`);
      },
    });
  }

  initializerBlogData() {
    if(this.curBlog != '-1'){
      let that = this;
      this.blogService.getSingleBlogDetails(this.curBlog).subscribe({
        next(res) {
          that.currentBlog = res;
        },
        error(msg) {
          alert(`Error occurred: ${msg.status} : ${msg.details}`);
          console.log(msg);
        },
      });
    }
  }

  // Miscelenius code
  toggleMediaType() {
    this.VideoURL.setValue('');
    this.isVideo = !this.isVideo;
  }
}
