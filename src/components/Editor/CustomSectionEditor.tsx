import React from 'react';
import { Plus, Trash2, Layers, FolderPlus } from 'lucide-react';
import { CustomSection, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface CustomSectionEditorProps {
  customSections: CustomSection[];
  language: Language;
  onUpdateSections: (sections: CustomSection[]) => void;
}

export const CustomSectionEditor: React.FC<CustomSectionEditorProps> = ({
  customSections,
  language,
  onUpdateSections,
}) => {
  const t = UI_STRINGS[language];

  const handleAddSection = () => {
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      title: language === 'bn' ? 'নতুন কাস্টম সেকশন' : 'New Custom Section',
      items: [
        {
          id: `item-${Date.now()}`,
          label: language === 'bn' ? 'পুরস্কার / স্বীকৃতি' : 'Award / Achievement',
          value: language === 'bn' ? 'বিবরণ লিখুন' : 'Details here',
        },
      ],
    };
    onUpdateSections([...customSections, newSec]);
  };

  const handleUpdateSectionTitle = (id: string, newTitle: string) => {
    onUpdateSections(
      customSections.map((sec) => (sec.id === id ? { ...sec, title: newTitle } : sec))
    );
  };

  const handleDeleteSection = (id: string) => {
    onUpdateSections(customSections.filter((sec) => sec.id !== id));
  };

  const handleAddItem = (sectionId: string) => {
    onUpdateSections(
      customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: [
            ...sec.items,
            {
              id: `item-${Date.now()}`,
              label: '',
              value: '',
            },
          ],
        };
      })
    );
  };

  const handleUpdateItem = (
    sectionId: string,
    itemId: string,
    updates: { label?: string; value?: string }
  ) => {
    onUpdateSections(
      customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        };
      })
    );
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    onUpdateSections(
      customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId),
        };
      })
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            {t.tabCustom} (Awards, Extracurricular, Hobbies, Islamic Qualifications)
          </h4>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition cursor-pointer"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>{t.addCustomSection}</span>
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="p-6 text-center rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
          কোনো কাস্টম সেকশন নেই। "নতুন কাস্টম সেকশন তৈরি করুন" বাটনে ক্লিক করে প্রয়োজনমতো সেকশন যোগ করুন।
        </div>
      ) : (
        <div className="space-y-4">
          {customSections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleUpdateSectionTitle(sec.id, e.target.value)}
                  className="px-3 py-1 text-xs font-bold bg-slate-950 border border-slate-700 rounded-lg text-amber-300 focus:outline-none focus:border-amber-400 w-full max-w-sm"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddItem(sec.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span>{t.addCustomItem}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(sec.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {sec.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        handleUpdateItem(sec.id, item.id, { label: e.target.value })
                      }
                      placeholder="Title / Key"
                      className="w-1/3 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) =>
                        handleUpdateItem(sec.id, item.id, { value: e.target.value })
                      }
                      placeholder="Details / Value"
                      className="flex-1 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(sec.id, item.id)}
                      className="p-1 text-slate-600 hover:text-rose-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
