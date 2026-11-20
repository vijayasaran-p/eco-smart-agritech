import { useState, useEffect } from 'react';
import { mockDiagnosticsData } from '../data/mockData';

// Fetches from /api/diagnostics/analyze endpoint
export function useDiagnosticsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const runAnalysis = async (fileInput) => {
    setLoading(true);
    setSubmitted(false);
    setError(null);
    try {
      let response;
      
      // If it's a File object (uploaded file)
      if (fileInput instanceof File || (fileInput && fileInput.name && !fileInput.content)) {
        const formData = new FormData();
        formData.append('file', fileInput);
        
        response = await fetch('/api/diagnostics/analyze', {
          method: 'POST',
          body: formData,
        });
      } else if (fileInput && fileInput.content) {
        // If it's just raw text
        response = await fetch('/api/diagnostics/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: fileInput.content })
        });
      } else {
        throw new Error('Invalid input for analysis.');
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error occurred');
      }

      const result = await response.json();
      setData(result);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, submitted, runAnalysis };
}
