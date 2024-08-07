import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const obsInterval = setInterval(() => {
      if(timesExecuted > 5){
        clearInterval(obsInterval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value');
      subscriber.next({'Message': 'New Value'});
      timesExecuted++;
    }, 2000)
  })
  private destroyRef = inject(DestroyRef)

  ngOnInit(){
    const customSubscription = this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Complete')
    })

    const subscription = interval(1000).pipe(
      map((val) => val*2)
    ).subscribe({
      next: (val) => console.log(val)
    }); 

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      customSubscription.unsubscribe();
    })
  }


}
