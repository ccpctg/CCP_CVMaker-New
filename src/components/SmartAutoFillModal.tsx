import React, { useState } from 'react';
import { Smartphone, X, Sparkles, Loader2, CheckCircle, FileText, Upload } from 'lucide-react';
import { CVData, Language } from '../types/cv.js';

interface SmartAutoFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApplyParsedData: (extractedData: Partial<CVData>) => void;
}

export const SmartAutoFillModal: React.FC<SmartAutoFillModalProps> = ({
  isOpen,
  onClose,
  language,
  onApplyParsedData,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRawText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExtract = async () => {
    if (!rawText.trim()) {
      setErrorMsg(
        isBn
          ? 'অনুগ্রহ করে মোবাইল থেকে তথ্য পেস্ট করুন বা ফাইল আপলোড করুন।'
          : 'Please paste your text or upload a file first.'
      );
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/parse-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: rawText.trim(),
          preferredLanguage: language,
        }),
      });

      const resJson = await response.json();
      if (!resJson.success) {
        throw new Error(resJson.error || 'Failed to parse text');
      }

      onApplyParsedData(resJson.data);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        isBn
          ? 'তথ্য প্রক্রিয়াকরণে সমস্যা হয়েছে। লেখাটি সংক্ষেপ করে আবার চেষ্টা করুন।'
          : 'Failed to extract data. Please check text and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleMobilePaste = () => {
    setRawText(`নাম: মো. রাকিবুল হাসান
পেশা: সফটওয়্যার ইঞ্জিনিয়ার ও ইউআই ডিজাইনার
মোবাইল: 01712-345678
ইমেইল: rakib.dev@gmail.com
বর্তমান ঠিকানা: মিরপুর-১০, ঢাকা
স্থায়ী ঠিকানা: সদর রোড, নোয়াখালী
জন্মতারিখ: ১২ মে ১৯৯৮ (বয়স: ২৮ বছর)
রক্তের গ্রুপ: B+
উচ্চতা: ৫ ফুট ৭ ইঞ্চি
বৈবাহিক অবস্থা: অবিবাহিত
পিতা: মো. নুরুল ইসলাম (ব্যবসায়ী)
মাতা: রোকসানা বেগম (গৃহিণী)
ভাইবোন: ২ ভাই ও ১ বোন (পরিবারে জ্যেষ্ঠ)
শিক্ষা: বিএসসি ইন সিএসই, ঢাকা ইন্টারন্যাশনাল ইউনিভার্সিটি (২০২১)
অভিজ্ঞতা: সিনিয়র ফ্রন্টএন্ড ডেভেলপার, ডটটেক লিমিটেড (২০২২ - বর্তমান)
দক্ষতা: রিয়্যাক্ট, ইউআই ডিজাইন, জাভাস্ক্রিপ্ট, প্রজেক্ট ম্যানেজমেন্ট`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-teal-500 text-slate-950 font-bold shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>
                  {isBn ? 'মোবাইল বা মেসেজ থেকে অটো ফিলআপ (AI Auto-Fill)' : 'Auto-Fill from Mobile / Text'}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Zero Effort
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'হোয়াটসঅ্যাপ বায়োডাটা, এসএমএস বা পূর্বের সিভির লেখা এখানে পেস্ট করুন; AI সাথে সাথে সব বক্সে বসিয়ে দেবে।'
                  : 'Paste your WhatsApp message, SMS, or resume text; Gemini will auto-fill every CV field.'}
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

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs">
          <div className="flex items-center justify-between">
            <label className="text-slate-300 font-semibold block">
              {isBn ? 'মোবাইলের লেখা বা মেসেজ পেস্ট করুন:' : 'Paste Raw Mobile Bio / Message:'}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSampleMobilePaste}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
              >
                {isBn ? 'নমুনা মোবাইল মেসেজ' : 'Sample Bio'}
              </button>
              <label className="flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{isBn ? 'ফাইল লোড' : 'Upload File'}</span>
                <input
                  type="file"
                  accept=".txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <textarea
            rows={8}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={
              isBn
                ? 'উদাহরণ: নাম: রহিম, ফোন: 01700..., স্থায়ী ঠিকানা: ..., পিতা: ..., রক্ত: O+, শিক্ষা: ...'
                : 'Example: Name: John Doe, Phone: 017..., Address: ..., Education: BSc...'
            }
            className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-bengali text-xs leading-relaxed"
          />

          {errorMsg && (
            <div className="p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800 rounded-xl">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleExtract}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isBn ? 'AI প্রসেস করছে...' : 'Processing...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{isBn ? 'অটো তথ্য পূরণ করুন' : 'Auto-Fill Into CV'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
