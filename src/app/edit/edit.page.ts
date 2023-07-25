import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  product:any;
  editProduct:FormGroup;
  ProductData:any;

  constructor(
    private router :Router,
    private route :ActivatedRoute
  ) {

    this.editProduct =new FormGroup({
      productname : new FormControl(''),
      content :new FormControl(""),
      price: new FormControl(""),
    

    });

   }

  ngOnInit() {
    this.viewAll();
    const saved_data = JSON.parse(localStorage.getItem('ProductList') as string) as any;
    this.ProductData = saved_data;
    console.log(this.ProductData);
    

  }

  
  viewAll() {
    this.route.queryParams.subscribe(params => {
      this.product = {
        productname: params.productName,
        content: params.content,
        price: params.price,
        imageUrl:params.imageUrl
      };
      
      console.log(this.product);
      this.editProduct.patchValue({
        productname: this.product.productname,
        content: this.product.content,
        price: this.product.price,
        
      });
    })
  }



  onSubmit(value:any){
    console.log(value)
    this.ProductData.forEach((product: any, index: number) => {
      if (product.productname == this.product.productname) {
        this.ProductData[index] = value;
      }
    });
    localStorage.setItem('ProductList', JSON.stringify(this.ProductData));
    this.router.navigate(['/']); 
  }
}
