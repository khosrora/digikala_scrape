import { BRAND_NAME } from "../../types/brand";
import { Laptop } from "../../types/laptop_types";
import { STORE_NAME } from "../../types/store";

const needle = require('needle');



// ! get lap top asus digikala
// #TODO get details single page
// #TODO get products other page
async function get_asus_laptop() {
    try {
        const data = await needle('get', 'https://api.digikala.com/v1/categories/notebook-netbook-ultrabook/brands/asus/search/?seo_url=&page=1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
            }
        });
        const products = data.body.data.products;

        let products_digikala: Laptop[] = [];
        for (let item = 0; item < products.length; item++) {

            const product: Laptop = {
                id: data.body.data.products[item].id,
                store: STORE_NAME.DIGIKALA,
                brand: BRAND_NAME.ASUS,
                model_fa: data.body.data.products[item].title_fa,
                model_en: data.body.data.products[item].title_en,
                price: data.body.data.products[item].default_variant.price.selling_price,
                singlePageUrl: `https://www.digikala.com/product/dkp-${data.body.data.products[item].id}/%D9%84%D9%BE-%D8%AA%D8%A7%D9%BE-145-%D8%A7%DB%8C%D9%86%DA%86%DB%8C-%D8%A7%DB%8C%D8%B3%D9%88%D8%B3-%D9%85%D8%AF%D9%84-zenbook-pro-duo-14-ux8402ze-m3026w-clone-1-of-9943357/`,
                image_url: data.body.data.products[0].images.main.url[item]
            }

            products_digikala.push(product);
        }
    } catch (error) {
        console.log(error);
    }
}


export default get_asus_laptop;