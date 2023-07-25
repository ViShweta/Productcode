import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GocartPageRoutingModule } from './gocart-routing.module';

import { GocartPage } from './gocart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GocartPageRoutingModule
  ],
  declarations: [GocartPage]
})
export class GocartPageModule {}
