import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Heart,
  Globe,
  Briefcase,
  GraduationCap,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { CVData } from '../../types/cv.js';
import { THEMES } from '../../utils/themeData.js';
import { formatNumberByLanguage } from '../../utils/numeralConverter.js';
import { UI_STRINGS } from '../../data/translations.js';
import { CcpLogo } from '../CcpLogo.js';

interface CvDocumentProps {
  data: CVData;
  onUpdateField?: (path: string, value: any) => void;
}

export const CvDocument: React.FC<CvDocumentProps> = ({ data, onUpdateField }) => {
  const {
    mode,
    language,
    themeId,
    layout = 'signature_curve',
    fontChoice = 'anek_bangla',
    showBismillah,
    inlineEditing,
    useBengaliNumerals,
    personal,
    professionalSummary,
    family,
    matrimonial,
    experiences,
    organizationalExperience,
    education,
    skills,
    projects,
    customSections,
  } = data;

  const t = UI_STRINGS[language];
  const theme = THEMES[themeId] || THEMES.executive;

  const fnNum = (val: string | number) =>
    formatNumberByLanguage(val, language, useBengaliNumerals);

  // Specific Font Choice mapping
  const fontClass =
    data.fontChoice === 'anek_bangla'
      ? 'font-anek-bangla'
      : data.fontChoice === 'hind_siliguri'
      ? 'font-hind-siliguri'
      : data.fontChoice === 'noto_sans'
      ? 'font-noto-sans-bengali'
      : data.fontChoice === 'galada'
      ? 'font-galada'
      : data.fontChoice === 'tiro_bangla'
      ? 'font-tiro-bangla'
      : data.fontChoice === 'plus_jakarta'
      ? 'font-plus-jakarta'
      : data.fontChoice === 'inter'
      ? 'font-inter'
      : data.fontChoice === 'outfit'
      ? 'font-outfit'
      : 'font-anek-bangla';

  // Font size scaling factor
  const fontSizeFactor =
    data.fontSizeScale === 'sm'
      ? 0.94
      : data.fontSizeScale === 'lg'
      ? 1.06
      : data.fontSizeScale === 'xl'
      ? 1.13
      : 1.0;

  // Inline Editable Text Component
  const EditableText: React.FC<{
    value: string;
    onChangeText?: (newVal: string) => void;
    className?: string;
    style?: React.CSSProperties;
    tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  }> = ({ value, onChangeText, className = '', style, tag = 'span' }) => {
    const Tag = tag as any;
    if (!inlineEditing || !onChangeText) {
      return (
        <Tag className={className} style={style}>
          {value}
        </Tag>
      );
    }

    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          onChangeText(e.currentTarget.textContent || '');
        }}
        className={`${className} outline-none border-b border-dashed border-amber-400/60 hover:bg-amber-400/10 transition-colors cursor-text rounded-xs px-0.5`}
        style={style}
      >
        {value}
      </Tag>
    );
  };

  const ventures = experiences.filter((e) => e.isVenture);
  const regularExp = experiences.filter((e) => !e.isVenture);

  return (
    <div
      id="cv-print-canvas"
      className={`print-sheet mx-auto bg-white text-slate-800 shadow-2xl relative overflow-hidden transition-all duration-200 ${fontClass}`}
      style={{
        width: '794px', // 210mm at 96 DPI
        minHeight: '1123px', // 297mm at 96 DPI
        boxSizing: 'border-box',
        fontSize: `${fontSizeFactor * 100}%`,
      }}
    >
      {/* ========================================================= */}
      {/* TEMPLATE 1: CCP SIGNATURE CURVE (Official Reference Match)*/}
      {/* ========================================================= */}
      {layout === 'signature_curve' && (
        <div className="relative min-h-[1123px] flex flex-col justify-between">
          {/* Top-Right Decorative Subtle Gradient Bar */}
          <div
            className="absolute top-0 right-0 h-2.5 w-6/12"
            style={{
              background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
            }}
          />

          <div className="flex flex-row min-h-[1123px]">
            {/* LEFT SIDEBAR (Curved Solid Column) */}
            <div
              className="w-[275px] flex-shrink-0 text-white flex flex-col justify-between relative"
              style={{
                backgroundColor: theme.sidebarBg,
              }}
            >
              {/* Top Identity Block */}
              <div className="pt-7 px-4 text-center">
                <EditableText
                  tag="h1"
                  value={personal.fullName || 'MD. MINHAJUL ABEDIN'}
                  onChangeText={(val) => onUpdateField?.('personal.fullName', val)}
                  className="text-xl sm:text-2xl font-black uppercase tracking-wider leading-tight text-white block font-sans-modern"
                />

                <EditableText
                  tag="p"
                  value={personal.tagline || 'GRAPHIC DESIGNER & CALLIGRAPHER'}
                  onChangeText={(val) => onUpdateField?.('personal.tagline', val)}
                  className="mt-1 text-[11px] font-bold tracking-widest uppercase block"
                  style={{ color: theme.badgeBg }}
                />

                {/* Circular Profile Photo with Gold Accent Border */}
                <div className="mt-4 flex justify-center">
                  <div
                    className={`relative overflow-hidden shadow-2xl border-4 ${
                      personal.photoShape === 'circle'
                        ? 'rounded-full w-38 h-38'
                        : personal.photoShape === 'rounded'
                        ? 'rounded-2xl w-38 h-38'
                        : 'rounded-lg w-38 h-38'
                    }`}
                    style={{
                      borderColor: theme.badgeBg,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    }}
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
                </div>

                {/* CONTACT ME Block */}
                <div className="mt-5 text-left">
                  <div
                    className="border-b-2 pb-0.5 mb-2 inline-block"
                    style={{ borderColor: theme.badgeBg }}
                  >
                    <h3 className="text-xs font-black tracking-widest uppercase text-white">
                      {t.secContact}
                    </h3>
                  </div>

                  <div className="space-y-1 text-[11px] font-medium text-slate-100">
                    {personal.phone && (
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-full bg-white/10 text-amber-300">
                          <Phone className="w-2.5 h-2.5" />
                        </span>
                        <EditableText
                          value={fnNum(personal.phone)}
                          onChangeText={(val) => onUpdateField?.('personal.phone', val)}
                          className="font-bold text-xs tracking-wide"
                        />
                      </div>
                    )}

                    {personal.email && (
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-full bg-white/10 text-amber-300">
                          <Mail className="w-2.5 h-2.5" />
                        </span>
                        <EditableText
                          value={personal.email}
                          onChangeText={(val) => onUpdateField?.('personal.email', val)}
                          className="truncate text-[10.5px]"
                        />
                      </div>
                    )}

                    {(personal.facebook || personal.instagram) && (
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-full bg-white/10 text-amber-300">
                          <Facebook className="w-2.5 h-2.5" />
                        </span>
                        <span className="truncate text-[10.5px]">
                          {personal.facebook || personal.instagram}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Lower Section: Curved Arch Container for Personal Info & Skills */}
              <div
                className="mt-4 mx-2.5 mb-3 p-3.5 rounded-3xl text-slate-100 shadow-inner"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                {/* PERSONAL INFORMATION (Neat Compact Table Alignment) */}
                <div>
                  <h4
                    className="text-[11px] font-black tracking-wider uppercase mb-2 border-b pb-0.5"
                    style={{ borderColor: theme.badgeBg, color: theme.badgeBg }}
                  >
                    {t.secPersonal}
                  </h4>
                  <div className="space-y-0.5 text-[10.5px] leading-tight">
                    {personal.dob && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.dob}</span>
                        <span className="text-white font-semibold">: {fnNum(personal.dob)}</span>
                      </div>
                    )}
                    {personal.age && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.age}</span>
                        <span className="text-white font-semibold">: {fnNum(personal.age)}</span>
                      </div>
                    )}
                    {personal.height && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.height}</span>
                        <span className="text-white font-semibold">: {fnNum(personal.height)}</span>
                      </div>
                    )}
                    {personal.weight && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.weight}</span>
                        <span className="text-white font-semibold">: {fnNum(personal.weight)}</span>
                      </div>
                    )}
                    {personal.complexion && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.complexion}</span>
                        <span className="text-white font-semibold">: {personal.complexion}</span>
                      </div>
                    )}
                    {personal.bloodGroup && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.bloodGroup}</span>
                        <span className="text-amber-300 font-bold">: {personal.bloodGroup}</span>
                      </div>
                    )}
                    {personal.maritalStatus && (
                      <div className="grid grid-cols-[85px_1fr] items-start">
                        <span className="text-slate-300 font-medium">{t.maritalStatus}</span>
                        <span className="text-white font-semibold">: {personal.maritalStatus}</span>
                      </div>
                    )}

                    {/* Compact Unified Address Block (Both Present & Permanent Address) */}
                    {(personal.currentAddress || personal.permanentAddress) && (
                      <div className="pt-2 mt-1.5 border-t border-white/20 space-y-1">
                        {personal.currentAddress && (
                          <div className="space-y-0.5">
                            <span className="text-amber-300 font-bold text-[9.5px] uppercase tracking-wider block">
                              {t.currentAddress}:
                            </span>
                            <span className="text-[10px] text-slate-100 block leading-snug pl-1 border-l-2 border-amber-400/40">
                              {personal.currentAddress}
                            </span>
                          </div>
                        )}
                        {personal.permanentAddress && (
                          <div className="space-y-0.5 pt-0.5">
                            <span className="text-amber-300 font-bold text-[9.5px] uppercase tracking-wider block">
                              {t.permanentAddress}:
                            </span>
                            <span className="text-[10px] text-slate-100 block leading-snug pl-1 border-l-2 border-amber-400/40">
                              {personal.permanentAddress}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* SKILLS */}
                {skills.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/15">
                    <h4
                      className="text-[11px] font-black tracking-wider uppercase mb-1.5 border-b pb-0.5"
                      style={{ borderColor: theme.badgeBg, color: theme.badgeBg }}
                    >
                      {t.secSkills}
                    </h4>
                    <div className="space-y-1">
                      {skills.map((skill) => (
                        <div key={skill.id} className="text-[10.5px]">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-semibold text-slate-100 flex items-center gap-1">
                              <span
                                className="w-1.5 h-1.5 rounded-none flex-shrink-0"
                                style={{ backgroundColor: theme.badgeBg }}
                              />
                              {skill.name}
                            </span>
                            <span className="text-[9.5px] font-bold text-amber-300">
                              {fnNum(`${skill.level}%`)}
                            </span>
                          </div>
                          <div className="w-full bg-black/40 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: theme.badgeBg,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT MAIN CONTENT AREA (Clean, High-Density, Perfectly Aligned) */}
            <div className="flex-1 px-6 py-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* 1. PROFESSIONAL PROFILE & BUSINESS VENTURES */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 pb-0.5 border-b border-slate-200">
                    <span
                      className="w-2.5 h-2.5 rounded-none"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <h2
                      className="text-xs sm:text-sm font-black tracking-wider uppercase"
                      style={{ color: theme.primary }}
                    >
                      {t.secVentures}
                    </h2>
                  </div>

                  {professionalSummary && (
                    <EditableText
                      tag="p"
                      value={professionalSummary}
                      onChangeText={(val) => onUpdateField?.('professionalSummary', val)}
                      className="text-[11px] leading-relaxed text-slate-700 italic mb-2 block"
                    />
                  )}

                  {/* Ventures & Roles Hierarchy */}
                  <div className="space-y-2 text-xs">
                    {ventures.map((v) => (
                      <div key={v.id} className="space-y-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900 text-xs">
                            {v.organization}
                          </span>
                          <span className="text-slate-600 text-[11px]">
                            — ({v.role})
                          </span>
                          {v.period && (
                            <span className="text-slate-400 text-[10px] ml-auto">
                              {fnNum(v.period)}
                            </span>
                          )}
                        </div>
                        {v.description && (
                          <p className="text-[10.5px] text-slate-600 pl-3 leading-snug">
                            {v.description}
                          </p>
                        )}
                      </div>
                    ))}

                    {regularExp.map((exp) => (
                      <div key={exp.id} className="space-y-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900 text-xs">
                            {exp.role}
                          </span>
                          <span className="text-slate-600 text-[11px]">
                            — {exp.organization}
                          </span>
                          {exp.period && (
                            <span className="text-slate-400 text-[10px] ml-auto">
                              {fnNum(exp.period)}
                            </span>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-[10.5px] text-slate-600 pl-3 leading-snug">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. ORGANIZATIONAL EXPERIENCE */}
                {organizationalExperience.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 pb-0.5 border-b border-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-none"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <h2
                        className="text-xs sm:text-sm font-black tracking-wider uppercase"
                        style={{ color: theme.primary }}
                      >
                        {t.secOrgExp}
                      </h2>
                    </div>

                    <div className="space-y-1.5">
                      {organizationalExperience.map((org) => (
                        <div key={org.id} className="space-y-0.5 text-xs">
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <span className="font-bold text-slate-900">
                              {org.role}
                            </span>
                            {org.period && (
                              <span className="text-slate-500 text-[10px] font-medium ml-auto">
                                ({fnNum(org.period)})
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-slate-700 pl-3 leading-snug">
                            {org.organization}
                          </p>
                          {org.description && (
                            <p className="text-[10px] text-slate-500 pl-3 italic">
                              {org.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. EDUCATIONAL QUALIFICATIONS */}
                {education.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 pb-0.5 border-b border-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-none"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <h2
                        className="text-xs sm:text-sm font-black tracking-wider uppercase"
                        style={{ color: theme.primary }}
                      >
                        {t.secEducation}
                      </h2>
                    </div>

                    <div className="space-y-1.5">
                      {education.map((edu) => (
                        <div key={edu.id} className="text-xs space-y-0.5">
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <span className="font-bold text-slate-900">
                              {edu.degree}
                            </span>
                            {edu.yearOrSession && (
                              <span className="text-slate-600 font-semibold text-[10.5px]">
                                — {fnNum(edu.yearOrSession)}
                              </span>
                            )}
                            {edu.result && (
                              <span className="text-amber-700 font-bold text-[10px] ml-auto">
                                {fnNum(edu.result)}
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-slate-600 pl-3">
                            {edu.institution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. FAMILY BACKGROUND */}
                {(family.fatherName || family.motherName || family.siblingsCount) && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 pb-0.5 border-b border-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-none"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <h2
                        className="text-xs sm:text-sm font-black tracking-wider uppercase"
                        style={{ color: theme.primary }}
                      >
                        {t.secFamily}
                      </h2>
                    </div>

                    <div className="space-y-1 text-xs">
                      {family.fatherName && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900">
                            {language === 'bn' ? 'পিতা' : 'Father'}: {family.fatherName}
                          </span>
                          {family.fatherOccupation && (
                            <span className="text-slate-600 text-[10.5px]">
                              ({family.fatherOccupation})
                            </span>
                          )}
                        </div>
                      )}

                      {family.motherName && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900">
                            {language === 'bn' ? 'মাতা' : 'Mother'}: {family.motherName}
                          </span>
                          {family.motherOccupation && (
                            <span className="text-slate-600 text-[10.5px]">
                              ({family.motherOccupation})
                            </span>
                          )}
                        </div>
                      )}

                      {family.siblingsCount && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900">
                            {language === 'bn' ? 'ভাই-বোন' : 'Siblings'}:
                          </span>
                          <span className="text-slate-700 text-[10.5px]">
                            {fnNum(family.siblingsCount)}
                          </span>
                          {family.positionInFamily && (
                            <span className="text-slate-500 italic text-[10px]">
                              ({family.positionInFamily})
                            </span>
                          )}
                        </div>
                      )}

                      {family.sistersStatus && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900">
                            {language === 'bn' ? 'বোনদের অবস্থা' : "Sisters' Status"}:
                          </span>
                          <span className="text-slate-700 text-[10.5px]">
                            {family.sistersStatus}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. MATRIMONIAL SPECIFICS (if in Matrimonial Mode) */}
                {mode === 'matrimonial' && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-600" />
                      <h3 className="text-xs font-black tracking-wider uppercase text-rose-900">
                        {t.secExpectations}
                      </h3>
                    </div>
                    {matrimonial.partnerExpectations && (
                      <EditableText
                        tag="p"
                        value={matrimonial.partnerExpectations}
                        onChangeText={(val) =>
                          onUpdateField?.('matrimonial.partnerExpectations', val)
                        }
                        className="text-[10.5px] leading-relaxed text-slate-700 font-medium block"
                      />
                    )}
                    {matrimonial.religiousPractice && (
                      <p className="text-[10px] text-slate-600 italic">
                        <span className="font-bold">ধর্মীয় মূল্যবোধ:</span>{' '}
                        {matrimonial.religiousPractice}
                      </p>
                    )}
                    {matrimonial.guardianContact && (
                      <p className="text-[10px] text-slate-800 font-bold">
                        <span>যোগাযোগ (অভিভাবক):</span> {fnNum(matrimonial.guardianContact)}
                      </p>
                    )}
                  </div>
                )}

                {/* 6. CUSTOM DYNAMIC SECTIONS */}
                {customSections.map((sec) => (
                  <div key={sec.id}>
                    <div className="flex items-center gap-1.5 mb-1.5 pb-0.5 border-b border-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-none"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <h2
                        className="text-xs sm:text-sm font-black tracking-wider uppercase"
                        style={{ color: theme.primary }}
                      >
                        {sec.title}
                      </h2>
                    </div>
                    <div className="space-y-1 text-xs">
                      {sec.items.map((item) => (
                        <div key={item.id} className="flex items-baseline gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-none flex-shrink-0 mt-1"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="font-bold text-slate-900">{item.label}:</span>
                          <span className="text-slate-700 text-[10.5px]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Right: Signature Overlapping Brand Spheres from the reference image */}
              <div className="flex justify-between items-end pt-3">
                <div className="text-[9px] text-slate-400 font-medium">
                  ক্রিয়েটিভ কনসেপ্ট পয়েন্ট • {language === 'bn' ? 'সিভি মেকার' : 'CV Maker'}
                </div>

                <div className="relative w-14 h-8 flex items-center justify-end">
                  {/* Left Yellow/Gold Circle */}
                  <div
                    className="absolute right-5 w-8 h-8 rounded-full opacity-90 shadow-sm"
                    style={{ backgroundColor: '#fdb813' }}
                  />
                  {/* Right Red/Coral Circle */}
                  <div
                    className="absolute right-0 w-8 h-8 rounded-full opacity-90 mix-blend-multiply shadow-sm"
                    style={{ backgroundColor: '#ef4444' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TEMPLATE 2: MODERN CORPORATE (Dhaka Executive Style)      */}
      {/* ========================================================= */}
      {layout === 'modern_corporate' && (
        <div className="min-h-[1123px] flex flex-col justify-between p-8">
          <div>
            {/* Top Corporate Banner */}
            <div
              className="p-6 rounded-2xl text-white flex items-center justify-between shadow-lg relative overflow-hidden"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="relative z-10 space-y-1">
                <EditableText
                  tag="h1"
                  value={personal.fullName}
                  onChangeText={(val) => onUpdateField?.('personal.fullName', val)}
                  className="text-2xl font-black uppercase tracking-wide block"
                />
                <EditableText
                  tag="p"
                  value={personal.tagline}
                  onChangeText={(val) => onUpdateField?.('personal.tagline', val)}
                  className="text-xs font-bold tracking-widest uppercase block"
                  style={{ color: theme.badgeBg }}
                />
                <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-slate-200">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-300" />
                    {fnNum(personal.phone)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-300" />
                    {personal.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    {personal.currentAddress}
                  </span>
                </div>
              </div>

              {/* Photo */}
              <div
                className="w-28 h-28 rounded-xl overflow-hidden border-3 shadow-md flex-shrink-0 z-10"
                style={{ borderColor: theme.badgeBg }}
              >
                <img
                  src={personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translate(${personal.photoOffset?.x || 0}px, ${
                      personal.photoOffset?.y || 0
                    }px) scale(${personal.photoZoom || 1})`,
                  }}
                />
              </div>

              {/* Background accent ring */}
              <div
                className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full opacity-15 pointer-events-none"
                style={{ backgroundColor: theme.badgeBg }}
              />
            </div>

            {/* 2-Column Split Content */}
            <div className="grid grid-cols-12 gap-6 mt-6">
              {/* Left Column (5 Cols): Stats & Skills & Family */}
              <div className="col-span-4 space-y-5">
                {/* Personal Stats Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h3
                    className="text-xs font-black uppercase tracking-wider pb-1 border-b"
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    {t.secPersonal}
                  </h3>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.dob}:</span>
                      <span className="font-semibold text-slate-800">{fnNum(personal.dob)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.age}:</span>
                      <span className="font-semibold text-slate-800">{fnNum(personal.age)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.bloodGroup}:</span>
                      <span className="font-bold text-amber-700">{personal.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.height}:</span>
                      <span>{fnNum(personal.height)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.maritalStatus}:</span>
                      <span>{personal.maritalStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Card */}
                {skills.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h3
                      className="text-xs font-black uppercase tracking-wider pb-1 border-b"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {t.secSkills}
                    </h3>
                    <div className="space-y-2">
                      {skills.map((s) => (
                        <div key={s.id} className="text-[11px]">
                          <div className="flex justify-between mb-0.5">
                            <span className="font-semibold text-slate-800">{s.name}</span>
                            <span className="text-slate-500 font-bold">{fnNum(`${s.level}%`)}</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${s.level}%`, backgroundColor: theme.primary }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Family Summary */}
                {(family.fatherName || family.motherName) && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                    <h3
                      className="text-xs font-black uppercase tracking-wider pb-1 border-b"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {t.secFamily}
                    </h3>
                    <p>
                      <span className="font-bold text-slate-800">Father:</span> {family.fatherName}
                    </p>
                    <p>
                      <span className="font-bold text-slate-800">Mother:</span> {family.motherName}
                    </p>
                    <p>
                      <span className="font-bold text-slate-800">Siblings:</span> {fnNum(family.siblingsCount)}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column (8 Cols): Experience, Education, Projects */}
              <div className="col-span-8 space-y-5">
                {professionalSummary && (
                  <div>
                    <h3
                      className="text-xs font-black uppercase tracking-wider pb-1 border-b mb-2"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {t.secProfile}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-700">
                      {professionalSummary}
                    </p>
                  </div>
                )}

                {experiences.length > 0 && (
                  <div>
                    <h3
                      className="text-xs font-black uppercase tracking-wider pb-1 border-b mb-2"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {t.secVentures}
                    </h3>
                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="text-xs space-y-0.5">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-900">{exp.role}</span>
                            <span className="text-slate-500 font-normal">{fnNum(exp.period)}</span>
                          </div>
                          <p className="font-semibold text-slate-600">{exp.organization}</p>
                          {exp.description && (
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {education.length > 0 && (
                  <div>
                    <h3
                      className="text-xs font-black uppercase tracking-wider pb-1 border-b mb-2"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {t.secEducation}
                    </h3>
                    <div className="space-y-2">
                      {education.map((edu) => (
                        <div key={edu.id} className="text-xs flex justify-between">
                          <div>
                            <span className="font-bold text-slate-900">{edu.degree}</span>
                            <span className="text-slate-600">, {edu.institution}</span>
                          </div>
                          <span className="text-slate-500 font-medium">
                            {fnNum(edu.yearOrSession)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Corporate Footer */}
          <div className="border-t pt-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>Creative Concept Point • Professional Executive CV</span>
            <span>Ref: CCP-{Date.now().toString().slice(-6)}</span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TEMPLATE 3: MATRIMONIAL HERITAGE BIODATA (পাত্র/পাত্রী)     */}
      {/* ========================================================= */}
      {layout === 'matrimonial_heritage' && (
        <div className="min-h-[1123px] flex flex-col justify-between p-8 relative">
          {/* Ornate Islamic Classic Outer Border */}
          <div
            className="absolute inset-4 border-2 rounded-2xl pointer-events-none"
            style={{ borderColor: theme.primary }}
          >
            <div
              className="absolute inset-1 border rounded-xl"
              style={{ borderColor: theme.accent }}
            />
          </div>

          <div className="relative z-10 px-4 py-2 space-y-4">
            {/* Traditional Bismillah Calligraphic Header */}
            <div className="text-center space-y-1">
              <p
                className="text-sm font-semibold tracking-wider font-bengali"
                style={{ color: theme.primary }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                (বিসমিল্লাহির রাহমানির রাহিম)
              </p>
              <h1
                className="text-xl sm:text-2xl font-black uppercase tracking-wider pt-1"
                style={{ color: theme.primary }}
              >
                {mode === 'matrimonial' ? 'পাত্রের জীবনবৃত্তান্ত (পারিবারিক বায়োডাটা)' : 'জীবনবৃত্তান্ত (বায়োডাটা)'}
              </h1>
              <div className="w-24 h-0.5 mx-auto rounded-full" style={{ backgroundColor: theme.accent }} />
            </div>

            {/* Profile Photo and Primary Identity Card */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <EditableText
                  tag="h2"
                  value={personal.fullName}
                  onChangeText={(val) => onUpdateField?.('personal.fullName', val)}
                  className="text-lg font-black text-slate-900 block"
                />
                <EditableText
                  tag="p"
                  value={personal.tagline}
                  onChangeText={(val) => onUpdateField?.('personal.tagline', val)}
                  className="text-xs font-bold text-amber-700 block"
                />
                <p className="text-[11px] text-slate-600 pt-1">
                  <span className="font-bold">ধর্ম:</span> {personal.religion || 'ইসলাম'} |{' '}
                  <span className="font-bold">বৈবাহিক অবস্থা:</span> {personal.maritalStatus}
                </p>
                <p className="text-[11px] text-slate-600">
                  <span className="font-bold">বর্তমান বাসস্থান:</span> {personal.currentAddress}
                </p>
              </div>

              <div
                className="w-28 h-28 rounded-full overflow-hidden border-3 shadow-md flex-shrink-0"
                style={{ borderColor: theme.accent }}
              >
                <img
                  src={personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translate(${personal.photoOffset?.x || 0}px, ${
                      personal.photoOffset?.y || 0
                    }px) scale(${personal.photoZoom || 1})`,
                  }}
                />
              </div>
            </div>

            {/* Personal Details Table */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <h3
                className="text-xs font-black uppercase tracking-wider pb-1 border-b"
                style={{ color: theme.primary }}
              >
                {t.secPersonal}
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.dob}:</span>
                  <span className="font-semibold text-slate-900">{fnNum(personal.dob)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.age}:</span>
                  <span className="font-semibold text-slate-900">{fnNum(personal.age)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.height}:</span>
                  <span className="font-semibold text-slate-900">{fnNum(personal.height)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.weight}:</span>
                  <span className="font-semibold text-slate-900">{fnNum(personal.weight)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.complexion}:</span>
                  <span className="font-semibold text-slate-900">{personal.complexion}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-500">{t.bloodGroup}:</span>
                  <span className="font-bold text-amber-700">{personal.bloodGroup}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700 block text-[10.5px]">
                    {t.currentAddress}:
                  </span>
                  <span className="text-slate-600">{personal.currentAddress}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700 block text-[10.5px]">
                    {t.permanentAddress}:
                  </span>
                  <span className="text-slate-600">{personal.permanentAddress}</span>
                </div>
              </div>
            </div>

            {/* Family Background Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <h3
                className="text-xs font-black uppercase tracking-wider pb-1 border-b"
                style={{ color: theme.primary }}
              >
                {t.secFamily} (পারিবারিক পরিচয় ও বংশমর্যাদা)
              </h3>
              <div className="space-y-1.5 text-xs">
                <p>
                  <span className="font-bold text-slate-900">পিতার নাম ও পেশা:</span>{' '}
                  {family.fatherName} ({family.fatherOccupation})
                </p>
                <p>
                  <span className="font-bold text-slate-900">মাতার নাম ও পেশা:</span>{' '}
                  {family.motherName} ({family.motherOccupation})
                </p>
                <p>
                  <span className="font-bold text-slate-900">ভাই-বোনের বিবরণ:</span>{' '}
                  {fnNum(family.siblingsCount)} {family.positionInFamily && `(${family.positionInFamily})`}
                </p>
                {family.sistersStatus && (
                  <p>
                    <span className="font-bold text-slate-900">বোনদের বৈবাহিক অবস্থা:</span>{' '}
                    {family.sistersStatus}
                  </p>
                )}
                {family.financialStatus && (
                  <p>
                    <span className="font-bold text-slate-900">পারিবারিক অবস্থা:</span>{' '}
                    {family.financialStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Educational & Occupational Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 border-b pb-1">
                  শিক্ষাগত যোগ্যতা
                </h4>
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px] leading-snug">
                    <span className="font-bold text-slate-800">{edu.degree}</span>
                    <p className="text-slate-500">{edu.institution} ({fnNum(edu.yearOrSession)})</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 border-b pb-1">
                  পেশা ও কর্মসংস্থান
                </h4>
                {experiences.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="text-[11px] leading-snug">
                    <span className="font-bold text-slate-800">{exp.role}</span>
                    <p className="text-slate-500">{exp.organization}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expectations & Values */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1 text-xs">
              <h4 className="font-black text-amber-900 uppercase tracking-wide">
                পাত্র/পাত্রীর প্রতি প্রত্যাশা (Partner Expectations)
              </h4>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {matrimonial.partnerExpectations}
              </p>
              {matrimonial.religiousPractice && (
                <p className="text-[10px] text-slate-600 pt-0.5">
                  <span className="font-bold">ধর্মীয় অনুশাসন:</span> {matrimonial.religiousPractice}
                </p>
              )}
              {matrimonial.guardianContact && (
                <p className="text-[11px] font-bold text-slate-900 pt-1">
                  অভিভাবকের মোবাইল: {fnNum(matrimonial.guardianContact)}
                </p>
              )}
            </div>
          </div>

          <div className="relative z-10 text-center text-[10px] text-slate-400 border-t pt-2">
            পারিবারিক গোপনীয়তা রক্ষা করা বাঞ্ছনীয় • ক্রিয়েটিভ কনসেপ্ট পয়েন্ট বায়োডাটা মেকার
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TEMPLATE 4: CREATIVE SANS MINIMAL (Modern Sans-Serif)      */}
      {/* ========================================================= */}
      {layout === 'minimal_creative' && (
        <div className="min-h-[1123px] flex flex-col justify-between p-10 font-sans-modern">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start border-b pb-6" style={{ borderColor: theme.primary }}>
              <div className="space-y-1">
                <EditableText
                  tag="h1"
                  value={personal.fullName}
                  onChangeText={(val) => onUpdateField?.('personal.fullName', val)}
                  className="text-3xl font-extrabold uppercase text-slate-900 tracking-tight block"
                />
                <EditableText
                  tag="p"
                  value={personal.tagline}
                  onChangeText={(val) => onUpdateField?.('personal.tagline', val)}
                  className="text-xs font-bold uppercase tracking-widest block"
                  style={{ color: theme.accent }}
                />
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                  <span>{fnNum(personal.phone)}</span>
                  <span>•</span>
                  <span>{personal.email}</span>
                  <span>•</span>
                  <span>{personal.currentAddress}</span>
                </div>
              </div>

              <div
                className="w-24 h-24 rounded-full overflow-hidden border-2 shadow-sm flex-shrink-0"
                style={{ borderColor: theme.primary }}
              >
                <img
                  src={personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translate(${personal.photoOffset?.x || 0}px, ${
                      personal.photoOffset?.y || 0
                    }px) scale(${personal.photoZoom || 1})`,
                  }}
                />
              </div>
            </div>

            {/* Profile Summary */}
            {professionalSummary && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.secProfile}
                </h3>
                <p className="text-xs leading-relaxed text-slate-800">{professionalSummary}</p>
              </div>
            )}

            {/* Experiences */}
            {experiences.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.secVentures}
                </h3>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} — {exp.organization}</span>
                        <span className="text-slate-500 font-normal">{fnNum(exp.period)}</span>
                      </div>
                      {exp.description && (
                        <p className="text-slate-600 text-[11px]">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.secEducation}
                </h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs flex justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{edu.degree}</span>
                        <span className="text-slate-600">, {edu.institution}</span>
                      </div>
                      <span className="text-slate-500">{fnNum(edu.yearOrSession)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compact Details Grid */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-1 text-xs">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.secPersonal}
                </h3>
                <p><span className="text-slate-500">{t.dob}:</span> {fnNum(personal.dob)}</p>
                <p><span className="text-slate-500">{t.bloodGroup}:</span> {personal.bloodGroup}</p>
                <p><span className="text-slate-500">{t.height}:</span> {fnNum(personal.height)}</p>
              </div>

              <div className="space-y-1 text-xs">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.secFamily}
                </h3>
                <p><span className="text-slate-500">Father:</span> {family.fatherName}</p>
                <p><span className="text-slate-500">Mother:</span> {family.motherName}</p>
                <p><span className="text-slate-500">Siblings:</span> {fnNum(family.siblingsCount)}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 border-t pt-3">
            Creative Concept Point • Bilingual CV & Biodata
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TEMPLATE 5: METRO ELITE COMPACT (High Density)            */}
      {/* ========================================================= */}
      {layout === 'metro_compact' && (
        <div className="min-h-[1123px] flex flex-col justify-between p-6">
          <div className="space-y-3.5">
            {/* Top Compact Hero */}
            <div className="flex items-center gap-4 border-b-2 pb-3" style={{ borderColor: theme.primary }}>
              <div
                className="w-20 h-20 rounded-lg overflow-hidden border-2 shadow-sm flex-shrink-0"
                style={{ borderColor: theme.badgeBg }}
              >
                <img
                  src={personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translate(${personal.photoOffset?.x || 0}px, ${
                      personal.photoOffset?.y || 0
                    }px) scale(${personal.photoZoom || 1})`,
                  }}
                />
              </div>

              <div className="flex-1 space-y-0.5">
                <EditableText
                  tag="h1"
                  value={personal.fullName}
                  onChangeText={(val) => onUpdateField?.('personal.fullName', val)}
                  className="text-xl font-black text-slate-900 uppercase block"
                />
                <EditableText
                  tag="p"
                  value={personal.tagline}
                  onChangeText={(val) => onUpdateField?.('personal.tagline', val)}
                  className="text-xs font-bold uppercase block"
                  style={{ color: theme.accent }}
                />
                <div className="flex flex-wrap gap-2 text-[10.5px] text-slate-600 pt-0.5">
                  <span>📞 {fnNum(personal.phone)}</span>
                  <span>✉️ {personal.email}</span>
                  <span>📍 {personal.currentAddress}</span>
                </div>
              </div>
            </div>

            {/* Dense 3-Block Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[10.5px] space-y-0.5">
                <h4 className="font-bold text-slate-900 border-b pb-0.5 mb-1">{t.secPersonal}</h4>
                <p>DOB: {fnNum(personal.dob)}</p>
                <p>Age: {fnNum(personal.age)}</p>
                <p>Blood: {personal.bloodGroup}</p>
                <p>Height: {fnNum(personal.height)}</p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[10.5px] space-y-0.5">
                <h4 className="font-bold text-slate-900 border-b pb-0.5 mb-1">{t.secFamily}</h4>
                <p>Father: {family.fatherName}</p>
                <p>Mother: {family.motherName}</p>
                <p>Siblings: {fnNum(family.siblingsCount)}</p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[10.5px] space-y-0.5">
                <h4 className="font-bold text-slate-900 border-b pb-0.5 mb-1">{t.secSkills}</h4>
                {skills.slice(0, 4).map((s) => (
                  <p key={s.id} className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="font-bold">{fnNum(`${s.level}%`)}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase text-slate-800 border-b pb-0.5">
                {t.secVentures}
              </h3>
              <div className="space-y-1.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-[11px] leading-tight">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-900">{exp.role} — {exp.organization}</span>
                      <span className="text-slate-500 font-normal">{fnNum(exp.period)}</span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-600 text-[10px]">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase text-slate-800 border-b pb-0.5">
                {t.secEducation}
              </h3>
              <div className="space-y-1">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px] flex justify-between">
                    <span><strong className="text-slate-900">{edu.degree}</strong> ({edu.institution})</span>
                    <span className="text-slate-500">{fnNum(edu.yearOrSession)}</span>
                  </div>
                ))}
              </div>
            </div>

            {mode === 'matrimonial' && matrimonial.partnerExpectations && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[10.5px] text-rose-900">
                <span className="font-bold block mb-0.5">{t.secExpectations}:</span>
                <p>{matrimonial.partnerExpectations}</p>
              </div>
            )}
          </div>

          <div className="text-center text-[9px] text-slate-400 border-t pt-2">
            Creative Concept Point High-Density Metro Engine
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PAGE 2: CERTIFICATES & ATTACHMENTS (অতিরিক্ত সনদ ও সংযুক্তি) */}
      {/* ========================================================= */}
      {data.attachedDocuments && data.attachedDocuments.length > 0 && (
        <div
          className="print-page-break pt-8 px-8 pb-8 bg-white text-slate-800 relative flex flex-col justify-between border-t-8 border-slate-800 mt-6 min-h-[1123px]"
          style={{
            pageBreakBefore: 'always',
            breakBefore: 'page',
            boxSizing: 'border-box',
          }}
        >
          {/* Page 2 Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800">
              <div className="flex items-center gap-3">
                <CcpLogo size="sm" variant="monogram" />
                <div>
                  <h2 className="text-base font-black text-slate-900 tracking-wider uppercase">
                    {language === 'bn' ? 'সংযুক্তি ও সনদের অনুলিপি' : 'Certificates & Appendices'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {personal.fullName} — {language === 'bn' ? 'অতিরিক্ত অর্জন ও পেশাদার প্রমাণপত্র' : 'Documentary Evidences & Accreditations'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                  {language === 'bn' ? 'পৃষ্ঠা ২ / পরিশিষ্ট' : 'Page 2 / Annexure'}
                </span>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              {data.attachedDocuments.map((doc, idx) => (
                <div
                  key={doc.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="w-full h-56 bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img
                      src={doc.fileUrl}
                      alt={doc.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3.5 bg-white border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        {language === 'bn' ? `প্রমাণপত্র #${idx + 1}` : `Document #${idx + 1}`}
                      </span>
                      {doc.year && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {fnNum(doc.year)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs mt-1">
                      {doc.title}
                    </h3>
                    {doc.issuer && (
                      <p className="text-[11px] text-slate-600 mt-0.5 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span>{doc.issuer}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note & CCP verification watermark */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
            <span>
              {language === 'bn' ? 'ক্রিয়েটিভ কনসেপ্ট পয়েন্ট সিভি মেকার দ্বারা জেনারেটকৃত' : 'Generated by Creative Concept Point CV Maker'}
            </span>
            <span>
              {language === 'bn' ? 'প্রমাণিত ও সংরক্ষিত অনুলিপি' : 'Verified Electronic Copy'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
