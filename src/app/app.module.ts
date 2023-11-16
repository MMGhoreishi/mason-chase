import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ListCustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
