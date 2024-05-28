import { dummyPropertyData } from "dummy";
import { BaseStore } from "shared";

export type Property = {
  id: number;
  status: string;
  price: string;
  description: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
};

export const PropertyStore = new BaseStore<Property[]>({
  initValue: dummyPropertyData,
});
