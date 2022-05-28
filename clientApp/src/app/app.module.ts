import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainAppComponent } from './main-app/main-app.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { ProjectMngmComponent } from './project-mngm/project-mngm.component';
import { DatePipe } from '@angular/common';
import { SectionMngmComponent } from './section-mngm/section-mngm.component';
import { SectionUpDelComponent } from './section-up-del/section-up-del.component';
import { ArtEducationComponent } from './art-education/art-education.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogMngmComponent } from './blog-mngm/blog-mngm.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    MainAppComponent,
    MarkdownPipe,
    SafeUrlPipe,
    LoginComponent,
    ProjectMngmComponent,
    SectionMngmComponent,
    SectionUpDelComponent,
    ArtEducationComponent,
    BlogsComponent,
    BlogMngmComponent,  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
