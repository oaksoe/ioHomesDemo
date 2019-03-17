export interface Home {
    id: string;
    userID: string;
    name: string;
    type: string;
    isOwner: boolean;
    isStaying: boolean;
    isAdmin: boolean;
    location: Location;
}

export interface Location {
    landmarks: string;
    geolocation: string;
    address: string;
    street: string;
    ward: string;
    township: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
}
