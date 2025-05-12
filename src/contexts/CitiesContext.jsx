import { useCallback } from 'react';
import { useReducer, useEffect, createContext, useContext } from 'react';

// const BASE_URL = 'http://localhost:8000';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        // const res = await fetch(`${BASE_URL}/cities`);
        // const data = await res.json();
        await delay(500);
        const data = citiesData;
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error loading the data...' });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id == currentCity.id) return;
      try {
        dispatch({ type: 'loading' });
        // const res = await fetch(`${BASE_URL}/cities/${id}`);
        // const data = await res.json();
        await delay(500);
        console.log('ID', id);
        const data = citiesData.find(city => city.id == id);
        console.log('Data', citiesData);
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error loading the data...' });
      }
    },
    [currentCity?.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      // const res = await fetch(`${BASE_URL}/cities/`, {
      //   method: 'POST',
      //   body: JSON.stringify(newCity),
      //   header: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const cityData = await res.json();
      await delay(500);
      const cityData = { ...newCity, id: Math.floor(Math.random() * 100000000) };
      citiesData.push(cityData);
      dispatch({ type: 'city/created', payload: cityData });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error creating the data...' });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      // await fetch(`${BASE_URL}/cities/${id}`, {
      //   method: 'DELETE',
      // });
      await delay(500);
      citiesData.filter(city => city.id !== id);
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error deleting the city...' });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('CitiesContext is used outside of CityProvider');

  return context;
}

export { useCities, CitiesProvider };

const citiesData = [
  {
    cityName: 'Lisbon',
    country: 'Portugal',
    emoji: '🇵🇹',
    date: '2027-10-31T15:59:59.138Z',
    notes: 'My favorite city so far!',
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: 'Madrid',
    country: 'Spain',
    emoji: '🇪🇸',
    date: '2027-07-15T08:22:53.976Z',
    notes: '',
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: 'Berlin',
    country: 'Germany',
    emoji: '🇩🇪',
    date: '2027-02-12T09:24:11.863Z',
    notes: 'Amazing 😃',
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
];
