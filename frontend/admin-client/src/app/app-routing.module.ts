import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {BookingListComponent} from './bookings/booking-list/booking-list.component';
import {BookingComponent} from './bookings/booking/booking.component';
import {BookingFormComponent} from './bookings/booking-form/booking-form.component';
import { UsersComponent } from './users/users.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bookings', component: BookingListComponent},
  {path: 'bookings/add', component: BookingFormComponent},
  {path: 'bookings/:id', component: BookingComponent},
  { path: 'users', component: UsersComponent },
  { path: 'flights', component: FlightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
