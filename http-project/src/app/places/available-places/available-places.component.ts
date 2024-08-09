import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { map } from 'rxjs';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  isFetching: boolean = false;
  errorFound: any;
  places: Place[] | undefined  = undefined

  ngOnInit(){
    this.isFetching = true;
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places = places; 
      },
      complete: () => {
        this.isFetching = false;
      },
      error: (err) => {
        this.errorFound = err;
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onSelectPlace(place: Place){
    const addPlaceSubscription = this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: (resData) => {
        console.log(resData);
      },
      complete: () => {
        console.log('Completed sending request')
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.destroyRef.onDestroy(() => {
      addPlaceSubscription.unsubscribe();
    })
  }
}
