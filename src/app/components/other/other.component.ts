import { Component } from '@angular/core';
import { ReduxService } from '../../modules/services/redux.service';

@Component({
  selector: 'app-other',
  template: `
    <div>Some other component</div>
    <div>{{ count$ | async }}</div>
  `,
})
export class OtherComponent {
  public count$ = this.reduxService.select('count');
  constructor(private reduxService: ReduxService) {}
}
