import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlightFilter } from "../../shared/models/FlightFilter";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit {
  filterFormControls: FormGroup;
  filter: FlightFilter = {
    departureDateRange: []
  };
  @Output() filterChanged = new EventEmitter<FlightFilter>();
  constructor(private formBuilder: FormBuilder) { };

  ngOnInit(): void {
    this.filterFormControls = this.formBuilder.group({
      origin: [""],
      destination: [""],
      departureDateRange: this.formBuilder.group({
        start: [""],
        end: new FormControl(""),
      })
    });
    this.filterFormControls.valueChanges.subscribe(({ origin, destination, departureDateRange }) => {
      let changed = this.setOrigin(origin.toUpperCase())
        || this.setDestination(destination.toUpperCase())
        || this.setDepartureDateRange(departureDateRange);
      if (changed) this.filterChanged.emit(this.filter);
    });
  }

  setOrigin(origin: string): boolean {
    if (this.filter.origin !== origin)
    {
      this.filter.origin = origin;
      return true;
    }
    return false;
  }

  setDestination(destination: string): boolean {
    if (this.filter.destination !== destination)
    {
      this.filter.destination = destination;
      return true;
    }
    return false;
  }

  setDepartureDateRange(departureDateRange): boolean {
    let updated = false;
    const start = new Date(departureDateRange.start);
    const end = new Date(departureDateRange.end);
    if (start.getTime() !== this.filter.departureDateRange[0]?.getTime())
    {
      this.filter.departureDateRange[0] = start;
      updated = true;
    }
    if (end.getTime() !== this.filter.departureDateRange[1]?.getTime())
    {
      this.filter.departureDateRange[0] = end;
      updated = true;
    }
    return updated;
  }

}
