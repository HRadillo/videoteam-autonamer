export interface FormState {
  // Common
  date: Date;
  
  // Identifiers
  ihpNum: string;
  micNum: string;
  vidNum: string;
  sceneNum: string;
  timecode: string; // New: For Retouched/Tuned start frames
  
  // Dropdowns
  tec: string;
  prd: string;
  scene: string;
  platform: string;
  
  // Names/Text
  talentName: string;
  celebName: string;
  keywords: string;
  songName: string;
  gmmName: string;
  voiceName: string;
  sequenceType: string;

  // Logic Toggles
  subType: string; 
  voType: 'gmm' | 'ai_gmm' | 'ai_pcc' | 'tiktok' | 'random_ai';
  aiType: 'generic' | 'from_pcc' | 'from_ihp'; // Removed 'product' as distinct type, now a flag
  
  // Flags
  isGreenScreen: boolean;
  isRetouched: boolean; // Retouched (Video/Photo) or Audiotuned (Audio)
  isProductVisible: boolean; // New: For AI
  isCeleb: boolean; // New: For PCC/IHP
}

// Consolidated File Types
export type FileTypeKey = 
  | 'ihp'           
  | 'pcc'           
  | 'micro' 
  | 'selects'       
  | 'screenshot'    
  | 'stock'
  | 'ai'            
  | 'vo'            
  | 'audio_assets'; 

export interface FileTypeConfig {
  id: FileTypeKey;
  label: string;
  group: 'Production' | 'Social' | 'Assets' | 'AI' | 'Audio';
}

export interface DropdownOption {
  value: string;
  label: string;
  desc?: string;
}