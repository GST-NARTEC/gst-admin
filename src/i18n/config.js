import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translations
const resources = {
  en: {
    translation: {
      // Header translations
      "info.email": "info@gstsa1.org",
      "info.phone": "+966 504420607",
      "company.name": "Global Standard Technology",
      "company.slogan": "The Future of Innovation",
      "button.buyBarcode": "Buy Barcode",
      "button.login": "Login",

      // Login Page translations
      "login.welcomeBack": "Welcome Back",
      "login.signIn": "Please sign in to your account",
      "login.email": "Enter your email",
      "login.password": "Enter your password",
      "login.rememberMe": "Remember me",
      "login.forgotPassword": "Forgot password?",
      "login.button": "Sign in",
      "login.copyright": "© 2024 Global Standard for Technology. v1.0.0",
      "login.success": "Login successful",
      "login.failed": "Login failed",

      // WhyChooseUs translations
      "whyChooseUs.title": "Why use a 2D barcode?",
      "whyChooseUs.subtitle":
        "Compared to the traditional 1D barcode, 2D barcodes streamline the needs of both supply chains and consumers",
      "whyChooseUs.noData": "No data available",

      // CoreSolutions translations
      "coreSolutions.title": "Featured Core Solutions",
      "coreSolutions.subtitle":
        "Increase efficiency, automate workflows, and gain clear visibility into your operations. Learn more about strategic technology solutions that can help connect your people, assets, and data.",
      "coreSolutions.learnMore": "Learn More",
      "coreSolutions.noData": "No data available",

      // ProfessionalServices translations
      "proServices.title": "PROFESSIONAL SERVICES",
      "proServices.noData": "No data available",
      "proServices.more": "More",
      "proServices.supplies.title":
        "LABELS, TAGS, RIBBONS, AND PRINTING SUPPLIES",
      "proServices.supplies.description":
        "At GST Solutions, we understand that the ribbon and label selection is a critical component of a successful barcode system and that having these supplies when you need them is just as important. We also provide a variety of supply management services to ensure that you have what you need, when you need it.",
      "proServices.supplies.learnMore": "Learn More",
      "proServices.supplies.labels": "Labels & Tags",
      "proServices.supplies.ribbons": "Ribbons",
      "proServices.supplies.printing": "Printing Solutions",
      "proServices.supplies.management": "Supply Management",

      // WhyWorkWithUs translations
      "whyWorkWithUs.title": "Why Work With GST Solutions?",
      "whyWorkWithUs.subtitle":
        "At GST Solutions, we take your business challenges seriously. We gather the necessary industry research to provide unbiased manufacturer recommendations in the most cost-effective manner.",
      "whyWorkWithUs.features.datadriven.title": "Data-Driven Solutions",
      "whyWorkWithUs.features.datadriven.description":
        "We leverage industry research and analytics to provide unbiased, cost-effective recommendations.",
      "whyWorkWithUs.features.trusted.title": "Trusted Partnership",
      "whyWorkWithUs.features.trusted.description":
        "Your business challenges are our priority. We deliver tailored solutions that drive real results.",
      "whyWorkWithUs.features.support.title": "End-to-End Support",
      "whyWorkWithUs.features.support.description":
        "From initial consultation to implementation and beyond, we're with you every step of the way.",
      "whyWorkWithUs.features.expert.title": "Expert Team",
      "whyWorkWithUs.features.expert.description":
        "Our experienced professionals understand your industry's unique challenges and requirements.",
      "whyWorkWithUs.contact": "Contact Us Discuss Your Technology Need",

      // Footer translations
      "footer.company.name": "Global Standard for Technology",
      "footer.company.address":
        "Solution King Abdullah Road, Riyadh Kingdom of Saudi Arabia",
      "footer.company.copyright":
        "Copyright © 2022 GST Solutions All Right Reserved",

      "footer.getInTouch.title": "Get in Touch",
      "footer.getInTouch.address":
        "Global Standard for Technology Solution King Abdullah Road, Riyadh Kingdom of Saudi Arabia",
      "footer.getInTouch.email": "info@gstsa1.org",
      "footer.getInTouch.phone": "+966 504420607",

      "footer.followUs.title": "Follow us",

      "footer.newsletter.title": "Join our Newsletter",
      "footer.newsletter.email": "Email",
      "footer.newsletter.placeholder": "Enter Your Email",
      "footer.newsletter.subscribe": "Subscribe",
    },
  },
  ar: {
    translation: {
      // Header translations
      "info.email": "info@gstsa1.org",
      "info.phone": "+966 504420607",
      "company.name": "التقنية القياسية العالمية",
      "company.slogan": "مستقبل الابتكار",
      "button.buyBarcode": "شراء الباركود",
      "button.login": "تسجيل الدخول",

      // Login Page translations
      "login.welcomeBack": "مرحباً بعودتك",
      "login.signIn": "الرجاء تسجيل الدخول إلى حسابك",
      "login.email": "أدخل بريدك الإلكتروني",
      "login.password": "أدخل كلمة المرور",
      "login.rememberMe": "تذكرني",
      "login.forgotPassword": "نسيت كلمة المرور؟",
      "login.button": "تسجيل الدخول",
      "login.copyright": "© 2024 التقنية القياسية العالمية. الإصدار 1.0.0",
      "login.success": "تم تسجيل الدخول بنجاح",
      "login.failed": "فشل تسجيل الدخول",

      // WhyChooseUs translations
      "whyChooseUs.title": "لماذا تستخدم الباركود ثنائي الأبعاد؟",
      "whyChooseUs.subtitle":
        "مقارنة بالباركود التقليدي أحادي البعد، تعمل الرموز الشريطية ثنائية الأبعاد على تبسيط احتياجات سلاسل التوريد والمستهلكين",
      "whyChooseUs.noData": "لا توجد بيانات متاحة",

      // CoreSolutions translations
      "coreSolutions.title": "الحلول الأساسية المميزة",
      "coreSolutions.subtitle":
        "زيادة الكفاءة وأتمتة سير العمل والحصول على رؤية واضحة لعملياتك. تعرف على المزيد حول حلول التكنولوجيا الاستراتيجية التي يمكن أن تساعد في ربط موظفيك وأصولك وبياناتك.",
      "coreSolutions.learnMore": "اعرف المزيد",
      "coreSolutions.noData": "لا توجد بيانات متاحة",

      // ProfessionalServices translations
      "proServices.title": "الخدمات المهنية",
      "proServices.noData": "لا توجد بيانات متاحة",
      "proServices.more": "المزيد",
      "proServices.supplies.title":
        "الملصقات والعلامات والأشرطة ومستلزمات الطباعة",
      "proServices.supplies.description":
        "في حلول GST، نحن نفهم أن اختيار الشريط والملصق هو عنصر حيوي في نظام الباركود الناجح، وأن توفر هذه المستلزمات عند الحاجة إليها مهم بنفس القدر. نحن نقدم أيضًا مجموعة متنوعة من خدمات إدارة المستلزمات لضمان حصولك على ما تحتاجه في الوقت المناسب.",
      "proServices.supplies.learnMore": "اعرف المزيد",
      "proServices.supplies.labels": "الملصقات والعلامات",
      "proServices.supplies.ribbons": "الأشرطة",
      "proServices.supplies.printing": "حلول الطباعة",
      "proServices.supplies.management": "إدارة المستلزمات",

      // WhyWorkWithUs translations
      "whyWorkWithUs.title": "لماذا تعمل مع حلول GST؟",
      "whyWorkWithUs.subtitle":
        "في حلول GST، نأخذ تحديات عملك على محمل الجد. نقوم بجمع الأبحاث الصناعية اللازمة لتقديم توصيات غير متحيزة للمصنعين بأكثر الطرق فعالية من حيث التكلفة.",
      "whyWorkWithUs.features.datadriven.title": "حلول مبنية على البيانات",
      "whyWorkWithUs.features.datadriven.description":
        "نستفيد من البحوث والتحليلات الصناعية لتقديم توصيات غير متحيزة وفعالة من حيث التكلفة.",
      "whyWorkWithUs.features.trusted.title": "شراكة موثوقة",
      "whyWorkWithUs.features.trusted.description":
        "تحديات عملك هي أولويتنا. نقدم حلولاً مخصصة تحقق نتائج حقيقية.",
      "whyWorkWithUs.features.support.title": "دعم شامل",
      "whyWorkWithUs.features.support.description":
        "من الاستشارة الأولية إلى التنفيذ وما بعده، نحن معك في كل خطوة على الطريق.",
      "whyWorkWithUs.features.expert.title": "فريق خبير",
      "whyWorkWithUs.features.expert.description":
        "يفهم متخصصونا ذوو الخبرة التحديات والمتطلبات الفريدة لصناعتك.",
      "whyWorkWithUs.contact": "اتصل بنا لمناقشة احتياجاتك التقنية",

      // Footer translations
      "footer.company.name": "التقنية القياسية العالمية",
      "footer.company.address":
        "طريق الملك عبدالله، الرياض المملكة العربية السعودية",
      "footer.company.copyright":
        "حقوق النشر © 2022 حلول GST جميع الحقوق محفوظة",

      "footer.getInTouch.title": "تواصل معنا",
      "footer.getInTouch.address":
        "التقنية القياسية العالمية طريق الملك عبدالله، الرياض المملكة العربية السعودية",
      "footer.getInTouch.email": "info@gstsa1.org",
      "footer.getInTouch.phone": "+966 504420607",

      "footer.followUs.title": "تابعنا",

      "footer.newsletter.title": "اشترك في نشرتنا الإخبارية",
      "footer.newsletter.email": "البريد الإلكتروني",
      "footer.newsletter.placeholder": "أدخل بريدك الإلكتروني",
      "footer.newsletter.subscribe": "اشتراك",
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
  });

export default i18n;
