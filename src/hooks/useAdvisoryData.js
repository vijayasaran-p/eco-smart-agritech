import { useState } from 'react';
import { mockAdvisoryData } from '../data/mockData';

export function useAdvisoryData() {
  const [data, setData] = useState(mockAdvisoryData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateScore = (newScore) => {
    setData(prev => prev ? { ...prev, microbiomeSafetyIndex: newScore } : prev);
  };

  return { data, loading, error, updateScore };
}
