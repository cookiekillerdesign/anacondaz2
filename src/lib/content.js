// Data derived from research dossier (Step 1). Replace cover/asset paths
// with real high-res files once received from the client.

// Hero slider slots — 1920x1080. Drop real photo URLs in here once the band
// sends files (put files in /public/hero/ and reference as "/hero/xxx.jpg").
// Left as { url: null } placeholders → HeroSlider renders generative
// duotone slides instead of fake stock photography.
export const heroSlides = [
  { url: null, caption: "" },
  { url: null, caption: "" },
  { url: null, caption: "" },
  { url: null, caption: "" },
];

export const discography = [
  { year: "2009", title: "Смачные ништяки", titleEn: "Awesome Treats", cover: "/covers/smachnye-nishtyaki.jpg" },
  { year: "2010", title: "Эволюция", titleEn: "Evolution", type: "EP", cover: "/covers/evolyuciya.jpg" },
  { year: "2012", title: "Дети и радуга", titleEn: "Kids and Rainbow", cover: "/covers/deti-i-raduga.jpg" },
  { year: "2014", title: "Без паники", titleEn: "Don't Panic", cover: "/covers/bez-paniki.jpg" },
  { year: "2015", title: "Байки инсайдера", titleEn: "Insider's Tales", cover: "/covers/bayki-insaydera.jpg" },
  { year: "2017", title: "Выходи за меня", titleEn: "Marry Me", cover: "/covers/vyhodi-za-menya.jpg" },
  { year: "2018", title: "Я тебя никогда", titleEn: "I Never You", cover: "/covers/ya-tebya-nikogda.jpg" },
  { year: "2019", title: "Мои дети не будут скучать", titleEn: "My Children Won't Be Bored", type: "EP", cover: "/covers/moi-deti-ne-budut-skuchat.jpg" },
  { year: "2020", title: "Перезвони мне +79995771202", titleEn: "Call Me Back", cover: "/covers/perezvoni-mne.jpg" },
  { year: "2022", title: "Перезвони мне +79995771202 (Deluxe)", titleEn: "Call Me Back (Deluxe)", cover: "/covers/perezvoni-mne-deluxe.jpg" },
  { year: "2025", title: "Ночь с астраханцем", titleEn: "Night With an Astrakhan Native", cover: "/covers/noch-s-astrahancem.jpg", featured: true },
];

export const tours = [
  { date: "2026-09-20", city: "Лимассол", cityEn: "Limassol", country: "CY", venue: "ETKO", ticketUrl: "https://tinyurl.com/anacondazcy26" },
  { date: "2026-11-18", city: "Кишинёв", cityEn: "Chișinău", country: "MD", venue: "Club Skal", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-14838-chisinau-Chiși-club-skal-tickets-14838" },
  { date: "2026-11-21", city: "Филадельфия", cityEn: "Philadelphia", country: "US", venue: "Sweeney's", ticketUrl: "https://eventcartel.com/events/concert/anakondaz-philadelphia-PA-sweeneys-13639-philmont-avenue-philadelphia-pa-19116-tickets-15117" },
  { date: "2026-11-22", city: "Нью-Йорк", cityEn: "New York", country: "US", venue: "Melrose Ballroom", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-12680-new-york-NY-melrose-ballroom-tickets-12680" },
  { date: "2026-11-23", city: "Майами", cityEn: "Miami", country: "US", venue: "Wave", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-14862-miami-FL-wave-restaurant-bar-and-lounge-tickets-14862" },
  { date: "2026-11-24", city: "Лос-Анджелес", cityEn: "Los Angeles", country: "US", venue: "Whisky A Go Go", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-12681-los-angeles-CA-whisky-a-go-go-tickets-12681" },
  { date: "2026-11-25", city: "Сан-Франциско", cityEn: "San Francisco", country: "US", venue: "Roccapulco", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-12682-san-francisco-CA-roccapulco-tickets-12682" },
  { date: "2026-11-30", city: "Дублин", cityEn: "Dublin", country: "IE", venue: "The Button Factory", ticketUrl: "https://eventcartel.com/events/concert/anacondaz-14839-dublin-NY-the-button-factory-tickets-14839" },
  { date: "2027-01-04", city: "Сербия", cityEn: "Serbia", country: "RS", venue: "Zappa Barka Nebojša Tower", ticketUrl: "https://balkan-promo.com/anacondaz_in_belgrade/" },
  { date: "2027-01-05", city: "Черногория", cityEn: "Montenegro", country: "ME", venue: "Ambiente night club", ticketUrl: "https://balkan-promo.com/anacondaz_in_budva/" },
  { date: null, city: "Торонто", cityEn: "Toronto", country: "CA", venue: "TBA", ticketUrl: null },
  { date: null, city: "Ванкувер", cityEn: "Vancouver", country: "CA", venue: "TBA", ticketUrl: null },
];

export const partners = [
  { name: "Sennheiser", url: "https://ru-ru.sennheiser.com/" },
  { name: "Roland", url: "https://roland.com/" },
  { name: "Kiesel Guitars", url: "https://kieselguitars.com/" },
  { name: "Adidas", url: "https://adidas.ru/" },
];

export const socials = [
  { name: "YouTube", url: "https://www.youtube.com/channel/UC4ink5TgHMuRmSvJ2N1LOaQ" },
  { name: "Instagram", url: "https://www.instagram.com/rap_anacondaz/" },
  { name: "VK", url: "https://vk.com/anacondaz" },
  { name: "Facebook", url: "https://www.facebook.com/rapanacondaz" },
];

export const collabTracks = [
  { title: "Похуисты", withArtist: "Noize MC", year: "2014" },
  { title: "Самый счастливый человек на Земле", withArtist: "Тараканы!", year: "2013" },
  { title: "Пыль и пепел", withArtist: "Тараканы!", year: "2017" },
  { title: "Пусть они умрут", withArtist: "Noize MC", year: "2019" },
];

export const spotify = {
  artistId: "2e7yDxnK4osy7nKhnqrOFM",
  featuredAlbumId: "6n9pF7yHoOfZD63HRHpdX1", // Ночь с астраханцем, 2025
};

export const bookingContact = {
  email: "event@anacondaz.ru",
  phone: "+7 495 212-92-94",
};
