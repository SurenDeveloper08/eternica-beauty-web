import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords, canonical }) => {
    const defaultTitle = "Eternica Beauty - Premium Skincare & Health Products";
    const defaultDescription =
        "Discover premium skincare, oils, wipes, dispensers, and more at Eternica Beauty.";
    const defaultKeywords = "skincare, beauty, health, oils, wipes, dispensers";

    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
            <meta
                name="description"
                content={description || defaultDescription}
            />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={canonical || "https://eternicabeauty.com/"} />

            {/* Open Graph for social sharing */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta
                property="og:description"
                content={description || defaultDescription}
            />
            <meta property="og:url" content={canonical || "https://eternicabeauty.com/"} />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default Meta;
