import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CatSlider from '../../components/catSlider/catSlider'
import AboutUs from '../../components/AboutUs/AboutUs'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import MasonrySection from '../../components/CategoryShowcase/CategoryShowcase'
import Oil from '../../assets/oil.png'
import Wipes1 from '../../assets/black.png'
import Wipes2 from '../../assets/blue.png'
import Dispenser from '../../assets/Dispenser.png'
import { getActiveSliders } from "../../redux/actions/sliderActions";
import { getActiveMainCategories } from "../../redux/actions/categoryActions";
import { getAdminPage } from "../../redux/actions/pageActions";
import { getActiveTrendingHighlights, getActiveFavoritesHighlights } from "../../redux/actions/productActions";
import { getSeoByPage } from "../../redux/actions/seoActions"
import Meta from "../../utils/Meta";
const Home = () => {
    const { seo, error: seoError, loading: seoLoading } = useSelector(state => state.seoState);
    const { sliders = [], slidersLoading = true, error: sliderError } = useSelector(state => state.slidersState);
    const { categories = [], mainCategories, categoriesLoading = true, error: categoriesError } = useSelector(state => state.categoriesState);
    const { trendingProducts, favoritesProducts, error: highlightError, loading: highlightLoading } = useSelector(state => state.productsState);
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getSeoByPage('home'));
        dispatch(getActiveSliders());
        dispatch(getActiveMainCategories());
        dispatch(getAdminPage('about'));
        dispatch(getActiveTrendingHighlights('trending'));
        dispatch(getActiveFavoritesHighlights('favourite'));
    }, [dispatch]);

    return (
        <>
            <Meta
                title={seo?.metaTitle || "Home"}
                description={seo?.metaDescription || "Welcome to Eternica Beauty – Explore premium skincare products, oils, wipes, and dispensers."}
                keywords={seo?.metaKeywords || "skincare, beauty, oils, wipes, dispensers"}
                canonical="https://eternicabeauty.com/"
            />

            <HomeSlider sliders={sliders} />
            <section className='container py-5'>
                <CatSlider title={'Explore Our Categories'} categories={mainCategories} />
            </section>
            <section id='about-us'>
                <AboutUs />
            </section>
            <section className='container py-5'>
                <HomeProducts title={'Trending Products'} products={trendingProducts} />
            </section>
            <section className='container py-5'>
                <MasonrySection />
            </section>
            <section className='container py-5'>
                <HomeProducts title={'Customer Favorites'} products={favoritesProducts} />
            </section>
        </>
    )
}

export default Home