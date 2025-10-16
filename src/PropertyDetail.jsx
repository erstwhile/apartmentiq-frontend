import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/properties/show/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch property');
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  if (!property) return <div className="container mx-auto p-4">Property not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h1>
      <p className="text-gray-600 mb-2">Address: {property.address}</p>
      <p className="text-gray-600 mb-2">Year Built: {property.year_built}</p>
      {property.url && (
        <p className="mb-4">
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Details
          </a>
        </p>
      )}
    </div>
  );
}

export default PropertyDetail;