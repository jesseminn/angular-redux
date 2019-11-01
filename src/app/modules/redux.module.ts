import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { ReduxService, ReducersObject } from './services/redux.service';

export const REDUCERS_OBJECT_INJECTION_TOKEN = new InjectionToken<
	ReducersObject
>('REDUCERS_OBJECT_INJECTION_TOKEN');

export function reduxServiceFactory(reducersObject: ReducersObject) {
	return new ReduxService(reducersObject);
}

@NgModule({
	imports: [CommonModule],
})
export class ReduxModule {
	static forRoot(reducersObject: ReducersObject): ModuleWithProviders {
		return {
			ngModule: ReduxModule,
			providers: [
				{
					provide: REDUCERS_OBJECT_INJECTION_TOKEN,
					useValue: reducersObject,
				},
				{
					provide: ReduxService,
					useFactory: reduxServiceFactory,
					deps: [REDUCERS_OBJECT_INJECTION_TOKEN],
				},
			],
		};
	}
}
