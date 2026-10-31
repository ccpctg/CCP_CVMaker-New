import React, { useState } from 'react';
import {
  FileDown,
  Printer,
  Sparkles,
  RotateCcw,
  Languages,
  Palette,
  LayoutGrid,
  Briefcase,
  HeartHandshake,
  BookOpen,
  Image as ImageIcon,
  Edit3,
  Type,
  ChevronDown,
  Smartphone,
  Cloud,
  MessageSquareHeart,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { CVData, FontChoice, FontSizeScale, Language, Mode, TemplateLayout, ThemeId } from '../types/cv.js';
import { UI_STRINGS } from '../data/translations.js';
import { THEMES } from '../utils/themeData.js';
import { CcpLogo } from './CcpLogo.js';

interface HeaderProps {
  data: CVData;
  onChange: (updater: (prev: CVData) => CVData) => void;
  onOpenAiModal: () => void;
  onOpenAutoTranslate: () => void;
  onOpenAutoFill: () => void;
  onOpenGmailDrafts: () => void;
  onOpenFeedback: () => void;
  onOpenPhotoEditor: () => void;
  onExportPdf: () => void;
  onExportImage: (format: 'png' | 'jpeg') => void;
  onPrint: () => void;
  onLoadSample: (lang: Language) => void;
  onReset: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  onChange,
  onOpenAiModal,
  onOpenAutoTranslate,
  onOpenAutoFill,
  onOpenGmailDrafts,
  onOpenFeedback,
  onExportPdf,
  onExportImage,
  onPrint,
  onLoadSample,
  onReset,
  isExporting,
}) => {
  const t = UI_STRINGS[data.language];
  const activeTheme = THEMES[data.themeId] || THEMES.executive;
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleToggleMode = (newMode: Mode) => {
    onChange((prev) => ({
      ...prev,
      mode: newMode,
      layout: newMode === 'matrimonial' && prev.layout === 'modern_corporate' ? 'matrimonial_heritage' : prev.layout,
      showBismillah: newMode === 'matrimonial',
    }));
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = data.language === 'bn' ? 'en' : 'bn';
    onChange((prev) => ({
      ...prev,
      language: nextLang,
      useBengaliNumerals: nextLang === 'bn',
    }));
  };

  const handleToggleNumerals = () => {
    onChange((prev) => ({
      ...prev,
      useBengaliNumerals: !prev.useBengaliNumerals,
    }));
  };

  const handleToggleInlineEdit = () => {
    onChange((prev) => ({
      ...prev,
      inlineEditing: !prev.inlineEditing,
    }));
  };

  const handleSelectTheme = (themeId: ThemeId) => {
    onChange((prev) => ({ ...prev, themeId }));
  };

  const handleSelectLayout = (layout: TemplateLayout) => {
    onChange((prev) => ({ ...prev, layout }));
  };

  const handleSelectFont = (fontChoice: FontChoice) => {
    onChange((prev) => ({ ...prev, fontChoice }));
  };

  const handleSelectFontSize = (fontSizeScale: FontSizeScale) => {
    onChange((prev) => ({ ...prev, fontSizeScale }));
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & Main Action Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-2.5 gap-3">
          {/* Logo & Agency Identity */}
          <div className="flex items-center gap-3">
            <CcpLogo size="sm" variant="monogram" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 font-sans-modern">
                  <span>{t.appTitle}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    PRO
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Creative Design • Branding • Web Solutions • Print & Digital Media
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Mobile Auto-Fill Button */}
            <button
              onClick={onOpenAutoFill}
              type="button"
              title="মোবাইল বা বার্তা থেকে অটো তথ্য গ্রহণ (Mobile Bio Auto-Fill)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-500/40 text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-300" />
              <span>মোবাইল অটো-ফিল</span>
            </button>

            {/* Gmail Cloud Drafts Button */}
            <button
              onClick={onOpenGmailDrafts}
              type="button"
              title="গুগল জিমেইল ড্রাফট সেভ ও ব্যাকআপ (Gmail Cloud Drafts)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/70 hover:bg-blue-800 text-blue-200 border border-blue-500/40 text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-blue-300" />
              <span>গুগল ড্রাফট</span>
            </button>

            {/* Auto-Translate Button */}
            <button
              onClick={onOpenAutoTranslate}
              type="button"
              title="AI স্বয়ংক্রিয় ডেটা অনুবাদ (বাংলা ↔ English)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-900/80 hover:bg-teal-800 text-teal-200 border border-teal-500/40 text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-teal-300" />
              <span>{t.autoTranslate}</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiModal}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 via-emerald-600 to-amber-500 hover:from-teal-400 hover:to-amber-400 text-white text-xs font-semibold shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.aiSuggest}</span>
            </button>

            {/* Direct CCP Feedback Button */}
            <button
              onClick={onOpenFeedback}
              type="button"
              title="CCP ক্রিয়েটিভ কনসেপ্ট পয়েন্টকে মতামত বা ফিডব্যাক দিন"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-500/40 text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-rose-300" />
              <span>CCP ফিডব্যাক</span>
            </button>

            {/* Inline Edit Mode Toggle Button */}
            <button
              type="button"
              onClick={handleToggleInlineEdit}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                data.inlineEditing
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/40 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{data.inlineEditing ? 'সরাসরি এডিট চালু' : t.inlineEdit}</span>
            </button>

            {/* Export Dropdown (PDF & High-Res Image PNG / JPG) */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={isExporting}
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{isExporting ? 'প্রসেসিং...' : 'ডাউনলোড ও সেভ'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showExportMenu && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn text-xs"
                  onClick={() => setShowExportMenu(false)}
                >
                  <button
                    type="button"
                    onClick={onExportPdf}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <FileDown className="w-4 h-4 text-blue-400" />
                    <span>{t.downloadPdf} (A4 Print)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onExportImage('png')}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>ছবি হিসেবে সেভ (PNG)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onExportImage('jpeg')}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>ছবি হিসেবে সেভ (JPG)</span>
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    type="button"
                    onClick={onPrint}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Printer className="w-4 h-4 text-slate-400" />
                    <span>{t.print} (Direct Print)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sample & Reset */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => onLoadSample(data.language)}
                title={t.loadSample}
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.loadSample}</span>
              </button>
              <button
                onClick={onReset}
                title={t.resetData}
                type="button"
                className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar Controls (Mode, Language, Specific Fonts, Font Size, Theme, Layouts) */}
        <div className="flex flex-wrap items-center justify-between py-2 border-t border-slate-800/80 gap-2 text-xs">
          {/* Dual Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => handleToggleMode('job')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                data.mode === 'job'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.jobMode}</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode('matrimonial')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                data.mode === 'matrimonial'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{t.matrimonialMode}</span>
            </button>
          </div>

          {/* Center-Right Toggles */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={handleToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold cursor-pointer transition"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{data.language === 'bn' ? 'English (EN)' : 'বাংলা (BN)'}</span>
            </button>

            {/* Numerals Toggle */}
            <button
              type="button"
              onClick={handleToggleNumerals}
              title="Toggle Bengali / English Digits (১ vs 1)"
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border font-bold cursor-pointer transition ${
                data.useBengaliNumerals
                  ? 'bg-teal-900/60 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <span>{data.useBengaliNumerals ? 'সংখ্যা: ১২৩' : 'Digits: 123'}</span>
            </button>

            {/* Specific Font Name Picker */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={data.fontChoice || 'anek_bangla'}
                onChange={(e) => handleSelectFont(e.target.value as FontChoice)}
                aria-label="Specific Font Family"
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="anek_bangla" className="bg-slate-900 text-white">
                  Anek Bangla (অনেকা বাংলা)
                </option>
                <option value="hind_siliguri" className="bg-slate-900 text-white">
                  Hind Siliguri (হিন্দ শিলিগুড়ি)
                </option>
                <option value="noto_sans" className="bg-slate-900 text-white">
                  Noto Sans Bengali (নোটো সান্স)
                </option>
                <option value="galada" className="bg-slate-900 text-white">
                  Galada (গালাদা স্টাইলিশ)
                </option>
                <option value="tiro_bangla" className="bg-slate-900 text-white">
                  Tiro Bangla (তিরো ক্লাসিক)
                </option>
                <option value="plus_jakarta" className="bg-slate-900 text-white">
                  Plus Jakarta Sans (প্লাস জাকার্তা)
                </option>
                <option value="inter" className="bg-slate-900 text-white">
                  Inter (ইন্টার)
                </option>
                <option value="outfit" className="bg-slate-900 text-white">
                  Outfit (আউটফিট)
                </option>
              </select>
            </div>

            {/* Font Size Scaling Buttons */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 px-1 font-semibold">ফন্ট সাইজ:</span>
              {(['sm', 'md', 'lg', 'xl'] as FontSizeScale[]).map((scale) => {
                const labels: Record<FontSizeScale, string> = {
                  sm: 'A-',
                  md: 'A',
                  lg: 'A+',
                  xl: 'A++',
                };
                const isSelected = (data.fontSizeScale || 'md') === scale;
                return (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => handleSelectFontSize(scale)}
                    title={`ফন্ট সাইজ: ${scale.toUpperCase()}`}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {labels[scale]}
                  </button>
                );
              })}
            </div>

            {/* 5 Professional Layout Styles */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={data.layout}
                onChange={(e) => handleSelectLayout(e.target.value as TemplateLayout)}
                aria-label="Layout Style"
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="signature_curve" className="bg-slate-900 text-white">
                  {t.layoutSignature}
                </option>
                <option value="modern_corporate" className="bg-slate-900 text-white">
                  {t.layoutCorporate}
                </option>
                <option value="matrimonial_heritage" className="bg-slate-900 text-white">
                  {t.layoutHeritage}
                </option>
                <option value="minimal_creative" className="bg-slate-900 text-white">
                  {t.layoutMinimal}
                </option>
                <option value="metro_compact" className="bg-slate-900 text-white">
                  {t.layoutMetro}
                </option>
              </select>
            </div>

            {/* Theme Palettes Swatches */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <div className="flex items-center gap-1">
                {(Object.keys(THEMES) as ThemeId[]).map((tid) => {
                  const th = THEMES[tid];
                  const isSelected = data.themeId === tid;
                  return (
                    <button
                      key={tid}
                      type="button"
                      title={data.language === 'bn' ? th.nameBn : th.nameEn}
                      onClick={() => handleSelectTheme(tid)}
                      className={`w-5 h-5 rounded-full transition-all cursor-pointer relative ${
                        isSelected ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: th.primary }}
                    >
                      <span
                        className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
                        style={{ backgroundColor: th.accent }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
