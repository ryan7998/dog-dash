import {
  UPDATE_JOBS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

// Define an initial state value for the app
const initialState = {
    jobs: [],
    cart: [],
    cartOpen: false,
    walkers: [] 
}

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
export function jobReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    
    case UPDATE_JOBS:
      return {
        ...state,
        jobs: [...action.jobs],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.job],
      };


    case REMOVE_FROM_CART:
      let newState = state.cart.filter(job => {
        return job._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      }

    default:
      return state;
  }
}



