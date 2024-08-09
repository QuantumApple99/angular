import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Place } from './place.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  @Input({required: true}) places!: Place[];
  @Output() selectPlace = new EventEmitter()

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
