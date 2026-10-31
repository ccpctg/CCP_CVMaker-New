import React, { useState } from 'react';
import { Upload, Plus, Trash2, Award, FileText, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { AttachedDocument, Language } from '../../types/cv.js';

interface CertificatesSectionProps {
  documents: AttachedDocument[];
  onChange: (docs: AttachedDocument[]) => void;
  language: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  documents = [],
  onChange,
  language,
}) => {
  const isBn = language === 'bn';

  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileType, setNewFileType] = useState<'image' | 'pdf'>('image');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(isBn ? 'অনুগ্রহ করে একটি ছবি ফাইল আপলোড করুন (JPG, PNG)' : 'Please select an image file (JPG, PNG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      setNewFileUrl(result);
      if (!newTitle) {
        // Auto-fill title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setNewTitle(cleanName);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!newTitle.trim()) {
      alert(isBn ? 'অনুগ্রহ করে সনদের শিরোনাম দিন' : 'Please provide a document/certificate title');
      return;
    }

    const newDoc: AttachedDocument = {
      id: `doc_${Date.now()}`,
      title: newTitle.trim(),
      issuer: newIssuer.trim(),
      year: newYear.trim(),
      fileUrl: newFileUrl || 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80',
      fileType: newFileType,
    };

    onChange([...documents, newDoc]);
    setNewTitle('');
    setNewIssuer('');
    setNewYear('');
    setNewFileUrl('');
  };

  const handleRemove = (id: string) => {
    onChange(documents.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Intro info box */}
      <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-blue-500/10 border border-amber-500/30 p-4 rounded-xl">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <h4 className="font-bold text-amber-200 text-sm">
              {isBn ? 'অতিরিক্ত সনদ ও অর্জনের সংযুক্তি (Page 2 / Appendices)' : 'Certificates & Document Attachments (Page 2)'}
            </h4>
            <p className="text-slate-300 mt-1 leading-relaxed">
              {isBn
                ? 'আপনার শিক্ষাগত সনদ, জাতীয় পুরস্কার, কাজের পোর্টফোলিও বা অন্যান্য অর্জনের ছবি আপলোড করুন। এটি সিভি/বায়োডাটার সাথে পেজ-২ বা সংযুক্তি হিসেবে যুক্ত হবে এবং প্রিন্ট ও পিডিএফে সুন্দরভাবে বের হবে।'
                : 'Upload certificates, diplomas, awards, or work proofs. These will automatically generate a high-quality Page 2 appendix in print and PDF export.'}
            </p>
          </div>
        </div>
      </div>

      {/* New Attachment Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>{isBn ? 'নতুন সনদ বা অর্জন যুক্ত করুন' : 'Add New Certificate or Award'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {isBn ? 'সনদ/অর্জনের নাম *' : 'Certificate / Award Title *'}
            </label>
            <input
              type="text"
              placeholder={isBn ? 'যেমন: জাতীয় ক্যালিগ্রাফি প্রতিযোগিতা ২০২৪' : 'e.g. National Calligraphy Competition 2024'}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {isBn ? 'প্রদানকারী প্রতিষ্ঠান' : 'Issuing Organization'}
            </label>
            <input
              type="text"
              placeholder={isBn ? 'যেমন: বাংলাদেশ শিল্পকলা একাডেমি' : 'e.g. Bangladesh Shilpakala Academy'}
              value={newIssuer}
              onChange={(e) => setNewIssuer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {isBn ? 'সাল বা সেশন' : 'Year / Session'}
            </label>
            <input
              type="text"
              placeholder={isBn ? 'যেমন: ২০২৪' : 'e.g. 2024'}
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {isBn ? 'সনদের ছবি / ফাইল আপলোড' : 'Upload Certificate Image'}
            </label>
            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-2 text-xs text-amber-300 cursor-pointer transition font-medium">
                <Upload className="w-3.5 h-3.5" />
                <span>{newFileUrl ? (isBn ? 'ছবি পরিবর্তন করুন' : 'Change Image') : (isBn ? 'ফাইল সিলেক্ট করুন' : 'Select Image File')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview if selected */}
        {newFileUrl && (
          <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-slate-800">
            <img
              src={newFileUrl}
              alt="Preview"
              className="w-14 h-14 object-cover rounded-md border border-slate-700 shadow"
            />
            <div className="text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {isBn ? 'ছবি লোড সম্পন্ন' : 'Image loaded'}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">{newTitle || 'Untitled Attachment'}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'সংযুক্ত করুন' : 'Add to Appendices'}</span>
          </button>
        </div>
      </div>

      {/* List of current attachments */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>{isBn ? `সংযুক্ত সনদের তালিকা (${documents.length})` : `Attached Documents (${documents.length})`}</span>
        </h4>

        {documents.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
            <p>{isBn ? 'এখনো কোনো অতিরিক্ত সনদ বা ফাইল যোগ করা হয়নি।' : 'No attached certificates or documents yet.'}</p>
            <p className="text-[11px] text-slate-600 mt-1">
              {isBn ? 'উপরে ফর্ম পূরণ করে সনদ যুক্ত করুন।' : 'Use the form above to add certifications or award images.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition relative group"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                  <img
                    src={doc.fileUrl}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h5 className="font-bold text-slate-200 text-xs truncate">{doc.title}</h5>
                  {doc.issuer && (
                    <p className="text-[11px] text-slate-400 truncate">{doc.issuer}</p>
                  )}
                  {doc.year && (
                    <p className="text-[10px] text-amber-400 font-medium">{doc.year}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(doc.id)}
                  title={isBn ? 'মুছে ফেলুন' : 'Remove'}
                  className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
