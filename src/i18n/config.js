import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Initial empty resources
const resources = {
  en: {
    translation: {
      common: {
        noData: "No data available",
        search: "Search",
        close: "Close",
        learnMore: "Learn More",
        noImage: "No Image",
        loading: "Loading...",
      },
      app: {
        getItOn: "GET IT ON",
        availableOn: "Available on the",
        mobileApplication: "Mobile Application",
      },
      halalHero: {
        title1: "Discover Over",
        productCount: "7,000,000",
        title2: "Halal Products and Services Today",
        subtitle:
          "Your trusted platform for authentic halal products and services worldwide",
        searchPlaceholder: "Search for Halal products or premises...",
      },
      products: {
        recentlyAdded: "Recently Added Products",
        totalProducts: "Total Products",
        showingPage: "Showing page",
        of: "of",
        productsCount: "products",
        seeDetails: "See details",
        previous: "Previous",
        next: "Next",
        page: "Page",
        productDetails: "Product Details",
        productName: "Product Name",
        brand: "Brand",
        origin: "Origin",
        productType: "Product Type",
        barcode: "Barcode",
        productId: "Product ID",
        notAvailable: "N/A",
      },
      smartSolutions: {
        title: "Smart Solutions for Every Industry",
        subtitle:
          "Discover how GST empowers healthcare, retail, logistics, and more with scalable tracking and automation technologies",
        loading: "Loading Smart Solutions...",
        noData: "No smart solutions available at the moment.",
        pageIndicator: "Page {{current}} of {{total}}",
      },
    },
  },
  ar: {
    translation: {
      common: {
        noData: "لا توجد بيانات متاحة",
        search: "بحث",
        close: "إغلاق",
        learnMore: "اعرف المزيد",
        noImage: "لا توجد صورة",
        loading: "جاري التحميل...",
      },
      app: {
        getItOn: "احصل عليه من",
        availableOn: "متوفر على",
        mobileApplication: "تطبيق الجوال",
      },
      halalHero: {
        title1: "اكتشف أكثر من",
        productCount: "7,000,000",
        title2: "منتج وخدمة حلال اليوم",
        subtitle:
          "منصتك الموثوقة للمنتجات والخدمات الحلال الأصيلة في جميع أنحاء العالم",
        searchPlaceholder: "ابحث عن منتجات أو مباني حلال...",
      },
      products: {
        recentlyAdded: "المنتجات المضافة حديثاً",
        totalProducts: "إجمالي المنتجات",
        showingPage: "عرض الصفحة",
        of: "من",
        productsCount: "منتجات",
        seeDetails: "عرض التفاصيل",
        previous: "السابق",
        next: "التالي",
        page: "صفحة",
        productDetails: "تفاصيل المنتج",
        productName: "اسم المنتج",
        brand: "العلامة التجارية",
        origin: "المنشأ",
        productType: "نوع المنتج",
        barcode: "الباركود",
        productId: "معرف المنتج",
        notAvailable: "غير متوفر",
      },
      smartSolutions: {
        title: "حلول ذكية لكل صناعة",
        subtitle:
          "اكتشف كيف تمكّن GST قطاعات الرعاية الصحية والتجزئة والخدمات اللوجستية والمزيد بتقنيات التتبع والأتمتة القابلة للتوسع",
        loading: "جاري تحميل الحلول الذكية...",
        noData: "لا توجد حلول ذكية متاحة في الوقت الحالي.",
        pageIndicator: "صفحة {{current}} من {{total}}",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    load: "languageOnly",
    debug: process.env.NODE_ENV === "development",
  });

// Function to update translations dynamically
export const updateTranslations = (newTranslations) => {
  Object.keys(newTranslations).forEach((lang) => {
    i18n.addResourceBundle(
      lang,
      "translation",
      newTranslations[lang].translation,
      true,
      true
    );
  });
};

export default i18n;
