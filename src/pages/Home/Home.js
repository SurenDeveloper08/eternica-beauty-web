import React from 'react'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
// import CatSlider from '../../components/catSlider/catSlider'
// import AboutUs from '../../components/AboutUs/AboutUs '
import HomeProducts from '../../components/HomeProducts/HomeProducts'
// import MasonrySection from '../../components/CategoryShowcase/CategoryShowcase'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import PureOil from '../../assets/Feature/water.png'
import BestPrice from '../../assets/Feature/sale.png'
import Shipping from '../../assets/Feature/delivery.png'
import Support from '../../assets/Feature/customer-support.png'
import CarrierOil from '../../assets/carrieroil.png'
import Oil from '../../assets/oil.png'
import Wipes1 from '../../assets/black.png'
import Wipes2 from '../../assets/blue.png'
import Dispenser from '../../assets/Dispenser.png'
const Home = () => {

    const sampleProducts = [
        {
            _id: "p1",
            productName: "Herbal Massage Oil 250ml",
            slug: "herbal-massage-oil-250ml",
            brand: "NatureCare",
            category: "massage-oils",
            subCategory: "herbal-oils",
            country: "uae",
            price: 45,
            productCurrency: "AED",
            stock: 12,
            image: Wipes1,
        },
        {
            _id: "p2",
            productName: "Luxury Spa Towel Pack",
            slug: "luxury-spa-towel-pack",
            brand: "SpaComfort",
            category: "spa-accessories",
            subCategory: "towels",
            country: "uae",
            price: 120,
            productCurrency: "AED",
            stock: 5,
            image: Oil,
        },
        {
            _id: "p3",
            productName: "Electric Aroma Diffuser",
            slug: "electric-aroma-diffuser",
            brand: "RelaxTech",
            category: "diffusers",
            subCategory: "electric",
            country: "uae",
            price: 99,
            productCurrency: "AED",
            stock: 0, // out of stock
            image: Dispenser,
        },
        {
            _id: "p3",
            productName: "Electric Aroma Diffuser",
            slug: "electric-aroma-diffuser",
            brand: "RelaxTech",
            category: "diffusers",
            subCategory: "electric",
            country: "uae",
            price: 99,
            productCurrency: "AED",
            stock: 0, // out of stock
            image: Wipes2,
        },
        {
            _id: "p3",
            productName: "Electric Aroma Diffuser",
            slug: "electric-aroma-diffuser",
            brand: "RelaxTech",
            category: "diffusers",
            subCategory: "electric",
            country: "uae",
            price: 99,
            productCurrency: "AED",
            stock: 0, // out of stock
            image: Dispenser,
        },
        {
            _id: "p3",
            productName: "Electric Aroma Diffuser",
            slug: "electric-aroma-diffuser",
            brand: "RelaxTech",
            category: "diffusers",
            subCategory: "electric",
            country: "uae",
            price: 99,
            productCurrency: "AED",
            stock: 0, // out of stock
            image: Oil,
        },
    ];

    // categoriesData.js
    const categories = [
        {
            id: 1,
            title: 'Carrier & Base Oils',
            image: CarrierOil,
            description: 'High-quality carrier and base oils, perfect for diluting essential oils, massage, and skincare. Nourishing, natural, and safe for all skin types.',
        },
        {
            id: 2,
            title: 'Essential Oil',
            image: CarrierOil,
            description: 'Pure and aromatic essential oils extracted from flowers, herbs, and plants. Ideal for aromatherapy, relaxation, and wellness.',
        },
        {
            id: 3,
            title: 'Fragrance Oil',
            image: CarrierOil,
            description: 'Premium fragrance oils to enhance mood and create a relaxing environment. Suitable for diffusers, candles, and spa use.',
        },
        {
            id: 4,
            title: 'Massage Oil',
            image: CarrierOil,
            description: 'Natural and soothing massage oils designed to relax muscles, hydrate skin, and provide a calming massage experience.',
        },
    ];

    const category = [
        {
            id: 1,
            name: "Massage Oils",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 2,
            name: "Essential Oils",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 3,
            name: "Carrier & Base Oils",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 4,
            name: "Fragrance Oils",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 5,
            name: "Gym Wipes",
            category: "Doyen",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 6,
            name: "Dispensers",
            category: "Doyen",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
    ];

    // featuresData.js
    const features = [
        {
            id: 1,
            title: 'Premium Quality',
            image: PureOil,
        },
        {
            id: 2,
            title: 'Best Price',
            image: BestPrice,
        },
        {
            id: 3,
            title: 'Fast Delivery',
            image: Shipping,
        },
        {
            id: 4,
            title: 'Customer Support',
            image: Support,
        },
    ];

    return (
        <>
            <section className='container pt-3'>
                <HomeSlider />
            </section>
            {/* <section className='container py-5'>
                <CatSlider title={'Explore Our Categories'} category={category} />
            </section> */}
            {/* <section className='container py-5' id='about-us'>
                <AboutUs />
            </section> */}
           <section className='container py-5'>
                <HomeProducts title={'Trending Products'} products={sampleProducts} />
            </section>
            {/* <section className='container py-5'>
                <MasonrySection />
            </section> */}
            <section className='container py-5'>
                <HomeProducts title={'Customer Favorites'} products={sampleProducts} />
            </section>
            <section className='container py-5'>
                <FeatureCard features={features} />
            </section>
        </>
    )
}

export default Home 