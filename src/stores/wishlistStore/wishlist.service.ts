import { Property } from "stores";
import { WishlistStore } from "./wishlist.store";

export class WishlistService {
  // Adds a new property to the store
  public static async createProperty(property: Property) {
    WishlistStore.setStore([...WishlistStore.getValue(), property]);
    console.log(WishlistStore.getValue());
  }

  // Updates an existing property in the store
  public static async updateProperty(property: Property) {
    const properties = WishlistStore.getValue();
    const index = properties.findIndex((p) => p.id === property.id);
    if (index !== -1) {
      properties[index] = property;
      WishlistStore.setStore(properties);
    }
  }

  // Deletes a property from the store by its ID
  public static async deleteProperty(id: number) {
    const properties = WishlistStore.getValue();
    const index = properties.findIndex((p) => p.id === id);
    if (index !== -1) {
      properties.splice(index, 1);
      WishlistStore.setStore(properties);
    }

    console.log(WishlistStore.getValue());
  }

  public static getProperties(): Property[] {
    return WishlistStore.getValue();
  }
}
