import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
import {FlightsComponent} from './flights/flights.component';
import {FlightDepartureDatePipe} from './shared/pipes/flight-departure-date.pipe';
import {FlightRoutePipe} from './shared/pipes/flight-route.pipe';
import {LoginPageComponent} from './auth/login-page/login-page.component';
import {SignupPageComponent} from './auth/signup-page/signup-page.component';
import {LoginFormComponent} from './auth/components/login-form/login-form.component';
import {SignupFormComponent} from './auth/components/signup-form/signup-form.component';
import {AuthService} from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginModalComponent,
    FlightsComponent,
    FlightDepartureDatePipe,
    FlightRoutePipe,
    BookingListComponent,
    BookingComponent,
    BookingFormComponent,
    ErrorMessageComponent,
    UsersComponent,
    LoginPageComponent,
    SignupPageComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService, BookingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
