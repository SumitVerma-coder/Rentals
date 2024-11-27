import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Available Properties for Rent</h1>
      <div>
        {properties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          <ul>
            {properties.map((property) => (
              <li key={property._id}>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p>{property.location}</p>
                <p>${property.price}</p>
                <Link href={`/properties/${property._id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
