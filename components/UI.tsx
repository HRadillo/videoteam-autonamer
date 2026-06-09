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

export interface SearchableSelectProps {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  allowCustom?: boolean;
  sanitizeCustom?: (value: string) => string;
  className?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Type to search...',
  allowCustom = false,
  sanitizeCustom = (nextValue) => nextValue,
  className = '',
}) => {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);
  const customValue = sanitizeCustom(q);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter(o => `${o.value} ${o.label} ${o.desc ?? ''}`.toLowerCase().includes(s));
  }, [q, options]);

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const selectValue = (nextValue: string) => {
    onChange(nextValue);
    setQ('');
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col space-y-1.5 ${className}`}>
      <label className="text-xs font-medium text-zinc-400 ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`h-[46px] w-full overflow-hidden bg-black/40 border text-white text-sm rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-left ${
          open ? 'border-brand/60 ring-1 ring-brand/40' : 'border-white/10 hover:border-white/20'
        }`}
        aria-expanded={open}
      >
        {value ? (
          <span className="flex min-w-0 items-center justify-between gap-3">
            <span className="font-mono font-bold text-brand">{value}</span>
            <span className="truncate text-xs text-zinc-400">{selected?.desc || selected?.label || 'Custom scene'}</span>
          </span>
        ) : (
          <span className="text-zinc-500">{placeholder}</span>
        )}
        <span className="pointer-events-none absolute right-3 top-[34px] text-zinc-500">
          <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all placeholder-zinc-700"
          />

          <div className="mt-3 max-h-64 overflow-y-auto pr-1 space-y-1.5">
            {filtered.map((opt) => {
              const checked = value === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => selectValue(opt.value)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-2 rounded-lg border transition-colors ${
                    checked
                      ? 'bg-brand/10 border-brand/40'
                      : 'bg-black/10 border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                    checked ? 'bg-brand border-brand text-black' : 'bg-black/40 border-white/20'
                  }`}>
                    {checked && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex min-w-0 items-center justify-between gap-3">
                      <span className="font-mono font-bold text-brand">{opt.value}</span>
                      <span className="truncate text-xs text-zinc-400">{opt.label}</span>
                    </span>
                    {opt.desc && <span className="mt-0.5 block truncate text-xs text-zinc-500">{opt.desc}</span>}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-xs text-zinc-500 px-2 py-3">No matches.</div>
            )}
          </div>

          {allowCustom && customValue && !options.some((opt) => opt.value === customValue) && (
            <button
              type="button"
              onClick={() => selectValue(customValue)}
              className="mt-3 w-full rounded-lg border border-brand/30 bg-brand/10 px-3 py-2 text-left text-xs text-brand transition-colors hover:bg-brand/15"
            >
              Use custom: <span className="font-mono font-bold">{customValue}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// --- MULTI SELECT (searchable, checkbox list) ---

export interface MultiSelectProps {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  values,
  onChange,
  placeholder = 'Type to search...',
  className = '',
}) => {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter(o => `${o.value} ${o.label} ${o.desc ?? ''}`.toLowerCase().includes(s));
  }, [q, options]);

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const toggle = (val: string) => {
    if (values.includes(val)) onChange(values.filter(v => v !== val));
    else onChange([...values, val]);
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col space-y-1.5 ${className}`}>
      <label className="text-xs font-medium text-zinc-400 ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`h-[46px] w-full overflow-hidden bg-black/40 border text-white text-sm rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-left ${
          open ? 'border-brand/60 ring-1 ring-brand/40' : 'border-white/10 hover:border-white/20'
        }`}
        aria-expanded={open}
      >
        {values.length === 0 ? (
          <span className="text-zinc-500">Select...</span>
        ) : (
          <span className="flex min-w-0 items-center gap-1.5 overflow-hidden">
            {values.slice(0, 3).map((value, index) => (
              <span key={value} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
                <span className="font-bold text-brand">#{index + 1}</span>
                <span className="font-mono">{value}</span>
              </span>
            ))}
            {values.length > 3 && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-400">
                +{values.length - 3}
              </span>
            )}
          </span>
        )}
        <span className="pointer-events-none absolute right-3 top-[34px] text-zinc-500">
          <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all placeholder-zinc-700"
        />

        <div className="mt-3 max-h-64 overflow-y-auto pr-1 space-y-1.5">
          {filtered.map((opt) => {
            const checked = values.includes(opt.value);
            const selectionIndex = values.indexOf(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={`w-full text-left flex items-start gap-3 px-3 py-2 rounded-lg border transition-colors ${
                  checked
                    ? 'bg-brand/10 border-brand/40'
                    : 'bg-black/10 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                    checked ? 'bg-brand border-brand text-black' : 'bg-black/40 border-white/20'
                  }`}
                >
                  {checked && (
                    <span className="text-[10px] font-bold leading-none">#{selectionIndex + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <span className="font-mono font-bold text-brand">{opt.value}</span>
                    <span className="truncate text-xs text-zinc-400">{opt.label}</span>
                  </div>
                  {opt.desc && <div className="mt-0.5 truncate text-xs text-zinc-500">{opt.desc}</div>}
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-xs text-zinc-500 px-2 py-3">No matches.</div>
          )}
        </div>

        {values.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/5 pt-3 text-[11px] text-zinc-500">
            <span className="truncate">Output follows naming hierarchy.</span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/5"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

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
