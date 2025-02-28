import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import propertyService from "../services/propertyService";

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const data = await propertyService.getAllProperties();
        setFeaturedProperties(data.slice(0, 6)); // Show only first 6 properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-white text-center" style={{ backgroundImage: "url('/placeholder.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
          <p className="mt-2 text-lg">Browse through thousands of rental properties.</p>
          <Link to="/listings" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Browse Listings
          </Link>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Listings</h2>
        {loading ? (
          <p className="text-center">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link to="/listings" className="text-blue-600 font-semibold hover:underline">
            View All Listings →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
