// Comprehensive research data extracted from البحث.pdf
// Research: Trends in the Use of AI Governance by Industrial Companies Listed on Palestine Stock Exchange
// Author: Izzeldeen Sameer Mohammad Basha, Palestine Technical University - Kadoorie

export type Lang = "ar" | "en";

export interface Bilingual {
  ar: string;
  en: string;
}

export const researchMeta = {
  titleAr:
    "توجهات استخدام الحوكمة بالذكاء الاصطناعي لدى شركات القطاع الصناعي المدرجة في بورصة فلسطين: نموذج قائم على إطار عمل TOE-C الموسع",
  titleEn:
    "Trends in the Use of Artificial Intelligence Governance by Industrial Companies Listed on the Palestine Stock Exchange: A Model Based on the Extended TOE-C Framework",
  authorAr: "عزالدين سمير محمد باشا",
  authorEn: "Izzeldeen Sameer Mohammad Basha",
  affiliationAr: "كلية الدراسات العليا، جامعة فلسطين التقنية خضوري، طولكرم، فلسطين",
  affiliationEn:
    "Graduate Studies, Palestine Technical University - Kadoorie, Tulkarm, Palestine",
  framework: "TOE-C (Technology-Organization-Environment + Cost)",
  method: "PLS-SEM via SmartPLS 4",
  bootstrapResamples: 5000,
  significanceLevel: 0.05,
  questionnaireItems: 27,
  companiesCount: 10,
  questionnairesDistributed: 80,
  questionnairesValid: 77,
  responseRate: "96.25%",
  overallCronbach: 0.8262,
  gof: 0.602,
};

// Companies (10 industrial companies listed on Palestine Stock Exchange)
export const companies: Bilingual[] = [
  { ar: "سجاير القدس", en: "Jerusalem Cigarettes" },
  { ar: "مطاحن القمح الذهبي", en: "Golden Wheat Mills" },
  { ar: "الوطنية لصناعة الكرتون", en: "National Cardboard Industry" },
  {
    ar: "الوطنية لصناعة الألمنيوم والبروفايلات - نابكو",
    en: "National Aluminum & Profiles - NABCO",
  },
  { ar: "العربية لصناعة الدهانات", en: "Arabic Paints Industry" },
  { ar: "مصانع الزيوت النباتية", en: "Vegetable Oils Factories" },
  { ar: "بيرزيت للأدوية", en: "Birzeit Pharmaceuticals" },
  { ar: "القدس للمستحضرات الطبية", en: "Jerusalem Medical Preparations" },
  { ar: "بيت جالا لصناعة الأدوية", en: "Bethlehem Pharmaceutical" },
  { ar: "دواجن فلسطين", en: "Palestine Poultry" },
];

// Variable dimensions per TOE-C framework
export type Dimension = "technology" | "organization" | "environment" | "cost";

export interface Construct {
  id: string;
  code: string;
  name: Bilingual;
  dimension: Dimension;
  cronbach: number;
  ave: number;
  vif?: number;
  fSquare?: number;
  factorLoadings: { indicator: string; loading: number }[];
  isDependent?: boolean;
  rSquared?: number;
  qSquared?: number;
}

export const constructs: Construct[] = [
  {
    id: "ra",
    code: "RA",
    name: { ar: "الميزة النسبية", en: "Relative Advantage" },
    dimension: "technology",
    cronbach: 0.857,
    ave: 0.654,
    vif: 1.96,
    fSquare: 0.221,
    factorLoadings: [
      { indicator: "T4", loading: 0.796 },
      { indicator: "T3", loading: 0.704 },
      { indicator: "T2", loading: 0.836 },
    ],
  },
  {
    id: "tc",
    code: "TC",
    name: { ar: "التعقيد التكنولوجي", en: "Technological Complexity" },
    dimension: "technology",
    cronbach: 0.804,
    ave: 0.612,
    vif: 2.725,
    fSquare: 0.066,
    factorLoadings: [
      { indicator: "T8", loading: 0.727 },
      { indicator: "T7", loading: 0.744 },
      { indicator: "T6", loading: 0.828 },
    ],
  },
  {
    id: "tms",
    code: "TMS",
    name: { ar: "دعم الإدارة العليا", en: "Top Management Support" },
    dimension: "organization",
    cronbach: 0.811,
    ave: 0.636,
    vif: 2.68,
    fSquare: 0.069,
    factorLoadings: [
      { indicator: "O4", loading: 0.744 },
      { indicator: "O3", loading: 0.803 },
      { indicator: "O2", loading: 0.724 },
    ],
  },
  {
    id: "or",
    code: "OR",
    name: { ar: "الاستعداد التنظيمي", en: "Organizational Readiness" },
    dimension: "organization",
    cronbach: 0.88,
    ave: 0.736,
    vif: 1.826,
    fSquare: 0.073,
    factorLoadings: [
      { indicator: "O8", loading: 0.775 },
      { indicator: "O7", loading: 0.93 },
      { indicator: "O6", loading: 0.795 },
    ],
  },
  {
    id: "gs",
    code: "GS",
    name: { ar: "التشجيع الحكومي", en: "Government Support" },
    dimension: "environment",
    cronbach: 0.808,
    ave: 0.631,
    vif: 1.676,
    fSquare: 0.076,
    factorLoadings: [
      { indicator: "E4", loading: 0.719 },
      { indicator: "E3", loading: 0.77 },
      { indicator: "E2", loading: 0.754 },
    ],
  },
  {
    id: "cp",
    code: "CP",
    name: { ar: "الضغط التنافسي", en: "Competitive Pressure" },
    dimension: "environment",
    cronbach: 0.81,
    ave: 0.629,
    vif: 1.153,
    fSquare: 0.081,
    factorLoadings: [
      { indicator: "E8", loading: 0.816 },
      { indicator: "E7", loading: 0.885 },
      { indicator: "E6", loading: 0.737 },
    ],
  },
  {
    id: "ic",
    code: "IC",
    name: { ar: "التكاليف الاستثمارية", en: "Investment Costs" },
    dimension: "cost",
    cronbach: 0.876,
    ave: 0.725,
    vif: 3.278,
    fSquare: 0.046,
    factorLoadings: [
      { indicator: "C4", loading: 0.785 },
      { indicator: "C3", loading: 0.873 },
      { indicator: "C2", loading: 0.842 },
    ],
  },
  {
    id: "oc",
    code: "OC",
    name: { ar: "التكاليف التشغيلية", en: "Operational Costs" },
    dimension: "cost",
    cronbach: 0.825,
    ave: 0.655,
    vif: 2.615,
    fSquare: 0.06,
    factorLoadings: [
      { indicator: "C8", loading: 0.836 },
      { indicator: "C7", loading: 0.839 },
      { indicator: "C6", loading: 0.811 },
    ],
  },
  {
    id: "aig",
    code: "AIG",
    name: {
      ar: "توجهات استخدام الحوكمة بالذكاء الاصطناعي",
      en: "AI Governance Adoption Trends",
    },
    dimension: "technology",
    cronbach: 0.785,
    ave: 0.595,
    isDependent: true,
    rSquared: 0.835,
    qSquared: 0.797,
    factorLoadings: [
      { indicator: "F4", loading: 0.759 },
      { indicator: "F3", loading: 0.732 },
      { indicator: "F2", loading: 0.818 },
    ],
  },
];

// Hypotheses results
export interface Hypothesis {
  id: string;
  fromId: string;
  toId: string;
  beta: number;
  t: number;
  p: number;
  supported: boolean;
  direction: "positive" | "negative";
  effectPercent: number; // % change in DV per 1% change in IV (in direction of effect)
}

export const hypotheses: Hypothesis[] = [
  { id: "H1", fromId: "ra", toId: "aig", beta: 0.253, t: 4.156, p: 0.0, supported: true, direction: "positive", effectPercent: 26.3 },
  { id: "H2", fromId: "tc", toId: "aig", beta: -0.173, t: 2.824, p: 0.005, supported: true, direction: "negative", effectPercent: 28.2 },
  { id: "H3", fromId: "tms", toId: "aig", beta: 0.161, t: 2.053, p: 0.01, supported: true, direction: "positive", effectPercent: 20.5 },
  { id: "H4", fromId: "or", toId: "aig", beta: 0.133, t: 2.054, p: 0.04, supported: true, direction: "positive", effectPercent: 20.5 },
  { id: "H5", fromId: "gs", toId: "aig", beta: 0.142, t: 2.124, p: 0.034, supported: true, direction: "positive", effectPercent: 21.2 },
  { id: "H6", fromId: "cp", toId: "aig", beta: 0.119, t: 2.166, p: 0.03, supported: true, direction: "positive", effectPercent: 21.6 },
  { id: "H7", fromId: "ic", toId: "aig", beta: -0.158, t: 2.149, p: 0.032, supported: true, direction: "negative", effectPercent: 21.4 },
  { id: "H8", fromId: "oc", toId: "aig", beta: -0.157, t: 2.177, p: 0.03, supported: true, direction: "negative", effectPercent: 21.7 },
];

// Correlation matrix (from Table 10 in research)
export const correlationMatrix = {
  labels: ["GS", "IC", "OC", "TC", "CP", "RA", "TMS", "AIG"],
  values: [
    [1.0, 0.359, 0.373, 0.377, 0.33, 0.219, 0.544, 0.631, 0.422],
    [0.359, 1.0, 0.565, 0.523, 0.458, 0.201, 0.244, 0.72, 0.659],
    [0.373, 0.565, 1.0, 0.848, 0.686, 0.081, 0.228, 0.796, 0.759],
    [0.377, 0.523, 0.848, 1.0, 0.67, 0.132, 0.228, 0.815, 0.777],
    [0.33, 0.458, 0.686, 0.67, 1.0, 0.091, 0.459, 0.77, 0.645],
    [0.219, 0.201, 0.081, 0.132, 0.091, 1.0, 0.216, 0.289, 0.201],
    [0.544, 0.244, 0.228, 0.228, 0.459, 0.216, 1.0, 0.508, 0.27],
    [0.631, 0.72, 0.796, 0.815, 0.77, 0.289, 0.508, 1.0, 0.845],
    [0.422, 0.659, 0.759, 0.777, 0.645, 0.201, 0.27, 0.845, 1.0],
  ],
  fullLabels: [
    "Government Support",
    "Investment Costs",
    "Operational Costs",
    "Tech Complexity",
    "Competitive Pressure",
    "Relative Advantage",
    "Top Mgmt Support",
    "AI Governance Trends",
  ],
};

// Helper - find construct by id
export const findConstruct = (id: string): Construct | undefined =>
  constructs.find((c) => c.id === id);

// Dimension metadata
export const dimensionsMeta: Record<
  Dimension,
  { labelAr: string; labelEn: string; color: string; icon: string }
> = {
  technology: {
    labelAr: "البُعد التقني",
    labelEn: "Technology",
    color: "#3b82f6",
    icon: "Cpu",
  },
  organization: {
    labelAr: "البُعد التنظيمي",
    labelEn: "Organization",
    color: "#10b981",
    icon: "Building2",
  },
  environment: {
    labelAr: "البُعد البيئي",
    labelEn: "Environment",
    color: "#f59e0b",
    icon: "Globe",
  },
  cost: {
    labelAr: "البُعد الاقتصادي (التكلفة)",
    labelEn: "Cost (Economic)",
    color: "#ef4444",
    icon: "DollarSign",
  },
};

// Conclusions
export const conclusions: Bilingual[] = [
  {
    ar: "تلعب العوامل التكنولوجية والتنظيمية والبيئية والاقتصادية دوراً هاماً في تبني الحوكمة بالذكاء الاصطناعي في شركات القطاع الصناعي المدرجة في بورصة فلسطين.",
    en: "Technological, organizational, environmental, and economic factors play an important role in adopting AI governance in industrial companies listed on the Palestine Stock Exchange.",
  },
  {
    ar: "تبسيط تطبيقات الذكاء الاصطناعي يسهل قبولها والتعامل معها، وتطوير الهيكل الوظيفي باستمرار يساهم في تقليل مقاومة التغيير نحو الحوكمة.",
    en: "Simplifying AI applications increases their acceptance and ease of use, and continuously developing the functional structure helps reduce resistance to change toward governance.",
  },
  {
    ar: "هناك تأثير إيجابي للعوامل التكنولوجية والتنظيمية والبيئية على توجهات استخدام الحوكمة، في حين أظهرت النتائج الأثر السلبي للعوامل الاقتصادية والتكلفة.",
    en: "There is a positive effect of technological, organizational, and environmental factors on governance adoption trends, while the results showed a negative effect of economic and cost factors.",
  },
];

// Recommendations
export const recommendations: Bilingual[] = [
  {
    ar: "دراسة باقي قطاعات البورصة الفلسطينية لتحديد أهم العوامل التي تؤثر في توجهات استخدام الحوكمة بالذكاء الاصطناعي عند باقي القطاعات.",
    en: "Study other sectors of the Palestine Stock Exchange to identify the most important factors influencing AI governance adoption trends in other sectors.",
  },
  {
    ar: "وضع برامج تدريبية دورية لكافة الموارد البشرية للشركات، للتعرف على أهم تطبيقات الذكاء الاصطناعي التي يمكن توظيفها في بيئة العمل.",
    en: "Establish periodic training programs for all company human resources to identify key AI applications that can be deployed in the work environment.",
  },
  {
    ar: "تقديم دعم حكومي متعدد الأوجه لتعزيز التحول نحو الحوكمة بالذكاء الاصطناعي، من خلال تقديم قروض ميسرة للشركات الراغبة في تطبيق هذه التكنولوجيا، وكذلك من خلال سن تشريعات وقوانين تنظم عمل الحوكمة بالذكاء الاصطناعي.",
    en: "Provide multifaceted government support to enhance the transformation toward AI governance, by offering concessional loans to companies wishing to apply this technology, and by enacting legislation and laws regulating AI governance.",
  },
  {
    ar: "تشجيع طلبة تكنولوجيا المعلومات وهندسة الحاسوب والبرمجيات في الجامعات على تقديم نماذج حوكمة تعمل بالذكاء الاصطناعي تلبي السوق المحلي وتتوافق مع تطلعاته.",
    en: "Encourage IT, computer engineering, and software students in universities to develop AI-powered governance models that meet local market needs and aspirations.",
  },
];

// Scrollytelling sections
export interface StorySection {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  stat?: { value: string; labelAr: string; labelEn: string };
}

export const storySections: StorySection[] = [
  {
    id: "intro",
    icon: "BookOpen",
    titleAr: "المقدمة",
    titleEn: "Introduction",
    bodyAr:
      "تُعدّ حوكمة الشركات من أهم الركائز التي تعكس السلوك الأخلاقي والأداء الفعّال في الشركات، حيث يساهم تضمينها في الهياكل التنفيذية والإجرائية في تحقيق التوازن البنّاء بين مصالح المستثمرين والإدارة. ومع التطور الكبير في مجال التكنولوجيا، برزت تقنية الذكاء الاصطناعي كرافعة هامة لمسار الحوكمة في الشركات، نظراً لقدرتها الكبيرة على تحليل البيانات المالية والإدارية وتحديد الفرص والمخاطر بشكل أعمق وأدق.",
    bodyEn:
      "Corporate governance is one of the most important pillars reflecting ethical behavior and effective performance in companies. Embedding it in executive and procedural structures helps achieve a constructive balance between investor and management interests. With major technological advancements, artificial intelligence has emerged as a key lever for corporate governance, given its ability to analyze financial and administrative data and identify opportunities and risks more deeply and accurately.",
    stat: { value: "27", labelAr: "فقرة في الاستبانة", labelEn: "Questionnaire Items" },
  },
  {
    id: "problem",
    icon: "AlertCircle",
    titleAr: "مشكلة الدراسة",
    titleEn: "Research Problem",
    bodyAr:
      "تمثل الحوكمة الأنظمة والقواعد التي تنظم العلاقات في الشركات وتتحكم في أعمالها، والتي تحمي الشركات والاقتصادات من مخاطر الفساد وسوء الإدارة. وفي ظل التوجه العالمي نحو توظيف الذكاء الاصطناعي في الحوكمة، تنشأ الحاجة الأكاديمية والبحثية لفهم العوامل المؤثرة في تبني هذه التقنية في الاقتصادات الناشئة كالاقتصاد الفلسطيني، حيث تندر الدراسات في هذا السياق.",
    bodyEn:
      "Governance represents the systems and rules that regulate corporate relationships and operations, protecting companies and economies from corruption and mismanagement. Amid the global trend toward deploying AI in governance, there is an academic and research need to understand the factors influencing the adoption of this technology in emerging economies like Palestine, where studies in this context are scarce.",
    stat: { value: "8", labelAr: "فرضيات", labelEn: "Hypotheses" },
  },
  {
    id: "objectives",
    icon: "Target",
    titleAr: "أهداف الدراسة",
    titleEn: "Research Objectives",
    bodyAr:
      "تهدف الدراسة إلى التعرف على أثر العوامل التكنولوجية (الميزة النسبية، التعقيد التكنولوجي)، والتنظيمية (دعم الإدارة العليا، الاستعداد التنظيمي)، والبيئية (الضغط التنافسي، التشجيع الحكومي)، والاقتصادية (التكاليف الاستثمارية، التكاليف التشغيلية) في توجهات استخدام الحوكمة بالذكاء الاصطناعي لدى شركات القطاع الصناعي المدرجة في بورصة فلسطين.",
    bodyEn:
      "The study aims to identify the impact of technological factors (relative advantage, technological complexity), organizational factors (top management support, organizational readiness), environmental factors (competitive pressure, government support), and economic factors (investment costs, operational costs) on AI governance adoption trends in industrial companies listed on the Palestine Stock Exchange.",
    stat: { value: "8", labelAr: "عوامل مستقلة", labelEn: "Independent Variables" },
  },
  {
    id: "methodology",
    icon: "Microscope",
    titleAr: "المنهجية",
    titleEn: "Methodology",
    bodyAr:
      "اعتمدت الدراسة على المنهج الكمي باستخدام الاستبانة كأداة لجمع البيانات، وموزّعة على مجتمع الدراسة المكوّن من 10 شركات صناعية مدرجة في بورصة فلسطين. تم توزيع 80 استبانة واسترداد 77 استبانة صالحة للتحليل. حللت البيانات باستخدام أسلوب النمذجة بالمعادلات الهيكلية (PLS-SEM) عبر برنامج SmartPLS 4 مع إجراء Bootstrap بـ 5000 عينة لإعادة السحب.",
    bodyEn:
      "The study adopted a quantitative approach using a questionnaire as the data collection tool, distributed to the study population of 10 industrial companies listed on the Palestine Stock Exchange. 80 questionnaires were distributed and 77 valid responses were collected. Data was analyzed using Partial Least Squares Structural Equation Modeling (PLS-SEM) via SmartPLS 4 with Bootstrap of 5000 resamples.",
    stat: { value: "77", labelAr: "استبانة صالحة", labelEn: "Valid Responses" },
  },
  {
    id: "results",
    icon: "BarChart3",
    titleAr: "النتائج",
    titleEn: "Results",
    bodyAr:
      "خلصت النتائج إلى قبول جميع الفرضيات الثمانية، حيث أظهرت العوامل التكنولوجية والتنظيمية والبيئية تأثيراً إيجابياً معنوياً، في حين أظهرت العوامل الاقتصادية (التكاليف الاستثمارية والتشغيلية) والتعقيد التكنولوجي تأثيراً سلبياً معنوياً. بلغت قيمة R² للمتغير التابع 0.835 وهي نسبة كبيرة، مما يدل على أن النموذج يتمتع بقوة تفسيرية عالية. كما بلغت قيمة Q² 0.797 مما يدل على جودة تنبؤية جيدة، وقيمة GoF 0.602 وهي كبيرة.",
    bodyEn:
      "The results concluded that all eight hypotheses were supported, with technological, organizational, and environmental factors showing a significant positive effect, while economic factors (investment and operational costs) and technological complexity showed a significant negative effect. The R² value for the dependent variable reached 0.835 (large), indicating high explanatory power. Q² reached 0.797 indicating good predictive quality, and GoF was 0.602 (large).",
    stat: { value: "8/8", labelAr: "فرضيات مقبولة", labelEn: "Supported Hypotheses" },
  },
  {
    id: "recommendations",
    icon: "Lightbulb",
    titleAr: "التوصيات",
    titleEn: "Recommendations",
    bodyAr:
      "أوصت الدراسة بدراسة باقي قطاعات البورصة الفلسطينية، ووضع برامج تدريبية دورية للموارد البشرية، وتقديم دعم حكومي متعدد الأوجه (قروض ميسرة وتشريعات)، وتشجيع طلبة تكنولوجيا المعلومات والبرمجيات على تطوير نماذج حوكمة بالذكاء الاصطناعي تلبي السوق المحلي. كما أوصت برفع مستوى الاستعداد التنظيمي من خلال تحديث الأنظمة التقنية لتكون أقل تعقيداً وأكثر مرونة في استيعاب أدوات الذكاء الاصطناعي.",
    bodyEn:
      "The study recommended studying other sectors of the Palestine Stock Exchange, establishing periodic HR training programs, providing multifaceted government support (concessional loans and legislation), and encouraging IT and software students to develop AI governance models that meet local market needs. It also recommended raising organizational readiness by updating technical systems to be less complex and more flexible in accommodating AI tools.",
    stat: { value: "4", labelAr: "توصيات رئيسية", labelEn: "Key Recommendations" },
  },
];

// Knowledge map nodes & edges
export interface KNode {
  id: string;
  labelAr: string;
  labelEn: string;
  type: "problem" | "literature" | "hypotheses" | "methodology" | "results" | "recommendations";
  x: number;
  y: number;
  detailAr?: string;
  detailEn?: string;
}

export interface KEdge {
  from: string;
  to: string;
}

export const knowledgeNodes: KNode[] = [
  {
    id: "problem",
    labelAr: "المشكلة البحثية",
    labelEn: "Research Problem",
    type: "problem",
    x: 50,
    y: 50,
    detailAr:
      "فهم العوامل المؤثرة في تبني الحوكمة بالذكاء الاصطناعي في شركات القطاع الصناعي المدرجة في بورصة فلسطين، في سياق الاقتصادات الناشئة.",
    detailEn:
      "Understanding the factors influencing AI governance adoption in industrial companies listed on the Palestine Stock Exchange, in the context of emerging economies.",
  },
  {
    id: "lit1",
    labelAr: "الأدبيات: TOE Framework",
    labelEn: "Literature: TOE Framework",
    type: "literature",
    x: 15,
    y: 20,
    detailAr: "إطار Tornatzky & Fleischer (1990) - تحليل العوامل المؤثرة في تبني التكنولوجيا الجديدة.",
    detailEn: "Tornatzky & Fleischer (1990) framework - analyzing factors influencing new technology adoption.",
  },
  {
    id: "lit2",
    labelAr: "الأدبيات: AI Governance",
    labelEn: "Literature: AI Governance",
    type: "literature",
    x: 15,
    y: 80,
    detailAr: "دراسات سابقة حول دور الذكاء الاصطناعي في حوكمة الشركات (Alnofli 2021، سالمه 2025، Chen et al. 2021).",
    detailEn: "Previous studies on the role of AI in corporate governance (Alnofli 2021, Salama 2025, Chen et al. 2021).",
  },
  {
    id: "lit3",
    labelAr: "الأدبيات: TOE-C Extension",
    labelEn: "Literature: TOE-C Extension",
    type: "literature",
    x: 85,
    y: 20,
    detailAr: "توسيع إطار TOE بإضافة البعد الاقتصادي (التكلفة) - كامل وسعيد (2021)، Chen & Yeh (2018).",
    detailEn: "Extending the TOE framework by adding the economic dimension (Cost) - Kamil & Saeed (2021), Chen & Yeh (2018).",
  },
  {
    id: "hyp",
    labelAr: "8 فرضيات",
    labelEn: "8 Hypotheses",
    type: "hypotheses",
    x: 50,
    y: 18,
    detailAr: "ثماني فرضيات تختبر أثر العوامل التقنية والتنظيمية والبيئية والاقتصادية على تبني الحوكمة بالذكاء الاصطناعي.",
    detailEn: "Eight hypotheses testing the impact of technological, organizational, environmental, and economic factors on AI governance adoption.",
  },
  {
    id: "method",
    labelAr: "المنهجية",
    labelEn: "Methodology",
    type: "methodology",
    x: 50,
    y: 82,
    detailAr: "منهج كمي، استبانة من 27 فقرة، 77 استبانة صالحة من 10 شركات، تحليل بـ PLS-SEM عبر SmartPLS 4.",
    detailEn: "Quantitative approach, 27-item questionnaire, 77 valid responses from 10 companies, PLS-SEM analysis via SmartPLS 4.",
  },
  {
    id: "res1",
    labelAr: "نتائج: R² = 0.835",
    labelEn: "Results: R² = 0.835",
    type: "results",
    x: 80,
    y: 55,
    detailAr: "قوة تفسيرية كبيرة (83.5%)، Q² = 0.797، GoF = 0.602.",
    detailEn: "Large explanatory power (83.5%), Q² = 0.797, GoF = 0.602.",
  },
  {
    id: "res2",
    labelAr: "نتائج: 8/8 فرضيات مقبولة",
    labelEn: "Results: 8/8 Hypotheses Supported",
    type: "results",
    x: 80,
    y: 80,
    detailAr: "جميع الفرضيات الثمانية مقبولة. العوامل التقنية والتنظيمية والبيئية إيجابية، الاقتصادية والتعقيد سلبية.",
    detailEn: "All 8 hypotheses supported. Technological, organizational, environmental factors positive; economic and complexity negative.",
  },
  {
    id: "rec1",
    labelAr: "توصية: دراسة قطاعات أخرى",
    labelEn: "Recommendation: Study Other Sectors",
    type: "recommendations",
    x: 20,
    y: 55,
    detailAr: "توسيع نطاق الدراسة ليشمل قطاعات البورصة الفلسطينية الأخرى.",
    detailEn: "Expand the study scope to include other sectors of the Palestine Stock Exchange.",
  },
  {
    id: "rec2",
    labelAr: "توصية: دعم حكومي متعدد",
    labelEn: "Recommendation: Multifaceted Government Support",
    type: "recommendations",
    x: 20,
    y: 90,
    detailAr: "قروض ميسرة وتشريعات لتنظيم عمل الحوكمة بالذكاء الاصطناعي.",
    detailEn: "Concessional loans and legislation regulating AI governance.",
  },
];

export const knowledgeEdges: KEdge[] = [
  { from: "lit1", to: "problem" },
  { from: "lit2", to: "problem" },
  { from: "lit3", to: "problem" },
  { from: "problem", to: "hyp" },
  { from: "problem", to: "method" },
  { from: "hyp", to: "method" },
  { from: "method", to: "res1" },
  { from: "method", to: "res2" },
  { from: "res1", to: "rec1" },
  { from: "res2", to: "rec2" },
  { from: "res1", to: "rec2" },
];
