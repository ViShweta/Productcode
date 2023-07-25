import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  login_data:any

  constructor() { }

  ngOnInit() {
    
    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as string) as any;
    console.log(this.login_data);
  }

}
