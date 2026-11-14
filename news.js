// The Financial Guru · home page announcements (the cinematic showcase under the hero).
// Edit this list to change what plays. Slides play in order, then start again from the first.
//  - A video slide plays to its end (muted by default; visitors can turn sound on), then moves on.
//  - A text slide stays 5 seconds, then moves on.
//  - If a video file is missing, that slide is skipped automatically.
// Put video files in the assets folder (MP4, H.264, 1920×1080 or 1280×720, ideally under 15 MB).
// Phones show a taller frame (4:5): add srcMobile for a vertical cut, or keep the action in the centre of the wide one.
window.FG_NEWS = [
  {
    type: 'video',
    src: 'assets/intro.mp4',          // your AI-made clip goes here
    poster: 'assets/intro-poster.webp', // first frame shown while it loads (optional)
    srcMobile: 'assets/intro-vertical.mp4' // optional 4:5 or 9:16 version for phones; without it the wide one is centre-cropped
  },
  {
    type: 'text',
    img: 'assets/ph-home.webp',
    en: { tag: 'New', title: 'Now on Android phones and tablets', text: 'The whole app lives on your device. It opens instantly, works offline, and stays in step with your PC.' },
    ar: { tag: 'جديد', title: 'الآن على هواتف وأجهزة Android اللوحية', text: 'التطبيق كله على جهازك؛ يفتح فورًا، ويعمل دون إنترنت، ويبقى متطابقًا مع حاسوبك.' }
  },
  {
    type: 'text',
    img: 'assets/pc-dash.webp',
    en: { tag: 'Update', title: 'One tap, always up to date', text: 'When a new version is ready, the app tells you. Tap Update and carry on with your day.' },
    ar: { tag: 'تحديث', title: 'ضغطة واحدة، ودائمًا محدَّث', text: 'عند صدور إصدار جديد يخبرك التطبيق بذلك. اضغط «تحديث» وأكمل يومك.' }
  },
  {
    type: 'text',
    img: 'assets/ph-home-ar.webp',
    en: { tag: 'Bilingual', title: 'العربية and English, side by side', text: 'Switch languages in a tap. Every screen, every number and every reminder follows.' },
    ar: { tag: 'لغتان', title: 'العربية والإنجليزية جنبًا إلى جنب', text: 'بدّل اللغة بضغطة واحدة، وتتبعها كل شاشة وكل رقم وكل تذكير.' }
  },
  {
    type: 'text',
    img: 'assets/ph-pots.webp',
    en: { tag: 'Sync', title: 'Your profiles, on every device', text: 'Save everything to your own Google Drive from your PC, then open it on your phone and tablet in seconds.' },
    ar: { tag: 'مزامنة', title: 'ملفاتك على كل أجهزتك', text: 'احفظ كل شيء في Google Drive الخاص بك من حاسوبك، ثم افتحه على هاتفك وجهازك اللوحي في ثوانٍ.' }
  }
];
