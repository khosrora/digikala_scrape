import { BRAND_NAME } from "../../types/brand";
import { Laptop } from "../../types/laptop_types";
import { STORE_NAME } from "../../types/store";
import { delay } from "../../utils/delay";

const needle = require('needle');



// ! get lap top asus digikala
// #TODO add to database

const headers = {
    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'X-Web-Client': 'desktop',
    'sec-ch-ua-mobile': '?1',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://www.digikala.com/',
    'X-Web-Optimize-Response': '1',
    'sec-ch-ua-platform': '"Android"'
}

async function get_asus_laptop() {
    try {
        let page = 1;
        let products_digikala: Laptop[] = [];
        for (let index = 1; index <= page; index++) {
            const data = await needle('get', `https://api.digikala.com/v1/categories/notebook-netbook-ultrabook/brands/asus/search/?seo_url=&page=${index}`, {
                headers
            });

            const total_pages = data.body.data.pager.total_pages;
            if (index == 1) page = total_pages;
            const products = data.body.data.products;

            for (let item = 0; item < products.length; item++) {
                const singlePage = `https://api.digikala.com/v2/product/${data.body.data.products[item].id}/`
                const desc = await getSinglePage(singlePage)
                const product: Laptop = {
                    id: data.body.data.products[item].id,
                    store: STORE_NAME.DIGIKALA,
                    brand: BRAND_NAME.ASUS,
                    model_fa: data.body.data.products[item].title_fa,
                    model_en: data.body.data.products[item].title_en,
                    price: data.body.data.products[item].default_variant.price.selling_price,
                    singlePageUrl: singlePage,
                    image_url: data.body.data.products[0].images.main.url[item],
                    desc: desc
                }
                products_digikala.push(product);
                console.log(products_digikala.length);
                await delay(1000)
            }
        }
        // console.log(products_digikala);
    } catch (error) {
        console.log(error);
    }
}

const getSinglePage = async (url: string) => {
    try {
        const getDetailsPage = await needle('get', url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
            }
        })
        return getDetailsPage.body.data.product.expert_reviews.description
    } catch (error) {
        console.log(error);
    }
}

export default get_asus_laptop;