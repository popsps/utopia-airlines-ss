import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/shared/services/flight.service';

@Component({
  selector: 'app-flight-creation-modal',
  templateUrl: './flight-creation-modal.component.html',
  styleUrls: ['./flight-creation-modal.component.scss']
})
export class FlightCreationModalComponent implements OnInit {
  flightCreationFormControls: FormGroup;
  @Input() show = false;
  constructor(private formBuilder: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightCreationFormControls = this.formBuilder.group({
      routeId: [""],
      airplaneId: [""],
      departureTime: [new Date().toDateString()],
      reservedSeats: ["0"],
      seatPrice: ["200"]
    });
  }

  onSubmit() {
    console.log(this.flightCreationFormControls.value);
  }
}
