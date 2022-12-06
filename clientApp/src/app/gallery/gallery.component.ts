import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { GalleryDataService } from '../services/gallery-data.service';
import { ProjectGLRY, ServerData } from '../models/project-contents';
import { LocationStrategy } from '@angular/common';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(
    private galleryService: GalleryDataService,
    private route: ActivatedRoute,
    private router: Router,
    private ProjectIDService: GalleryProjectIDService
  ) {
    let that = this;
    window.onpopstate = function () {
      if (that.imageOpned) {
        that.closeModalImage();
        history.go(1);
      }
    };
  }

  currentImg: number = 0;

  // **** VIEW CHILD USED FOR IMAGE MODAL
  @ViewChild('imgModal') imgModal!: ElementRef;

  // **** VARIABLES USED FOR OPENING THE IMAGE PROPERLY
  curImgLink: string = 'assets/Images/bg_1.png';
  curImgStatus: string = 'some wonderful text';
  imageOpned: boolean = false;

  // **** VARIABLES FOR PROJECT SELECTION SECTION WISE **** //
  curProject: string = '';

  //private routerSubscription
  private routeSub!: Subscription;

  projectGLRY: ProjectGLRY = {
    id: '-1',
    projectName: '',
    projectDescription: '',
    sections: [],
  };

  goToTop() {
    var scrollElem = document.querySelector('#moveTop');
    if (scrollElem) {
      scrollElem.scrollIntoView();
    }
  }

  // @HostListener('window:popstate',['$event'])
  // onPopState(event:Event){
  //   alert(`Back button is pressed: ${event}  and ${history.length}`);
  // }

  ngOnInit(): void {
    // Setting the service for project ID subscription
    this.ProjectIDService.getMessage().subscribe((msg) => {
      // this.curProject = msg;
      // this.initializerGalleryData();
    });

    // this is additional text to get the ID directly from link
    this.routeSub = this.route.params.subscribe((params) => {
      // alert(`This is from inside gallery: ${params["projectid"]}`)
      this.curProject = params['projectid'];
      this.initializerGalleryData();

      this.goToTop();
    });
  }

  // for affecting view child
  ngAfterViewInit(): void {}

  initializerGalleryData() {
    if (this.curProject.toString() != '-1') {
      let that = this;

      this.galleryService.getGalleryData(this.curProject.toString()).subscribe({
        next(res) {
          that.projectGLRY = that.processResultsForLayout(res);
          console.log(res);
          console.log('Below is Server Data received: ');
          console.log(that.projectGLRY);
        },
        error(msg) {
          console.log(msg);
          that.projectGLRY.projectName = 'No Such Project';
        },
      });
    }
  }

  // **** THis function will process the data and put proper layout for content
  processResultsForLayout(resultsData: ProjectGLRY): ProjectGLRY {
    ///
    // This function should check for following
    // ***** DIFFERENT TYPES OF SECTIONS ***** //
    // (MG) -- multiple gallery contents
    // (SD) -- Single image with description
    // (S) -- Single Image with no description (currently looks okay)
    // (3W) -- Three images without description
    // (2W) -- Two images without description
    ///

    for (var i = 0; i < resultsData.sections.length; i++) {
      if (
        resultsData.sections[i].mediaContent.length == 1 &&
        resultsData.sections[i].sectionDescription.length == 0
      ) {
        resultsData.sections[i].sectionDisplayType = 'S';
      } else if (
        resultsData.sections[i].mediaContent.length == 1 &&
        resultsData.sections[i].sectionDescription.length > 1
      ) {
        resultsData.sections[i].sectionDisplayType = 'SD';
      } else if (resultsData.sections[i].mediaContent.length == 3) {
        resultsData.sections[i].sectionDisplayType = '3W';
      } else if (
        resultsData.sections[i].mediaContent.length == 2 &&
        resultsData.sections[i].sectionDescription.length == 0
      ) {
        resultsData.sections[i].sectionDisplayType = '2W';
      } else {
        resultsData.sections[i].sectionDisplayType = 'MG';
      }
    }
    return resultsData;
  }

  // Function to open image
  openImage(imgUrl: string, imgDetails: string) {
    this.imgModal.nativeElement.classList.toggle('active');
    this.imageOpned = !this.imageOpned;
    this.curImgLink = imgUrl;
    this.curImgStatus = imgDetails;
  }

  // FUNCTION TO CLOSE THE IMAGE
  closeModalImage() {
    this.imgModal.nativeElement.classList.toggle('active');
    this.imageOpned = !this.imageOpned;
  }
}
