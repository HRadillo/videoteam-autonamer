import React, { useState, useMemo } from 'react';
import { FILE_TYPES, PRD_OPTIONS, TEC_OPTIONS, SCENE_OPTIONS, PLATFORM_OPTIONS } from './constants';
import { FormState, FileTypeKey, FileTypeConfig } from './types';
import { generateFilename, padNumber } from './utils';
import { TextInput, Select, Card, ActionButton, SegmentedControl, Checkbox, SectionLabel } from './components/UI';
import { CopyIcon, CheckIcon, InfoIcon, MagicIcon, VideoIcon } from './components/Icons';

// --- INITIAL STATE ---
const INITIAL_STATE: FormState = {
  date: new Date(),
  ihpNum: '',
  micNum: '',
  vidNum: '',
  sceneNum: '',
  timecode: '',
  tec: '',
  prd: '',
  scene: '',
  platform: '',
  talentName: '',
  celebName: '',
  keywords: '',
  songName: '',
  composerName: '',
  gmmName: '',
  voiceName: '',
  sequenceType: '',
  
  // Toggles
  subType: 'video', 
  voType: 'gmm',
  aiType: 'generic',
  
  // Flags
  isGreenScreen: false,
  isRetouched: false,
  isProductVisible: false,
  isCeleb: false,
};

const App: React.FC = () => {
  const [activeType, setActiveType] = useState<FileTypeKey>('ihp');
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [copied, setCopied] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  // Group file types for sidebar
  const groups = useMemo(() => {
    const g: Record<string, FileTypeConfig[]> = {};
    FILE_TYPES.forEach(t => {
      if (!g[t.group]) g[t.group] = [];
      g[t.group].push(t);
    });
    return g;
  }, []);

  const currentConfig: FileTypeConfig = FILE_TYPES.find(t => t.id === activeType) || FILE_TYPES[0];

  // Helper to update state
  const setField = (field: keyof FormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlurNumber = (field: keyof FormState, length: number) => {
    const val = formData[field] as string;
    if (val) setField(field, padNumber(val, length));
  };

  const generatedName = useMemo(() => generateFilename(activeType, formData), [activeType, formData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- DYNAMIC FORM LOGIC ---
  const renderFormContent = () => {
    const commonDate = (
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-medium text-zinc-400 ml-1">Date</label>
        <input
          type="date"
          className="bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand transition-all [color-scheme:dark]"
          value={formData.date.toISOString().split('T')[0]}
          onChange={(e) => setField('date', new Date(e.target.value))}
        />
      </div>
    );

    const prdSelect = <Select label="Product" options={PRD_OPTIONS} value={formData.prd} onChange={(e) => setField('prd', e.target.value)} />;
    const tecSelect = <Select label="Technology" options={TEC_OPTIONS} value={formData.tec} onChange={(e) => setField('tec', e.target.value)} />;
    const sceneSelect = <Select label="Scene Type" options={SCENE_OPTIONS} value={formData.scene} onChange={(e) => setField('scene', e.target.value)} />;
    
    const platformInput = <TextInput label="Platform" placeholder="e.g. Shutterstock" value={formData.platform} onChange={(e) => setField('platform', e.target.value)} />;
    
    const talentInput = <TextInput label="Talent Name" placeholder="NameLastName" value={formData.talentName} onChange={(e) => setField('talentName', e.target.value)} />;
    const celebInput = <TextInput label="Celeb Name" placeholder="NameLastName" value={formData.celebName} onChange={(e) => setField('celebName', e.target.value)} />;
    const keywordsInput = <TextInput label="Keywords / Description" placeholder="e.g. green screen happy" value={formData.keywords} onChange={(e) => setField('keywords', e.target.value)} />;
    const ihpInput = <TextInput label="IHP #" placeholder="001" value={formData.ihpNum} onChange={(e) => setField('ihpNum', e.target.value)} onBlur={() => handleBlurNumber('ihpNum', 3)} />;
    const micInput = <TextInput label="MIC #" placeholder="001" value={formData.micNum} onChange={(e) => setField('micNum', e.target.value)} onBlur={() => handleBlurNumber('micNum', 3)} />;
    const sceneNumInput = <TextInput label="Scene #" placeholder="01" value={formData.sceneNum} onChange={(e) => setField('sceneNum', e.target.value)} onBlur={() => handleBlurNumber('sceneNum', 2)} />;
    const tcInput = <TextInput label="Start Frame / TC" placeholder="000000" value={formData.timecode} onChange={(e) => setField('timecode', e.target.value)} />;

    // Conditional Rendering Block
    switch (activeType) {
      
      case 'ihp':
        return (
          <>
            <div className="md:col-span-2 flex gap-4">
              <div className="flex-1">
                <SegmentedControl 
                  label="Media Type" 
                  options={[{label: 'Video', value: 'video'}, {label: 'Photos', value: 'photo'}]} 
                  value={formData.subType === 'photo' ? 'photo' : 'video'}
                  onChange={(v) => setField('subType', v)}
                />
              </div>
              <div className="flex items-end pb-1">
                 <Checkbox label="Celeb?" checked={formData.isCeleb} onChange={(v) => setField('isCeleb', v)} />
              </div>
            </div>
            {commonDate}
            {!formData.isCeleb && ihpInput}
            {tecSelect}
            {prdSelect}
            {!formData.isCeleb && sceneSelect}
            {/* Celeb IHP doesn't use Scene or Number in the provided example, only Tech/Prd/CelebName */}
            {formData.subType === 'photo' && !formData.isCeleb && sceneNumInput}
            
            {formData.isCeleb ? celebInput : talentInput}
            
            <div className="md:col-span-2 pt-2 flex flex-wrap gap-4">
              <Checkbox label="Green Screen?" desc="Adds GS suffix" checked={formData.isGreenScreen} onChange={(v) => setField('isGreenScreen', v)} />
              <Checkbox label="Retouched?" desc="Adds suffix & TC" checked={formData.isRetouched} onChange={(v) => setField('isRetouched', v)} />
            </div>
            {formData.isRetouched && (
                <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2">
                    {tcInput}
                </div>
            )}
          </>
        );

      case 'pcc':
        return (
          <>
            <div className="md:col-span-2 flex gap-4">
              <div className="flex-1">
                 <SegmentedControl 
                    label="Media Type" 
                    options={[{label: 'Video', value: 'video'}, {label: 'Photos', value: 'photo'}]} 
                    value={formData.subType === 'photo' ? 'photo' : 'video'}
                    onChange={(v) => setField('subType', v)}
                  />
              </div>
               <div className="flex items-end pb-1">
                 <Checkbox label="Celeb?" checked={formData.isCeleb} onChange={(v) => setField('isCeleb', v)} />
              </div>
            </div>
            {commonDate}
            {prdSelect}
            {formData.isCeleb ? celebInput : talentInput}
            {formData.subType === 'photo' && sceneNumInput}
            
            <div className="md:col-span-2 pt-2 flex flex-wrap gap-4">
              <Checkbox label="Green Screen?" desc="Adds GS suffix" checked={formData.isGreenScreen} onChange={(v) => setField('isGreenScreen', v)} />
              <Checkbox label="Retouched?" desc="Adds suffix & TC" checked={formData.isRetouched} onChange={(v) => setField('isRetouched', v)} />
            </div>
            {formData.isRetouched && (
                <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2">
                    {tcInput}
                </div>
            )}
          </>
        );

      case 'micro':
        return (
          <>
            {commonDate}
            {micInput}
            {tecSelect}
            {prdSelect}
            {sceneSelect}
            {keywordsInput}
             <div className="md:col-span-2 pt-2">
              <Checkbox label="Retouched?" desc="Adds suffix & TC" checked={formData.isRetouched} onChange={(v) => setField('isRetouched', v)} />
            </div>
             {formData.isRetouched && (
                <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2">
                    {tcInput}
                </div>
            )}
          </>
        );
      
      case 'selects':
        return (
          <>
            {/* Strict selects format only */}
            {commonDate}
            {ihpInput}
            {tecSelect}
            {prdSelect}
            {sceneSelect}
            {talentInput}
          </>
        );

      case 'screenshot':
        return (
          <>
             <div className="md:col-span-2">
               <SegmentedControl 
                  label="Source Type" 
                  options={[{label: 'Video', value: 'video'}, {label: 'Still', value: 'still'}]} 
                  value={formData.subType === 'still' ? 'still' : 'video'}
                  onChange={(v) => setField('subType', v === 'sfx' ? 'sfx' : 'video')}
                />
            </div>
            {commonDate}
            {prdSelect}
            {formData.subType === 'video' ? sceneSelect : sceneNumInput}
            {formData.subType === 'video' ? talentInput : keywordsInput}
            <div className="md:col-span-2 pt-2">
              <Checkbox label="Retouched?" desc="Adds suffix & TC" checked={formData.isRetouched} onChange={(v) => setField('isRetouched', v)} />
            </div>
            {formData.isRetouched && formData.subType === 'video' && (
                <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2">
                    {tcInput}
                </div>
            )}
          </>
        );
      
      case 'stock':
        return (
          <>
            {platformInput}
            <TextInput label="File ID" placeholder="Number" value={formData.vidNum} onChange={(e) => setField('vidNum', e.target.value)} />
            {keywordsInput}
          </>
        );

      case 'ai':
        return (
          <>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">Generation Source</label>
              <select 
                className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand"
                value={formData.aiType}
                onChange={(e) => setField('aiType', e.target.value)}
              >
                <option value="generic">AI Image/Footage (Standard)</option>
                <option value="from_pcc">Based on PCC Asset</option>
                <option value="from_ihp">Based on IHP Asset</option>
              </select>
            </div>
            
            {/* Generic Type Checkbox for Product */}
            {formData.aiType === 'generic' && (
                <div className="md:col-span-2 pt-1 pb-2">
                    <Checkbox 
                        label="Product Visible?" 
                        checked={formData.isProductVisible} 
                        onChange={(v) => setField('isProductVisible', v)}
                        desc="Includes product code in filename"
                    />
                </div>
            )}

            {commonDate}
            
            {/* Show PRD if explicitly Product-based or checking the box */}
            {(formData.aiType !== 'generic' || formData.isProductVisible) && prdSelect}
            
            {(formData.aiType === 'from_pcc' || formData.aiType === 'from_ihp') && talentInput}
            {keywordsInput}
          </>
        );

      case 'vo':
         return (
          <>
             <div className="md:col-span-2">
              <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">VO Category</label>
              <select 
                className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand"
                value={formData.voType}
                onChange={(e) => setField('voType', e.target.value)}
              >
                <option value="gmm">Standard GMM</option>
                <option value="ai_gmm">AI GMM</option>
                <option value="ai_pcc">AI PCC</option>
                <option value="tiktok">TikTok</option>
                <option value="random_ai">Random AI</option>
              </select>
            </div>
            {commonDate}
            {prdSelect}
            <TextInput label="Video ID" placeholder="###.##" value={formData.vidNum} onChange={(e) => setField('vidNum', e.target.value)} />
            <TextInput label="Sequence" placeholder="SEQ or T" value={formData.sequenceType} onChange={(e) => setField('sequenceType', e.target.value)} />
            
            {(formData.voType === 'gmm' || formData.voType === 'ai_gmm') && (
               <TextInput label="GMM Name" placeholder="Name" value={formData.gmmName} onChange={(e) => setField('gmmName', e.target.value)} />
            )}
            {formData.voType === 'ai_pcc' && talentInput}
            {formData.voType === 'random_ai' && (
              <>
                {platformInput}
                <TextInput label="Voice Name" placeholder="Voice Name" value={formData.voiceName} onChange={(e) => setField('voiceName', e.target.value)} />
              </>
            )}
            
            {keywordsInput}
            <div className="md:col-span-2 pt-2">
              <Checkbox label="Audiotuned?" desc="Appends AUDIOTUNED" checked={formData.isRetouched} onChange={(v) => setField('isRetouched', v)} />
            </div>
          </>
         );

      case 'audio_assets':
        return (
          <>
             <div className="md:col-span-2">
               <SegmentedControl 
                  label="Audio Type" 
                  options={[{label: 'Music', value: 'music'}, {label: 'SFX', value: 'sfx'}]} 
                  value={formData.subType === 'sfx' ? 'sfx' : 'music'}
                  onChange={(v) => setField('subType', v === 'sfx' ? 'sfx' : 'video')}
                />
            </div>
            {platformInput}
            {formData.subType === 'sfx'
              ? (
<TextInput
                    label="Description"
                    placeholder="SFXDescription"
                    value={formData.keywords}
                    onChange={(e) => setField('keywords', e.target.value)}
                  />
                )
              : (<>
<TextInput
                    label="Song Name"
                    placeholder="SongName"
                    value={formData.songName}
                    onChange={(e) => setField('songName', e.target.value)}
                  />
                  <TextInput
                    label="Composer"
                    placeholder="ComposerName"
                    value={formData.composerName}
                    onChange={(e) => setField('composerName', e.target.value)}
                  />
                </>)
            }
          </>
        );

      default:
        return <div className="text-red-500">Selection Error</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden selection:bg-brand/30 selection:text-black">
      
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-white/10 bg-black/50 overflow-y-auto hidden md:block">
        <div className="p-6 sticky top-0 bg-black/95 backdrop-blur-sm z-10 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand rounded-xl flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_rgba(246,244,157,0.2)]">
               <VideoIcon className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none text-white tracking-tight mb-1">Autonamer</h1>
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest leading-none">Video Team V2</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-6">
          {Object.entries(groups).map(([groupName, types]) => (
            <div key={groupName}>
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{groupName}</h4>
              <div className="space-y-1">
                {(types as FileTypeConfig[]).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                        setActiveType(type.id);
                        // Reset defaults on switch
                        setField('subType', type.id === 'ihp' ? 'video' : type.id === 'pcc' ? 'video' : 'video');
                        setField('isCeleb', false);
                        setField('isRetouched', false);
                        setField('isProductVisible', false);
                        setField('timecode', '');
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      activeType === type.id 
                        ? 'bg-brand/20 text-brand font-medium border border-brand/10 shadow-[0_0_10px_rgba(246,244,157,0.1)]' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* MOBILE HEADER */}
        <div className="md:hidden p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                    <VideoIcon className="w-4 h-4 text-black" />
                 </div>
                 <div>
                    <div className="font-bold text-sm text-white leading-none">Autonamer</div>
                    <div className="text-[9px] font-bold text-brand uppercase tracking-wider leading-none mt-0.5">Video Team V2</div>
                 </div>
            </div>
            <select 
                className="bg-black text-xs border border-white/20 rounded p-1"
                value={activeType}
                onChange={(e) => setActiveType(e.target.value as FileTypeKey)}
            >
                {FILE_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
        </div>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-40">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {currentConfig.label}
                </h2>
                <p className="text-zinc-500 mt-2 text-sm">Configure parameters for standardized naming.</p>
              </div>
              <button 
                onClick={() => setShowLegend(true)}
                className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-brand transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/5"
              >
                <InfoIcon />
                <span>LEXICON</span>
              </button>
            </div>

            {/* Dynamic Form Grid */}
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderFormContent()}
            </Card>

            {/* Hint / Helper Text */}
             <div className="flex gap-4">
                <div className="p-4 rounded-xl border border-brand/20 bg-brand/5 w-full flex items-start gap-3">
                    <div className="mt-1 text-brand"><MagicIcon /></div>
                    <div>
                        <h4 className="text-sm font-semibold text-brand">Smart Formatting Active</h4>
                        <p className="text-xs text-brand/60 mt-1 leading-relaxed">
                            Spaces removed. Keywords hyphenated. Numbers padded.
                        </p>
                    </div>
                </div>
             </div>

          </div>
        </div>

        {/* STICKY BOTTOM BAR */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-1 shadow-2xl flex flex-col md:flex-row items-center gap-4 pl-6 pr-2 py-2">
              <div className="flex-1 w-full text-center md:text-left overflow-hidden">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">Generated Output</div>
                <div className="text-lg md:text-xl font-mono text-white truncate selection:bg-brand/50 selection:text-black">
                  {generatedName}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <ActionButton onClick={copyToClipboard} variant="primary">
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  <span>{copied ? 'Copied' : 'Copy Name'}</span>
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* LEGEND MODAL */}
        {showLegend && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
              <div className="p-6 border-b border-white/5 flex justify-between items-start bg-white/5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/90 flex items-center justify-center text-black">
                    <InfoIcon />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white leading-tight">Video Team Lexicon</div>
                    <div className="text-[11px] uppercase tracking-widest text-brand/80 font-bold mt-1">Naming Conventions Reference</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowLegend(false)}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Close lexicon"
                  title="Close"
                >
                  ×
                </button>
              </div>
              <div className="overflow-y-auto p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <SectionLabel>Basic Concept Names</SectionLabel>
                      <div className="space-y-2">
                        {[
                          ['IHP', 'in house production'],
                          ['TEC', 'technology'],
                          ['PRD', 'product catalog'],
                          ['SCENE', 'scene'],
                          ['CAM', 'camera footage'],
                          ['iPH', 'iphone footage'],
                          ['SFX', 'sound effects'],
                          ['VO', 'voice over'],
                          ['T', 'title'],
                          ['SEQ', 'sequence body'],
                          ['GMM1', 'growth marketing manager'],
                          ['AUT', 'authority'],
                        ].map(([code, desc]) => (
                          <div key={code} className="flex items-center justify-between text-xs text-zinc-300 border border-white/5 rounded-lg px-3 py-2 bg-white/5">
                            <span className="font-mono font-bold text-brand">{code}</span>
                            <span className="text-zinc-400">{desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <SectionLabel>Technology (TEC)</SectionLabel>
                      <div className="space-y-2">
                        {TEC_OPTIONS.map(o => (
                          <div key={o.value} className="flex items-center justify-between text-xs text-zinc-300 border border-white/5 rounded-lg px-3 py-2 bg-white/5">
                            <span className="font-mono font-bold text-brand">{o.value}</span>
                            <span className="text-zinc-400">{o.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <SectionLabel>Product Catalog Codenames (PRD)</SectionLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {PRD_OPTIONS.map(o => (
                          <div key={o.value} className="text-xs text-zinc-300 border border-white/5 rounded-lg px-3 py-2 bg-white/5">
                            <div className="font-mono font-bold text-brand">{o.value}</div>
                            <div className="text-zinc-400">{o.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <SectionLabel>Scenes</SectionLabel>
                      <div className="space-y-2">
                        {SCENE_OPTIONS.map(o => (
                          <div key={o.value} className="flex items-center justify-between text-xs text-zinc-300 border border-white/5 rounded-lg px-3 py-2 bg-white/5">
                            <span className="font-mono font-bold text-brand">{o.value}</span>
                            <span className="text-zinc-400">{o.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-zinc-500 leading-relaxed border border-white/5 rounded-lg px-4 py-3 bg-white/5">
                      Tip: In dropdowns, you can type to filter options. Codes are case-insensitive in the generator.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
