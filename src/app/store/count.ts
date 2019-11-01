import { Reducer } from '../modules/services/redux.service';

const countReducer: Reducer<number> = (state: number = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		case 'RESET':
			return 0;
		default:
			return state;
	}
};

export const count = {
	count: countReducer,
};
