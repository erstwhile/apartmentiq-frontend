import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/properties/index.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch properties');
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">ApartmentIQ Properties</h1>
      {properties.length === 0 ? (
        <p className="text-gray-500 text-center">No properties available.</p>
      ) : (
        <ul className="space-y-4">

          {properties.map((property) => (
           <li
              key={property.id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{property.name}</h2>
              <p className="text-gray-600 mb-1">Address: {property.address}</p>
              <p className="text-gray-600 mb-1">Year Built: {property.year_built}</p>
              <Link
                to={`/properties/${property.id}`}
                className="block mt-2 text-blue-500 hover:underline font-medium"
              >
                More Info
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;