interface AmenityDetails {
  Kitchen?: string;
  Laundryroom?: string;
  Fireplace?: string;
  Appliances?: string;
  Flooring?: string;
  TotalBedrooms?: string;
  TotalBathrooms?: string;
  Other?: string;
  Stories?: string;
  Pool?: string;
  Airconditioning?: string;
  Heattype?: string;
  WaterSource?: string;
  GarageSpace?: string;
  SecurityFeatures?: string;
  Sewer?: string;
  Parking?: string;
  LotFeatures?: string;
  Roof?: string;
}

interface AreaLotDetails {
  LotArea?: string;
  Livingarea?: string;
  YearBuilt?: string;
  ViewDescription?: string;
  ArchitectureStyles?: string;
  Status?: string;
}

interface FinanceDetails {
  SalesPrice?: string;
}

interface PropertyAmenities {
  interior?: AmenityDetails;
  exterior?: AmenityDetails;
  areaLot?: AreaLotDetails;
  finance?: FinanceDetails;
}

interface Property {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  location: string;
  status: string;
  amenities: PropertyAmenities;
  areaLot: string;
  // mapUrl?: string; // Uncomment if you have this property
}
