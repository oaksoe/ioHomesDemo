export interface Home {
    id: string;
    userID: string;
    name: string;
    type: string;
    location: Location;
    isOwner: boolean;
    isStaying: boolean;
    isAdmin: boolean;
}

export interface Location {
    landmarks: string;
    geolocation: string;
    address: string;
    street: string;
    ward: string;
    township: string;
    city: string;
    state: string;
    country: string;
}
