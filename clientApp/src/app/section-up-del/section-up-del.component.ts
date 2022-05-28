import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SectionGLRY, SectionModel } from '../models/project-contents';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-section-up-del',
  templateUrl: './section-up-del.component.html',
  styleUrls: ['./section-up-del.component.scss'],
})
export class SectionUpDelComponent implements OnInit {


  // ** For Section form
  sectionCreateForm = new FormGroup({
    sectionName: new FormControl('', Validators.required),
    sectionDescription: new FormControl(''),
  });



  constructor(
    private route: ActivatedRoute,
    private mgntService: ManagementService,
    private router: Router
  ) {}

  // ** Boolean to show delete modal or not.
  showDelete:boolean = false;

  // ** This variable is used to store the value of the current section ID
  id: string = '';

  // ** variable for form editable
  editable:boolean = true;

  // ** Getting the confirmation modal for active class toggling
  @ViewChild('confirmModal') confirmationModal!: ElementRef;

  ngOnInit(): void {

    // ** Setting up route
    this.id = this.route.snapshot.params['sectionid'];

    // ** getting Section Details
    this.getSectionDetails(this.id);

    // ** changing the state of the inputs
    this.changeEditable();
  }

  
  // section Model data
  sectionDetails:SectionModel = {
    sectionName:'',
    id:'',
    sectionDescription:'',
    projectID:''
    };
  
  getSectionDetails(sectionID:string){

    if(this.id != ''){

      let that = this;
      this.mgntService.getSectionDetails(this.id).subscribe({
        next(elements){
          
          that.sectionDetails = elements;

          // ** setting the form value programmatically.
          that.sectionCreateForm.controls['sectionName'].setValue(that.sectionDetails.sectionName);
          that.sectionCreateForm.controls['sectionDescription'].setValue(that.sectionDetails.sectionDescription);

        },
        error(msg){
          alert(`${msg.status} :${msg.details}`);
        }
      });
    }else{
      alert("Invalid Section ID");
      this.router.navigate(['home']);
    }
  }


  // ** function to make the form editable
  changeEditable(){
    this.editable = !this.editable;
    
    if(this.editable){
      this.sectionCreateForm.controls['sectionName'].enable();
      this.sectionCreateForm.controls['sectionDescription'].enable();
    }else{
      this.sectionCreateForm.controls['sectionName'].disable();
      this.sectionCreateForm.controls['sectionDescription'].disable();

      // ** Setting default values back to the form
      this.sectionCreateForm.controls['sectionName'].setValue(this.sectionDetails.sectionName);
      this.sectionCreateForm.controls['sectionDescription'].setValue(this.sectionDetails.sectionDescription);
    }
  }

  // ** route back to projects after operations
  goBackToProjects(){
    this.router.navigate(['/sectiom-mngm',this.sectionDetails.projectID]);
  }

  updateSection(){
    
    let that = this;

    let updateSection:SectionModel = {
      id:this.sectionDetails.id,
      sectionName:this.sectionCreateForm.controls['sectionName'].value,
      sectionDescription:this.sectionCreateForm.controls['sectionDescription'].value,
      projectID:this.sectionDetails.projectID
    }

    this.mgntService.updateSectionDetails(updateSection).subscribe({
      next(element){
        alert(`Updated successfully`);
        that.goBackToProjects();
      },
      error(msg){
        alert(`${msg.status} : ${msg.details}`);
      }
    })
  }

  confirmDelete(){

    let that = this;

    this.mgntService.deleteSectionDetails(this.sectionDetails.id).subscribe({
      next(element){
        alert(`Deleting Successful`);
        that.goBackToProjects();
      },
      error(msg){
        alert(`Error Deleting: ${msg.status} : ${msg.details}`);
      }
    })
  }




  deleteSection(){
    this.confirmationModal.nativeElement.classList.toggle('active');
  }

  cancelDelete(){
    this.confirmationModal.nativeElement.classList.toggle('active');
  }



}

