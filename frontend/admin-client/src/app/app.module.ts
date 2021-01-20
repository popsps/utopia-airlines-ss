import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './layout/home/home.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {LoginModalComponent} from './shared/components/login-modal/login-modal.component';
import {BookingListComponent} from './bookings/booking-list/booking-list.component';
import {BookingComponent} from './bookings/booking/booking.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BookingFormComponent } from './bookings/booking-form/booking-form.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginModalComponent,
    BookingListComponent,
    BookingComponent,
    BookingFormComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
