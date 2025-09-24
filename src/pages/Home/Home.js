import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CatSlider from '../../components/catSlider/catSlider'
import AboutUs from '../../components/AboutUs/AboutUs '
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import MasonrySection from '../../components/MasonrySection/MasonrySection'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import PureOil from '../../assets/Feature/water.png'
import BestPrice from '../../assets/Feature/sale.png'
import Shipping from '../../assets/Feature/delivery.png'
import Support from '../../assets/Feature/customer-support.png'
import CarrierOil from '../../assets/carrieroil.png'
import Oil from '../../assets/oil.png'
import ContactUs from '../ContactUs/ContactUs'
import ProductShowcase from '../../components/ProductShowcase/ProductShowcase'
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
            image: Oil,
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
            name: "Carrier & Base Oils",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 2,
            name: "Essential Oil",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 3,
            name: "Fragrance Oil",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
        {
            id: 4,
            name: "Massage Oil",
            category: "Oils",
            subCategory: [],
            imageUrl: "https://api.spastore.me/uploads/topCategory/pedicure%20bowls.png"
        },
    ];

    // featuresData.js
    const features = [
        {
            id: 1,
            title: '100% Pure Oils',
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
            {/* <HomeSlider /> */}
            {/* <section className='container py-5'>
                <CatSlider title={'Explore Our Oils'} category={category} />
            </section> */}
            <section className='container' id='about-us'>
                <AboutUs />
            </section>
            {/* <section className='container py-5' id='products'>
                <ProductShowcase />
            </section> */}
            {/* <section className='container py-5'>
                <HomeProducts title={'Trending Products'} products={sampleProducts} />
            </section>*/}
            {/* <section className='container py-5'>
                <MasonrySection title={'Our Products'} categories={categories} />
            </section> */}
            {/*  <section className='container py-5'>
                <HomeProducts title={'Customer Favorites'} products={sampleProducts} />
            </section>
            <section className='container py-5'>
                <FeatureCard features={features} />
            </section> */}
            <section id='contact-us'>
                <ContactUs />
            </section>
        </>
    )
}

export default Home