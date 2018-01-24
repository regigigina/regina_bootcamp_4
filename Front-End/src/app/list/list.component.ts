import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  collection = [];
  
  constructor(private http : Http, private route : Router ){}

  ngOnInit() {
    this.http.get("http://localhost:3000/show")
    .subscribe(
      result => {
        this.collection = result.json();
      },
      error => {
        
      }
    );
  }

}
