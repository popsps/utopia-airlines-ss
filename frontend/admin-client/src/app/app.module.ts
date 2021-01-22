import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './layout/home/home.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {LoginModalComponent} from './shared/components/login-modal/login-modal.component';
import {BookingListComponent} from './bookings/booking-list/booking-list.component';
import {BookingComponent} from './bookings/booking/booking.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookingFormComponent} from './bookings/booking-form/booking-form.component';
import {ErrorMessageComponent} from './shared/components/error-message/error-message.component';
import {UsersComponent} from './users/users.component';
import {HttpService} from './shared/services/http.service';
import {BookingService} from './shared/services/booking.service';

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
    ErrorMessageComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
