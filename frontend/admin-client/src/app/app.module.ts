import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BookingComponent } from './booking/booking.component';
import { LoginModalComponent } from './shared/components/login-modal/login-modal.component';
import { UsersComponent } from './users/users.component';
import { HttpService } from "./shared/services/http.service";
import { FlightsComponent } from './flights/flights.component';
import { FlightDepartureDatePipe } from './shared/pipes/flight-departure-date.pipe';
import { FlightRoutePipe } from './shared/pipes/flight-route.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BookingComponent,
    LoginModalComponent,
    UsersComponent,
    FlightsComponent,
    FlightDepartureDatePipe,
    FlightRoutePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
