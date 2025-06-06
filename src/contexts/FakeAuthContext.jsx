import { useReducer } from 'react';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Invalid Action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password == FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
    else console.log('Invalid email or password');
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('AuthContext is used Outside AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
