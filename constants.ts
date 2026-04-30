import { DropdownOption, FileTypeConfig } from './types';

// --- DATA DICTIONARIES ---

export const PRD_OPTIONS: DropdownOption[] = [
  { value: 'ACF', label: 'ACF', desc: 'Acne, Concealer, Foundation' },
  { value: 'ACN', label: 'ACN', desc: 'Acne' },
  { value: 'CNC', label: 'CNC', desc: 'Concealer' },
  { value: 'FOU', label: 'FOU', desc: 'Foundation' },
  { value: 'ASU', label: 'ASU', desc: 'Acne Supplement' },
  { value: 'CSU', label: 'CSU', desc: 'Collagen Supplement' },
  { value: 'ECZ', label: 'ECZ', desc: 'Eczema' },
  { value: 'NEC', label: 'NEC', desc: 'Neck' },
  { value: 'HYP', label: 'HYP', desc: 'Hyperpigmentation' },
  { value: 'TWL', label: 'TWL', desc: 'Cleansing Towels' },
  { value: 'AORL', label: 'AORL', desc: 'Acne Oral' },
  { value: 'ATOP', label: 'ATOP', desc: 'Acne Topical' },
  { value: 'ACLN', label: 'ACLN', desc: 'Acne Cleansing' },
];

export const TEC_OPTIONS: DropdownOption[] = [
  { value: 'CAM', label: 'CAM', desc: 'Camera Footage' },
  { value: 'iPH', label: 'iPH', desc: 'iPhone Footage' },
];

export const SCENE_OPTIONS: DropdownOption[] = [
  { value: 'PH', label: 'PH', desc: 'Product Hero' },
  { value: 'BFORE', label: 'BFORE', desc: 'Before' },
  { value: 'APPLY', label: 'APPLY', desc: 'Apply' },
  { value: 'AFTER', label: 'AFTER', desc: 'After' },
  { value: 'TSTOP', label: 'TSTOP', desc: 'Thumbstopper' },
  { value: 'GS', label: 'GS', desc: 'Green Screen' },
  { value: 'QUIZ', label: 'QUIZ', desc: 'Quiz Part' },
  { value: 'BROLL', label: 'BROLL', desc: 'B-Roll' },
  { value: 'RTT', label: 'RTT', desc: 'Real Time Transformation' },
];

export const PLATFORM_OPTIONS: DropdownOption[] = [
  { value: 'SHUTTER', label: 'SHUTTER', desc: 'Shutterstock' },
  { value: 'GETTY', label: 'GETTY', desc: 'Getty Images' },
  { value: 'TIKTOK', label: 'TIKTOK', desc: 'TikTok' },
  { value: 'INSTAGRAM', label: 'INSTAGRAM', desc: 'Instagram' },
  { value: 'SUNO', label: 'SUNO', desc: 'Suno AI' },
  { value: 'ELEVENLABS', label: 'ELEVENLABS', desc: 'ElevenLabs' },
];

export const ASPECT_RATIO_OPTIONS: DropdownOption[] = [
  { value: '9x16', label: '9x16', desc: 'Vertical (TikTok / Reels)' },
  { value: '16x9', label: '16x9', desc: 'Horizontal (YouTube / Desktop)' },
  { value: '1x1', label: '1x1', desc: 'Square (Instagram Feed)' },
  { value: '4x5', label: '4x5', desc: 'Portrait (Instagram Feed)' },
  { value: '4x3', label: '4x3', desc: 'Standard (Legacy)' },
];

// --- FILE TYPE CONFIGURATION ---

export const FILE_TYPES: FileTypeConfig[] = [
  // PRODUCTION
  {
    id: 'ihp',
    label: 'IHP Production',
    group: 'Production',
  },
  {
    id: 'micro',
    label: 'Micro Content',
    group: 'Production',
  },
  {
    id: 'selects',
    label: 'Selects',
    group: 'Production',
  },
  
  // SOCIAL
  {
    id: 'pcc',
    label: 'PCC',
    group: 'Social',
  },
  // Removed standalone 'celeb' as it is now a mode within PCC/IHP

  // ASSETS
  {
    id: 'screenshot',
    label: 'Screenshots',
    group: 'Assets',
  },
  {
    id: 'stock',
    label: 'Stock Footage',
    group: 'Assets',
  },

  // AI
  {
    id: 'ai',
    label: 'AI Footage',
    group: 'AI',
  },

  // AUDIO
  {
    id: 'vo',
    label: 'Voice Over',
    group: 'Audio',
  },
  {
    id: 'audio_assets',
    label: 'Music & SFX',
    group: 'Audio',
  },

  // PREMIERE
  {
    id: 'premiere_nested',
    label: 'Nested Sequence',
    group: 'Premiere',
  },
  {
    id: 'premiere_intro',
    label: 'Attached Intro Sequence',
    group: 'Premiere',
  },
  {
    id: 'premiere_normal',
    label: 'Attached Normal Sequence',
    group: 'Premiere',
  },
];