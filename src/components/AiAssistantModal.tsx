import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle,
  Loader2,
  Briefcase,
  Layers,
  Heart,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Mode, Language, Skill, WorkExperience } from '../types/cv.js';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: Mode;
  language: Language;
  currentTitle: string;
  onApplySuggestions: (payload: {
    summary?: string;
    skills?: Skill[];
    experiences?: WorkExperience[];
    partnerExpectations?: string;
  }) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  mode,
  language,
  currentTitle,
  onApplySuggestions,
}) => {
  if (!isOpen) return null;

  const [jobTitle, setJobTitle] = useState(currentTitle || '');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [aiData, setAiData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'skills' | 'experiences' | 'expectations'>(
    'summary'
  );

  const isBengali = language === 'bn';

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      setErrorMsg(isBengali ? 'দয়া করে আপনার পদবি বা পেশা লিখুন।' : 'Please enter a job title or profession.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/suggest-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          mode,
          language,
          fieldOfStudy: fieldOfStudy.trim(),
        }),
      });

      const resJson = await response.json();
      if (!resJson.success) {
        throw new Error(resJson.error || 'Failed to generate suggestions');
      }

      setAiData(resJson.data);
      setActiveTab('summary');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message ||
          (isBengali
            ? 'পরামর্শ তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
            : 'Could not generate suggestions. Please retry.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAll = () => {
    if (!aiData) return;

    const formattedSkills: Skill[] = (aiData.skills || []).map((s: any, idx: number) => ({
      id: `ai-skill-${Date.now()}-${idx}`,
      name: s.name,
      level: Number(s.level) || 80,
      category: s.category === 'soft' ? 'soft' : 'technical',
    }));

    const formattedExp: WorkExperience[] = (aiData.experiences || []).map((e: any, idx: number) => ({
      id: `ai-exp-${Date.now()}-${idx}`,
      role: e.role,
      organization: e.organization,
      period: e.period,
      description: e.description,
      isVenture: idx === 0,
    }));

    onApplySuggestions({
      summary: aiData.summary,
      skills: formattedSkills.length > 0 ? formattedSkills : undefined,
      experiences: formattedExp.length > 0 ? formattedExp : undefined,
      partnerExpectations: aiData.partnerExpectations || undefined,
    });

    onClose();
  };

  const handleApplySummaryOnly = () => {
    if (aiData?.summary) {
      onApplySuggestions({ summary: aiData.summary });
    }
  };

  const handleApplySkillsOnly = () => {
    if (aiData?.skills) {
      const formattedSkills: Skill[] = aiData.skills.map((s: any, idx: number) => ({
        id: `ai-skill-${Date.now()}-${idx}`,
        name: s.name,
        level: Number(s.level) || 80,
        category: s.category === 'soft' ? 'soft' : 'technical',
      }));
      onApplySuggestions({ skills: formattedSkills });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-teal-500 text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{isBengali ? 'Gemini AI সিভি পরামর্শক' : 'Gemini AI CV Assistant'}</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Smart Auto-Fill
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBengali
                  ? 'আপনার পদবি লিখুন; AI স্বয়ংক্রিয়ভাবে সারসংক্ষেপ, দক্ষতা ও অভিজ্ঞতা প্রস্তুত করবে।'
                  : 'Enter your role to generate executive summary, skills with metrics, and experience.'}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Input Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBengali ? 'পদবি / পেশা (Job Title / Role) *' : 'Job Title / Profession *'}
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder={
                  isBengali
                    ? 'যেমন: গ্রাফিক ডিজাইনার, ফুল-স্ট্যাক ডেভেলপার'
                    : 'e.g. Graphic Designer, Software Engineer'
                }
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBengali ? 'শিক্ষাগত ক্ষেত্র / বিশেষত্ব (ঐচ্ছিক)' : 'Field of Study / Domain (Optional)'}
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder={
                  isBengali
                    ? 'যেমন: ফাইন আর্টস, সিএসই, বিজনেস'
                    : 'e.g. Fine Arts, CSE, BBA'
                }
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">
                {mode === 'matrimonial'
                  ? isBengali
                    ? 'মোড: বৈবাহিক বায়োডাটা (পারিবারিক ও জীবনসঙ্গী প্রত্যাশা অন্তর্ভুক্ত হবে)'
                    : 'Mode: Matrimonial Biodata (Includes cultural partner expectations)'
                  : isBengali
                  ? 'মোড: জব সিভি (কর্পোরেট সারসংক্ষেপ ও দক্ষতা অন্তর্ভুক্ত হবে)'
                  : 'Mode: Professional Job CV (Includes corporate profile & skills)'}
              </span>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isBengali ? 'তৈরি করা হচ্ছে...' : 'Generating...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{isBengali ? 'পরামর্শ তৈরি করুন' : 'Generate Suggestions'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800 rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* AI Output Preview Tabs */}
          {aiData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                      activeTab === 'summary'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'সারসংক্ষেপ' : 'Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('skills')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                      activeTab === 'skills'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'দক্ষতা সমূহ' : 'Skills'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('experiences')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                      activeTab === 'experiences'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'অভিজ্ঞতা' : 'Experience'}</span>
                  </button>

                  {mode === 'matrimonial' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('expectations')}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                        activeTab === 'expectations'
                          ? 'border-amber-400 text-amber-300'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{isBengali ? 'জীবনসঙ্গীর চাহিদা' : 'Partner Expectations'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleApplyAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow transition cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isBengali ? 'সবগুলো সিভিতে প্রয়োগ করুন' : 'Apply All to CV'}</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
                {activeTab === 'summary' && (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-slate-200 text-sm italic font-bengali">
                      "{aiData.summary}"
                    </p>
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleApplySummaryOnly}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium rounded-lg border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>{isBengali ? 'শুধু সারসংক্ষেপ প্রয়োগ করুন' : 'Apply Summary Only'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(aiData.skills || []).map((skill: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex flex-col gap-1.5"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-200">{skill.name}</span>
                            <span className="text-amber-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-amber-400 to-teal-400 h-full rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleApplySkillsOnly}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium rounded-lg border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>{isBengali ? 'দক্ষতাগুলো প্রয়োগ করুন' : 'Apply Skills Only'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'experiences' && (
                  <div className="space-y-3">
                    {(aiData.experiences || []).map((exp: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-100">{exp.role}</h4>
                          <span className="text-[11px] text-amber-400">{exp.period}</span>
                        </div>
                        <p className="text-xs text-teal-400 font-medium">{exp.organization}</p>
                        <p className="text-xs text-slate-300 pt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'expectations' && (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-slate-200 text-sm font-bengali">
                      {aiData.partnerExpectations || (isBengali ? 'তথ্য প্রযোজ্য নয়।' : 'N/A')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            {isBengali ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
