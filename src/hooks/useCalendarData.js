import { useState, useEffect } from 'react';
import { mockCalendarData } from '../data/mockData';

// Simulates fetching from /api/calendar endpoint
export function useCalendarData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace with: const res = await fetch('/api/calendar'); const data = await res.json();
        
        setData(mockCalendarData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completeTask = (taskId) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t),
    }));
  };

  return { data, loading, error, completeTask };
}
