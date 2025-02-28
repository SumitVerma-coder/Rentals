import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <img
        src={property.image || "/placeholder.jpg"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-bold mt-2">${property.price}/month</p>
        <Link
          to={`/property/${property._id}`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
