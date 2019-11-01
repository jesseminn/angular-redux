import { Component } from '@angular/core';
import { ReduxService } from '../../modules/services/redux.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <div>{{ count$ | async }}</div>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="reset()">c</button>
  `,
})
export class CounterComponent {
  public count$: Observable<number> = this.reduxService.select('count');
  constructor(private reduxService: ReduxService) {}
  increment() {
    this.reduxService.dispatch({ type: 'INCREMENT' });
  }
  decrement() {
    this.reduxService.dispatch({ type: 'DECREMENT' });
  }
  reset() {
    this.reduxService.dispatch({ type: 'RESET' });
  }
}
