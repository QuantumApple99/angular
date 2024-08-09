import { DestroyRef, inject, Injectable } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  userPlaces: Place[] = [];
  private httpClient = inject(HttpClient);
  errorService = inject(ErrorService);


  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places').pipe(
      tap({
        next: (resPlaces) => this.userPlaces = resPlaces
      })
    );;
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces: Place[] = [...this.userPlaces]

    if(!prevPlaces.some(p => p.id === place.id)){
      this.userPlaces.push(place);
    }
    
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(
      catchError( (error) => {
        this.userPlaces = prevPlaces;
        this.errorService.showError('Failed to add place!');
        return throwError( () => { new Error('Failed to add place!') } )
      })
    )
  }

  removeUserPlace(place: Place) {
    const prevPlaces: Place[] = [...this.userPlaces]

    if(prevPlaces.some(p => p.id === place.id)){
      this.userPlaces = this.userPlaces.filter(availablePlaces => availablePlaces.id !== place.id)
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + (place.id).toString())
  }

  fetchPlaces(url: string){
    return this.httpClient.get<{places: Place[]}>(url).pipe(
      map(resObject => resObject.places)
    )
  }
}
