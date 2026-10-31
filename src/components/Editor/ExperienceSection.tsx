import React from 'react';
import { Plus, Trash2, Briefcase, Building, Calendar, Layers } from 'lucide-react';
import { WorkExperience, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  organizationalExperience: WorkExperience[];
  language: Language;
  onUpdateExperiences: (items: WorkExperience[]) => void;
  onUpdateOrganizational: (items: WorkExperience[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  organizationalExperience,
  language,
  onUpdateExperiences,
  onUpdateOrganizational,
}) => {
  const t = UI_STRINGS[language];

  // Work / Venture Handlers
  const handleAddExp = () => {
    const newItem: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      period: '2024 - Present',
      location: '',
      description: '',
      isVenture: false,
    };
    onUpdateExperiences([...experiences, newItem]);
  };

  const handleUpdateExp = (id: string, updates: Partial<WorkExperience>) => {
    onUpdateExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const handleDeleteExp = (id: string) => {
    onUpdateExperiences(experiences.filter((exp) => exp.id !== id));
  };

  // Organizational Handlers
  const handleAddOrg = () => {
    const newItem: WorkExperience = {
      id: `org-${Date.now()}`,
      role: '',
      organization: '',
      period: '2024 - Present',
      description: '',
    };
    onUpdateOrganizational([...organizationalExperience, newItem]);
  };

  const handleUpdateOrg = (id: string, updates: Partial<WorkExperience>) => {
    onUpdateOrganizational(
      organizationalExperience.map((org) => (org.id === id ? { ...org, ...updates } : org))
    );
  };

  const handleDeleteOrg = (id: string) => {
    onUpdateOrganizational(organizationalExperience.filter((org) => org.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 1. Business Ventures & Professional Roles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.secVentures} (Business Ventures & Roles)
            </h4>
          </div>
          <button
            type="button"
            onClick={handleAddExp}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addExperience}</span>
          </button>
        </div>

        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div
              key={exp.id || index}
              className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <label className="flex items-center gap-2 text-xs text-amber-300 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!exp.isVenture}
                      onChange={(e) => handleUpdateExp(exp.id, { isVenture: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>বিজনেস ভেঞ্চার / উদ্যোগ হিসেবে প্রদর্শন করুন (Mark as Venture)</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteExp(exp.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    পদবি (Role / Position) *
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateExp(exp.id, { role: e.target.value })}
                    placeholder="e.g. Project Director / Owner"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    প্রতিষ্ঠান / উদ্যোগ (Organization / Venture) *
                  </label>
                  <input
                    type="text"
                    value={exp.organization}
                    onChange={(e) => handleUpdateExp(exp.id, { organization: e.target.value })}
                    placeholder="e.g. Creative CONCEPT Point"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    সময়কাল (Period)
                  </label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleUpdateExp(exp.id, { period: e.target.value })}
                    placeholder="2023 - Present"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  বিবরণ বা অর্জিত সাফল্য (Description)
                </label>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => handleUpdateExp(exp.id, { description: e.target.value })}
                  placeholder="Creative Design, Printing, Program Branding & Event Management Services."
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Organizational Experience */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.secOrgExp} (Organizational Experience)
            </h4>
          </div>
          <button
            type="button"
            onClick={handleAddOrg}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ নতুন সাংগঠনিক অভিজ্ঞতা</span>
          </button>
        </div>

        <div className="space-y-3">
          {organizationalExperience.map((org, index) => (
            <div
              key={org.id || index}
              className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-teal-300">
                  সংগঠন #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteOrg(org.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    সাংগঠনিক পদবি *
                  </label>
                  <input
                    type="text"
                    value={org.role}
                    onChange={(e) => handleUpdateOrg(org.id, { role: e.target.value })}
                    placeholder="e.g. Founding Director / Member"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    সংগঠনের নাম *
                  </label>
                  <input
                    type="text"
                    value={org.organization}
                    onChange={(e) => handleUpdateOrg(org.id, { organization: e.target.value })}
                    placeholder="e.g. Bangladesh Youth Creative Forum"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    সময়কাল (Period)
                  </label>
                  <input
                    type="text"
                    value={org.period}
                    onChange={(e) => handleUpdateOrg(org.id, { period: e.target.value })}
                    placeholder="2026 - Present"
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={org.description}
                  onChange={(e) => handleUpdateOrg(org.id, { description: e.target.value })}
                  placeholder="Directing community welfare and youth leadership initiatives."
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
