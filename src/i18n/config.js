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
      menu: {
        home: "Home",
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
      pricingCards: {
        title: "Choose Your Perfect Plan",
        subtitle:
          "Get GS1 2027 compliant with our comprehensive barcode and integration solutions. From basic audits to enterprise-grade customizations.",
        loadingPlans: "Loading subscription plans...",
        errorMessage: "Failed to fetch subscription plans",
        free: "Free",
        mostPopular: "Most Popular",
        getStartedFree: "Get Started Free",
        choosePlan: "Choose Plan",
        moreFeatures: " more features",
        additionalFeatures: "Additional Features:",
        whyChooseTitle: "Why Choose Our GS1 2027 Compliance Solutions?",
        certifiedTitle: "GS1 Certified",
        certifiedDesc: "Fully compliant with GS1 2027 standards",
        implementationTitle: "Fast Implementation",
        implementationDesc: "Quick setup and migration support",
        supportTitle: "24/7 Support",
        supportDesc: "Expert assistance whenever you need it",
        yearly: "yearly",
        monthly: "monthly",
      },
      subscriptionForm: {
        noPlanSelected: "No Plan Selected",
        noPlanSelectedDesc: "Please select a plan first.",
        viewPlans: "View Plans",
        selectedPlan: "Selected Plan",
        includedFeatures: "Included Features:",
        moreFeatures: " more features",
        changePlan: "← Change Plan",
        registrationInfo: "Registration Information",
        personalInfo: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        mobileNumber: "Mobile Number",
        companyWebsite: "Company Website",
        required: "*",
        firstNamePlaceholder: "Enter your first name",
        lastNamePlaceholder: "Enter your last name",
        emailPlaceholder: "Enter your email address",
        mobilePlaceholder: "Enter your mobile number",
        websitePlaceholder: "https://www.yourcompany.com",
        processing: "Processing...",
        completeRegistration: "Complete Registration",
        free: "Free",
        // Validation messages
        firstNameRequired: "First name is required",
        lastNameRequired: "Last name is required",
        emailRequired: "Email is required",
        mobileRequired: "Valid mobile number is required",
        websiteRequired: "Company website is required",
        // Toast messages
        registrationSuccess:
          "Registration successful! Welcome to {{planName}} plan.",
        registrationFailed: "Registration failed. Please try again.",
        networkError:
          "Network error occurred. Please check your connection and try again.",
      },
      contactUs: {
        title: "Contact Us",
        subtitle: "We'd love to hear from you. Reach out today!",
        contactInformation: "Contact Information",
        formLabels: {
          name: "Your Name",
          email: "Your Email",
          mobile: "Your Mobile number (optional)",
          companyName: "Company Name (optional)",
          subject: "Subject",
          message: "Message",
        },
        placeholders: {
          name: "Write your name",
          email: "Write your email",
          companyName: "If contacting on behalf of a company",
          subject:
            "Short title of the message like: Inquiry, Support Request, Partnership, etc.",
          message: "Detailed message / inquiry / request",
        },
        validation: {
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          subjectRequired: "Subject is required",
          messageRequired: "Message is required",
          emailInvalid: "Please enter a valid email address",
        },
        buttons: {
          submit: "Submit Inquiry",
          sending: "Sending...",
        },
        success:
          "Your message has been sent successfully! We'll get back to you soon.",
        error: "Something went wrong. Please try again.",
        privacyNotice:
          "*Your information will be kept confidential and used solely for correspondence purposes.",
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
      menu: {
        home: "الرئيسية",
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
      pricingCards: {
        title: "اختر خطتك المثالية",
        subtitle:
          "احصل على امتثال GS1 2027 مع حلولنا الشاملة للرمز الشريطي والتكامل. من عمليات التدقيق الأساسية إلى التخصيصات على مستوى المؤسسات.",
        loadingPlans: "جاري تحميل خطط الاشتراك...",
        errorMessage: "فشل في جلب خطط الاشتراك",
        free: "مجاني",
        mostPopular: "الأكثر شعبية",
        getStartedFree: "ابدأ مجاناً",
        choosePlan: "اختر الخطة",
        moreFeatures: " ميزة إضافية",
        additionalFeatures: "الميزات الإضافية:",
        whyChooseTitle: "لماذا تختار حلول امتثال GS1 2027 الخاصة بنا؟",
        certifiedTitle: "معتمد من GS1",
        certifiedDesc: "متوافق بالكامل مع معايير GS1 2027",
        implementationTitle: "تنفيذ سريع",
        implementationDesc: "إعداد سريع ودعم الهجرة",
        supportTitle: "دعم 24/7",
        supportDesc: "مساعدة خبراء كلما احتجت إليها",
        yearly: "سنوي",
        monthly: "شهري",
      },
      subscriptionForm: {
        noPlanSelected: "لم يتم اختيار خطة",
        noPlanSelectedDesc: "يرجى اختيار خطة أولاً.",
        viewPlans: "عرض الخطط",
        selectedPlan: "الخطة المختارة",
        includedFeatures: "الميزات المتضمنة:",
        moreFeatures: " ميزة إضافية",
        changePlan: "← تغيير الخطة",
        registrationInfo: "معلومات التسجيل",
        personalInfo: "المعلومات الشخصية",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        mobileNumber: "رقم الجوال",
        companyWebsite: "موقع الشركة",
        required: "*",
        firstNamePlaceholder: "أدخل اسمك الأول",
        lastNamePlaceholder: "أدخل اسم العائلة",
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        mobilePlaceholder: "أدخل رقم جوالك",
        websitePlaceholder: "https://www.yourcompany.com",
        processing: "جاري المعالجة...",
        completeRegistration: "إكمال التسجيل",
        free: "مجاني",
        // Validation messages
        firstNameRequired: "الاسم الأول مطلوب",
        lastNameRequired: "اسم العائلة مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        mobileRequired: "رقم جوال صحيح مطلوب",
        websiteRequired: "موقع الشركة مطلوب",
        // Toast messages
        registrationSuccess: "تم التسجيل بنجاح! مرحباً بك في خطة {{planName}}.",
        registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
        networkError:
          "حدث خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.",
      },
      contactUs: {
        title: "اتصل بنا",
        subtitle: "نود أن نسمع منك. تواصل معنا اليوم!",
        contactInformation: "معلومات التواصل",
        formLabels: {
          name: "اسمك",
          email: "بريدك الإلكتروني",
          mobile: "رقم جوالك (اختياري)",
          companyName: "اسم الشركة (اختياري)",
          subject: "الموضوع",
          message: "الرسالة",
        },
        placeholders: {
          name: "اكتب اسمك",
          email: "اكتب بريدك الإلكتروني",
          companyName: "في حال التواصل نيابة عن شركة",
          subject: "عنوان قصير للرسالة مثل: استفسار، طلب دعم، شراكة، إلخ.",
          message: "رسالة تفصيلية / استفسار / طلب",
        },
        validation: {
          nameRequired: "الاسم مطلوب",
          emailRequired: "البريد الإلكتروني مطلوب",
          subjectRequired: "الموضوع مطلوب",
          messageRequired: "الرسالة مطلوبة",
          emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
        },
        buttons: {
          submit: "إرسال الاستفسار",
          sending: "جاري الإرسال...",
        },
        success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        privacyNotice: "*ستبقى معلوماتك سرية وتُستخدم فقط لأغراض المراسلة.",
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
