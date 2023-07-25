import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  UserForm:FormGroup;
  userData:any=[];
  count: number = 0;

  constructor(
    private service: ServicesService,
    private router: Router,
  ) { 

    this.UserForm =new FormGroup({
      
      firstName:new FormControl ('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl ('', [Validators.required, Validators.email,]),
      password: new FormControl("",[Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
      subject :new FormControl(""),

    });

  }

  
  // loadDataFromLocalStorage() {
  //   const saved_data = JSON.parse(localStorage.getItem('userList') as string) as any;
  //   this.userData = saved_data;
  //   // this.count = this.userData.length;
  // }

  onSubmit(value: any) {
    console.log(value);
    // this.count++;
    // value.uid = this.count;
    // this.count=this.signUp.length

    var saved_data = JSON.parse(localStorage.getItem('userList') as string);
    console.log(saved_data);
    if (saved_data != null) {
      let index = saved_data.findIndex((element: any) => element.email == value.email);
      console.log(index);
      if (index > -1) {
        this.service.presentAlert('Email already registered.');
      } else {
        console.log('saved_data:', saved_data);
        saved_data = [...saved_data, ...[value]];
        localStorage.setItem('userList', JSON.stringify(saved_data));
        this.UserForm.reset();
        this.service.presentAlert('registered successfully.');
        this.router.navigate(['login/']);
      }
    } else {
      this.userData.push(value);
      localStorage.setItem('userList', JSON.stringify(this.userData));
      this.UserForm.reset();
      this.service.presentAlert('registered successfully.');
      this.router.navigate(['login/']);
    }
  }
  
  
  
  

  ngOnInit() {
  }

}
