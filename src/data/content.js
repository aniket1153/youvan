/**
 * Shared content for YOUVAN — clubs & community activity areas.
 * Used by Clubs, Community, and RegistrationForm so labels stay in sync.
 */

export const CLUBS = [
  {
    id: 'sports',
    name: 'Sports / Fitness & Adventure',
    nameMr: 'Sports, Fitness & Adventure',
    icon: '🏃',
    tags: 'क्रीडा • ट्रेकिंग • सायकलिंग • फिटनेस • मॅरेथॉन • साहसी उपक्रम',
    description:
      'तंदुरुस्त शरीर, मजबूत मन आणि साहसी जीवनशैली घडविण्यासाठी.',
    gradient: 'from-primary to-primary-light',
  },
  {
    id: 'creative',
    name: 'Creative Club',
    nameMr: 'Creative Club',
    icon: '🎨',
    tags: 'चित्रकला • फोटोग्राफी • संगीत • नृत्य • लेखन • अभिनय • डिझाईन',
    description: 'तुमच्या कल्पनांना आणि कलागुणांना व्यासपीठ.',
    gradient: 'from-accent to-orange-400',
  },
  {
    id: 'gaming',
    name: 'Gaming Club',
    nameMr: 'Gaming Club',
    icon: '🎮',
    tags: 'BGMI • Valorant • FIFA • Chess • E-Sports • Gaming Events',
    description: 'Gaming प्रेमींसाठी स्पर्धा, टीम बिल्डिंग आणि मजा.',
    gradient: 'from-green to-emerald-500',
  },
]

export const ACTIVITIES = [
  {
    id: 'environment',
    name: 'पर्यावरण',
    icon: '🌱',
    description:
      'वृक्षारोपण, स्वच्छता अभियान, जलसंवर्धन आणि पर्यावरण जनजागृती.',
  },
  {
    id: 'education',
    name: 'शिक्षण',
    icon: '📚',
    description:
      'गरीब विद्यार्थ्यांना शैक्षणिक मदत, मार्गदर्शन आणि पुस्तक दान.',
  },
  {
    id: 'health',
    name: 'आरोग्य',
    icon: '🩸',
    description: 'रक्तदान शिबिरे, आरोग्य तपासणी आणि जनजागृती.',
  },
  {
    id: 'agriculture',
    name: 'कृषी',
    icon: '🌾',
    description: 'शेतकरी मार्गदर्शन, नैसर्गिक शेती आणि ग्रामीण विकास.',
  },
  {
    id: 'village',
    name: 'ग्रामविकास',
    icon: '🏡',
    description:
      'स्वच्छ गाव, पाणी व्यवस्थापन, ग्रामसभा सहभाग आणि विकास.',
  },
  {
    id: 'cooperation',
    name: 'सहकार',
    icon: '🤝',
    description:
      'सामाजिक संस्था, स्वयंसेवी संघटना आणि नागरिकांना जोडणे.',
  },
  {
    id: 'employment',
    name: 'रोजगार',
    icon: '💼',
    description:
      'Career Guidance, Skill Development, Resume Building आणि Job Opportunities.',
  },
  {
    id: 'biodiversity',
    name: 'जैवविविधता',
    icon: '🐄',
    description: 'प्राणी संरक्षण, निसर्ग संवर्धन आणि जैवविविधतेचे जतन.',
  },
  {
    id: 'women',
    name: 'महिला विकास',
    icon: '👩',
    description:
      'महिला सक्षमीकरण, स्वसंरक्षण प्रशिक्षण आणि उद्योजकता.',
  },
  {
    id: 'children',
    name: 'बाल विकास',
    icon: '👶',
    description: 'बालशिक्षण, संस्कार वर्ग आणि व्यक्तिमत्व विकास.',
  },
  {
    id: 'seniors',
    name: 'ज्येष्ठ नागरिक',
    icon: '👴',
    description: 'ज्येष्ठ नागरिक सन्मान, आरोग्य शिबिरे आणि सेवा उपक्रम.',
  },
  {
    id: 'culture',
    name: 'संस्कृती',
    icon: '🎭',
    description: 'भारतीय संस्कृती, सण-उत्सव, लोककला आणि परंपरा जतन.',
  },
]

/** All selectable interest options on the registration form */
export const INTEREST_OPTIONS = [
  ...CLUBS.map((c) => ({ id: c.id, label: c.name, icon: c.icon })),
  ...ACTIVITIES.map((a) => ({ id: a.id, label: a.name, icon: a.icon })),
]

export const WHY_JOIN = [
  'नवीन मित्र आणि नेटवर्क',
  'विविध कॉलेजमधील विद्यार्थ्यांशी ओळख',
  'नेतृत्व विकास',
  'स्वयंसेवा संधी',
  'व्यक्तिमत्व विकास',
  'सामाजिक उपक्रम',
  'Adventure Trips',
  'Workshops',
  'Events',
  'Community Meetups',
]
