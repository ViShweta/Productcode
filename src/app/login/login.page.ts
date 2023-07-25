import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  LoginForm:FormGroup;

  constructor(
    private service: ServicesService,
    private router: Router,
  ) { 
    
    this.LoginForm =new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email,]),
      password: new FormControl("",[Validators.required]),
    })
  }

  onSubmit(value: any) {
    console.log(value);
    const loginUsers = JSON.parse(localStorage.getItem('userList') as string);
    console.log(loginUsers);

    if (loginUsers != null) {
      const userIndex = loginUsers.findIndex((element: any) => element.email == value.email && element.password == value.password);
      if (userIndex > -1) {
        const user = loginUsers[userIndex];
        localStorage.setItem('LoginUser', JSON.stringify(user));
        this.service.presentAlert('Login Successfully!');
        this.router.navigate(['/home']);
        this.LoginForm.reset();
      } else {
        console.log('Data not found!');
        this.service.presentAlert('Invalid Email or Password!');
      }
    }
  }

  ngOnInit() {
  }

}
