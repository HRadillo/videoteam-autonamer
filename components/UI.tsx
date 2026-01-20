import React, { ReactNode } from 'react';

// --- WRAPPERS ---

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl ${className}`}>
    {children}
  </div>
);

export interface SectionLabelProps {
  children: ReactNode;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-2 opacity-80 pl-1">
    {children}
  </h3>
);

// --- INPUTS ---

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export const TextInput: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-xs font-medium text-zinc-400 ml-1">{label}</label>
    <input
      className="bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all placeholder-zinc-700"
      autoComplete="off"
      {...props}
    />
  </div>
);

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-xs font-medium text-zinc-400 ml-1">{label}</label>
    <div className="relative">
      <select
        className="w-full appearance-none bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all cursor-pointer"
        {...props}
      >
        <option value="" className="bg-zinc-900 text-zinc-500">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
            {opt.label} {opt.desc ? `— ${opt.desc}` : ''}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  </div>
);

// --- TOGGLES & CHECKBOXES ---

export interface SegmentedControlProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ label, options, value, onChange }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-xs font-medium text-zinc-400 ml-1">{label}</label>
    <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-300 ease-out ${
            value === opt.value
              ? 'bg-brand text-black shadow-[0_0_15px_rgba(246,244,157,0.4)] scale-[1.02] transform'
              : 'text-zinc-500 hover:text-white hover:bg-white/5'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  desc?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, desc }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`cursor-pointer group flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ease-out ${
      checked 
        ? 'bg-brand/10 border-brand/40 shadow-[0_0_15px_rgba(246,244,157,0.1)]' 
        : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
    }`}
  >
    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
      checked 
        ? 'bg-brand border-brand shadow-[0_0_10px_rgba(246,244,157,0.5)] scale-110' 
        : 'bg-black/40 border-white/20 group-hover:border-white/40'
    }`}>
      {checked && (
        <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <div>
      <div className={`text-sm font-medium transition-colors ${checked ? 'text-brand' : 'text-zinc-300'}`}>{label}</div>
      {desc && <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>}
    </div>
  </div>
);

// --- BUTTONS ---

export interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  const base = "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-out flex items-center justify-center gap-2 transform active:scale-[0.98]";
  const styles = variant === 'primary' 
    ? "bg-brand hover:bg-[#fffdcb] text-black shadow-[0_0_20px_rgba(246,244,157,0.3)] hover:shadow-[0_0_30px_rgba(246,244,157,0.5)] hover:scale-[1.02]"
    : "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20";
  
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};
