import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propertyService from "../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (error) {
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!property) {
    return <p className="text-center text-gray-500">Property not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img src={property.image || "/placeholder.jpg"} alt={property.title} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-3xl font-bold mt-4">{property.title}</h2>
      <p className="text-gray-600 mt-2">{property.location}</p>
      <p className="text-gray-700 mt-4">{property.description}</p>
      <p className="text-lg font-semibold text-blue-600 mt-4">${property.price} / month</p>
      <button className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
        Book Now
      </button>
    </div>
  );
};

export default PropertyDetails;
