export type LexiconItem = { code: string; title: string; desc?: string };

export type ConceptThemeGuide = {
  code: string;
  title: string;
  formats: string;
  goal: string;
  summary: string;
  whatIs: Array<{ label: string; desc: string }>;
  dos: string[];
  donts: string[];
  note?: string;
};

export const INTRO_THEME: LexiconItem[] = [
  { code: 'AI', title: 'AI-Generated content', desc: 'Hook features AI-generated visuals, voiceovers, or avatars.' },
  { code: 'UGC', title: 'User Generated Content', desc: 'Raw, handheld, selfie-style opening, often testimonial or influencer POV.' },
  { code: 'PH', title: 'Product Hero', desc: 'Product shown as the main hero in the first second. Focus on pack, texture, or macro detail.' },
  { code: 'AUTH', title: 'Authority', desc: 'Hook shows expert or authority figure to build credibility: doctor, derm, scientist, or MUA.' },
  { code: 'APPLY', title: 'Apply', desc: 'Moment when the model applies the product to their face to show texture, coverage, and blendability.' },
  { code: 'STUD', title: 'Studio', desc: 'High-end, brand-level production. Polished lighting, studio setting, scripted actors, or models.' },
  { code: 'TXT', title: 'Text', desc: 'Intro or overlay featuring written elements like text supers.' },
  { code: 'SPLT', title: 'Split-screen', desc: 'Frame divided into two parts, showing different visuals or comparisons side by side.' },
  { code: 'BEF', title: 'Before', desc: 'Model shown prior to using the product, highlighting the skin concern or problem area.' },
  { code: 'BA', title: 'Before/After', desc: 'Side-by-side of how a product or service impacts someone or something.' },
  { code: 'AFT', title: 'After', desc: 'Aspirational final look of the model after using treatments.' },
  { code: 'BROLL', title: 'B-roll', desc: 'Supporting footage that adds context or visual interest (textures, routines, lifestyle shots).' },
  { code: 'LAB', title: 'Lab footage', desc: 'Lab setting showing scientists, formulations, or product testing to convey credibility.' },
  { code: 'TS', title: 'Thumbstopper', desc: 'Visually striking moment designed to instantly capture attention while scrolling.' },
  { code: 'PRE', title: 'Press', desc: 'Articles, headlines, research, etc.' },
  { code: 'SMD', title: 'Social Media', desc: 'Twitter / Reddit / ChatGPT-style layouts.' },
  { code: 'TXTR', title: 'Texture', desc: 'Swatches, formula, product textures.' },
  { code: 'GS', title: 'Greenscreen' },
  { code: 'UI', title: 'UI', desc: 'Website, quiz, or app interface.' },
  { code: 'CHT', title: 'Chat', desc: 'Notes, text, chat-style visuals.' },
  { code: 'MEME', title: 'Meme' },
  { code: 'UVT', title: 'Us vs Them', desc: 'Comparison visuals.' },
  { code: 'INT', title: 'Interview', desc: 'Interview-style intro.' },
];

export const HOOK_THEME: LexiconItem[] = [
  { code: 'POS', title: 'Positive', desc: 'Uplifting, aspirational message focused on benefits or outcomes.' },
  { code: 'NEG', title: 'Negative', desc: 'Highlights a problem, pain point, or frustration.' },
  { code: 'STAT', title: 'Statistics', desc: 'Uses data or verified information to build credibility.' },
  { code: 'COMP', title: 'Comparison', desc: 'Contrasts product against competitors or common mistakes.' },
  { code: 'RSN', title: 'Reasons Why', desc: 'Example: “3 reasons you need this foundation.”' },
  { code: 'FUN', title: 'Funny / Humor', desc: 'Jokes, playful language, witty phrasing.' },
  { code: 'QST', title: 'Question', desc: 'Poses a question to spark curiosity.' },
  { code: 'EMO', title: 'Emotional', desc: 'Evokes empathy or personal connection.' },
  { code: 'PB', title: 'Product Benefits' },
  { code: 'INGR', title: 'Ingredients' },
  { code: 'RVW', title: 'Review' },
  { code: 'OFFR', title: 'Offer / Promo' },
  { code: 'EDUC', title: 'Educational' },
  { code: 'SOL', title: 'Problem / Solution', desc: 'Clearly shows the issue and the fix.' },
  { code: 'TRANSF', title: 'Transformation', desc: 'Highlights visible change after using the product.' },
  { code: 'SZN', title: 'Seasonal', desc: 'Example: “#1 makeup tip for 2026?”' },
];

export const AUDIO: LexiconItem[] = [
  { code: 'SPE', title: 'Speaking', desc: 'Creator speaking directly on camera.' },
  { code: 'VO', title: 'Voiceover', desc: 'Recorded narration over visuals.' },
  { code: 'TRND', title: 'Trending audio', desc: 'Popular TikTok audio synced to visuals.' },
  { code: 'ASMR', title: 'ASMR', desc: 'Sound-focused, soothing or satisfying audio.' },
  { code: 'FX', title: 'Sound effect', desc: 'Swishes, sparkles, UI sounds, etc.' },
];

export const VIDEO_CONCEPT_THEME: LexiconItem[] = [
  { code: 'BRAND', title: 'Brand', desc: 'Brand-forward concept focused on identity, positioning, or polished brand storytelling.' },
  { code: 'CEL', title: 'Celebrity', desc: 'Concept anchored by a recognizable talent, co-sign, or celebrity-led presence.' },
  { code: 'PERF', title: 'Performance', desc: 'Conversion-oriented concept designed to drive measurable marketing results.' },
  { code: 'TSTMN', title: 'Testimonial', desc: 'Concept led by a personal endorsement, review, or experience-based proof.' },
  { code: 'VIRAL', title: 'Viral', desc: 'Concept built to feel highly shareable, trend-aware, or thumb-stopping.' },
];

export const STATIC_CONCEPT_THEME: LexiconItem[] = [
  { code: 'BRAND', title: 'Brand', desc: 'Beautiful, brand-safe static concept with polished storytelling and strong design.' },
  { code: 'CEL', title: 'Celebrity', desc: 'Static concept led by celebrity talent, partnership, or a recognizable co-sign.' },
  { code: 'PERF', title: 'Performance', desc: 'Conversion-first static concept built for immediate clarity, proof, and click intent.' },
  { code: 'TSTMN', title: 'Testimonial', desc: 'Trust-building static concept driven by a real-user angle, quote, or authentic recommendation.' },
];

export const CONCEPT_THEME_GUIDES: ConceptThemeGuide[] = [
  {
    code: 'PERF',
    title: 'Performance',
    formats: 'VIDEO + STATIC',
    goal: 'Trigger immediate action. Make the viewer feel: “That’s me. I need this.”',
    summary: 'Problem-first direct response structure built for clarity, proof, and conversion speed.',
    whatIs: [
      { label: 'HOOK', desc: 'Catch attention with a real problem, a thumbstopper, a relatable before, or a shockingly good apply.' },
      { label: 'PROBLEM', desc: 'Show the pain clearly with negative or uncomfortable footage so the issue feels obvious.' },
      { label: 'SOLUTION', desc: 'Show the product fixing the problem with a simple, clear demo that visualizes how it works.' },
      { label: 'PROOF', desc: 'Use one strong proof point like reviews, before/after, screenshots, or numbers.' },
      { label: 'CTA', desc: 'Close with a clear standard CTA that pushes the next action.' },
    ],
    dos: [
      'Lead with bold thumbstoppers, strong visuals, and fast clarity.',
      'Use before/after, reviews, stats, screenshots, and clear product proof.',
      'Assume no sound and make on-screen text carry the message.',
      'Show the product early and repeat it often.',
    ],
    donts: [
      'Do not open with pretty lifestyle or beauty-only footage.',
      'Do not keep product information vague or overly soft.',
      'Do not rely on slow emotional build or minimal text.',
      'Do not make it feel like a brand ad with no problem/solution arc.',
    ],
  },
  {
    code: 'VIRAL',
    title: 'Viral',
    formats: 'VIDEO',
    goal: 'Feel like real content, not an ad — but still drive people to buy.',
    summary: 'Native, platform-first storytelling that borrows real viral formats and hides the sales engine inside them.',
    whatIs: [
      { label: 'FORMAT', desc: 'Borrow a format that already went viral such as POV, reaction, storytime, reveal, or trending audio.' },
      { label: 'HOOK', desc: 'Use native thumbstoppers like reactions, “watch this,” POVs, or “I didn’t expect this…” lines.' },
      { label: 'PRODUCT', desc: 'Weave the product in naturally so it is discovered inside the story instead of announced as the point.' },
      { label: 'FEEL', desc: 'Keep it slightly imperfect, phone-shot, raw-lit, and free of overt branded polish.' },
      { label: 'CTA', desc: 'Use a soft native CTA like link in bio or “I got mine from…” rather than a hard sell.' },
    ],
    dos: [
      'Use creator-style visuals, casual imperfections, and light platform captions.',
      'Delay the brand reveal and keep the product integration natural.',
      'Keep the CTA present, but native to the format.',
    ],
    donts: [
      'Do not over-produce with studio lighting or polished camera work.',
      'Do not over-script the delivery.',
      'Do not use heavy DR framing or stacked ad titles.',
      'Do not skip the CTA just because the format is native.',
    ],
  },
  {
    code: 'BRAND',
    title: 'Branded',
    formats: 'VIDEO + STATIC',
    goal: 'Make someone feel something about the brand. Aspiration, not information.',
    summary: 'Elevated, art-directed creative where emotion, aesthetics, and brand world matter more than hard sell mechanics.',
    whatIs: [
      { label: 'VISUALS', desc: 'Use beautiful, elevated, art-directed visuals. No ugly footage, no before/after, no harsh problem framing.' },
      { label: 'PACING', desc: 'Move slowly and intentionally. Let shots or layouts breathe and let music or design carry emotion.' },
      { label: 'PRODUCT', desc: 'Show the product in an elevated, next-level impressive way inside the brand world.' },
      { label: 'USE', desc: 'It should feel safe enough for organic feed and paid. If it feels embarrassing on-brand, remake it.' },
    ],
    dos: [
      'Use well-lit, colour-graded, art-directed visuals and thoughtful composition.',
      'Show aspirational lifestyle and elegant design with breathing room.',
      'Keep text minimal, clear, and brand-right.',
      'Choose music or design direction that drives feeling first.',
    ],
    donts: [
      'Do not use ugly visuals, problem footage, or aggressive hooks.',
      'Do not bring in performance-style proof clutter, hard CTA, or offer language.',
      'Do not use fast cuts or heavy on-screen sales messaging.',
      'Do not use anything you would avoid posting organically.',
    ],
  },
  {
    code: 'TSTMN',
    title: 'Testimonial / Real User',
    formats: 'VIDEO + STATIC',
    goal: 'Build trust. The viewer should think: this is a real person, not an actor.',
    summary: 'Authenticity-led proof where imperfection becomes credibility and the recommendation feels human.',
    whatIs: [
      { label: 'LOOK', desc: 'Use phone camera, natural room light, real homes or lived-in spaces. Slight imperfection helps it feel real.' },
      { label: 'DELIVERY', desc: 'Talk like a friend. Small pauses, laughs, and natural stumbles can stay.' },
      { label: 'CONTENT', desc: 'Structure around before, discovery, then result. Specific details make the story believable.' },
      { label: 'EDITING', desc: 'Keep cuts, graphics, and transitions restrained so the edit does not scream “ad”.' },
      { label: 'CTA', desc: 'End with a natural recommendation, not a scripted push.' },
    ],
    dos: [
      'Use real phone footage, casual framing, and authentic lived-in settings.',
      'Keep honest details, light editing, and simple captions.',
      'Use a believable structure like problem → what I tried → what worked → what changed.',
    ],
    donts: [
      'Do not use thumbstopper graphics or ugly shock visuals.',
      'Do not over-script lines or polish transitions too much.',
      'Do not force background music or CTA when it feels unnatural.',
    ],
  },
  {
    code: 'CEL',
    title: 'Celebrity',
    formats: 'VIDEO + STATIC',
    goal: 'Anchor the creative around talent-led credibility and recognizability.',
    summary: 'New theme code available in the autonamer for celebrity-led concepts.',
    whatIs: [],
    dos: [],
    donts: [],
    note: 'Guide details for CEL were not included in the uploaded style PDF, so this card is intentionally kept minimal until the official framework is shared.',
  },
];

export const CONCEPT_CLUSTER: LexiconItem[] = [
  { code: 'ADLT', title: 'Adult' },
  { code: 'COMP', title: 'Comparison' },
  { code: 'CONG', title: 'Congestion' },
  { code: 'CONV', title: 'Convenience' },
  { code: 'CVRG', title: 'Coverage' },
  { code: 'CYST', title: 'Cystic' },
  { code: 'DGST', title: 'Digestion' },
  { code: 'EFCY', title: 'Efficacy' },
  { code: 'EMTN', title: 'Emotion' },
  { code: 'FRML', title: 'Formula' },
  { code: 'HAIR', title: 'Hair' },
  { code: 'HRMN', title: 'Hormonal' },
  { code: 'INFL', title: 'Inflammation' },
  { code: 'MATR', title: 'Mature' },
  { code: 'MLSM', title: 'Melasma' },
  { code: 'PRNT', title: 'Parent' },
  { code: 'PERS', title: 'Personalization' },
  { code: 'PGMT', title: 'Pigmentation' },
  { code: 'PIH', title: 'PIH' },
  { code: 'RTN', title: 'Routine' },
  { code: 'SAG', title: 'Saggy' },
  { code: 'SHD', title: 'Shade' },
  { code: 'SKNC', title: 'Skincare' },
  { code: 'SUND', title: 'Sun-damage' },
  { code: 'TRANSF', title: 'Skin transformation' },
  { code: 'TXTR', title: 'Texture' },
  { code: 'UNCMPL', title: 'Uncomplicated' },
  { code: 'USG', title: 'Usage' },
  { code: 'WRNKL', title: 'Wrinkles' },
];
