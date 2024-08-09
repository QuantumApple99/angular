import { Component, DestroyRef, inject } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);
  isFetching: boolean = false;
  errorFound: any;
  places!: Place[];

  ngOnInit(){
    this.isFetching = true;
    const subscription = this.placeService.loadUserPlaces().subscribe({
      next: () => {
        this.places = this.placeService.userPlaces;
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

  deletePlace(place: Place){
    const delSubscription = this.placeService.removeUserPlace(place).subscribe({
      next: () => {
        console.log('Item Deleted Successfully!');
        this.places = this.placeService.userPlaces;
      }
    });

    this.destroyRef.onDestroy(() => {
      delSubscription.unsubscribe();
    })
  }
}
