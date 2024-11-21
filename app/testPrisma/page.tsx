// app/cities/page.tsx
"use client"; 
import React, { useEffect, useState } from 'react';

interface City {
  city_id: number;
  city_name: string;
  state?: string;
  country?: string;
  zip_codes?: string;
  // Add other fields if needed
}

const CitiesPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/getRequests/cities');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        setCities(data);
      } catch (err) {
        // Type assertion to 'any' to access the message property
        const errorMessage = (err as Error).message || 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cities</h1>
      <table className="min-w-full bg-black border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">City ID</th>
            <th className="py-2 px-4 border-b">City Name</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Zip Codes</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.city_id}>
              <td className="py-2 px-4 border-b">{city.city_id}</td>
              <td className="py-2 px-4 border-b">{city.city_name}</td>
              <td className="py-2 px-4 border-b">{city.state || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{city.country || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{city.zip_codes || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesPage;