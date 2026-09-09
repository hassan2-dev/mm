/**
 * محتوى موقع فرحة مصطفى — من الموقع الأصلي دون حذف أو استبدال.
 * ضع ملفات MP3 الخاصة بك في public/music ثم حدّث مسار src.
 */

export type Song = {
  title: string;
  artist: string;
  src: string;
};

export type Memory = {
  id: string;
  era: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
};

/**
 * ضع رابط النشر النهائي هنا لاحقاً.
 * إذا كان فارغاً، الـ QR والمشاركة يستخدمان رابط الصفحة الحالية.
 */
export const SITE_URL_OVERRIDE: string = "";

export function getSiteUrl() {
  if (SITE_URL_OVERRIDE) return SITE_URL_OVERRIDE.replace(/\/?$/, "/");
  if (typeof window === "undefined") return "";
  const { origin, pathname } = window.location;
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${origin}${path === "//" ? "/" : path}`;
}

/** للتوافق — يُفضَّل getSiteUrl() في المكوّنات */
export const SITE_URL = SITE_URL_OVERRIDE;

export const couple = {
  name: "مصطفى",
  brand: "فرحة مصطفى",
  tagline: "من أول ضحكة… لهالفرحة",
  inviteLine: "بكل الحب، ندعوكم",
  memoryLine: "لذكرى تبقى بالعمر",
};

/** الأحد ١٣ أيلول ٢٠٢٦ — الساعة ٥ مساءً بتوقيت العراق (UTC+3) */
export const event = {
  name: "زفاف مصطفى",
  weekdayAr: "الأحد",
  dateAr: "١٣ أيلول",
  dateFullAr: "الأحد، ١٣ أيلول",
  timeAr: "الساعة ٥ مساءً",
  timeShortAr: "٥ مساءً",
  venue: "قاعة كارمن",
  area: "المعقل",
  street: "شارع محطة القطار",
  locationLine: "قاعة كارمن — المعقل، شارع محطة القطار",
  locationShort: "المعقل · شارع محطة القطار",
  /** ISO لعداد التنازلي والتقويم */
  startISO: "2026-09-13T17:00:00+03:00",
  startUTC: "20260913T140000Z",
  calendarStamp: "20260909T000000Z",
  /** لا يوجد رابط خرائط في الأصل — بحث Google Maps لنفس المكان */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D9%82%D8%A7%D8%B9%D8%A9+%D9%83%D8%A7%D8%B1%D9%85%D9%86+%D8%A7%D9%84%D9%85%D8%B9%D9%82%D9%84+%D8%B4%D8%A7%D8%B1%D8%B9+%D9%85%D8%AD%D8%B7%D8%A9+%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D8%B1",
  year: "٢٠٢٦",
};

export const hero = {
  image: "/assets/portrait.png",
  alt: "مصطفى بالبدلة يحمل باقة ورد",
  cta: "افتح الدعوة ❤️",
  dateLine: "الأحد · ١٣ أيلول · ٥ مساءً",
};

export const memories: Memory[] = [
  {
    id: "beginnings",
    era: "الطفولة",
    title: "البدايات",
    caption: "كل فرحة… إلها بداية",
    alt: "صورة من ذكريات الطفولة",
    src: "/assets/memory-1.jpg",
  },
  {
    id: "arab",
    era: "الذكريات",
    title: "أيام ما تنعاد",
    caption: "من ألبوم العمر",
    alt: "مصطفى في طفولته بالزي العربي",
    src: "/assets/memory-2.jpg",
  },
  {
    id: "album",
    era: "الشباب",
    title: "كبرنا… وبقت الذكريات",
    caption: "كبر… وكبرت وياه فرحتنا",
    alt: "صورة طفولة في ألبوم العائلة",
    src: "/assets/memory-3.jpg",
  },
  {
    id: "today",
    era: "اليوم",
    title: "واليوم… فرحتنا بمصطفى",
    caption: "واليوم نحتفل بيه",
    alt: "مصطفى بالبدلة يحمل باقة ورد",
    src: "/assets/portrait.png",
  },
];

export const gallery = [
  {
    src: "/assets/memory-1.jpg",
    alt: "صورة من ذكريات الطفولة",
    label: "البدايات",
  },
  {
    src: "/assets/memory-2.jpg",
    alt: "مصطفى في طفولته بالزي العربي",
    label: "أيام ما تنعاد",
  },
  {
    src: "/assets/memory-3.jpg",
    alt: "صورة طفولة في ألبوم العائلة",
    label: "كبرنا… وبقت الذكريات",
  },
  {
    src: "/assets/portrait.png",
    alt: "مصطفى بالبدلة يحمل باقة ورد",
    label: "فرحتنا بمصطفى",
  },
  {
    src: "/assets/invitation.png",
    alt: "دعوة زفاف مصطفى، الأحد ١٣/٩ الساعة ٥ مساءً، قاعة كارمن، المعقل، شارع محطة القطار",
    label: "بطاقة الدعوة",
  },
];

export const invitationImage = {
  src: "/assets/invitation.png",
  alt: "دعوة زفاف مصطفى، الأحد ١٣/٩ الساعة ٥ مساءً، قاعة كارمن، المعقل، شارع محطة القطار",
};

/**
 * Playlist — ضع ملفاتك في public/music
 * مثال: انسخ أغانيك كـ song1.mp3 و song2.mp3
 * بدون ملفات، المشغّل ينتظر حتى تضيفها (بدون تشغيل غير قانوني).
 */
export const songs: Song[] = [
  {
    title: "أغنية الافتتاح",
    artist: "ضع song1.mp3",
    src: "/music/song1.mp3",
  },
  {
    title: "أغنية الذكريات",
    artist: "ضع song2.mp3",
    src: "/music/song2.mp3",
  },
  {
    title: "أغنية الفرح",
    artist: "ضع song3.mp3",
    src: "/music/song3.mp3",
  },
];

export const copy = {
  storyTitle: "حكاية مصطفى ❤️",
  storyLead: "من أول ضحكة… إلى يوم الفرح",
  albumKicker: "من ألبوم العمر",
  inviteKicker: "كبر… وكبرت وياه فرحتنا",
  inviteTitle: "وهذا يومه الحلو",
  inviteSub: "فرحتنا تكمل بحضوركم",
  countdownTitle: "باقي على فرحتنا ❤️",
  galleryTitle: "معرض الذكريات",
  galleryLead: "لحظات تبقى بالعمر",
  memoriesTitle: "من أجمل ذكرياتنا",
  memoriesLead: "صور تروي العمر… بهدوء وحب",
  finaleLine1: "بحضوركم تكتمل فرحتنا ❤️",
  finaleLine2: "نتشرف بمشاركتكم أجمل أيام العمر",
  qrCaption: "امسح الكود لفتح دعوة مصطفى ❤️",
  shareLabel: "مشاركة الدعوة",
  footerThanks: "شكراً لمشاركتكم فرحتنا",
  footerNote: "بحضوركم تحلى الفرحة",
};
