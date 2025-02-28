import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import bookingService from "../services/bookingService";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const data = await bookingService.getUserBookings(user._id, user.token);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) {
    return <div className="text-center text-red-500">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
        Logout
      </button>

      <h3 className="text-xl font-semibold mt-6 mb-4">My Bookings</h3>
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
    </div>
  );
};

export default UserProfile;
