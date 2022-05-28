import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArtProjectMain } from '../models/art-education';
import { ArtEducationService } from '../services/art-education.service';
import { GalleryProjectIDService } from '../services/gallery-project-id.service';

@Component({
  selector: 'app-art-education',
  templateUrl: './art-education.component.html',
  styleUrls: ['./art-education.component.scss']
})
export class ArtEducationComponent implements OnInit {

  constructor(
    private ProjectIDService:GalleryProjectIDService,
    private artEducationService:ArtEducationService
  ) { }

  // **** variable which stores current Art Project ID from subscribe
  // **** Provided by the parent component
  curArtProject:string = ''


  // **** VIEW CHILD USED FOR IMAGE MODAL
  @ViewChild('imgModal') imgModal!: ElementRef;



  // **** VARIABLES USED FOR OPENING THE IMAGE PROPERLY
  curImgLink: string = '';
  curImgStatus: string = 'some wonderful text';

  artProject: ArtProjectMain = {
    "id":"-1",
    "art_media":[],
    "projectDescription":"temp",
    "projectName":"temp"
  }

  ngOnInit(): void {

    // Setting the service for project ID subscription
    this.ProjectIDService.getArtMessage().subscribe(msg =>{
      this.curArtProject = msg;
      this.initializerArtData();
    })
  }


  // Gets the Art data required to show the images
  initializerArtData(){

    if(this.curArtProject != '-1'){
      let that = this;
      this.artEducationService.getArtEducationProjectDetails(this.curArtProject).subscribe({
        next(res){
          that.artProject = res;
        },
        error(msg){
          // alert(`Error occurred: ${msg.status} : ${msg.details}`)
          console.log(msg);
        }
      });
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
