import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Sample text
  testString = new FormControl('');

  mrdownFormattedString:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  valueUpdate(){
    console.log("Something is executing");
    let preProcString = this.testString.value
    this.mrdownFormattedString = preProcString.replace("\n"," <br/> ")
    
  }

}
