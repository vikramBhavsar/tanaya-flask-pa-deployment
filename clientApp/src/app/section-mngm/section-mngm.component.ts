import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectGLRY, SectionModel } from '../models/project-contents';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-section-mngm',
  templateUrl: './section-mngm.component.html',
  styleUrls: ['./section-mngm.component.scss'],
})
export class SectionMngmComponent implements OnInit {
  sectionCreateForm = new FormGroup({
    sectionName: new FormControl('', Validators.required),
    sectionDescription: new FormControl(''),
  });

  mediaCreateForm = new FormGroup({
    mediaDescription: new FormControl(''),
    sectionID: new FormControl('', Validators.required),
    videoUrl: new FormControl(''),
    isVideo: new FormControl(''),
  });

  // ** for project deletion confirmation
  @ViewChild('projectDelModal') confirmationModal!: ElementRef;

  // ** for media deletion confirmation
  @ViewChild('mediaDeleteModal') mediaDeleteModal!: ElementRef;

  // ** This variable is used to store the value of the current project
  id!: string;

  curMediaIDForDelete: string = '';

  // ** Global variable for storing the image
  imgFile?: File;

  // ** initial media link
  // Used to provide the web address for django server and attaching the medias with it
  // serverLink:string = 'http://127.0.0.1:8000'

  // ** To store list of sections
  projectDetails?: ProjectGLRY;

  constructor(
    private route: ActivatedRoute,
    private mgntService: ManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ** Setting up route
    this.id = this.route.snapshot.params['projectid'];

    this.getProjectDetails();

    // ** this is the initial value of checkbox
    console.log(this.mediaCreateForm.controls['mediaDescription'].value);
  }

  // ** This function is going to create a new section
  createSection() {
    if (this.id != null || this.id != '') {

      let sectionInstance: SectionModel = {
        id: '',
        sectionName: this.sectionCreateForm.controls['sectionName'].value,
        sectionDescription:
          this.sectionCreateForm.controls['sectionDescription'].value,
        projectID: this.id,
      };

      let that = this;
      this.mgntService.postSectionData(sectionInstance).subscribe({
        next(response) {
          console.log(response);
          alert('Section uploaded');
          that.getProjectDetails();
        },
        error(msg) {
          console.log(msg);
        },
      });
    } else {
      alert('ERROR: Invalid Project ID');
    }
  }

  // ** Initialize all the project details
  getProjectDetails() {
    if (this.id != null || this.id != '') {
      let that = this;
      this.mgntService.getDetailsOfProject(this.id).subscribe({
        next(response) {
          that.projectDetails = response;
          // console.log("printing details of project");
          // console.log(that.projectDetails);
          // console.log("printing details of project");
          // console.log(response);
          // console.log(that.projectDetails.sections);
        },
        error(msg) {
          alert('Error: Error when getting data');
          // Assinging dymmy data for display
          that.projectDetails = {
            id: '',
            projectName: '',
            projectDescription: '',
            sections: [],
          };
          // End iof dummy assign
        },
      });
    } else {
      alert('Error: Invalid Project ID');
    }
    let that = this;
  }

  // ** Function to route back to the project
  routeToProjects() {
    this.router.navigate(['projects-mngm']);
  }

  // ** go back to main home page.
  goToMain() {
    this.router.navigate(['/T']);
  }

  // ** Function to route back to the Section Update and delete
  goToSectionUpdateDelete(sectionId: string) {
    this.router.navigate(['/sectiom-ud', sectionId]);
  }

  // ** upload media to server.
  createMedia() {
    const formData = new FormData();
    
    // Only append the file if already present
    if(this.imgFile){
      formData.append('mediaFile', this.imgFile);
    }else{

      if(this.mediaCreateForm.controls['videoUrl'].value.length < 1){
        formData.append("videoUrl","empty");

      }else{

        formData.append("videoUrl",this.mediaCreateForm.controls['videoUrl'].value);
      }
      formData.append(
        'isVideo',
        'true'
      );
    }




    formData.append(
      'mediaDescription',
      this.mediaCreateForm.controls['mediaDescription'].value
    );
    formData.append(
      'sectionID',
      this.mediaCreateForm.controls['sectionID'].value
    );

    console.log('Appending FIle');
    console.log(this.imgFile);
    console.log('Printing form data below');
    console.log(formData);
    console.log(JSON.stringify(formData));

    let that = this;

    this.mgntService.postMediaContentToServer(formData).subscribe({
      next(element) {
        console.log(element);
        alert('Media Uploaded');
        that.getProjectDetails();
        that.imgFile = new File([],'');
      },
      error(msg) {
        console.log(msg);
      },
    });
  }

  fileUploadInitiated(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imgFile = target.files?.item(0)!;

    if (this.imgFile) {
      console.log(this.imgFile);
    }
  }

  // ** Function to update video Checkbox
  updateVideoCheckbox() {
    this.mediaCreateForm.controls['isVideo'].setValue(
      !this.mediaCreateForm.controls['isVideo'].value
    );
  }

  deleteProject() {
    this.confirmationModal.nativeElement.classList.toggle('active');
  }

  cancelDelete() {
    this.confirmationModal.nativeElement.classList.toggle('active');
  }

  deleteMedia(mediaID: string) {
    this.curMediaIDForDelete = mediaID;
    this.mediaDeleteModal.nativeElement.classList.toggle('active');
  }

  cancelMediaDelete() {
    this.mediaDeleteModal.nativeElement.classList.toggle('active');
  }

  confirmMediaDelete() {
    this.mediaDeleteModal.nativeElement.classList.toggle('active');
    let that = this;

    this.mgntService.deleteMediaDetails(this.curMediaIDForDelete).subscribe({
      next(element) {
        alert('Media Deleted');
        that.getProjectDetails();
      },
      error(msg) {
        alert(`Error Deleting: ${msg.status} : ${msg.details}`);
      },
    });
  }

  confirmDelete() {
    let that = this;

    this.mgntService.deleteProject(this.id).subscribe({
      next(element) {
        alert('Delete Successful');
        that.router.navigate(['/projects-mngm']);
      },
      error(msg) {
        alert(`Error When Deleting: ${msg.status} : ${msg.details}`);
      },
    });
  }
}
