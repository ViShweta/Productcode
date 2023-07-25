import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showproduct: any = []
  productAdded: any;
  product: any = [];
  login_data: any;
  img1: any = '';
  target: any;
  constructor(
    private route: Router,
    private service: ServicesService,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillEnter() {

    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as string) as any;
    console.log(this.login_data);
    this.showproduct = JSON.parse(localStorage.getItem('ProductList') as any);
    console.log(this.showproduct);

  }
  addToCart(product: any) {
    product.quantity = 1;
    product.email = this.login_data.email;

    let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
    if (cartItems != null) {
      cartItems.push(product);
      this.service.presentAlert('Add Product Successfully');
      localStorage.setItem('Cart', JSON.stringify(cartItems));
    } else {
      let cartItem: any = [];
      cartItem.push(product);
      this.service.presentAlert('Add Product Successfully');
      localStorage.setItem('Cart', JSON.stringify(cartItem));
    }
    this.route.navigate(['/gocart']);
    product.addedToCart = true;
    this.productAdded = true;
  }

  goToedit(product: any) {
    const queryParams = {
      productName: product.productname,
      content: product.content,
      price: product.price,
      imageUrl:product.imageUrl

    };
    this.route.navigate(['/edit'], { queryParams });
  }



  public check(productname: any) {
    if (productname != undefined) {
      let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
      if (cartItems != null) {
        const index = cartItems.findIndex((item: any) => item.productname == productname);
        if (index > -1) {
          return true;
        } else {
          return false;
        }
      }
    }

  }

  onRenderItems(event: any) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const draggedItem = this.showproduct.splice(event.detail.from, 1)[0];
    this.showproduct.splice(event.detail.to, 0, draggedItem);
    // this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);  
    event.detail.complete();
    localStorage.setItem('ProductList', JSON.stringify(this.showproduct));
  }


  handleInput(event: any) {
    const query = event.target.value.trim().toLowerCase();
    if (query) {
      this.showproduct = JSON.parse(localStorage.getItem('ProductList') as any);
      this.showproduct = this.showproduct.filter((product: any) =>
        product.productname.toLowerCase().includes(query)
      );
    } else {
      this.showproduct = JSON.parse(localStorage.getItem('ProductList') as any);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'My Profile',
          handler: () => {
            this.route.navigate(['/view']);
          }
        },
        {
          text: 'Logout',
          handler: () => {
            localStorage.removeItem('LoginUser');
            this.service.presentAlert("Logout SucessFully !!")
            this.route.navigate(['/login']);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  deleteProduct(product: any) {
    const index = this.showproduct.findIndex((item: any) => item == product);
    if (index > -1) {
      this.showproduct.splice(index, 1);
      localStorage.setItem('ProductList', JSON.stringify(this.showproduct));
      this.service.presentAlert('Product deleted successfully');
    }
  }

}

