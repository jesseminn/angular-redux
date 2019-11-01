import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReduxModule } from './modules/redux.module';
import { count } from './store/count';
import { CounterComponent } from './components/counter/counter.component';
import { OtherComponent } from './components/other/other.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, OtherComponent],
  imports: [
    BrowserModule,
    ReduxModule.forRoot({
      ...count,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
