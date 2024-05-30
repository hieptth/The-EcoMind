import random
from faker import Faker

fake = Faker()


def generate_property(id):
    price_options = ["1,000,000", "1,500,000", "2,000,000", "2,500,000",
                     "3,000,000", "3,500,000", "4,000,000", "4,500,000", "5,000,000"]
    bedrooms_options = [1, 2, 3, 4]
    bathrooms_options = [1, 2, 3]
    status_options = ["For Sale", "For Rent"]
    sqft_range = (500, 10000)

    property_data = {
        "id": id,
        "imageUrl": "https://via.placeholder.com/150",
        "title": f"Property {id}",
        "price": random.choice(price_options),
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "sqft": str(random.randint(*sqft_range)),
        "status": random.choice(status_options),
        "location": fake.address(),
        "mapPosition": {
            "lat": fake.latitude(),
            "lng": fake.longitude()
        },
        "amenities": {
            "interior": {
                "kitchen": "Granite Countertops",
                "laundry": "Washer/Dryer",
                "fireplace": "Gas",
                "appliances": "Stainless Steel",
                "flooring": "Hardwood",
                "bedrooms": random.choice(bedrooms_options),
                "bathrooms": random.choice(bathrooms_options),
            },
            "exterior": {
                "stories": "2",
                "pool": "Inground",
                "heat": "Central",
                "garage": "2 Car",
                "security": "Alarm",
                "sewer": "Public",
                "other": "Fenced Yard",
                "parking": "Driveway",
                "lotFeatures": "Corner Lot",
                "roof": "Shingle",
            },
            "areaLot": {
                "lotArea": 0.25,
                "livingArea": random.randint(500, 10000),
                "yearBuilt": 1995,
                "viewDescription": "City",
                "architecturalStyle": "Contemporary",
                "status": random.choice(status_options),
            },
        },
    }
    return property_data


# Generate 100 properties
properties_data = [generate_property(i + 1) for i in range(100)]
print(properties_data[:5])  # Print the first 5 properties to check
