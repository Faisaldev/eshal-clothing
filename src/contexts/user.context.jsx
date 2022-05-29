import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener } from '../services/firebase.service';
import { createAction } from '../utils/reducer.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Action type unknown ${type} in user context`);
      break;
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // const [currentUser, setCurrentUser] = useState(null);
  const setCurrentUser = user => {
    // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener(user => {
      setCurrentUser(user);
    });

    return unSubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
