import { useEffect } from 'react';

const MetaTags = ({ 
  title = "Educ8Africa - Cybersecurity Training & Education Platform",
  description = "Transform your cybersecurity career with Educ8Africa. Access industry-relevant training, internship opportunities, and professional development programs across Africa.",
  keywords = "cybersecurity training, Africa, internships, National Service Program, tech education, digital transformation, career development",
  image = "/assets/landingBG.png",
  url = window.location.href,
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, content, attribute = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.split('property="')[1].split('"')[0]);
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.split('name="')[1].split('"')[0]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[name="author"]', 'Educ8Africa');
    updateMetaTag('meta[name="viewport"]', 'width=device-width, initial-scale=1.0');
    
    // Open Graph meta tags for social media
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', 'Educ8Africa');
    
    // Twitter Card meta tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', image);
    
    // Additional SEO meta tags
    updateMetaTag('meta[name="robots"]', 'index, follow');
    updateMetaTag('meta[name="language"]', 'English');
    updateMetaTag('meta[name="theme-color"]', '#dc2626');
    
    // JSON-LD structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Educ8Africa",
      "description": description,
      "url": url,
      "logo": image,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.linkedin.com/company/educ8africa",
        "https://twitter.com/educ8africa",
        "https://www.facebook.com/educ8africa"
      ]
    };

    let ldJsonScript = document.querySelector('script[type="application/ld+json"]');
    if (!ldJsonScript) {
      ldJsonScript = document.createElement('script');
      ldJsonScript.type = 'application/ld+json';
      document.head.appendChild(ldJsonScript);
    }
    ldJsonScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default MetaTags;
