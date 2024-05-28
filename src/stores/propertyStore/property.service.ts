import { PropertyStore, Property } from "./property.store";

export class PropertyService {
  public static async createProperty(property: Property) {
    PropertyStore.updateStore([...PropertyStore.getValue(), property]);
  }

  public static async updateProperty(property: Property) {
    const properties = PropertyStore.getValue();
    const index = properties.findIndex((p) => p.id === property.id);
    properties[index] = property;
    PropertyStore.updateStore(properties);
  }

  public static async deleteProperty(id: number) {
    const properties = PropertyStore.getValue();
    const index = properties.findIndex((p) => p.id === id);
    properties.splice(index, 1);
    PropertyStore.updateStore(properties);
  }
}
