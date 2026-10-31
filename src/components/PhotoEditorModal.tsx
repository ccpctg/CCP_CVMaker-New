import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { X, ZoomIn, ZoomOut, Upload, RotateCcw, Check, Sparkles } from 'lucide-react';
import { PersonalDetails } from '../types/cv.js';

interface PhotoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  personal: PersonalDetails;
  onSave: (updates: Partial<PersonalDetails>) => void;
  accentColor: string;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  isOpen,
  onClose,
  personal,
  onSave,
  accentColor,
}) => {
  if (!isOpen) return null;

  const [photoUrl, setPhotoUrl] = useState<string>(
    personal.photoUrl || '/assets/aistudio/Minhaj_Bio-data_14f425df.jpg'
  );
  const [zoom, setZoom] = useState<number>(personal.photoZoom || 1.15);
  const [offset, setOffset] = useState<{ x: number; y: number }>(
    personal.photoOffset || { x: 0, y: -20 }
  );
  const [shape, setShape] = useState<'circle' | 'rounded' | 'square'>(
    personal.photoShape || 'circle'
  );

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mouse drag handlers
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: offset.x,
      initY: offset.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    setOffset({
      x: dragStartRef.current.initX + dx,
      y: dragStartRef.current.initY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile / touch devices
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      dragStartRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        initX: offset.x,
        initY: offset.y,
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.startX;
    const dy = touch.clientY - dragStartRef.current.startY;
    setOffset({
      x: dragStartRef.current.initX + dx,
      y: dragStartRef.current.initY + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Upload custom photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setOffset({ x: 0, y: 0 });
          setZoom(1.0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = () => {
    onSave({
      photoUrl,
      photoZoom: zoom,
      photoOffset: offset,
      photoShape: shape,
    });
    onClose();
  };

  const handleResetPosition = () => {
    setOffset({ x: 0, y: 0 });
    setZoom(1.0);
  };

  const handleLoadCcpDefault = () => {
    setPhotoUrl('/assets/aistudio/Minhaj_Bio-data_14f425df.jpg');
    setZoom(1.15);
    setOffset({ x: 0, y: -20 });
    setShape('circle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-base font-semibold text-white">
              প্রোফাইল ছবি এডিটর ও ক্রপ (Photo Editor & Cropper)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Interactive Crop Viewport */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`relative overflow-hidden cursor-grab active:cursor-grabbing border-4 shadow-2xl transition-all ${
                shape === 'circle'
                  ? 'rounded-full w-56 h-56'
                  : shape === 'rounded'
                  ? 'rounded-3xl w-56 h-56'
                  : 'rounded-xl w-56 h-56'
              }`}
              style={{
                borderColor: accentColor || '#fbbf24',
                boxShadow: `0 0 25px ${accentColor || '#fbbf24'}40`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={(e) => {
                e.preventDefault();
                setZoom((z) => Math.min(3.0, Math.max(0.5, z - e.deltaY * 0.002)));
              }}
            >
              <img
                src={photoUrl}
                alt="Profile Preview"
                draggable={false}
                className="absolute max-w-none select-none pointer-events-none transition-transform duration-75"
                style={{
                  width: `${100 * zoom}%`,
                  height: `${100 * zoom}%`,
                  objectFit: 'cover',
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                }}
              />
              {/* Overlay crosshair hint & rule of thirds */}
              <div className="absolute inset-0 border border-white/20 pointer-events-none rounded-inherit grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400 font-medium text-center">
              মাউস দিয়ে টেনে পজিশন করুন বা স্ক্রোল করে জুম করুন (Drag to pan • Scroll to zoom)
            </p>
          </div>

          {/* Zoom Slider Control with Step Buttons */}
          <div className="space-y-2 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <ZoomOut className="w-3.5 h-3.5 text-slate-400" />
                জুম কন্ট্রোল (Zoom Control)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  -
                </button>
                <span className="text-amber-400 font-bold w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3.0, z + 0.1))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <ZoomIn className="w-4 h-4 text-slate-400" />
            </div>

            {/* Fine Directional Nudge Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-400">
              <span>সূক্ষ্ম পজিশনিং (Fine Nudge):</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, y: o.y - 10 }))}
                  className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, y: o.y + 10 }))}
                  className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, x: o.x - 10 }))}
                  className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  title="Move Left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, x: o.x + 10 }))}
                  className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  title="Move Right"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Shape Select & Actions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                ছবির ফ্রেমের আকার (Frame Shape)
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setShape('circle')}
                  className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    shape === 'circle' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বৃত্তাকার
                </button>
                <button
                  type="button"
                  onClick={() => setShape('rounded')}
                  className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    shape === 'rounded' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  রাউন্ডেড
                </button>
                <button
                  type="button"
                  onClick={() => setShape('square')}
                  className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    shape === 'square' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বর্গাকার
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                অ্যাকশন (Actions)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  নতুন ছবি
                </button>
                <button
                  type="button"
                  onClick={handleResetPosition}
                  title="রিসেট পজিশন"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick link to restore reference image */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleLoadCcpDefault}
              className="text-xs text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              ক্রিয়েটিভ কনসেপ্ট পয়েন্ট মূল রেফারেন্স ছবি ব্যবহার করুন
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            বাতিল (Cancel)
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-lg transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            সংরক্ষণ ও প্রয়োগ (Save & Apply)
          </button>
        </div>
      </div>
    </div>
  );
};
