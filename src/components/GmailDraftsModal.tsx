import React, { useState, useEffect } from 'react';
import { Mail, X, Save, Trash2, FolderOpen, Download, Upload, CheckCircle2, UserCheck } from 'lucide-react';
import { CVData, SavedDraft } from '../types/cv.js';

interface GmailDraftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CVData;
  onLoadDraft: (draftData: CVData) => void;
}

const DRAFTS_KEY = 'ccp_cv_saved_drafts_v1';
const GMAIL_USER_KEY = 'ccp_cv_user_email_v1';

export const GmailDraftsModal: React.FC<GmailDraftsModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onLoadDraft,
}) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem(GMAIL_USER_KEY) || currentData.personal?.email || '';
  });
  const [draftName, setDraftName] = useState('');
  const [drafts, setDrafts] = useState<SavedDraft[]>(() => {
    try {
      const saved = localStorage.getItem(DRAFTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState('');

  const showNote = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem(GMAIL_USER_KEY, email);
      showNote('গুগল অ্যাকাউন্ট ইমেইল যুক্ত হয়েছে!');
    }
  };

  const handleSaveCurrentDraft = () => {
    const title = draftName.trim() || `${currentData.personal.fullName || 'আমার সিভি'} (${new Date().toLocaleDateString()})`;
    const newDraft: SavedDraft = {
      id: `draft-${Date.now()}`,
      name: title,
      updatedAt: new Date().toLocaleString(),
      email: email || undefined,
      data: currentData,
    };

    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
    setDraftName('');
    showNote('নতুন ড্রাফট সফলভাবে সেভ হয়েছে!');
  };

  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
    showNote('ড্রাফট মুছে ফেলা হয়েছে।');
  };

  const handleLoadSelectedDraft = (draft: SavedDraft) => {
    onLoadDraft(draft.data);
    showNote(`"${draft.name}" লোড করা হয়েছে!`);
    setTimeout(onClose, 800);
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(drafts, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `CCP_CV_Drafts_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    dl.click();
    showNote('ড্রাফট ব্যাকআপ ফাইল ডাউনলোড সম্পন্ন!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>গুগল ড্রাফট ও ক্লাউড ব্যাকআপ (Google Sync)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  ঐচ্ছিক
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                আপনার বিভিন্ন সিভির খসড়া নিরাপদে সংরক্ষণ করুন এবং যেকোনো সময় এক ক্লিকে লোড করুন।
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

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs">
          {notification && (
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Email / Gmail Account Field */}
          <form onSubmit={handleSaveEmail} className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-slate-300 font-semibold">
              আপনার গুগল / জিমেইল অ্যাকাউন্ট (Gmail Sync ID):
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
              >
                সেভ
              </button>
            </div>
          </form>

          {/* Save current data as draft */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-semibold">
              বর্তমান সিভি একটি নতুন ড্রাফট হিসেবে সেভ করুন:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="যেমন: আমার কর্পোরেট জব সিভি / পাত্রের বায়োডাটা"
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleSaveCurrentDraft}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ড্রাফট সেভ</span>
              </button>
            </div>
          </div>

          {/* List of saved drafts */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-semibold">
                সংরক্ষিত ড্রাফট তালিকা ({drafts.length}):
              </span>
              {drafts.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>ব্যাকআপ ফাইল ডাউনলোড</span>
                </button>
              )}
            </div>

            {drafts.length === 0 ? (
              <p className="text-slate-500 text-center py-4 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                এখনো কোনো ড্রাফট সেভ করা নেই। ওপরের বাটনে ক্লিক করে বর্তমান সিভি সেভ করতে পারেন।
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div>
                      <h4 className="font-bold text-white text-xs">{d.name}</h4>
                      <p className="text-[10px] text-slate-500">আপডেট: {d.updatedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadSelectedDraft(d)}
                        className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-semibold text-xs border border-slate-700 transition cursor-pointer"
                      >
                        <FolderOpen className="w-3 h-3" />
                        <span>লোড</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDraft(d.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
