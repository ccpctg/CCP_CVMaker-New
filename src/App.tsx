import React, { useState, useEffect } from 'react';
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Edit3,
  Check,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Paperclip,
} from 'lucide-react';
import { CVData, Language, Mode, PersonalDetails, Skill, WorkExperience } from './types/cv.js';
import { SAMPLE_DATA_BN, SAMPLE_DATA_EN } from './data/sampleData.js';
import { UI_STRINGS } from './data/translations.js';
import { THEMES } from './utils/themeData.js';
import { exportCvToPdf, exportCvToImage, printCvDirect } from './utils/pdfExport.js';

import { Header } from './components/Header.js';
import { PersonalSection } from './components/Editor/PersonalSection.js';
import { SummarySection } from './components/Editor/SummarySection.js';
import { ExperienceSection } from './components/Editor/ExperienceSection.js';
import { EducationSection } from './components/Editor/EducationSection.js';
import { SkillsSection } from './components/Editor/SkillsSection.js';
import { MatrimonialSection } from './components/Editor/MatrimonialSection.js';
import { CustomSectionEditor } from './components/Editor/CustomSectionEditor.js';
import { CertificatesSection } from './components/Editor/CertificatesSection.js';
import { PhotoEditorModal } from './components/PhotoEditorModal.js';
import { AiAssistantModal } from './components/AiAssistantModal.js';
import { AutoTranslateModal } from './components/AutoTranslateModal.js';
import { SmartAutoFillModal } from './components/SmartAutoFillModal.js';
import { GmailDraftsModal } from './components/GmailDraftsModal.js';
import { CcpFeedbackModal } from './components/CcpFeedbackModal.js';
import { CvDocument } from './components/Preview/CvDocument.js';

const STORAGE_KEY = 'ccp_cv_maker_data_v1';

export default function App() {
  // Load initial state from LocalStorage or fallback to SAMPLE_DATA_BN
  const [data, setData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
    return SAMPLE_DATA_BN;
  });

  // Persistent auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Active form tab in editor
  const [activeTab, setActiveTab] = useState<
    'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'matrimonial' | 'certificates' | 'reorder' | 'custom'
  >('personal');

  // Preview zoom scale (0.5 to 1.3)
  const [previewZoom, setPreviewZoom] = useState<number>(0.85);

  // Mobile view toggle ('editor' or 'preview')
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Modals state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAutoTranslateOpen, setIsAutoTranslateOpen] = useState(false);
  const [isAutoFillOpen, setIsAutoFillOpen] = useState(false);
  const [isGmailDraftsOpen, setIsGmailDraftsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const t = UI_STRINGS[data.language];
  const activeTheme = THEMES[data.themeId] || THEMES.executive;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Sample data loader
  const handleLoadSample = (lang: Language) => {
    const sample = lang === 'bn' ? SAMPLE_DATA_BN : SAMPLE_DATA_EN;
    setData({
      ...sample,
      language: lang,
      useBengaliNumerals: lang === 'bn',
    });
    showToast(lang === 'bn' ? 'নমুনা তথ্য লোড করা হয়েছে' : 'Sample profile data loaded');
  };

  // Reset to empty
  const handleReset = () => {
    if (
      window.confirm(
        data.language === 'bn'
          ? 'আপনি কি নিশ্চিত যে সমস্ত ডেটা মুছে ফেলতে চান?'
          : 'Are you sure you want to reset all fields?'
      )
    ) {
      setData({
        mode: data.mode,
        language: data.language,
        themeId: data.themeId,
        layout: data.layout,
        fontChoice: data.fontChoice || 'anek_bangla',
        fontSizeScale: data.fontSizeScale || 'md',
        sectionOrder: ['ventures', 'organizational', 'education', 'family', 'matrimonial', 'projects', 'custom'],
        useBengaliNumerals: data.useBengaliNumerals,
        personal: {
          fullName: '',
          tagline: '',
          photoUrl: '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg',
          photoZoom: 1.0,
          photoOffset: { x: 0, y: 0 },
          photoShape: 'circle',
          phone: '',
          email: '',
          website: '',
          facebook: '',
          instagram: '',
          linkedin: '',
          currentAddress: '',
          permanentAddress: '',
          dob: '',
          age: '',
          height: '',
          weight: '',
          complexion: '',
          bloodGroup: '',
          maritalStatus: '',
          religion: '',
        },
        professionalSummary: '',
        family: {
          fatherName: '',
          fatherOccupation: '',
          motherName: '',
          motherOccupation: '',
          siblingsCount: '',
          positionInFamily: '',
          sistersStatus: '',
          brothersStatus: '',
          financialStatus: '',
        },
        matrimonial: {
          religiousPractice: '',
          partnerExpectations: '',
          guardianContact: '',
        },
        experiences: [],
        organizationalExperience: [],
        education: [],
        skills: [],
        projects: [],
        customSections: [],
        attachedDocuments: [],
      });
      showToast(data.language === 'bn' ? 'রিসেট সম্পন্ন হয়েছে' : 'Data reset completed');
    }
  };

  // PDF Export
  const handleExportPdf = async () => {
    setIsExporting(true);
    showToast(data.language === 'bn' ? 'পিডিএফ প্রস্তুত হচ্ছে...' : 'Generating PDF...');
    try {
      const fileName = `${data.personal.fullName || 'CCP_CV'}_Creative_Concept_Point.pdf`
        .replace(/\s+/g, '_')
        .replace(/[^\w.-]/g, '');
      await exportCvToPdf('cv-print-canvas', fileName);
      showToast(data.language === 'bn' ? 'পিডিএফ ডাউনলোড সফল!' : 'PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      alert('PDF generation encountered an error. Falling back to browser print.');
      printCvDirect();
    } finally {
      setIsExporting(false);
    }
  };

  // Image Export (PNG / JPG)
  const handleExportImage = async (format: 'png' | 'jpeg') => {
    setIsExporting(true);
    showToast(
      data.language === 'bn'
        ? `${format.toUpperCase()} ছবি তৈরি হচ্ছে...`
        : `Generating high-res ${format.toUpperCase()}...`
    );
    try {
      const fileName = `${data.personal.fullName || 'CCP_CV'}_Creative_Concept_Point`
        .replace(/\s+/g, '_')
        .replace(/[^\w.-]/g, '');
      await exportCvToImage('cv-print-canvas', format, fileName);
      showToast(
        data.language === 'bn' ? 'ছবি ডাউনলোড সম্পন্ন!' : 'Image downloaded successfully!'
      );
    } catch (err) {
      console.error(err);
      alert('Image generation error. You can use PDF download instead.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    printCvDirect();
  };

  // Apply AI Translation
  const handleApplyTranslatedData = (translated: any, targetLang: Language) => {
    setData((prev) => ({
      ...prev,
      language: targetLang,
      useBengaliNumerals: targetLang === 'bn',
      personal: {
        ...prev.personal,
        ...(translated.personal || {}),
        photoUrl: prev.personal.photoUrl,
        photoZoom: prev.personal.photoZoom,
        photoOffset: prev.personal.photoOffset,
        photoShape: prev.personal.photoShape,
      },
      professionalSummary: translated.professionalSummary ?? prev.professionalSummary,
      family: { ...prev.family, ...(translated.family || {}) },
      matrimonial: { ...prev.matrimonial, ...(translated.matrimonial || {}) },
      experiences: translated.experiences || prev.experiences,
      organizationalExperience: translated.organizationalExperience || prev.organizationalExperience,
      education: translated.education || prev.education,
      skills: translated.skills || prev.skills,
      customSections: translated.customSections || prev.customSections,
    }));
    showToast(
      targetLang === 'bn'
        ? 'সম্পূর্ণ সিভি বাংলায় অনুবাদ করা হয়েছে!'
        : 'CV auto-translated to English!'
    );
  };

  // Mobile Text Auto-Fill Applier
  const handleApplyAutoFillData = (extracted: Partial<CVData>) => {
    setData((prev) => ({
      ...prev,
      ...extracted,
      personal: {
        ...prev.personal,
        ...(extracted.personal || {}),
        photoUrl: prev.personal.photoUrl,
        photoZoom: prev.personal.photoZoom,
        photoOffset: prev.personal.photoOffset,
        photoShape: prev.personal.photoShape,
      },
      family: {
        ...prev.family,
        ...(extracted.family || {}),
      },
      matrimonial: {
        ...prev.matrimonial,
        ...(extracted.matrimonial || {}),
      },
      experiences: extracted.experiences && extracted.experiences.length > 0 ? extracted.experiences : prev.experiences,
      education: extracted.education && extracted.education.length > 0 ? extracted.education : prev.education,
      skills: extracted.skills && extracted.skills.length > 0 ? extracted.skills : prev.skills,
    }));
    showToast(data.language === 'bn' ? 'মোবাইল তথ্য থেকে সিভি স্বয়ংক্রিয়ভাবে পূরণ হয়েছে!' : 'CV auto-filled from mobile text!');
  };

  // Draft Loader from GmailDraftsModal
  const handleLoadDraft = (draftData: CVData) => {
    setData(draftData);
    showToast(data.language === 'bn' ? 'ড্রাফট সফলভাবে ওপেন করা হয়েছে' : 'Draft loaded successfully');
  };

  // Section Reordering Handler
  const defaultSections = ['ventures', 'organizational', 'education', 'family', 'matrimonial', 'projects', 'custom'];
  const currentSections = data.sectionOrder && data.sectionOrder.length > 0 ? data.sectionOrder : defaultSections;

  const sectionLabels: Record<string, { bn: string; en: string }> = {
    ventures: { bn: 'পেশাদার প্রোফাইল ও প্রতিষ্ঠানসমূহ', en: 'Professional Profile & Business Ventures' },
    organizational: { bn: 'সাংগঠনিক দায়িত্ব ও অভিজ্ঞতা', en: 'Organizational Experience' },
    education: { bn: 'শিক্ষাগত যোগ্যতা', en: 'Educational Qualifications' },
    family: { bn: 'পারিবারিক পরিচয়', en: 'Family Background' },
    matrimonial: { bn: 'ধর্মীয় মূল্যবোধ ও প্রত্যাশা', en: 'Religious Values & Expectations' },
    projects: { bn: 'প্রধান প্রোজেক্ট ও উদ্যোগ', en: 'Key Projects & Portfolio' },
    custom: { bn: 'কাস্টম সেকশনসমূহ', en: 'Custom Dynamic Sections' },
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...currentSections];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setData((prev) => ({ ...prev, sectionOrder: list }));
    showToast(data.language === 'bn' ? 'সেকশনের পজিশন পরিবর্তন করা হয়েছে' : 'Section position updated');
  };

  // Inline field updater
  const handleInlineUpdateField = (path: string, val: any) => {
    setData((prev) => {
      const copy = { ...prev };
      if (path.startsWith('personal.')) {
        const field = path.replace('personal.', '') as keyof PersonalDetails;
        copy.personal = { ...copy.personal, [field]: val };
      } else if (path.startsWith('matrimonial.')) {
        const field = path.replace('matrimonial.', '') as any;
        copy.matrimonial = { ...copy.matrimonial, [field]: val };
      } else if (path === 'professionalSummary') {
        copy.professionalSummary = val;
      }
      return copy;
    });
  };

  // Apply AI Suggestions
  const handleApplyAiSuggestions = (payload: {
    summary?: string;
    skills?: Skill[];
    experiences?: WorkExperience[];
    partnerExpectations?: string;
  }) => {
    setData((prev) => ({
      ...prev,
      professionalSummary: payload.summary || prev.professionalSummary,
      skills: payload.skills || prev.skills,
      experiences: payload.experiences || prev.experiences,
      matrimonial: {
        ...prev.matrimonial,
        partnerExpectations: payload.partnerExpectations || prev.matrimonial.partnerExpectations,
      },
    }));
    showToast(data.language === 'bn' ? 'AI পরামর্শ সিভিতে যুক্ত হয়েছে' : 'AI suggestions applied!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-bengali">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="no-print fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        data={data}
        onChange={setData}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenAutoTranslate={() => setIsAutoTranslateOpen(true)}
        onOpenAutoFill={() => setIsAutoFillOpen(true)}
        onOpenGmailDrafts={() => setIsGmailDraftsOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenPhotoEditor={() => setIsPhotoModalOpen(true)}
        onExportPdf={handleExportPdf}
        onExportImage={handleExportImage}
        onPrint={handlePrint}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        isExporting={isExporting}
      />

      {/* Mobile Mode Switcher (Editor vs Preview) */}
      <div className="no-print lg:hidden bg-slate-900 border-b border-slate-800 p-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMobileView('editor')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mobileView === 'editor' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{data.language === 'bn' ? 'তথ্য এডিটর' : 'Editor Form'}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mobileView === 'preview' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{data.language === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Preview'}</span>
        </button>
      </div>

      {/* Main Split Screen Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1700px] w-full mx-auto">
        {/* ========================================= */}
        {/* LEFT PANE: Form Editor                     */}
        {/* ========================================= */}
        <aside
          className={`no-print w-full lg:w-[490px] xl:w-[540px] flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col h-auto lg:h-[calc(100vh-105px)] overflow-hidden ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Tabs Navigation */}
          <div className="flex items-center overflow-x-auto bg-slate-950/70 border-b border-slate-800 p-2 gap-1.5 scrollbar-thin">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.tabPersonal}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.tabSummary}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.tabExperience}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.tabEducation}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.tabSkills}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matrimonial')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'matrimonial'
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{data.mode === 'matrimonial' ? t.tabMatrimonial : t.tabFamily}</span>
            </button>

            {/* Certificates & Appendices Tab (Page 2) */}
            <button
              type="button"
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'certificates'
                  ? 'bg-teal-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>{data.language === 'bn' ? 'সনদ ও পেজ ২' : 'Certificates / Page 2'}</span>
            </button>

            {/* Section Position Reordering Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('reorder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'reorder'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{data.language === 'bn' ? 'পজিশন চেঞ্জ' : 'Reorder'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.tabCustom}</span>
            </button>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {activeTab === 'personal' && (
              <PersonalSection
                personal={data.personal}
                language={data.language}
                onChange={(updates) =>
                  setData((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, ...updates },
                  }))
                }
                onOpenPhotoEditor={() => setIsPhotoModalOpen(true)}
                accentColor={activeTheme.badgeBg}
              />
            )}

            {activeTab === 'summary' && (
              <SummarySection
                summary={data.professionalSummary}
                language={data.language}
                onChange={(text) =>
                  setData((prev) => ({ ...prev, professionalSummary: text }))
                }
                onOpenAiModal={() => setIsAiModalOpen(true)}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection
                experiences={data.experiences}
                organizationalExperience={data.organizationalExperience}
                language={data.language}
                onUpdateExperiences={(exps: WorkExperience[]) =>
                  setData((prev) => ({ ...prev, experiences: exps }))
                }
                onUpdateOrganizational={(orgExps: WorkExperience[]) =>
                  setData((prev) => ({ ...prev, organizationalExperience: orgExps }))
                }
              />
            )}

            {activeTab === 'education' && (
              <EducationSection
                education={data.education}
                language={data.language}
                onUpdateEducation={(edu: any[]) =>
                  setData((prev) => ({ ...prev, education: edu }))
                }
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                skills={data.skills}
                language={data.language}
                onUpdateSkills={(s: Skill[]) => setData((prev) => ({ ...prev, skills: s }))}
                accentColor={activeTheme.badgeBg}
              />
            )}

            {activeTab === 'matrimonial' && (
              <MatrimonialSection
                family={data.family}
                matrimonial={data.matrimonial}
                language={data.language}
                onUpdateFamily={(updates) =>
                  setData((prev) => ({
                    ...prev,
                    family: { ...prev.family, ...updates },
                  }))
                }
                onUpdateMatrimonial={(updates) =>
                  setData((prev) => ({
                    ...prev,
                    matrimonial: { ...prev.matrimonial, ...updates },
                  }))
                }
              />
            )}

            {/* Certificates & Appendices Tab (Page 2) */}
            {activeTab === 'certificates' && (
              <CertificatesSection
                documents={data.attachedDocuments || []}
                language={data.language}
                onChange={(docs) =>
                  setData((prev) => ({ ...prev, attachedDocuments: docs }))
                }
              />
            )}

            {/* Reorder Sections View */}
            {activeTab === 'reorder' && (
              <div className="space-y-4">
                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-indigo-400" />
                    <span>{data.language === 'bn' ? 'সিভি সেকশনের পজিশন ও ক্রম পরিবর্তন' : 'Reorder CV Section Positions'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {data.language === 'bn'
                      ? 'যেকোনো সেকশন উপরে বা নিচে সরাতে তীর চিহ্নে ক্লিক করুন। প্রিভিউতে সাথে সাথে পরিবর্তন দেখতে পাবেন।'
                      : 'Click the Up and Down arrows to reorder sections. Changes will reflect instantly on the live preview.'}
                  </p>
                </div>

                <div className="space-y-2">
                  {currentSections.map((secKey, idx) => (
                    <div
                      key={secKey}
                      className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="font-semibold text-slate-200 text-xs">
                            {data.language === 'bn'
                              ? sectionLabels[secKey]?.bn || secKey
                              : sectionLabels[secKey]?.en || secKey}
                          </h5>
                          <span className="text-[10px] text-slate-500">
                            ID: {secKey}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSection(idx, 'up')}
                          title="উপরে নিন"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                        >
                          <ArrowUp className="w-4 h-4 text-emerald-400" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentSections.length - 1}
                          onClick={() => handleMoveSection(idx, 'down')}
                          title="নিচে নামান"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                        >
                          <ArrowDown className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'custom' && (
              <CustomSectionEditor
                customSections={data.customSections}
                language={data.language}
                onUpdateSections={(sections) =>
                  setData((prev) => ({ ...prev, customSections: sections }))
                }
              />
            )}
          </div>
        </aside>

        {/* ========================================= */}
        {/* RIGHT PANE: Live A4 Document Preview       */}
        {/* ========================================= */}
        <main
          className={`flex-1 bg-slate-900/60 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start relative ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Floating Zoom & Preset Controls */}
          <div className="no-print sticky top-3 z-30 mb-5 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-2xl">
            <span className="text-xs font-semibold text-slate-300">
              {t.previewZoom}:
            </span>
            <button
              type="button"
              onClick={() => setPreviewZoom((z) => Math.max(0.45, z - 0.1))}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-amber-400 w-11 text-center">
              {Math.round(previewZoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setPreviewZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="h-3 w-px bg-slate-700 mx-1" />
            <button
              type="button"
              onClick={() => setPreviewZoom(0.85)}
              className="text-[11px] text-slate-300 hover:text-amber-300 font-medium px-1.5 py-0.5 rounded transition cursor-pointer"
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setPreviewZoom(1.0)}
              className="text-[11px] text-slate-300 hover:text-amber-300 font-medium px-1.5 py-0.5 rounded transition cursor-pointer"
            >
              100%
            </button>
          </div>

          {/* Inline Edit Banner Notification */}
          {data.inlineEditing && (
            <div className="no-print mb-3 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
              <Edit3 className="w-3.5 h-3.5" />
              <span>
                {data.language === 'bn'
                  ? 'সরাসরি এডিট চালু আছে: পাতার যেকোনো লেখার উপর ক্লিক করে টাইপ করুন!'
                  : 'Inline edit mode active: Click on any text on the page to type directly!'}
              </span>
            </div>
          )}

          {/* Scaled Preview Canvas Wrapper */}
          <div
            className="transition-transform duration-150 origin-top shadow-2xl rounded-sm"
            style={{
              transform: `scale(${previewZoom})`,
              marginBottom: `${(1123 * (previewZoom - 1)) / 1.1}px`,
            }}
          >
            <CvDocument data={data} onUpdateField={handleInlineUpdateField} />
          </div>
        </main>
      </div>

      {/* Interactive Photo Editor Modal with Drag, Zoom In/Out, and Crop */}
      <PhotoEditorModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        personal={data.personal}
        onSave={(updates) =>
          setData((prev) => ({
            ...prev,
            personal: { ...prev.personal, ...updates },
          }))
        }
        accentColor={activeTheme.badgeBg}
      />

      {/* Gemini AI Suggestions Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        mode={data.mode}
        language={data.language}
        currentTitle={data.personal.tagline || ''}
        onApplySuggestions={handleApplyAiSuggestions}
      />

      {/* Gemini AI Auto-Translate Modal */}
      <AutoTranslateModal
        isOpen={isAutoTranslateOpen}
        onClose={() => setIsAutoTranslateOpen(false)}
        currentData={data}
        onApplyTranslatedData={handleApplyTranslatedData}
      />

      {/* Mobile Bio Text Auto-Fill Modal */}
      <SmartAutoFillModal
        isOpen={isAutoFillOpen}
        onClose={() => setIsAutoFillOpen(false)}
        language={data.language}
        onApplyParsedData={handleApplyAutoFillData}
      />

      {/* Gmail Cloud Drafts & Local Backup Modal */}
      <GmailDraftsModal
        isOpen={isGmailDraftsOpen}
        onClose={() => setIsGmailDraftsOpen(false)}
        currentData={data}
        onLoadDraft={handleLoadDraft}
      />

      {/* Direct CCP Feedback Modal */}
      <CcpFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        language={data.language}
      />
    </div>
  );
}
