import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	map,
	shareReplay,
	publishBehavior,
	refCount,
	tap,
} from 'rxjs/operators';

export interface Action {
	type: string;
	[key: string]: any;
}

export interface RootState {
	[key: string]: any;
}

export type Reducer<T> = (state: T, action: Action) => T;
export interface ReducersObject {
	[key: string]: Reducer<any>;
}
export type Listener = (state: RootState) => void;

@Injectable()
export class ReduxService {
	private action$ = new BehaviorSubject<Action>({ type: '' });
	private store$: Observable<RootState>;

	constructor(reducersObject: ReducersObject, initialState = {}) {
		const rootReducer = this.combineReducers(reducersObject);
		// TODO: This state is not in the pipeline. Try put retrieve this from the pipeline
		// instead of caches it here.
		let currentState = initialState;

		this.store$ = this.action$.pipe(
			map(action => {
				const newState = rootReducer(currentState, action);
				return newState;
			}),
			tap(newState => {
				console.log('side effect: caching state');
				currentState = newState;
			}),
			// store$ becomes a *HOT* ConnectableObservable with ReplaySubject.
			// When new subscription happens, the new observer gets the latest emission.
			//
			// Without this operator, when new subscription happens, the action$ BehaviorSubject emits current action it holds,
			// then the action will go through the pipeline again. Because the pipeline did some side effect (caching)
			// every time the action goes through the pipeline the cached state will be updated,
			// then every observer will get different result.
			shareReplay(1),
		);
	}

	getStore() {
		return this.store$;
	}

	select(key: string) {
		return this.store$.pipe(
			map(store => {
				return store[key];
			}),
		);
	}

	dispatch(action: Action): void {
		this.action$.next(action);
	}

	private combineReducers(reducerObject: ReducersObject): Reducer<RootState> {
		return (state, action) => {
			return Object.entries(reducerObject).reduce(
				(obj, [key, reducer]) => {
					obj[key] = reducer(state[key], action);
					return obj;
				},
				{},
			);
		};
	}
}
