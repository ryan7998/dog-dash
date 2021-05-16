import {
  SELECT_WALKER,
  WITHDRAW_FROM_JOB,
  APPLY_TO_JOB,
  CREATE_JOB,
  UPDATE_USERS,
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
    walkers: [] ,
    users: [] ,
    submittedjobs: [] ,
    appliedjobs: [] ,
    selectedwalkerjobs: [] 
}

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
export function jobReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {

    case SELECT_WALKER:
      return {
        ...state,
        selectedwalkerjobs: [action.walkerjob],
      };

    case WITHDRAW_FROM_JOB:
      let newState = state.appliedjobs.filter(job => {
        return job._id !== action.job._id;
      });

    case APPLY_TO_JOB:
      return {
        ...state,
        appliedjobs: [...state.appliedjobs, action.job], //////////we should add the job to the current list and not erase the list with the job
      };
    
      case CREATE_JOB:
      return {
        ...state,
        submittedjobs: [...state.submittedjobs, action.job],
      };

    case UPDATE_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    
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
      newState = state.cart.filter(job => {
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



