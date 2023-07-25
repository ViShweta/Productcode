import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gocart',
  templateUrl: './gocart.page.html',
  styleUrls: ['./gocart.page.scss'],
})
export class GocartPage implements OnInit {

  addproduct: any;
  userData: any;
  saved_data: any
  cartData: any;

  constructor(
    private route: Router,
    private service: ServicesService
  ) { }

  ionViewWillEnter(){
    this.getCartItems();
    
  }


  ngOnInit() {
    this.saved_data = JSON.parse(localStorage.getItem('LoginUser') as string) as any;
    console.log(this.saved_data);
  
  }

  getCartItems() {
    this.cartData = localStorage.getItem('Cart');
    if (this.cartData != null) {
      this.addproduct = JSON.parse(this.cartData).filter((element: any) => element.email == this.saved_data.email);
      console.log(this.addproduct);
    }
  }


  increaseQuantity(product: any) {
    product.quantity++;
    let cartItems = JSON.parse(localStorage.getItem('Cart') as any) || [];
    const index = cartItems.findIndex((element: any) => element.productname == product.productname && element.email == this.saved_data.email);
    if (index > -1) {
      cartItems[index].quantity = product.quantity;
    } else {
      cartItems.push(product);
    }
    localStorage.setItem('Cart', JSON.stringify(cartItems));
  }

  decreaseQuantity(product: any) {
    this.service.presentAlert(" Not below 1 allow Value ")
    if (product.quantity > 1) {
      
      product.quantity -= 1;
     
     
      let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
      const index = cartItems.findIndex((element: any) => element.productname == product.productname && element.email == this.saved_data.email);
      if (index > -1) {
        cartItems[index].quantity = product.quantity;
     
      } else {
        cartItems.push(product);
      }
      localStorage.setItem('Cart', JSON.stringify(cartItems));
    }
  }

  deleteItem(index: number) {
    const productToDelete = this.addproduct[index];
    const cartData = JSON.parse(localStorage.getItem('Cart') as any);
    const productIndex = cartData.findIndex((element: any) => element.email == this.saved_data.email && element.productname == productToDelete.productname);
    console.log(productIndex);
    
    if (productIndex > -1) {
      cartData.splice(productIndex, 1);
      localStorage.setItem('Cart', JSON.stringify(cartData));
      this.addproduct.splice(index, 1);
      this.service.presentAlert("Remove Successfully!");
    }
  }
}



