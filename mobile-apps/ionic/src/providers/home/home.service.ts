import { Injectable } from '@angular/core';
import { Home } from '../../models';
 
@Injectable()
export class HomeService {
    private home: Home;

    constructor() {}

    public initHome(): Home {
        return {
            id: null,
            userID: null,
            name: '',
            type: 'Apartment',
            isOwner: true,
            isStaying: true,
            isAdmin: true,
            location: {
                landmarks: '',
                geolocation: '',
                address: '',
                street: '',
                ward: '',
                township: '',
                postCode: '',
                city: '',
                state: '',
                country: 'Malaysia'
            }
        }
    }

    public updateHome(home): Home {
        return {
            id: home.id,
            userID: home.userID,
            name: home.name,
            type: home.type,
            isOwner: home.isOwner,
            isStaying: home.isStaying,
            isAdmin: home.isAdmin,
            location: {
                landmarks: home.location.landmarks,
                geolocation: home.location.geolocation,
                address: home.location.address,
                street: home.location.street,
                ward: home.location.ward,
                township: home.location.township,
                postCode: home.location.postCode,
                city: home.location.city,
                state: home.location.state,
                country: home.location.country
            }
        }
    }

    public setHome(home: Home) {
        this.home = home;
    }

    public getHome(): Home {
        return this.home;
    }
}
