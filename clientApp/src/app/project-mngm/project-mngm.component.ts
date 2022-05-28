import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectModel } from '../models/project-contents';
import { ManagementService } from '../services/management.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-project-mngm',
  templateUrl: './project-mngm.component.html',
  styleUrls: ['./project-mngm.component.scss'],
})
export class ProjectMngmComponent implements OnInit {
  projectCreateForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescrip: new FormControl(''),
  });

  //  Project model list for angukar
  projectModelList!: ProjectModel[];

  //Blogs model list
  blogList!:Blog[];

  blogName= new FormControl('');

  constructor(
    private mgntService: ManagementService,
    private router:Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {

    // Populating Projects section
    this.getProjectList();


    // Populating blogs section
    this.getBlogList();
  }


  getBlogList() {
    let that = this;
    this.blogService.getBlogsList().subscribe({
      next(response) {
        that.blogList = response;
      },
      error(msg) {
        alert('Error: Error when getting data');
        // Assinging dymmy data for display
        that.blogList = [
          {
            id: '',
            blogName:'',
            isPublished:false
          },
        ];

        //  End of dummy assign
      },
    });
  }


  getProjectList() {
    let that = this;
    this.mgntService.getProjectList().subscribe({
      next(response) {
        that.projectModelList = response;
      },
      error(msg) {
        alert('Error: Error when getting data');
        // Assinging dymmy data for display
        that.projectModelList = [
          {
            id: '',
            projectName: '',
            projectDescription: '',
          },
        ];
        // End iof dummy assign
      },
    });
  }


  createBlog(){

    if(this.blogName.value.length > 2){
      let newBlog:Blog = {
        id:'',
        blogName: this.blogName.value,
        isPublished:false,
      }
  
      // Creating the blog here:
      let that = this;
      this.blogService.createNewBlog(newBlog).subscribe({
        next(msg){
          let tempBlog:Blog = msg;
          
          // get the details of the blog again
          that.getBlogList();
          alert("Blog Created successfully.");
  
        },
        error(msg){
          alert(`Error Creating Blog: ${msg.status} - ${msg.details}`)        
        }
      });
    }else{
      alert("Blog Name very short");
    }

  }

  createProject() {

    let projectInstance: ProjectModel = {
      id: '',
      projectName: this.projectCreateForm.controls['projectName'].value,
      projectDescription:
        this.projectCreateForm.controls['projectDescrip'].value,
    };

    let that = this;

    this.mgntService.postProjectData(projectInstance).subscribe({
      next(response) {
        console.log(response);
        that.getProjectList();
        alert("Project Created successfully.");
      },
      error(msg) {
        alert(`Error Occured: ${msg.status} : ${msg.details}`);
      },
    });
  }

  // ** go back to main home page.
  goToMain(){
    this.router.navigate(['/T']);
  }

  // ** go to project
  goToProjectManagment(pid:string){
    this.router.navigate(['/sectiom-mngm',pid]);
  }


  goToBlogMgmn(blog_id:string){
    this.router.navigate(['/T/blog-mngm',blog_id]);
  }
}
