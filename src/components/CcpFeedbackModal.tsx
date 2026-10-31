import React, { useState } from 'react';
import { MessageSquare, X, Star, Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { CcpLogo } from './CcpLogo.js';

interface CcpFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
}

export const CcpFeedbackModal: React.FC<CcpFeedbackModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const [rating, setRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'praise' | 'issue' | 'order'>(
    'suggestion'
  );
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Construct WhatsApp message URL for direct delivery to CCP
    const whatsappText = encodeURIComponent(
      `[CCP CV Maker Feedback]\nনাম: ${senderName || 'Anonymous'}\nফোন: ${senderPhone || 'N/A'}\nরেটিং: ${rating} Stars\nধরন: ${feedbackType}\nবার্তা: ${message}`
    );
    const waUrl = `https://wa.me/8801571247902?text=${whatsappText}`;

    // Open WhatsApp in new tab or trigger mail
    window.open(waUrl, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <CcpLogo size="sm" variant="monogram" />
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>
                  {isBn ? 'ক্রিয়েটিভ কনসেপ্ট পয়েন্ট (CCP) ফিডব্যাক' : 'Feedback to Creative Concept Point'}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'আপনার মূল্যবান মতামত আমাদের আরও নিখুঁত সেবা দিতে সাহায্য করবে।'
                  : 'Your direct feedback helps us continuously improve.'}
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

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">
              {isBn ? 'ধন্যবাদ! আপনার ফিডব্যাক পাঠানো হয়েছে।' : 'Thank you! Your feedback has been sent.'}
            </h4>
            <p className="text-xs text-slate-400">
              {isBn
                ? 'Creative Concept Point টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।'
                : 'Creative Concept Point team will review your feedback shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Star Rating */}
            <div className="flex flex-col items-center justify-center gap-1.5 py-2 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-300 font-semibold">
                {isBn ? 'অ্যাপের অভিজ্ঞতা রেট করুন:' : 'Rate Your Experience:'}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isBn ? 'ফিডব্যাকের ধরন:' : 'Feedback Type:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setFeedbackType('suggestion')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition cursor-pointer text-center ${
                    feedbackType === 'suggestion'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '💡 সাজেশন' : 'Suggestion'}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('praise')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition cursor-pointer text-center ${
                    feedbackType === 'praise'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '⭐ প্রশংসা' : 'Praise'}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('issue')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition cursor-pointer text-center ${
                    feedbackType === 'issue'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '🐛 সমস্যা' : 'Bug/Issue'}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('order')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition cursor-pointer text-center ${
                    feedbackType === 'order'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '🎨 কাস্টম কাজ' : 'Custom Work'}
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">{isBn ? 'আপনার নাম' : 'Your Name'}</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. মোঃ তানভীর"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{isBn ? 'মোবাইল নম্বর' : 'Phone'}</label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isBn ? 'আপনার বার্তা / পরামর্শ লিখুন *' : 'Your Feedback Message *'}
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isBn
                    ? 'আপনার অনুভূতি, অতিরিক্ত কী ফিচার চান বা কোনো সমস্যা থাকলে বিস্তারিত লিখুন...'
                    : 'Share your thoughts, suggestions, or any custom design request...'
                }
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none font-bengali"
              />
            </div>

            {/* Agency Contact Footer */}
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-teal-400 font-medium">
                <Phone className="w-3.5 h-3.5" /> 01571-247902
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <Mail className="w-3.5 h-3.5" /> creativeconceptpoint@gmail.com
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold shadow-lg transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isBn ? 'সরাসরি CCP-তে পাঠান' : 'Send to CCP'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
