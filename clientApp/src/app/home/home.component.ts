import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // for clicking on the the button
  clicked:boolean = false;
  @ViewChild("myName") myNameImg !: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }


  nameClick(){
    this.clicked = !this.clicked;
  }
}
