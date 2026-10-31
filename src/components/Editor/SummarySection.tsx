import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface SummarySectionProps {
  summary: string;
  language: Language;
  onChange: (text: string) => void;
  onOpenAiModal: () => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  language,
  onChange,
  onOpenAiModal,
}) => {
  const t = UI_STRINGS[language];
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {t.secProfile} (Executive Summary / About Me)
          </h4>
        </div>
        <button
          type="button"
          onClick={onOpenAiModal}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg hover:bg-amber-500/30 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI পরামর্শ নিন</span>
        </button>
      </div>

      <div>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a concise 2-3 sentence professional summary highlight key achievements..."
          className="w-full p-3 text-xs leading-relaxed bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none font-bengali"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
          <span>পরামর্শ: ২ থেকে ৩ বাক্যে আপনার প্রধান অভিজ্ঞতা ও লক্ষ্য তুলে ধরুন।</span>
          <span>শব্দ সংখ্যা: {wordCount}</span>
        </div>
      </div>
    </div>
  );
};
