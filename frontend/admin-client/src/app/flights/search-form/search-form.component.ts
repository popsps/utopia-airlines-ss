import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightFilter } from "../../shared/models/FlightFilter";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() filter: FlightFilter = {};
  @Output() filterChanged = new EventEmitter<FlightFilter>();
  constructor() { };

  ngOnInit(): void {
  }

}
