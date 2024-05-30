import React, { useState } from "react";
import ListingDashboard from "app/component/listingDashboard/listingDashboard";
import ListingDetailDashboard from "app/component/ListingDetailDashboard/ ListingDetailDashboard";
import { Property } from "stores/propertyStore";

const PropertiesContent = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const handleListingClick = (property: Property) => {
    setSelectedProperty(property);
    window.history.pushState({}, "", `/dashboard/properties?id=${property.id}`);
  };

  const goBack = () => {
    setSelectedProperty(null);
    window.history.pushState({}, "", "/dashboard/properties");
  };

  return (
    <>
      {selectedProperty ? (
        <ListingDetailDashboard property={selectedProperty} goBack={goBack} />
      ) : (
        <ListingDashboard onListingClick={handleListingClick} />
      )}
    </>
  );
};

export default PropertiesContent;
