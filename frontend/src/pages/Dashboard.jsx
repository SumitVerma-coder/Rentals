import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import propertyService from "../services/propertyService";
import bookingService from "../services/bookingService";

const Dashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const [propertyData, bookingData] = await Promise.all([
          propertyService.getAllProperties(),
          bookingService.getUserBookings(user._id, user.token),
        ]);
        setProperties(propertyData);
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  if (!user) {
    return <div className="text-center text-red-500">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">My Listings</h3>
        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length > 0 ? (
          <ul className="space-y-3">
            {properties.map((property) => (
              <li key={property._id} className="border p-3 rounded-lg">
                <p><strong>Title:</strong> {property.title}</p>
                <p><strong>Location:</strong> {property.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties found.</p>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold">My Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-3 rounded-lg">
                <p><strong>Property:</strong> {booking.property.title}</p>
                <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
