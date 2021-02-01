import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-flight-creation-modal',
  templateUrl: './flight-creation-modal.component.html',
  styleUrls: ['./flight-creation-modal.component.scss']
})
export class FlightCreationModalComponent implements OnInit {
  @Input() show = false;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

}
