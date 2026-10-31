import React, { useState } from 'react';
import { Languages, X, Loader2, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CVData, Language } from '../types/cv.js';

interface AutoTranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CVData;
  onApplyTranslatedData: (translated: Partial<CVData>, targetLang: Language) => void;
}

export const AutoTranslateModal: React.FC<AutoTranslateModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyTranslatedData,
}) => {
  if (!isOpen) return null;

  const currentLang = currentData.language;
  const defaultTarget: Language = currentLang === 'bn' ? 'en' : 'bn';
  const [targetLang, setTargetLang] = useState<Language>(defaultTarget);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTranslate = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/translate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: targetLang,
          data: currentData,
        }),
      });

      const resJson = await response.json();
      if (!resJson.success) {
        throw new Error(resJson.error || 'Failed to translate profile data');
      }

      onApplyTranslatedData(resJson.data, targetLang);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        currentLang === 'bn'
          ? 'অনুবাদে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Failed to auto-translate. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-teal-500 to-amber-500 text-slate-950 font-bold shadow-md">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>
                  {currentLang === 'bn'
                    ? 'AI অটো ডেটা অনুবাদ (Auto-Translate)'
                    : 'AI Profile Auto-Translate'}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Gemini 3.8
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {currentLang === 'bn'
                  ? 'সিভির সকল তথ্য মুহূর্তেই ইংরেজি বা বাংলায় রূপান্তর করুন।'
                  : 'Instantly translate all CV fields between Bengali and English.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 font-medium block">
              {currentLang === 'bn' ? 'বর্তমান ভাষা:' : 'Current Language:'}
            </span>
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                {currentLang === 'bn' ? 'বাংলা (Bengali)' : 'English'}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setTargetLang('bn')}
                  className={`px-3 py-1 rounded font-bold cursor-pointer transition ${
                    targetLang === 'bn'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা (BN)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLang('en')}
                  className={`px-3 py-1 rounded font-bold cursor-pointer transition ${
                    targetLang === 'en'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200/90 leading-relaxed text-[11px]">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
            {currentLang === 'bn'
              ? 'নাম, পদবি, কর্মসংস্থান, শিক্ষাগত যোগ্যতা, পারিবারিক ইতিহাস ও জীবনসঙ্গীর চাহিদা সহ প্রতিটি ফিল্ড স্বয়ংক্রিয়ভাবে অনুবাদ হবে।'
              : 'Translates names, job history, educational institutions, family background, and expectations accurately without losing formatting.'}
          </div>

          {errorMsg && (
            <div className="p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            {currentLang === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleTranslate}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{currentLang === 'bn' ? 'অনুবাদ হচ্ছে...' : 'Translating...'}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {currentLang === 'bn'
                    ? `${targetLang === 'en' ? 'ইংরেজিতে' : 'বাংলায়'} অনুবাদ করুন`
                    : `Translate to ${targetLang === 'bn' ? 'Bengali' : 'English'}`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
