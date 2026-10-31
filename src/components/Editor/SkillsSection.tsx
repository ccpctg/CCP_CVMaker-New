import React from 'react';
import { Plus, Trash2, Award, Sparkles } from 'lucide-react';
import { Skill, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface SkillsSectionProps {
  skills: Skill[];
  language: Language;
  onUpdateSkills: (skills: Skill[]) => void;
  accentColor: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  language,
  onUpdateSkills,
  accentColor,
}) => {
  const t = UI_STRINGS[language];

  const handleAdd = () => {
    const newItem: Skill = {
      id: `sk-${Date.now()}`,
      name: '',
      level: 85,
      category: 'technical',
    };
    onUpdateSkills([...skills, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<Skill>) => {
    onUpdateSkills(
      skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const handleDelete = (id: string) => {
    onUpdateSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {t.secSkills} (Skills & Proficiencies)
          </h4>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addSkill}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <div
            key={skill.id || index}
            className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-300">
                দক্ষতা #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleUpdate(skill.id, { name: e.target.value })}
                placeholder="e.g. Graphic Design / Calligraphy"
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                <span>পারদর্শিতা (Proficiency)</span>
                <span className="text-amber-400 font-bold">{skill.level}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={skill.level}
                onChange={(e) => handleUpdate(skill.id, { level: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
