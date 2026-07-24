\# برومبت احترافي لإنشاء إنفوجرافيك تفاعلي لبحث علمي

\---

\## النسخة العربية

\---

\### البرومبت:

\`\`\`

أنشئ لي موقع ويب تفاعلي (Single Page Application) يعمل كإنفوجرافيك تفاعلي لبحث علمي أكاديمي، يُستخدم كملحق رقمي لبوستر مؤتمر علمي. الموقع سيُربط عبر رمز QR Code مطبوع على البوستر ليتمكن الحضور من استكشاف البحث بعمق أكبر.

\## المتطلبات التقنية:

\- Framework: React.js مع TypeScript

\- Styling: Tailwind CSS مع دعم RTL

\- Charts: Plotly.js للرسوم البيانية التفاعلية + Chart.js كبديل للرسوم البسيطة

\- Animations: Framer Motion للرسوم المتحركة السلسة

\- Icons: Lucide React أو React Icons

\- QR Code: مكتبة qrcode.react لتوليد رمز QR ديناميكي

\- State Management: React Context أو Zustand

\- Responsive Design: متجاوب بالكامل مع جميع الأجهزة

\## الأقسام والمكونات المطلوبة:

\### 1. لوحة البيانات التفاعلية (Interactive Dashboard) - الصفحة الرئيسية

\- عرض ملخص البحث بشكل بصري جذاب مع بطاقات إحصائية (KPI Cards)

\- عداد زوار الموقع (Visitor Counter) يظهر في الهيدر

\- أزرار تصفية وفلترة تمكّن الزائر من:

\- تغيير المتغيرات المعروضة

\- التبديل بين أنواع الرسوم البيانية

\- استعراض النتائج حسب الفئة (تقنية، تنظيمية، بيئية)

\- شريط تنقل علوي (Navbar) مع تبديل اللغة وروابط الأقسام

\### 2. رسوم بيانية تفاعلية (Interactive Charts)

باستخدام Plotly.js أنشئ الرسوم التالية:

\- \*\*Bar Chart\*\*: يعرض Path Coefficients (معاملات المسار) لكل علاقة في النموذج

\- \*\*Gauge Charts\*\*: تعرض قيم R² لكل متغير تابع

\- \*\*Radar Chart\*\*: يقارن بين أبعاد النموذج الثلاثة (T-O-E)

\- \*\*Heatmap\*\*: يعرض مصفوفة الارتباط بين المتغيرات

\- \*\*Scatter Plot\*\*: يوضح العلاقة بين المتغيرات المستقلة والتابعة

\- \*\*Pie/Donut Chart\*\*: يعرض توزيع العينة الديموغرافي

كل رسم يجب أن يكون:

\- قابل للتكبير (Zoomable)

\- قابل للتحويم (Hover tooltips)

\- قابل للتصدير كصورة

\- متحرك عند التحميل الأول

\### 3. نموذج SEM / SmartPLS التفاعلي

\- رسم نموذج المعادلات الهيكلية (Structural Equation Model) بشكل تفاعلي

\- استخدم SVG أو Canvas لرسم:

\- المتغيرات الكامنة (Latent Variables) كدوائر/مستطيلات

\- الأسهم بين المتغيرات تمثل العلاقات

\- على كل سهم: قيمة Path Coefficient

\- داخل كل متغير تابع: قيمة R²

\- عند النقر على أي متغير تظهر نافذة منبثقة تعرض:

\- المؤشرات (Indicators) الخاصة به

\- قيم Outer Loadings

\- قيم Cronbach's Alpha و CR و AVE

\- عند النقر على أي سهم (علاقة) تظهر:

\- قيمة t-statistic

\- قيمة p-value

\- حالة الفرضية (مقبولة/مرفوضة)

\- ألوان مختلفة للعلاقات المعنوية وغير المعنوية

\### 4. مخطط نموذج TOE التفاعلي

\- رسم تفاعلي يوضح إطار TOE (Technology-Organization-Environment):

\- \*\*البُعد التقني (Technology)\*\*: عوامل مثل التوافق، التعقيد، الميزة النسبية

\- \*\*البُعد التنظيمي (Organization)\*\*: عوامل مثل دعم الإدارة، الجاهزية، الحجم

\- \*\*البُعد البيئي (Environment)\*\*: عوامل مثل الضغط التنافسي، الدعم الحكومي

\- كل بُعد يكون قابل للنقر والتوسيع

\- أسهم متحركة توضح التأثير على المتغير التابع

\- إمكانية تفعيل/تعطيل كل بُعد لرؤية تأثيره منفرداً

\### 5. خريطة معرفية تفاعلية (Knowledge Map)

\- رسم شبكي (Network Graph) يوضح العلاقة بين:

\- المشكلة البحثية (في المركز)

\- الأدبيات السابقة (عقد متصلة)

\- الفرضيات (عقد بلون مختلف)

\- المنهجية (عقد بلون مختلف)

\- النتائج (عقد بلون مختلف)

\- التوصيات (عقد بلون مختلف)

\- كل عقدة قابلة للنقر لعرض تفاصيل أكثر

\- خطوط متصلة متحركة توضح تدفق البحث

\- إمكانية السحب والإفلات لتحريك العقد

\- تكبير وتصغير الخريطة

\### 6. إنفوجرافيك تفاعلي (Scrollytelling)

\- تصميم Scroll-based storytelling:

\- كل قسم من البحث يظهر عند التمرير

\- أيقونات متحركة تمثل كل مرحلة

\- أرقام وإحصائيات تتحرك (Counter Animation)

\- صور ورسوم توضيحية

\- Timeline عمودي يوضح مراحل البحث

\- الأقسام: المقدمة → المشكلة → الأهداف → المنهجية → النتائج → التوصيات

\### 7. دعم ثنائي اللغة (Bilingual Support)

\- زر تبديل اللغة (عربي ↔ English) في الهيدر

\- عند التبديل للعربية:

\- اتجاه RTL

\- خط عربي مناسب (Cairo أو Tajawal)

\- جميع النصوص والتسميات بالعربية

\- عند التبديل للإنجليزية:

\- اتجاه LTR

\- خط إنجليزي مناسب (Inter أو Poppins)

\- جميع النصوص والتسميات بالإنجليزية

\- حفظ تفضيل اللغة في localStorage

\### 8. عداد الزوار (Visitor Statistics)

\- عرض عدد الزوار الكلي

\- عدد الزوار اليوم

\- متوسط وقت البقاء

\- أكثر الأقسام زيارة

\- رسم بياني صغير (Sparkline) يوضح الزيارات خلال آخر 7 أيام

\- (يمكن استخدام localStorage للتخزين المحلي أو Firebase للتخزين السحابي)

\### 9. رمز QR Code

\- صفحة خاصة أو قسم يعرض رمز QR للموقع

\- إمكانية تحميل رمز QR كصورة PNG بدقة عالية

\- خيارات تخصيص: اللون، الحجم، إضافة شعار في المنتصف

\- عرض رابط الموقع أسفل الرمز

\## متطلبات التصميم:

\- تصميم عصري وأنيق مناسب للسياق الأكاديمي

\- ألوان هادئة واحترافية (أزرق داكن، أبيض، رمادي، مع لمسات ذهبية أو خضراء)

\- Dark Mode / Light Mode toggle

\- تأثيرات Glassmorphism خفيفة

\- Micro-interactions على الأزرار والبطاقات

\- Loading animations أنيقة

\- خلفية متحركة خفيفة (Animated gradient أو particles)

\## متطلبات الأداء:

\- Lazy loading للأقسام

\- Code splitting

\- تحسين الصور

\- سرعة تحميل أقل من 3 ثوانٍ

\- يعمل بسلاسة على الهواتف المحمولة

\## البيانات النموذجية (يمكن تعديلها لاحقاً):

استخدم بيانات نموذجية واقعية لنموذج SmartPLS:

\- Path Coefficients: قيم بين 0.1 و 0.8

\- R²: قيم بين 0.3 و 0.7

\- Q²: قيم بين 0.2 و 0.5

\- f²: قيم بين 0.02 و 0.35

\- VIF: قيم بين 1.0 و 3.5

\- Cronbach's Alpha: قيم بين 0.7 و 0.95

\- حجم العينة: 385 مشارك

\- عدد الفرضيات: 8 فرضيات (5 مقبولة، 3 مرفوضة)

\`\`\`

\---

\## English Version

\---

\### The Prompt:

\`\`\`

Create an interactive web application (Single Page Application) that serves as an interactive infographic for an academic research paper. It will be used as a digital companion to a conference poster, linked via a QR Code printed on the poster so attendees can explore the research in greater depth.

\## Technical Requirements:

\- Framework: React.js with TypeScript

\- Styling: Tailwind CSS with RTL support

\- Charts: Plotly.js for interactive charts + Chart.js for simpler visualizations

\- Animations: Framer Motion for smooth animations

\- Icons: Lucide React or React Icons

\- QR Code: qrcode.react library for dynamic QR generation

\- State Management: React Context or Zustand

\- Responsive Design: Fully responsive across all devices

\## Required Sections & Components:

\### 1. Interactive Dashboard (Main Page)

\- Visual research summary with KPI Cards

\- Visitor Counter displayed in the header

\- Filtering and interaction controls allowing visitors to:

\- Change displayed variables

\- Switch between chart types

\- Browse results by category (Technology, Organization, Environment)

\- Top navigation bar with language toggle and section links

\### 2. Interactive Charts

Using Plotly.js, create the following:

\- \*\*Bar Chart\*\*: Displaying Path Coefficients for each model relationship

\- \*\*Gauge Charts\*\*: Showing R² values for each dependent variable

\- \*\*Radar Chart\*\*: Comparing the three TOE dimensions

\- \*\*Heatmap\*\*: Displaying correlation matrix between variables

\- \*\*Scatter Plot\*\*: Showing relationships between independent and dependent variables

\- \*\*Pie/Donut Chart\*\*: Displaying demographic sample distribution

Each chart must be:

\- Zoomable

\- Hover-enabled with tooltips

\- Exportable as image

\- Animated on first load

\### 3. Interactive SEM / SmartPLS Model

\- Draw the Structural Equation Model interactively

\- Use SVG or Canvas to render:

\- Latent Variables as circles/rectangles

\- Arrows between variables representing relationships

\- Path Coefficient values on each arrow

\- R² values inside each dependent variable

\- Clicking any variable shows a popup with:

\- Its Indicators

\- Outer Loadings values

\- Cronbach's Alpha, CR, and AVE values

\- Clicking any arrow (relationship) shows:

\- t-statistic value

\- p-value

\- Hypothesis status (Supported/Not Supported)

\- Different colors for significant vs non-significant relationships

\### 4. Interactive TOE Framework Diagram

\- Interactive visualization of the TOE Framework:

\- \*\*Technology\*\*: Factors like Compatibility, Complexity, Relative Advantage

\- \*\*Organization\*\*: Factors like Top Management Support, Readiness, Firm Size

\- \*\*Environment\*\*: Factors like Competitive Pressure, Government Support

\- Each dimension is clickable and expandable

\- Animated arrows showing influence on the dependent variable

\- Ability to enable/disable each dimension to see its individual effect

\### 5. Interactive Knowledge Map

\- Network Graph showing relationships between:

\- Research Problem (center node)

\- Literature Review (connected nodes)

\- Hypotheses (different colored nodes)

\- Methodology (different colored nodes)

\- Results (different colored nodes)

\- Recommendations (different colored nodes)

\- Each node is clickable for more details

\- Animated connection lines showing research flow

\- Drag-and-drop to move nodes

\- Zoom in/out capability

\### 6. Interactive Infographic (Scrollytelling)

\- Scroll-based storytelling design:

\- Each research section appears on scroll

\- Animated icons representing each phase

\- Counter animations for numbers and statistics

\- Illustrations and visual elements

\- Vertical timeline showing research stages

\- Sections: Introduction → Problem → Objectives → Methodology → Results → Recommendations

\### 7. Bilingual Support (Arabic/English)

\- Language toggle button (عربي ↔ English) in header

\- Arabic mode:

\- RTL direction

\- Appropriate Arabic font (Cairo or Tajawal)

\- All text and labels in Arabic

\- English mode:

\- LTR direction

\- Appropriate English font (Inter or Poppins)

\- All text and labels in English

\- Language preference saved in localStorage

\### 8. Visitor Statistics

\- Total visitor count

\- Today's visitors

\- Average time on site

\- Most visited sections

\- Sparkline chart showing visits over last 7 days

\- (Can use localStorage for local storage or Firebase for cloud storage)

\### 9. QR Code

\- Dedicated section displaying the site's QR Code

\- Download QR as high-resolution PNG

\- Customization options: color, size, center logo

\- Site URL displayed below the code

\## Design Requirements:

\- Modern, elegant design suitable for academic context

\- Professional, calm colors (dark blue, white, gray, with gold or green accents)

\- Dark Mode / Light Mode toggle

\- Subtle Glassmorphism effects

\- Micro-interactions on buttons and cards

\- Elegant loading animations

\- Subtle animated background (gradient or particles)

\## Performance Requirements:

\- Lazy loading for sections

\- Code splitting

\- Image optimization

\- Load time under 3 seconds

\- Smooth performance on mobile devices

\## Sample Data (can be modified later):

Use realistic sample data for SmartPLS model:

\- Path Coefficients: values between 0.1 and 0.8

\- R²: values between 0.3 and 0.7

\- Q²: values between 0.2 and 0.5

\- f²: values between 0.02 and 0.35

\- VIF: values between 1.0 and 3.5

\- Cronbach's Alpha: values between 0.7 and 0.95

\- Sample size: 385 participants

\- Number of hypotheses: 8 (5 supported, 3 not supported)

\`\`\`

\---

\## 💡 نصائح لاستخدام البرومبت:

1\. \*\*انسخ البرومبت كاملاً\*\* والصقه في أي أداة ذكاء اصطناعي (مثل ChatGPT، Claude، أو Atoms/MGX)

2\. \*\*خصّص البيانات\*\*: استبدل البيانات النموذجية ببيانات بحثك الفعلية

3\. \*\*أضف عنوان بحثك\*\*: أضف في بداية البرومبت عنوان بحثك وأسماء الباحثين

4\. \*\*حدد الألوان\*\*: إذا كان لمؤسستك ألوان محددة، أضفها في قسم التصميم

5\. \*\*رابط الموقع\*\*: بعد نشر الموقع، استخدم الرابط لتوليد QR Code وطباعته على البوستر

\---

\## 🎯 كيفية تخصيص البرومبت لبحثك:

استبدل الأقسام التالية ببيانات بحثك الحقيقية:

\`\`\`

\## بيانات بحثي الفعلية:

\- عنوان البحث: \[أدخل العنوان\]

\- الباحثون: \[أدخل الأسماء\]

\- الجامعة/المؤسسة: \[أدخل الاسم\]

\- المتغيرات المستقلة: \[أدخل المتغيرات\]

\- المتغير التابع: \[أدخل المتغير\]

\- المتغيرات الوسيطة (إن وجدت): \[أدخل المتغيرات\]

\- حجم العينة: \[أدخل العدد\]

\- نتائج SmartPLS الفعلية:

\- Path Coefficients: \[أدخل القيم\]

\- R²: \[أدخل القيم\]

\- Q²: \[أدخل القيم\]

\- الفرضيات ونتائجها: \[أدخل التفاصيل\]

\`\`\`

\---

\## 📋 ملخص ما يوفره هذا البرومبت:

| المكون | الوصف |

|--------|-------|

| لوحة بيانات تفاعلية | Dashboard مع KPI Cards وفلاتر |

| رسوم Plotly.js | 6 أنواع رسوم بيانية تفاعلية |

| نموذج SEM تفاعلي | SVG/Canvas مع نقر وتفاصيل |

| مخطط TOE | إطار تفاعلي ثلاثي الأبعاد |

| خريطة معرفية | Network Graph قابل للسحب |

| إنفوجرافيك | Scrollytelling مع أنيميشن |

| ثنائي اللغة | عربي/إنجليزي مع RTL |

| عداد زوار | إحصائيات تفاعلية |

| QR Code | قابل للتحميل والتخصيص |