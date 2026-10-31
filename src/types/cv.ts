export type Mode = 'job' | 'matrimonial';
export type Language = 'bn' | 'en';
export type ThemeId = 'executive' | 'emerald' | 'burgundy' | 'indigo' | 'monochrome';
export type TemplateLayout =
  | 'signature_curve'
  | 'modern_corporate'
  | 'matrimonial_heritage'
  | 'minimal_creative'
  | 'metro_compact';

export type FontChoice =
  | 'anek_bangla'
  | 'hind_siliguri'
  | 'noto_sans'
  | 'galada'
  | 'tiro_bangla'
  | 'plus_jakarta'
  | 'inter'
  | 'outfit';

export type FontSizeScale = 'sm' | 'md' | 'lg' | 'xl';

export interface AttachedDocument {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  fileUrl: string;
  fileType: 'image' | 'pdf';
}

export interface SavedDraft {
  id: string;
  name: string;
  updatedAt: string;
  email?: string;
  data: CVData;
}

export interface ThemeColors {
  id: ThemeId;
  nameEn: string;
  nameBn: string;
  primary: string; // Hex
  primaryDark: string;
  accent: string; // Gold or highlight
  accentLight: string;
  secondary: string;
  bgLight: string;
  sidebarBg: string;
  sidebarText: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  border: string;
}

export interface PersonalDetails {
  fullName: string;
  tagline: string;
  photoUrl: string;
  photoZoom: number;
  photoOffset: { x: number; y: number };
  photoShape: 'circle' | 'rounded' | 'square';
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  currentAddress: string;
  permanentAddress: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  maritalStatus: string;
  religion: string;
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblingsCount: string;
  positionInFamily: string;
  sistersStatus: string;
  brothersStatus: string;
  financialStatus: string;
}

export interface MatrimonialDetails {
  religiousPractice: string;
  partnerExpectations: string;
  guardianContact: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  isVenture?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  yearOrSession: string;
  result?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0 - 100
  category: 'technical' | 'soft';
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  label: string;
  value: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CVData {
  mode: Mode;
  language: Language;
  themeId: ThemeId;
  layout: TemplateLayout;
  fontChoice: FontChoice;
  fontSizeScale: FontSizeScale;
  sectionOrder?: string[];
  showBismillah?: boolean;
  inlineEditing?: boolean;
  useBengaliNumerals: boolean;
  personal: PersonalDetails;
  professionalSummary: string;
  family: FamilyDetails;
  matrimonial: MatrimonialDetails;
  experiences: WorkExperience[];
  organizationalExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
  attachedDocuments?: AttachedDocument[];
}
