import {
  UPDATE_ME,
  UPDATE_TITLE,
  UPDATE_USERS,
  UPDATE_JOBS,
  UPDATE_WALKERJOBS,
  ADD_MULTIPLE_TO_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

// Define an initial state value for the app
const initialState = {
    me: null,
    title: 'Home',
    cart: [],
    cartOpen: false,
    users: [] ,
    jobs: [],
    walkerjobs: [] 
}

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
export function jobReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {

    case UPDATE_ME:
      return{
        ...state,
        me:[action.me],
      }
    
    case UPDATE_TITLE:
      // console.log(state);
      return{
        ...state,
        title: [action.title],
      }

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

      case UPDATE_WALKERJOBS:
        return {
          ...state,
          walkerjobs: [...action.walkerjobs],
        };

    case ADD_MULTIPLE_TO_CART:
          return {
            ...state,
            cart: [...state.cart, ...action.users],
          };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.user],
      };


    case REMOVE_FROM_CART:
      let newState = state.cart.filter(user => {
        return user._id !== action._id;
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



