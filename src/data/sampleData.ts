import { CVData } from '../types/cv.js';

// Clean, high-contrast SVG illustrated executive avatar (no real person photo)
export const DEFAULT_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f2942"/>
        <stop offset="55%" stop-color="#153e5c"/>
        <stop offset="100%" stop-color="#0b1f33"/>
      </linearGradient>
      <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg)"/>
    <circle cx="200" cy="200" r="176" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.35"/>
    <circle cx="200" cy="155" r="95" fill="#38bdf8" fill-opacity="0.07"/>
    <!-- Shoulders & Suit -->
    <path d="M65 400 C65 305 120 270 200 270 C280 270 335 305 335 400 Z" fill="url(#suit)"/>
    <!-- White Shirt & Gold Tie -->
    <polygon points="168,270 232,270 200,365" fill="#f8fafc"/>
    <polygon points="192,282 208,282 214,358 200,375 186,358" fill="url(#gold)"/>
    <!-- Suit Lapels -->
    <path d="M168 270 L142 340 L185 360 L200 365 Z" fill="#334155"/>
    <path d="M232 270 L258 340 L215 360 L200 365 Z" fill="#334155"/>
    <!-- Neck -->
    <rect x="176" y="225" width="48" height="52" rx="18" fill="#e2b897"/>
    <!-- Ears -->
    <circle cx="136" cy="168" r="14" fill="#d9ab88"/>
    <circle cx="264" cy="168" r="14" fill="#d9ab88"/>
    <!-- Head -->
    <rect x="142" y="96" width="116" height="142" rx="56" fill="#ecc4a4"/>
    <!-- Modern Styled Hair -->
    <path d="M140 152 C136 104 162 80 202 80 C240 80 264 102 260 152 C254 126 238 112 200 112 C164 112 146 126 140 152 Z" fill="#1e293b"/>
    <!-- Eyebrows & Eyes -->
    <path d="M164 152 Q176 147 186 152" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    <path d="M214 152 Q224 147 236 152" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="175" cy="164" r="5" fill="#0f172a"/>
    <circle cx="225" cy="164" r="5" fill="#0f172a"/>
    <!-- Gentle Confident Smile -->
    <path d="M182 202 Q200 214 218 202" fill="none" stroke="#8c583a" stroke-width="4" stroke-linecap="round"/>
  </svg>`
)}`;

export const FEMALE_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <linearGradient id="bgF" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#134e4a"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="goldF" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bgF)"/>
    <circle cx="200" cy="200" r="176" fill="none" stroke="url(#goldF)" stroke-width="2" stroke-opacity="0.35"/>
    <!-- Back Hair / Hijab Silhouette -->
    <path d="M122 165 C122 95 278 95 278 165 L292 280 L108 280 Z" fill="#1e293b"/>
    <!-- Shoulders & Blazer -->
    <path d="M72 400 C72 308 125 274 200 274 C275 274 328 308 328 400 Z" fill="#0f172a"/>
    <path d="M158 274 L200 348 L242 274 Z" fill="url(#goldF)"/>
    <!-- Neck -->
    <rect x="180" y="226" width="40" height="52" rx="16" fill="#e5be9e"/>
    <!-- Face -->
    <rect x="148" y="106" width="104" height="132" rx="52" fill="#f0cBB0"/>
    <!-- Front Hair Styling -->
    <path d="M146 156 C148 112 174 96 200 96 C228 96 252 112 254 156 C236 128 216 120 200 120 C180 120 162 128 146 156 Z" fill="#1e293b"/>
    <!-- Eyes & Smile -->
    <path d="M168 156 Q178 151 186 156" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M214 156 Q222 151 232 156" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="177" cy="167" r="4.5" fill="#0f172a"/>
    <circle cx="223" cy="167" r="4.5" fill="#0f172a"/>
    <path d="M185 202 Q200 212 215 202" fill="none" stroke="#9d5c47" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`
)}`;

export const SAMPLE_DATA_EN: CVData = {
  mode: 'job',
  language: 'en',
  themeId: 'executive',
  layout: 'signature_curve',
  fontChoice: 'anek_bangla',
  fontSizeScale: 'md',
  sectionOrder: ['ventures', 'organizational', 'education', 'family'],
  showBismillah: false,
  inlineEditing: false,
  useBengaliNumerals: false,
  personal: {
    fullName: 'TANVIR AHMED',
    tagline: 'CREATIVE DESIGNER & BRAND CONSULTANT',
    photoUrl: DEFAULT_AVATAR_URL,
    photoZoom: 1.0,
    photoOffset: { x: 0, y: 0 },
    photoShape: 'circle',
    phone: '01700-000000',
    email: 'tanvir.creative@example.com',
    website: 'creativeconceptpoint.com',
    facebook: 'Tanvir Ahmed Official',
    instagram: 'tanvir_design_studio',
    linkedin: 'tanvir-ahmed-bd',
    currentAddress: 'Dhanmondi, Dhaka, Bangladesh',
    permanentAddress: 'Sadar Road, Cumilla, Bangladesh',
    dob: '15 January 1999',
    age: '27 Years',
    height: '5\'7"',
    weight: '66 kg',
    complexion: 'Fair / Medium',
    bloodGroup: 'O+',
    maritalStatus: 'Unmarried',
    religion: 'Islam',
  },
  professionalSummary:
    'Dedicated Creative Designer and Brand Strategist with extensive experience in corporate identity, digital media, printing solutions, and event management. Passionate about blending modern visual design with cultural heritage.',
  family: {
    fatherName: 'Md. Rafiqul Islam',
    fatherOccupation: 'Retired Government Officer',
    motherName: 'Tahmina Akter',
    motherOccupation: 'Homemaker',
    siblingsCount: '1 Brother and 1 Sister',
    positionInFamily: 'Eldest',
    sistersStatus: 'University Student',
    brothersStatus: 'Software Engineer',
    financialStatus: 'Upper Middle Class (Respectable Family)',
  },
  matrimonial: {
    religiousPractice: 'Regular 5 times Salah, observant of Islamic principles and ethical lifestyle.',
    partnerExpectations:
      'Seeking a modest, educated, and practicing life partner from a respectable family who values mutual respect, kindness, and family harmony.',
    guardianContact: '01800-000000 (Father / Guardian)',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Brand Consultant',
      organization: 'Creative CONCEPT Point',
      period: '2023 - Present',
      location: 'Dhaka',
      description: 'Leading Creative Design, Corporate Printing, Program Branding & Event Management Services for national and corporate clients.',
      isVenture: true,
    },
    {
      id: 'exp-2',
      role: 'Founder & Lead Designer',
      organization: 'Canvas & Craft Studio',
      period: '2021 - Present',
      location: 'Dhaka',
      description: 'Specialized in bespoke typography, brand packaging, and digital marketing campaigns.',
      isVenture: true,
    },
    {
      id: 'exp-3',
      role: 'UI/UX & Visual Designer',
      organization: 'NextGen Digital Ltd.',
      period: '2020 - 2022',
      location: 'Dhaka',
      description: 'Designed interactive web applications, editorial layouts, and brand guidelines.',
      isVenture: false,
    },
  ],
  organizationalExperience: [
    {
      id: 'org-1',
      role: 'General Secretary',
      organization: 'Bangladesh Youth Creative Forum',
      period: '2024 - Present',
      description: 'Directing youth skill development workshops, design bootcamps, and community initiatives.',
    },
    {
      id: 'org-2',
      role: 'Executive Member',
      organization: 'National Art & Cultural Society',
      period: '2022 - 2024',
      description: 'Organized annual national exhibitions, seminars, and cultural showcases.',
    },
    {
      id: 'org-3',
      role: 'Volunteer Coordinator',
      organization: 'Green Bangladesh Foundation',
      period: '2021 - 2022',
      description: 'Coordinated social outreach programs, educational distributions, and charity drives.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.F.A. in Graphic Design & Multimedia',
      institution: 'University of Dhaka',
      yearOrSession: '2018-2022 Session',
      result: 'CGPA 3.75',
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Dhaka City College',
      yearOrSession: '2018',
      result: 'GPA 5.00',
    },
    {
      id: 'edu-3',
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Cumilla Zilla School',
      yearOrSession: '2016',
      result: 'GPA 5.00',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'Brand Identity & Graphic Design', level: 95, category: 'technical' },
    { id: 'sk-2', name: 'Typography & Calligraphy', level: 90, category: 'technical' },
    { id: 'sk-3', name: 'UI/UX & Print Production', level: 88, category: 'technical' },
    { id: 'sk-4', name: 'Event & Program Branding', level: 92, category: 'soft' },
    { id: 'sk-5', name: 'Creative Art Direction', level: 86, category: 'technical' },
    { id: 'sk-6', name: 'Team Leadership', level: 85, category: 'soft' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'National Brand & Typography Expo',
      subtitle: 'Creative Concept Point',
      link: 'creativeconceptpoint.com',
      description: 'Curated a nationwide design exhibition featuring 60+ leading brand designers and artists.',
    },
    {
      id: 'proj-2',
      title: 'Digital Youth Design Academy',
      subtitle: 'Skill Development Initiative',
      description: 'Trained over 500 young students in modern graphic design, freelancing, and visual communication.',
    },
  ],
  customSections: [
    {
      id: 'cust-1',
      title: 'Awards & Achievements',
      items: [
        { id: 'c1', label: 'Best Brand Identity Award', value: 'Bangladesh Design Summit (2024)' },
        { id: 'c2', label: 'Youth Innovation Fellowship', value: 'National Creative Council (2023)' },
      ],
    },
  ],
};

export const SAMPLE_DATA_BN: CVData = {
  mode: 'job',
  language: 'bn',
  themeId: 'executive',
  layout: 'signature_curve',
  fontChoice: 'anek_bangla',
  fontSizeScale: 'md',
  sectionOrder: ['ventures', 'organizational', 'education', 'family'],
  showBismillah: false,
  inlineEditing: false,
  useBengaliNumerals: true,
  personal: {
    fullName: 'তানভীর আহমেদ',
    tagline: 'ক্রিয়েটিভ ডিজাইনার ও ব্র্যান্ড কনসালটেন্ট',
    photoUrl: DEFAULT_AVATAR_URL,
    photoZoom: 1.0,
    photoOffset: { x: 0, y: 0 },
    photoShape: 'circle',
    phone: '০১৭০০-০০০০০০',
    email: 'tanvir.creative@example.com',
    website: 'creativeconceptpoint.com',
    facebook: 'Tanvir Ahmed Official',
    instagram: 'tanvir_design_studio',
    linkedin: 'tanvir-ahmed-bd',
    currentAddress: 'ধানমন্ডি, ঢাকা, বাংলাদেশ',
    permanentAddress: 'সদর রোড, কুমিল্লা, বাংলাদেশ',
    dob: '১৫ জানুয়ারি ১৯৯৯',
    age: '২৭ বছর',
    height: '৫\'৭"',
    weight: '৬৬ কেজি',
    complexion: 'উজ্জ্বল শ্যামবর্ণ',
    bloodGroup: 'O+',
    maritalStatus: 'অবিবাহিত',
    religion: 'ইসলাম',
  },
  professionalSummary:
    'একজন সৃজনশীল ব্র্যান্ড কনসালটেন্ট ও গ্রাফিক ডিজাইনার যিনি কর্পোরেট ব্র্যান্ডিং, আধুনিক প্রিন্টিং ও ইভেন্ট ম্যানেজমেন্টে দক্ষ। সৃজনশীল ডিজাইন ও আধুনিক প্রযুক্তির সমন্বয়ে মানসম্মত সেবা প্রদানে নিবেদিতপ্রাণ।',
  family: {
    fatherName: 'মো. রফিকুল ইসলাম',
    fatherOccupation: 'অবসরপ্রাপ্ত সরকারি কর্মকর্তা',
    motherName: 'তাহমিনা আক্তার',
    motherOccupation: 'গৃহিণী',
    siblingsCount: '১ ভাই ও ১ বোন',
    positionInFamily: 'পরিবারের জ্যেষ্ঠ সন্তান',
    sistersStatus: 'বিশ্ববিদ্যালয়ে অধ্যয়নরত',
    brothersStatus: 'সফটওয়্যার ইঞ্জিনিয়ার',
    financialStatus: 'উচ্চ-মধ্যবিত্ত ও সুপ্রতিষ্ঠিত পরিবার',
  },
  matrimonial: {
    religiousPractice: 'নিয়মিত পাঁচ ওয়াক্ত নামাজ আদায়, ইসলামিক অনুশাসন ও হালাল উপার্জনে বিশ্বাসী।',
    partnerExpectations:
      'শিক্ষিত, মার্জিত, দ্বীনদার এবং পারিবারিক মূল্যবোধসম্পন্ন জীবনসঙ্গিনী প্রত্যাশিত; যিনি পারস্পরিক শ্রদ্ধা ও সম্প্রীতির মাধ্যমে সুন্দর একটি পরিবার গড়ে তুলতে আগ্রহী।',
    guardianContact: '০১৮০০-০০০০০০ (পিতা / অভিভাবক)',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'সিনিয়র ব্র্যান্ড কনসালটেন্ট',
      organization: 'ক্রিয়েটিভ কনসেপ্ট পয়েন্ট (Creative CONCEPT Point)',
      period: '২০২৩ - বর্তমান',
      location: 'ঢাকা',
      description: 'ক্রিয়েটিভ ডিজাইন, কর্পোরেট প্রিন্টিং, প্রোগ্রাম ব্র্যান্ডিং ও ইভেন্ট ম্যানেজমেন্ট সার্ভিসের সার্বিক পরিচালনা।',
      isVenture: true,
    },
    {
      id: 'exp-2',
      role: 'প্রতিষ্ঠাতা ও লিড ডিজাইনার',
      organization: 'ক্যানভাস অ্যান্ড ক্রাফট স্টুডিও',
      period: '২০২১ - বর্তমান',
      location: 'ঢাকা',
      description: 'কর্পোরেট ব্র্যান্ড আইডেন্টিটি, ক্যালিগ্রাফি ও ক্রিয়েটিভ প্যাকেজিং ডিজাইন পরিচালনা।',
      isVenture: true,
    },
    {
      id: 'exp-3',
      role: 'ইউআই/ইউএক্স ও ভিজ্যুয়াল ডিজাইনার',
      organization: 'নেক্সটজেন ডিজিটাল লিমিটেড',
      period: '২০২০ - ২০২২',
      location: 'ঢাকা',
      description: 'ডিজিটাল মিডিয়া ক্যাম্পেইন, ওয়েব ইন্টারফেস এবং প্রকাশনা ডিজাইনে কাজ করার অভিজ্ঞতা।',
      isVenture: false,
    },
  ],
  organizationalExperience: [
    {
      id: 'org-1',
      role: 'সাধারণ সম্পাদক',
      organization: 'বাংলাদেশ ইয়ুথ ক্রিয়েটিভ ফোরাম',
      period: '২০২৪ - বর্তমান',
      description: 'তরুণদের দক্ষতা উন্নয়ন কর্মশালা, ডিজাইন সেমিনার ও শিক্ষামূলক কার্যক্রম পরিচালনা।',
    },
    {
      id: 'org-2',
      role: 'কার্যনির্বাহী সদস্য',
      organization: 'ন্যাশনাল আর্ট অ্যান্ড কালচারাল সোসাইটি',
      period: '২০২২ - ২০২৪',
      description: 'জাতীয় পর্যায়ের শিল্প প্রদর্শনী, প্রকাশনা ও সাংস্কৃতিক অনুষ্ঠান আয়োজনে সক্রিয় ভূমিকা।',
    },
    {
      id: 'org-3',
      role: 'সমন্বয়ক',
      organization: 'গ্রিন বাংলাদেশ ফাউন্ডেশন',
      period: '২০২১ - ২০২২',
      description: 'সামাজিক কল্যাণমূলক কার্যক্রম, শিক্ষাবৃত্তি প্রদান এবং স্বেচ্ছাসেবী কর্মসূচি সমন্বয়।',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'বি.এফ.এ (গ্রাফিক ডিজাইন ও মাল্টিমিডিয়া)',
      institution: 'ঢাকা বিশ্ববিদ্যালয়',
      yearOrSession: '২০১৮-২০২২ সেশন',
      result: 'সিজিপিএ ৩.৭৫',
    },
    {
      id: 'edu-2',
      degree: 'উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি)',
      institution: 'ঢাকা সিটি কলেজ',
      yearOrSession: '২০১৮',
      result: 'জিপিএ ৫.০০',
    },
    {
      id: 'edu-3',
      degree: 'মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)',
      institution: 'কুমিল্লা জিলা স্কুল',
      yearOrSession: '২০১৬',
      result: 'জিপিএ ৫.০০',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'গ্রাফিক ডিজাইন ও ব্র্যান্ডিং', level: 95, category: 'technical' },
    { id: 'sk-2', name: 'টাইপোগ্রাফি ও ক্যালিগ্রাফি', level: 90, category: 'technical' },
    { id: 'sk-3', name: 'প্রিন্ট প্রোডাকশন ও ইউআই ডিজাইন', level: 88, category: 'technical' },
    { id: 'sk-4', name: 'ইভেন্ট ও প্রোগ্রাম ব্র্যান্ডিং', level: 92, category: 'soft' },
    { id: 'sk-5', name: 'আর্ট ডিরেকশন', level: 86, category: 'technical' },
    { id: 'sk-6', name: 'টিম লিডারশিপ ও ম্যানেজমেন্ট', level: 85, category: 'soft' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'ন্যাশনাল ব্র্যান্ড ও টাইপোগ্রাফি এক্সপো',
      subtitle: 'ক্রিয়েটিভ কনসেপ্ট পয়েন্ট',
      link: 'creativeconceptpoint.com',
      description: 'দেশব্যাপী ৬০+ শীর্ষস্থানীয় ডিজাইনার ও শিল্পীদের নিয়ে বৃহৎ প্রদর্শনীর সফল আয়োজন।',
    },
    {
      id: 'proj-2',
      title: 'ডিজিটাল ইয়ুথ ডিজাইন একাডেমি',
      subtitle: 'দক্ষতা উন্নয়ন উদ্যোগ',
      description: '৫০০+ তরুণ শিক্ষার্থীকে আধুনিক গ্রাফিক ডিজাইন ও ভিজ্যুয়াল কমিউনিকেশন বিষয়ে প্রশিক্ষণ প্রদান।',
    },
  ],
  customSections: [
    {
      id: 'cust-1',
      title: 'বিশেষ সম্মাননা ও অর্জন',
      items: [
        { id: 'c1', label: 'শ্রেষ্ঠ ব্র্যান্ড আইডেন্টিটি অ্যাওয়ার্ড', value: 'বাংলাদেশ ডিজাইন সামিট (২০২৪)' },
        { id: 'c2', label: 'ইয়ুথ ইনোভেশন ফেলোশিপ', value: 'ন্যাশনাল ক্রিয়েটিভ কাউন্সিল (২০২৩)' },
      ],
    },
  ],
};
