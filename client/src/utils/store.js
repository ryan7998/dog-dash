import { createStore } from 'redux'
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
import { jobReducer } from './reducers'
let store = createStore(jobReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export { store };
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

