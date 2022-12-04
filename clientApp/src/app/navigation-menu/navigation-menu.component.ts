import { Component, OnInit } from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ProjectModel, ServerData } from '../models/project-contents';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';
import { ArtEducationService } from '../services/art-education.service';
import { ArtProjects } from '../models/art-education';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  // Access token for login and authentication
  access: string = '';

  projectList: ProjectModel[] = [
    {
      id: '-1',
      projectName: 'Fragments',
      projectDescription: '',
    },
  ];

  artProjectList: ArtProjects[] = [
    {
      id: '-1',
      projectName: 'NGMA',
      projectDescription: '',
    },
  ];

  blogs: Blog[] = [
    {
      id: '-1',
      blogName: 'NGMA',
      isPublished: false,
    },
  ];

  // Used to identify which child component is active right now
  galleryActive: boolean = false;
  artEducationActive: boolean = false;
  isBlogActive = false;
  isBlogMgmnActive = false;

  constructor(
    private galleryService: GalleryDataService,
    private router: Router,
    private route: ActivatedRoute,
    private ProjectIDService: GalleryProjectIDService,
    private blogService: BlogService,
    private artEducation: ArtEducationService
  ) {}

  ngOnInit(): void {
    // Initialize the project for routing related information
    this.initializeRouteInformation();

    // Initializing the project drop down
    this.initializerProjectData();

    // Initialize project drop down for art education
    this.initializeArtEducationData();

    // Initialize blog data
    this.initializerBlogsData();

    // Initializing access token value
    this.access = localStorage.getItem('access') || '';
  }

  // **** FUNCTION to check route information for active gallery
  initializeRouteInformation() {
    // This is used for first instance.
    let initialPageLoadLink = window.location.href;

    // checking for gallery page
    if (initialPageLoadLink.includes('/menu/gallery')) {
      this.galleryActive = true;
    }

    // checking for Art Education Page.
    if (initialPageLoadLink.includes('/menu/art-education')) {
      this.artEducationActive = true;
    }

    // checking for Blos - Project/rants page
    if (initialPageLoadLink.includes('/menu/project-rants')) {
      this.isBlogActive = true;
    }

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // *** checking if gallery is started or not
        if (val.urlAfterRedirects.startsWith('/menu/gallery')) {
          this.galleryActive = true;
        } else {
          this.galleryActive = false;
        }

        // *** checking if Art Education is started or not
        if (val.urlAfterRedirects.startsWith('/menu/art-education')) {
          this.artEducationActive = true;
        } else {
          this.artEducationActive = false;
        }

        // *** checking if BLOGS is started or not
        if (val.urlAfterRedirects.startsWith('/menu/project-rants')) {
          this.isBlogActive = true;
        } else {
          this.isBlogActive = false;
        }

        // *** checking if BLOGS management is started or not
        if (val.urlAfterRedirects.startsWith('/menu/blog-mngm')) {
          this.isBlogMgmnActive = true;
        } else {
          this.isBlogMgmnActive = false;
        }
      }
    });
  }

  // *** Function to initialize art projects list
  initializeArtEducationData() {
    try {
      let that = this;
      this.artEducation.getArtEducationProject().subscribe({
        next(res) {
          if (res.length > 0) {
            that.artProjectList = res;
            that.ProjectIDService.updateArtMessage(that.artProjectList[0].id);
          }
        },
        error(msg) {
          alert(`Error getting Projects: ${msg.status} : ${msg.details}`);
        },
      });
    } catch (error) {}
  }

  // **** FUNCTION for initializing project list
  initializerProjectData() {
    try {
      let that = this;
      this.galleryService.getProjectList().subscribe({
        next(res) {
          if (res.length > 0) {
            that.projectList = res;

            // set the data for first project
            that.ProjectIDService.updateMessage(that.projectList[0].id);
          }
        },
        error(msg) {
          alert(`Error getting Projects: ${msg.status} : ${msg.details}`);
        },
      });
    } catch (error) {}
  }

  // **** FUNCTION for initializing Blogs list
  initializerBlogsData() {
    try {
      let that = this;
      this.blogService.getBlogsList().subscribe({
        next(res) {
          if (res.length > 0) {
            that.blogs = res;
            that.ProjectIDService.updateBlogMessage(that.blogs[0].id);

            // updating blog management default value as well
            that.ProjectIDService.updateBlogMgmnMessage(that.blogs[0].id);
          }
        },
        error(msg) {
          alert(`Error getting Projects: ${msg.status} : ${msg.details}`);
        },
      });
    } catch (error) {}
  }

  switchGallery(id: string) {
    this.router.navigate(['T/gallery/', id]);
  }

  switchArtProject(id: string) {
    this.router.navigate(['T/art-education/', id]);
  }

  switchBlog(id: string) {
    this.router.navigate(['T/project-rants', id]);
  }

  // **** Function for logging out
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
