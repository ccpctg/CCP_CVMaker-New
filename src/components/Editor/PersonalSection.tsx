import React from 'react';
import { Camera, MapPin, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import { PersonalDetails, Language } from '../../types/cv.js';
import { UI_STRINGS } from '../../data/translations.js';

interface PersonalSectionProps {
  personal: PersonalDetails;
  language: Language;
  onChange: (updates: Partial<PersonalDetails>) => void;
  onOpenPhotoEditor: () => void;
  accentColor: string;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({
  personal,
  language,
  onChange,
  onOpenPhotoEditor,
  accentColor,
}) => {
  const t = UI_STRINGS[language];

  return (
    <div className="space-y-5">
      {/* Top Profile Photo & Basic Identity */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="relative group">
          <div
            className={`w-24 h-24 overflow-hidden border-2 shadow-lg transition-transform group-hover:scale-105 ${
              personal.photoShape === 'circle'
                ? 'rounded-full'
                : personal.photoShape === 'rounded'
                ? 'rounded-2xl'
                : 'rounded-lg'
            }`}
            style={{ borderColor: accentColor }}
          >
            <img
              src={personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'}
              alt={personal.fullName}
              className="w-full h-full object-cover"
              style={{
                transform: `translate(${personal.photoOffset?.x || 0}px, ${
                  personal.photoOffset?.y || 0
                }px) scale(${personal.photoZoom || 1})`,
                transformOrigin: 'center center',
              }}
            />
          </div>
          <button
            type="button"
            onClick={onOpenPhotoEditor}
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-md hover:bg-amber-400 transition cursor-pointer"
            title="Edit Photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 w-full space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.fullName} *
            </label>
            <input
              type="text"
              value={personal.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. MD. MINHAJUL ABEDIN"
              className="w-full px-3 py-2 text-sm font-semibold bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.designation} *
            </label>
            <input
              type="text"
              value={personal.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              placeholder="e.g. GRAPHIC DESIGNER & CALLIGRAPHER"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-medium placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Compact Address Block: Current & Permanent Side-by-Side */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>ঠিকানা ব্লক (Unified Address Block)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.currentAddress}
            </label>
            <textarea
              rows={2}
              value={personal.currentAddress}
              onChange={(e) => onChange({ currentAddress: e.target.value })}
              placeholder="Dewanhat, Chattogram, Bangladesh"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.permanentAddress}
            </label>
            <textarea
              rows={2}
              value={personal.permanentAddress}
              onChange={(e) => onChange({ permanentAddress: e.target.value })}
              placeholder="Gulshakhali, Langadu, Rangamati, Bangladesh"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none transition"
            />
          </div>
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          যোগাযোগ ও সোশ্যাল প্রোফাইল (Contact & Social Links)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.phone}
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={personal.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.email}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={personal.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.facebook}
            </label>
            <input
              type="text"
              value={personal.facebook}
              onChange={(e) => onChange({ facebook: e.target.value })}
              placeholder="e.g. Md. Minhajul Abedin"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.instagram}
            </label>
            <input
              type="text"
              value={personal.instagram}
              onChange={(e) => onChange({ instagram: e.target.value })}
              placeholder="e.g. minhaj_calligraphy"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.linkedin}
            </label>
            <input
              type="text"
              value={personal.linkedin}
              onChange={(e) => onChange({ linkedin: e.target.value })}
              placeholder="e.g. minhajul-abedin"
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.website}
            </label>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={personal.website}
                onChange={(e) => onChange({ website: e.target.value })}
                placeholder="creativeconceptpoint.com"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Key-Value Attributes */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          ব্যক্তিগত বৈশিষ্ট্য ও বিবরণ (Personal Stats)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.dob}
            </label>
            <input
              type="text"
              value={personal.dob}
              onChange={(e) => onChange({ dob: e.target.value })}
              placeholder="18 October 2000"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.age}
            </label>
            <input
              type="text"
              value={personal.age}
              onChange={(e) => onChange({ age: e.target.value })}
              placeholder="26 Years"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.height}
            </label>
            <input
              type="text"
              value={personal.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="5'5''"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.weight}
            </label>
            <input
              type="text"
              value={personal.weight}
              onChange={(e) => onChange({ weight: e.target.value })}
              placeholder="68 kg"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.complexion}
            </label>
            <input
              type="text"
              value={personal.complexion}
              onChange={(e) => onChange({ complexion: e.target.value })}
              placeholder="Dark Brown / শ্যামবর্ণ"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.bloodGroup}
            </label>
            <input
              type="text"
              value={personal.bloodGroup}
              onChange={(e) => onChange({ bloodGroup: e.target.value })}
              placeholder="AB+"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.maritalStatus}
            </label>
            <input
              type="text"
              value={personal.maritalStatus}
              onChange={(e) => onChange({ maritalStatus: e.target.value })}
              placeholder="Unmarried / অবিবাহিত"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {t.religion}
            </label>
            <input
              type="text"
              value={personal.religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              placeholder="Islam / ইসলাম"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
