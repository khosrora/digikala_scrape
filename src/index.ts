import get_asus_laptop from './digikala/laptop/asus'

class Scrape {

    constructor() {
        this.digikala();
    }

    async digikala() {
        await get_asus_laptop();
    }

}


// ! run app
new Scrape();