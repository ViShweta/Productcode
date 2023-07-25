import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  productForm:FormGroup;
  count: number = 0;
  ProductData:any=[]
  login_data:any;
  CameraResultType:any;
  imageUrl:any;
  constructor(
    private service: ServicesService,
    private router: Router,
  ) { 
    this.productForm =new FormGroup({

      productname : new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      content :new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      price: new FormControl("",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    

    });
  }

 
  ngOnInit() {
    

    const saved_data = JSON.parse(localStorage.getItem('ProductList') as string) as any;
    this.ProductData = saved_data;
  
  }

  onSubmit(value: any) {
    console.log(value);
      const imageUrl = localStorage.getItem('imageUrl');
  
    if (imageUrl) {
      value.imageUrl = imageUrl;
    }
  
    if (this.ProductData != null) {
      this.ProductData.push(value);
      this.productForm.reset();
      this.service.presentAlert('Add Product Successfully');
      this.router.navigate(['/']);
      console.log("saved_data:", this.ProductData);
    } else {
      // this.count++;
      // value.uid = this.count;
      this.ProductData = [value];
      this.productForm.reset();
      this.service.presentAlert('Add Product Successfully');
      this.router.navigate(['/']);
      console.log("saved_data:", this.ProductData);
    }
  
    localStorage.setItem('ProductList', JSON.stringify(this.ProductData));
  }
  


  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.imageUrl = image.webPath;
    localStorage.setItem('imageUrl', this.imageUrl);

  };
  
}
