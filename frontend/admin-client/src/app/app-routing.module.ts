import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { BookingComponent } from './booking/booking.component';
import { UsersComponent } from './users/users.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'flights', component: FlightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
