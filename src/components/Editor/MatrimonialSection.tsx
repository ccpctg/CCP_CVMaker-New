import React from 'react';
import { Users, Heart, ShieldCheck, PhoneCall } from 'lucide-react';
import { FamilyDetails, MatrimonialDetails, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface MatrimonialSectionProps {
  family: FamilyDetails;
  matrimonial: MatrimonialDetails;
  language: Language;
  onUpdateFamily: (updates: Partial<FamilyDetails>) => void;
  onUpdateMatrimonial: (updates: Partial<MatrimonialDetails>) => void;
}

export const MatrimonialSection: React.FC<MatrimonialSectionProps> = ({
  family,
  matrimonial,
  language,
  onUpdateFamily,
  onUpdateMatrimonial,
}) => {
  const t = UI_STRINGS[language];

  return (
    <div className="space-y-6">
      {/* 1. Family Background */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Users className="w-4 h-4 text-amber-400" />
          <span>{t.secFamily} (Family Background)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.fatherName} *
            </label>
            <input
              type="text"
              value={family.fatherName}
              onChange={(e) => onUpdateFamily({ fatherName: e.target.value })}
              placeholder="e.g. Anowar Hossain / আনোয়ার হোসেন"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.fatherOccupation} *
            </label>
            <input
              type="text"
              value={family.fatherOccupation}
              onChange={(e) => onUpdateFamily({ fatherOccupation: e.target.value })}
              placeholder="e.g. Pharmacy Business / ফার্মেসি ব্যবসায়ী"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.motherName} *
            </label>
            <input
              type="text"
              value={family.motherName}
              onChange={(e) => onUpdateFamily({ motherName: e.target.value })}
              placeholder="e.g. Jusna Begum / জুছনা বেগম"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.motherOccupation} *
            </label>
            <input
              type="text"
              value={family.motherOccupation}
              onChange={(e) => onUpdateFamily({ motherOccupation: e.target.value })}
              placeholder="e.g. Homemaker / গৃহিণী"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.siblingsCount}
            </label>
            <input
              type="text"
              value={family.siblingsCount}
              onChange={(e) => onUpdateFamily({ siblingsCount: e.target.value })}
              placeholder="e.g. 3 Sisters and 1 Brother / ৩ বোন ও ১ ভাই"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.positionInFamily}
            </label>
            <input
              type="text"
              value={family.positionInFamily}
              onChange={(e) => onUpdateFamily({ positionInFamily: e.target.value })}
              placeholder="e.g. Youngest / কনিষ্ঠ সন্তান"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.sistersStatus}
            </label>
            <input
              type="text"
              value={family.sistersStatus}
              onChange={(e) => onUpdateFamily({ sistersStatus: e.target.value })}
              placeholder="e.g. All Three Sisters Are Married"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.financialStatus}
            </label>
            <input
              type="text"
              value={family.financialStatus}
              onChange={(e) => onUpdateFamily({ financialStatus: e.target.value })}
              placeholder="e.g. Upper Middle Class / প্রতিষ্ঠিত পরিবার"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* 2. Matrimonial Expectations & Religious Details */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
          <Heart className="w-4 h-4 text-rose-400" />
          <span>ধর্মীয় মূল্যবোধ ও পাত্র/পাত্রীর প্রতি চাহিদা</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.religiousPractice}
            </label>
            <textarea
              rows={2}
              value={matrimonial.religiousPractice}
              onChange={(e) => onUpdateMatrimonial({ religiousPractice: e.target.value })}
              placeholder="যেমন: নিয়মিত পাঁচ ওয়াক্ত নামাজ আদায়, পর্দা ও হালাল উপার্জনে বিশ্বাসী।"
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.partnerExpectations} *
            </label>
            <textarea
              rows={3}
              value={matrimonial.partnerExpectations}
              onChange={(e) => onUpdateMatrimonial({ partnerExpectations: e.target.value })}
              placeholder="যেমন: শিক্ষিতা, মার্জিত, দ্বীনদার এবং পারিবারিক মূল্যবোধসম্পন্ন জীবনসঙ্গিনী প্রত্যাশিত..."
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-400 resize-none font-bengali leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.guardianContact}
            </label>
            <div className="relative">
              <PhoneCall className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={matrimonial.guardianContact}
                onChange={(e) => onUpdateMatrimonial({ guardianContact: e.target.value })}
                placeholder="e.g. 01819-000000 (পিতা / অভিভাবক)"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
