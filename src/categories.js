export const categories = {
  "Baby Care": [
    "Baby & Feminine Care No Detail",
    "Baby Care Adjacencies",
    "Baby Care NBD",
    "Baby Connected Care",
    "Baby Wipes",
    "Diapers",
  ],
  "Fabric Care": [
    "Bleach",
    "Fabric Care NBD",
    "Fabric Enhancers",
    "Fabric Revitalizer",
  ],
  "Feminine Care": ["Adult Incontinence", "Feminine Care"],
  "Hair Care": [
    "Female Hair Care",
    "Female Hair Care Wella",
    "Female Hair Color",
    "Female Hair Color Wella",
    "Female Prestige Hair",
  ],
  "Home Care": ["Air Care", "Auto Dish", "Cleaning Products", "Dish Care"],
  "Oral Care": ["Dental Floss", "Dentifrice", "Denture Care"],
  "PCC Care": [
    "Childrens Personal Care",
    "Female AP/DO & Body Spray",
    "Female Personal Cleansing",
  ],
  "Shave Care": [
    "Facial Depilatories",
    "Fem Premium BladeRazor System",
    "Female Depilatories",
    "Female Disposable Razor",
    "Female Grooming Skin Care",
    "Female Powered Hair Removal",
    "Female Shave Prep",
  ],
  "Skin Care": [
    "Expert Beauty",
    "Fashion Cosmetics",
    "Fashion Fragrance",
    "Fashion Skin",
    "Female Cosmetics",
    "Female Prestige Skin Care",
    "Female Skin Care",
  ],
  "Unclassified Care": [
    "Alcohols & Related Products",
    "Amine",
    "Antiperspirant/Deodorant Wella",
    "Chemicals NBD",
    "Cleaning Systems",
    "Clock Appliance",
    "Coffee/Hot Beverage Appliance",
    "Fat Substitute",
    "Fatty Acid",
    "Fem Personal Cleansing Wella",
    "Filtration",
    "Food Preparation Appliance",
    "Glycerine",
  ],
};

export const businessUnits = [
  {
    name: "Baby Care",
    code: "BABY",
    categories: [
      {
        name: "Baby & Feminine Care No Detail",
        code: "BFCND",
      },
      {
        name: "Baby Care Adjacencies",
        code: "BCA",
      },
      {
        name: "Baby Care NBD",
        code: "BCN",
      },
      {
        name: "Baby Connected Care",
        code: "BCC",
      },
      {
        name: "Baby Wipes",
        code: "BW",
      },
      {
        name: "Diapers",
        code: "DP",
      },
    ],
  },
  {
    name: "Fabric Care",
    code: "FAB",
    categories: [
      {
        name: "Bleach",
        code: "BL",
      },
      {
        name: "Fabric Care NBD",
        code: "FCN",
      },
      {
        name: "Fabric Enhancers",
        code: "FE",
      },
      {
        name: "Fabric Revitalizer",
        code: "FR",
      },
    ],
  },
  {
    name: "Feminine Care",
    code: "FEMI",
    categories: [
      {
        name: "Adult Incontinence",
        code: "AI",
      },
      {
        name: "Feminine Care",
        code: "FC",
      },
    ],
  },
  {
    name: "Home Care",
    code: "HC",
    categories: [
      {
        name: "Air Care",
        code: "AC",
      },
      {
        name: "Auto Dish",
        code: "AD",
      },
      {
        name: "Cleaning Products",
        code: "CP",
      },
      {
        name: "Dish Care",
        code: "DC",
      },
    ],
  },
  {
    name: "Oral Care",
    code: "OC",
    categories: [
      {
        name: "Dental Floss",
        code: "DENTF",
      },
      {
        name: "DENT",
        code: "AD",
      },
      {
        name: "Denture Care",
        code: "DENC",
      },
    ],
  },
];

export const regionList = [
  {
    name: "ASIA MIDDLE EAST AFRICA",
    code: "AF",
    countries: [
      { name: "Afghanistan", code: "AFG" },
      { name: "Algeria", code: "DZA" },
      { name: "Bahrain", code: "BHR" },
      { name: "Bangladesh", code: "BGD" },
      { name: "Egypt", code: "EGY" }, // Top 5 countries: Afghanistan, Algeria, Bahrain, Bangladesh, Egypt    ]
    ],
  },
  {
    name: "ASIA PACIFIC FOCUS",
    code: "Asia",
    countries: [
      { name: "China", code: "CHN" },
      { name: "India", code: "IND" },
      { name: "Indonesia", code: "IDN" },
      { name: "Japan", code: "JPN" },
      { name: "Malaysia", code: "MYS" },
      // Top 5 countries: China, India, Indonesia, Japan, Malaysia
    ],
  },
  {
    name: "EUROPE ENTERPRISE",
    code: "EUE",
    countries: [
      { name: "France", code: "FRA" },
      { name: "Germany", code: "DEU" },
      { name: "Italy", code: "ITA" },
      { name: "Spain", code: "ESP" },
      { name: "Switzerland", code: "CHE" },
      // Top 5 countries: France, Germany, Italy, Spain, Switzerland
    ],
  },
  {
    name: "EUROPE FOCUS",
    code: "EUF",
    countries: [
      { name: "Belgium", code: "BEL" },
      { name: "Denmark", code: "DNK" },
      { name: "Netherlands", code: "NLD" },
      { name: "Norway", code: "NOR" },
      { name: "Sweden", code: "SWE" },
      // Top 5 countries: Belgium, Denmark, Netherlands, Norway, Sweden
    ],
  },
  {
    name: "GLOBAL",
    code: "GL",
    countries: [
      { name: "Australia", code: "AUS" },
      { name: "Brazil", code: "BRA" },
      { name: "Canada", code: "CAN" },
      { name: "Mexico", code: "MEX" },
      { name: "United States", code: "USA" },
      // Top 5 countries: Australia, Brazil, Canada, Mexico, United States
    ],
  },
  {
    name: "LATIN AMERICA",
    code: "LAM",
    countries: [
      { name: "Argentina", code: "ARG" },
      { name: "Chile", code: "CHL" },
      { name: "Colombia", code: "COL" },
      { name: "Peru", code: "PER" },
      { name: "Venezuela", code: "VEN" },
      // Top 5 countries: Argentina, Chile, Colombia, Peru, Venezuela
    ],
  },
];

export const designScope = [
  { label: "Design Intent", value: "DI" },
  { label: "Regional Design Template", value: "DT" },
  { label: "Production Ready Art", value: "PRA" },
  { label: "New Print Feasibility", value: "PF" },
  { label: "Ink Qualification", value: "IQ" },
  { label: "CIC/GA", value: "CICs" },
  // { label: "POA's", value: "POAs" },
];

export const scaleList = [
  { name: "A", code: "A" },
  { name: "B", code: "B" },
  { name: "C", code: "C" },
  { name: "RBU Customization", code: "RBU Customization" },
];

export const projectType = [
  { name: "Highway", code: "Highway" },
  { name: "TR (Travel Retail)", code: "TR (Travel Retail)" },
  { name: "Cost Saving", code: "C" },
  { name: "Customization", code: "RBU Customization" },
  { name: "BU Promotional", code: "BU Promotional" },
  { name: "Regulatory Change", code: "Regulatory Change" },
  { name: "Commercial Initiative", code: "Commercial Initiative" },
  { name: "Technical Change", code: "Technical Change" },
];

export const Tier = [
  { name: "T0 Premium", code: "T0Premium" },
  { name: "T0 Taped", code: "T0Taped" },
  { name: "T0 Wipes", code: "T0Wipes" },
  { name: "T1 Pants", code: "T1Pants" },
  { name: "T1 Premium", code: "T1Premium" },
  { name: "T1 Taped", code: "T1Taped" },
  { name: "T1 Wipes", code: "T1Wipes" },
  { name: "T2 Pants", code: "T2Pants" },
  { name: "T2 Taped", code: "T2Taped" },
  { name: "T2 Wipes", code: "T2Wipes" },
  { name: "T3 Taped", code: "T3Taped" },
  { name: "T3 Wipes", code: "T3Wipes" },
  { name: "Bedmats", code: "Bedmats" },
  { name: "Splashers", code: "Splashers" },
  { name: "Wipes", code: "Wipes" },
  { name: "Underjams", code: "Underjams" },
];
export const ProductionStrategy = [
  { name: "CIC matrix", code: "CICmatrix" },
  { name: "CIC & follower", code: "CIC&follower" },
  { name: "SAR", code: "SAR" },
  { name: "DTP", code: "DTP" },
];
export const brandList = [
  {
    Brand_Name: "Charlie Banana",
    code: "BV0102",
  },
  {
    Brand_Name: "Pampers",
    code: "J29",
  },
  {
    Brand_Name: "All Clean",
    code: "BV0121",
  },
  {
    Brand_Name: "Lines",
    code: "D76",
  },
  {
    Brand_Name: "Cutie",
    code: "H61",
  },
  {
    Brand_Name: "Dodot",
    code: "H66",
  },
  {
    Brand_Name: "Luvs",
    code: "J15",
  },
  {
    Brand_Name: "Linidor",
    code: "LNDR",
  },
  {
    Brand_Name: "Minor Brands",
    code: "MB",
  },
  {
    Brand_Name: "Lumi",
    code: "CC7863",
  },
  {
    Brand_Name: "Pampers Kandoo",
    code: "JJM02",
  },
  {
    Brand_Name: "Dodot Kandoo",
    code: "JJM03",
  },
  {
    Brand_Name: "Ninjamas",
    code: "BV0098",
  },
  {
    Brand_Name: "All Good",
    code: "CC3334",
  },
  {
    Brand_Name: "Dodotis",
    code: "H67",
  },
  {
    Brand_Name: "Babysan",
    code: "H9",
  },
  {
    Brand_Name: "Mammi",
    code: "J18",
  },
  {
    Brand_Name: "Liberty",
    code: "LIB",
  },
  {
    Brand_Name: "Disco",
    code: "TA31",
  },
  {
    Brand_Name: "Ausonia",
    code: "D75",
  },
  {
    Brand_Name: "Ambi Pur",
    code: "AP",
  },
  {
    Brand_Name: "Attento",
    code: "ATNT",
  },
  {
    Brand_Name: "9 Elements",
    code: "BV0088",
  },
  {
    Brand_Name: "NBD.",
    code: "BV0090",
  },
  {
    Brand_Name: "Diversified Chemicals Techn",
    code: "CC0267",
  },
  {
    Brand_Name: "Home Made Simple",
    code: "CC892",
  },
  {
    Brand_Name: "Downy",
    code: "DWNY",
  },
  {
    Brand_Name: "Febreze",
    code: "FBRZ",
  },
  {
    Brand_Name: "Private Label",
    code: "KM102",
  },
  {
    Brand_Name: "Lenor",
    code: "LENR",
  },
  {
    Brand_Name: "Sanytol",
    code: "NC1620",
  },
  {
    Brand_Name: "Ariel",
    code: "V14",
  },
  {
    Brand_Name: "Luster Professional",
    code: "CC720",
  },
  {
    Brand_Name: "Deepio Professional",
    code: "CJG79PRO",
  },
  {
    Brand_Name: "Clean Quick Professional",
    code: "CLNQ1",
  },
  {
    Brand_Name: "Cream Suds Professional",
    code: "CRSD1",
  },
  {
    Brand_Name: "Ace",
    code: "V04",
  },
  {
    Brand_Name: "All",
    code: "V01",
  },
  {
    Brand_Name: "Ambi Pur Professional",
    code: "APPRO",
  },
  {
    Brand_Name: "Antikal",
    code: "ANTK",
  },
  {
    Brand_Name: "Antikal Professional",
    code: "ANTKPRO",
  },
  {
    Brand_Name: "Ava",
    code: "AVA",
  },
  {
    Brand_Name: "Ava Mat",
    code: "M19",
  },
  {
    Brand_Name: "Ayudin",
    code: "AYDN",
  },
  {
    Brand_Name: "Base Line",
    code: "BV0045",
  },
  {
    Brand_Name: "Battle",
    code: "BAT",
  },
  {
    Brand_Name: "Baleno",
    code: "BAL",
  },
  {
    Brand_Name: "Blue Planet",
    code: "BV0141",
  },
  {
    Brand_Name: "Blesk",
    code: "BLSK",
  },
  {
    Brand_Name: "Biz",
    code: "BZBL",
  },
  {
    Brand_Name: "Brigade",
    code: "BRGD",
  },
  {
    Brand_Name: "Buena Vibra (Maestro Limpio)",
    code: "BVML",
  },
  {
    Brand_Name: "Buena Vibra (Mr Clean)",
    code: "BVMC",
  },
  {
    Brand_Name: "Bowl Quick",
    code: "BWQK",
  },
  {
    Brand_Name: "Cierto",
    code: "CRTO",
  },
  {
    Brand_Name: "CLOSA",
    code: "BV0013",
  },
  {
    Brand_Name: "Cascade",
    code: "CSCD",
  },
  {
    Brand_Name: "Cascade Professional",
    code: "CSCD1",
  },
  {
    Brand_Name: "Cinch",
    code: "CNCH",
  },
  {
    Brand_Name: "Cream Suds",
    code: "CRSD",
  },
  {
    Brand_Name: "Cream Suds Professional",
    code: "CRSD1",
  },
  {
    Brand_Name: "Cristal",
    code: "CRST",
  },
  {
    Brand_Name: "Comet",
    code: "T4",
  },
  {
    Brand_Name: "Comet Professional",
    code: "T41",
  },
  {
    Brand_Name: "Deepio",
    code: "CJG79",
  },
  {
    Brand_Name: "Dawn",
    code: "DAWN",
  },
  {
    Brand_Name: "Dawn Professional",
    code: "DAWNPRO",
  },
  {
    Brand_Name: "Dax",
    code: "C5",
  },
  {
    Brand_Name: "Don Limpio",
    code: "TA11",
  },
  {
    Brand_Name: "Don Limpio Professional",
    code: "TA11PRO",
  },
  {
    Brand_Name: "Dreft",
    code: "DRFD",
  },
];
