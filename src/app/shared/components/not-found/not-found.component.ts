import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  errorCode: number = 404;

  // input properties
  @Input() errorDescription: string;
  @Input() buttonText: string;
  @Output() buttonClick = new EventEmitter();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
