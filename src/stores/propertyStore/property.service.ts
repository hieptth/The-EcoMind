// Import the necessary definitions from your property store
import { PropertyStore, Property } from "./property.store";

export class PropertyService {
  // Adds a new property to the store
  public static async createProperty(property: Property) {
    PropertyStore.updateStore([property]);
  }

  // Updates an existing property in the store
  public static async updateProperty(property: Property) {
    const properties = PropertyStore.getValue();
    const index = properties.findIndex((p) => p.id === property.id);
    if (index !== -1) {
      properties[index] = property;
      PropertyStore.setStore(properties);
    }
  }

  // Deletes a property from the store by its ID
  public static async deleteProperty(id: number) {
    const properties = PropertyStore.getValue();
    const index = properties.findIndex((p) => p.id === id);
    if (index !== -1) {
      properties.splice(index, 1);
      PropertyStore.setStore(properties);
    }

    console.log(PropertyStore.getValue());
  }

  // Retrieves all properties from the store
  public static getProperties(): Property[] {
    return PropertyStore.getValue();
  }
}
