import { Component, OnInit } from '@angular/core';

/* --- local dependencies -- */
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  show: boolean = false;
  color: string = 'warn';

  constructor(private spinner: SpinnerService) {}

  ngOnInit() {
    // listening for spinner value from spinnerservice
    this.spinner.isRequesting.subscribe((value) => {
      this.show = value;
    });
  }
}
