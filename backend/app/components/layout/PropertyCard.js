const PropertyCard = ({ property }) => (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.location}</p>
      <p>${property.price}/month</p>
    </div>
  )
  
  export default PropertyCard
  