import { dummyPropertyData } from "dummy";
import { BaseStore } from "shared";
import { Property } from "stores";

export const WishlistStore = new BaseStore<Property[]>({
  initValue: dummyPropertyData.slice(0, 3),
});
