import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {BookingListComponent} from './bookings/booking-list/booking-list.component';
import {BookingComponent} from './bookings/booking/booking.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bookings', component: BookingListComponent},
  {path: 'bookings/:id', component: BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
