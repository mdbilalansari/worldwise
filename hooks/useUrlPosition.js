import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [serachParams] = useSearchParams();
  const lat = serachParams.get('lat');
  const lng = serachParams.get('lng');

  return [lat, lng];
}
