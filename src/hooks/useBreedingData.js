import { useState } from 'react';
import { mockBreedingData } from '../data/mockData';

export function useBreedingData() {
  const [data, setData] = useState(mockBreedingData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return { data, loading, error };
}
