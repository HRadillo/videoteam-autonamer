import { FormState, FileTypeKey } from './types';

// --- HELPERS ---

export const padNumber = (val: string, length: number): string => {
  if (!val) return '0'.repeat(length);
  const cleanVal = val.replace(/\D/g, ''); 
  if (cleanVal === '') return '0'.repeat(length);
  return cleanVal.padStart(length, '0');
};

export const formatTalentName = (name: string): string => {
  if (!name) return 'TalentName';
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

export const formatKeywords = (text: string): string => {
  if (!text) return 'description';
  return text.trim().toLowerCase().replace(/\s+/g, '-');
};

export const formatDateYearMo = (date: Date): string => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${y}.${m}`;
};

export const formatDateFull = (date: Date): string => {
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const y = date.getFullYear().toString().slice(-2);
  return `${m}.${d}.${y}`;
};

// --- MAIN GENERATOR ---

export const generateFilename = (type: FileTypeKey, data: FormState): string => {
  const { 
    date, ihpNum, micNum, tec, prd, scene, sceneNum, 
    talentName, celebName, keywords, vidNum, platform, songName, 
    sequenceType, gmmName, voiceName, timecode,
    subType, voType, aiType, 
    isGreenScreen, isProductVisible, isCeleb, isRetouched 
  } = data;

  const YM = formatDateYearMo(date);
  const FULL_DATE = formatDateFull(date);

  // Defaults
  const _ihp = padNumber(ihpNum, 3);
  const _mic = padNumber(micNum, 3);
  const _scnNum = padNumber(sceneNum, 2);
  const _vidNum = vidNum || '###.##'; 
  const _tec = tec || 'TEC';
  const _prd = prd || 'PRD';
  const _scene = scene || 'SCENE';
  const _plat = platform ? platform.trim().toUpperCase().replace(/\s+/g, '') : 'PLATFORM';
  
  let _talent = formatTalentName(talentName);
  const _celeb = formatTalentName(celebName) || 'CelebName';
  const _keys = formatKeywords(keywords);
  const _song = songName ? songName.replace(/\s/g, '') : 'SongName';
  const _gmm = gmmName ? gmmName.replace(/\s/g, '') : 'GMM';
  const _voice = voiceName ? voiceName.replace(/\s/g, '') : 'VoiceName';
  const _seq = sequenceType || 'SEQ';
  const _tc = timecode || '######';

  // Apply Green Screen Suffix to Talent Name if active (only if not retouched, usually)
  // Assuming Green Screen logic stacks with others.
  if (isGreenScreen) {
    _talent += 'GS';
  }

  // --- RETOUCH LOGIC SUFFIX ---
  // For Video: _retouched###### (where ###### is timecode)
  // For Still: _RETOUCHED (or _retouched?) PDF uses _RETOUCHED cap for Stills, lower for Video in some examples, 
  // but "WHEN RETOUCHING SCREENSHOT (VIDEO)" example uses "RETOUCHED".
  // Let's standardize to RETOUCHED for visual consistency unless strict lower requested.
  // PDF P2: "retouched######" (lowercase) for IHP/PCC Video.
  // PDF P3: "RETOUCHED######" (uppercase) for Screenshot Video.
  // We will follow the specific page rules.

  switch (type) {
    case 'ihp': {
      // CELEB IHP
      if (isCeleb) {
        // YEAR.MO_IHP_TEC_PRD_CELEB_CelebFullName
        const base = `${YM}_IHP_${_tec}_${_prd}_CELEB_${_celeb}`;
        if (isRetouched) return `${base}_retouched${_tc} [TC-IN]`;
        return base;
      }
      
      // STANDARD IHP
      if (subType === 'photo') {
        // YEAR.MO_IHP###_TEC_PRD_SCENE##_TalentFullName
        const base = `${YM}_IHP${_ihp}_${_tec}_${_prd}_${_scene}${_scnNum}_${_talent}`;
        if (isRetouched) return `${base}_RETOUCHED`;
        return base;
      }
      
      // Video
      // YEAR.MO_IHP###_TEC_PRD_SCENE_TalentFullName
      const base = `${YM}_IHP${_ihp}_${_tec}_${_prd}_${_scene}_${_talent}`;
      if (isRetouched) return `${base}_retouched${_tc} [TC-IN]`;
      return base;
    }

    case 'pcc': {
      // CELEB PCC
      if (isCeleb) {
        // CELEB_PRD_CelebFullName (mm.dd.yy)
        const base = `CELEB_${_prd}_${_celeb}`;
        if (isRetouched) return `${base}_retouched${_tc} (${FULL_DATE})`;
        return `${base} (${FULL_DATE})`;
      }

      // STANDARD PCC
      if (subType === 'photo') {
        const base = `PCC_${_prd}_${_talent}_SCENE${_scnNum}`;
        if (isRetouched) return `${base}_RETOUCHED (${FULL_DATE})`; // Assuming still retouch style
        return `${base} (${FULL_DATE})`;
      }

      // Video
      const base = `PCC_${_prd}_${_talent}`;
      if (isRetouched) return `${base}_retouched${_tc} (${FULL_DATE})`;
      return `${base} (${FULL_DATE})`;
    }

    case 'micro': {
      const base = `${YM}_MIC${_mic}_${_tec}_${_prd}_${_scene}_${_keys}`;
      if (isRetouched) return `${base}_retouched${_tc}`;
      return base;
    }

    case 'selects':
      // Keeps strict Selects naming
      return `${YM}_IHP${_ihp}_${_tec}_${_prd}_${_scene}_SELECT_${_talent}_RETOUCHED`;

    case 'screenshot': {
      if (subType === 'still') {
        const base = `SCREEN_${_prd}_SCENE${_scnNum}_${_keys}`;
        if (isRetouched) return `${base}_RETOUCHED (${FULL_DATE})`;
        return `${base} (${FULL_DATE})`;
      }
      // Video
      // Prompt logic: TalentOrKeywords.
      const tOrK = talentName ? _talent : _keys;
      const base = `SCREEN_${_prd}_${_scene}_${tOrK}`;
      if (isRetouched) return `${base}_RETOUCHED${_tc} (${FULL_DATE})`;
      return `${base} (${FULL_DATE})`;
    }

    case 'stock':
      return `STOCK_${_plat}_${_vidNum}_${_keys}`;

    case 'ai': {
      // Base parts
      let parts = ['AI'];
      
      // 1. Source Type Logic
      if (aiType === 'from_pcc') {
        parts.push('PCC', _talent);
      } else if (aiType === 'from_ihp') {
        parts.push('IHP', _talent);
      } 
      // 2. Product Logic (if checked)
      else if (isProductVisible) {
        parts.push(_prd);
      }

      // 3. Keywords/Description
      parts.push(_keys);

      return `${parts.join('_')} (${FULL_DATE})`;
    }

    case 'vo': {
      // Base: VO_PRD_vid###.##_SEQ/T_{IDENTIFIER}_KeyWords (mm.dd.yy)
      let identifier = 'ID';
      
      if (voType === 'gmm') identifier = _gmm;
      else if (voType === 'ai_gmm') identifier = `AI-${_gmm}`;
      else if (voType === 'ai_pcc') identifier = `AI-${_talent}`;
      else if (voType === 'tiktok') identifier = `TT`;
      else if (voType === 'random_ai') identifier = `AI-${_plat}-${_voice}`;

      const base = `VO_${_prd}_${_vidNum}_${_seq}_${identifier}_${_keys}`;
      if (isRetouched) return `${base}_AUDIOTUNED (${FULL_DATE})`; // "Audiotuned" for audio
      return `${base} (${FULL_DATE})`;
    }

    case 'audio_assets': {
      if (subType === 'sfx') {
        return `SFX_${_plat}_${_keys}`; 
      }
      // Music
      return `MUSIC_${_plat}_${_song}`;
    }

    default:
      return 'Configuration Error';
  }
};