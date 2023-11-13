import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from './services/customer.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CustomersComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
