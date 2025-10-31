import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CatSlider from '../../components/catSlider/catSlider'
import AboutUs from '../../components/AboutUs/AboutUs'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import MasonrySection from '../../components/CategoryShowcase/CategoryShowcase'
import { getActiveSliders } from "../../redux/actions/sliderActions";
import { getActiveMainCategories } from "../../redux/actions/categoryActions";
import { getAdminPage } from "../../redux/actions/pageActions";
import { getActiveTrendingHighlights, getActiveFavoritesHighlights } from "../../redux/actions/productActions";
import { getSeoByPage } from "../../redux/actions/seoActions"
import Meta from "../../utils/Meta";
import Loader from "../../components/Loader/Loader";

const Home = () => {
    const { seo, error: seoError, loading: seoLoading } = useSelector(state => state.seoState);
    const { sliders = [], loading: slidersLoading, error: sliderError } = useSelector(state => state.slidersState);
    const { categories = [], mainCategories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categoriesState);
    const { trendingProducts, favoritesProducts, error: highlightError, loading: highlightLoading } = useSelector(state => state.productsState);
    const { page: about, error, loading: aboutLoading } = useSelector(state => state.pageState);

    const dispatch = useDispatch();

    const isLoading = seoLoading || slidersLoading || categoriesLoading || highlightLoading || aboutLoading;

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
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Meta
                        title={seo?.metaTitle || "Premium Spa Massage Oils & Gym Wipes Supplier in UAE"}
                        description={seo?.metaDescription || "Discover Eternica Beauty: your one-stop-shop for the finest spa massage oils, essential oils, and carrier oils in the UAE, as well as biodegradable and antibacterial gym wipes."}
                        keywords={seo?.metaKeywords || "skincare, biodegradable gym wipes, spa massage oils UAE, wipes, dispensers"}
                        canonical="https://eternicabeauty.com/"
                    />

                    {
                        sliders &&
                        <section className='custom-container'>
                            <HomeSlider sliders={sliders} />
                        </section>
                    }

                    {
                        mainCategories &&
                        <section className='container py-5'>
                            <CatSlider title={'Explore Our Categories'} categories={mainCategories} />
                        </section>
                    }
                    {about &&
                        <section id='about-us'>
                            <AboutUs about={about} />
                        </section>
                    }
                    {trendingProducts &&
                        <section className='container py-5'>
                            <HomeProducts title={'Trending Products'} products={trendingProducts} />
                        </section>
                    }
                    <section className='container py-5'>
                        <MasonrySection />
                    </section>
                    {favoritesProducts &&
                        <section className='container py-5'>
                            <HomeProducts title={'Customer Favorites'} products={favoritesProducts} />
                        </section>
                    }

                </>
            )}
        </>
    )
}

export default Home