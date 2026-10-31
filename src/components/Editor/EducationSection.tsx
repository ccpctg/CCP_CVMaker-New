import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Education, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface EducationSectionProps {
  education: Education[];
  language: Language;
  onUpdateEducation: (items: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  language,
  onUpdateEducation,
}) => {
  const t = UI_STRINGS[language];

  const handleAdd = () => {
    const newItem: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      yearOrSession: '2022-2023',
      result: '',
    };
    onUpdateEducation([...education, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<Education>) => {
    onUpdateEducation(
      education.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleDelete = (id: string) => {
    onUpdateEducation(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {t.secEducation} (Educational Qualifications)
          </h4>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addEducation}</span>
        </button>
      </div>

      <div className="space-y-3">
        {education.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">
                ডিগ্রি / সার্টিফিকেট #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  ডিগ্রি / পরীক্ষার নাম (Exam / Degree) *
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdate(item.id, { degree: e.target.value })}
                  placeholder="e.g. B.A. (Degree Pass Course) / Alim Examination"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  শিক্ষা প্রতিষ্ঠান (Institute / College) *
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleUpdate(item.id, { institution: e.target.value })}
                  placeholder="e.g. Government Hazi Muhammad Mohsin College"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  সাল / সেশন (Session or Year)
                </label>
                <input
                  type="text"
                  value={item.yearOrSession}
                  onChange={(e) => handleUpdate(item.id, { yearOrSession: e.target.value })}
                  placeholder="e.g. 2022-2023 Session / 2020"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  ফলাফল (Result / GPA / Status)
                </label>
                <input
                  type="text"
                  value={item.result || ''}
                  onChange={(e) => handleUpdate(item.id, { result: e.target.value })}
                  placeholder="e.g. GPA 5.00 / Appeared"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
