import { dummyPropertyData } from "dummy";
import { BaseStore } from "shared";

export type Property = {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  sqft: string;
  status: string;
  location: string;
  mapPosition?: {
    lat: number;
    lng: number;
  };
  amenities?: {
    interior?: {
      kitchen?: string;
      laundry?: string;
      fireplace?: string;
      appliances?: string;
      flooring?: string;
      bedrooms?: number;
      bathrooms?: number;
    };
    exterior?: {
      stories?: string;
      pool?: string;
      heat?: string;
      garage?: string;
      security?: string;
      sewer?: string;
      other?: string;
      parking?: string;
      lotFeatures?: string;
      roof?: string;
    };
    areaLot?: {
      lotArea?: number;
      livingArea?: number | string;
      yearBuilt?: number | string;
      viewDescription?: string;
      architecturalStyle?: string;
      status?: string;
    };
  };
};

export const PropertyStore = new BaseStore<Property[]>({
  initValue: dummyPropertyData,
});
