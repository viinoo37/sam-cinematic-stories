import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SamFilmDetailPage from '@/components/SamFilmDetailPage';

// Example film data - in production, fetch from API or CMS
const FILMS: Record<string, any> = {
  amber: {
    title: 'Amber',
    slug: 'amber',
    year: 2024,
    duration: 15,
    themes: ['trauma', 'verlies', 'verwerking'],
    shortLogline: 'Amber is vrolijk, zorgzaam en het middelpunt van haar vriendengroep. Wanneer ze Jeremy ontmoet op een feestje, raakt ze verstrikt in een toxische relatie vol manipulatie en geweld. Ze trekt zich terug van haar vrienden, maar met hun steun vindt ze de kracht om te ontsnappen aan de greep die Jeremy op haar heeft.',
    longSynopsis: `Amber is vrolijk, zorgzaam en het middelpunt van haar vriendengroep. Tijdens een feestje bij haar thuis ontmoet ze Jeremy, een man met een slechte reputatie waar niemand ruzie mee moet hebben.

Jeremy begint vaak langs te komen en krijgt Amber volledig in zijn greep. Hij manipuleert haar met dreigementen en bedreigt zelfmoord als ze hem verlaat. Amber verandert: ze trekt zich terug van haar vrienden en wordt een schaduw van zichzelf.

Wanneer Sam zich zorgen maakt en haar probeert te bereiken, ontdekt hij de waarheid. Jeremy slaat Amber en bedreigt haar en haar vrienden. Amber raakt zwanger en raakt verder in wanhoop.

Uiteindelijk vindt Amber de kracht om te ontsnappen. Met de steun van haar vrienden confronteert ze Jeremy en breekt ze los uit de toxische relatie. Ze vindt de weg terug naar zichzelf.`,
    heroImage: '/films/amber/Still%20amber%208.png',
    stills: [
      '/films/amber/Still%20amber%202.png',
      '/films/amber/Still%20amber%203.png',
      '/films/amber/Still%20amber%204.png',
      '/films/amber/Still%20amber%205.png',
      '/films/amber/Still%20amber%206.png',
      '/films/amber/Still%20amber%207.png',
      '/films/amber/Still%20amber%208.png',
      '/films/amber/Still%20amber%209.png',
      '/films/amber/Still%20amber%2010.png',
      '/films/amber/Still%20amber%2011.png',
    ],
    crew: [
      { name: 'Sam Kroon', role: 'Regisseur / Screenplay' },
      { name: 'Valentino', role: 'Regisseur & Producer' },
      { name: 'Anthony', role: 'DOP / Cameraman' },
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=fBivNFTKAmg&t=1s',
    triggerWarning: 'Dit verhaal raakt thema\'s zoals trauma, verlies en mentale worstelingen. Kijk alleen als je je veilig genoeg voelt. Praat met iemand die je vertrouwt, of zoek professionele hulp als dit je raakt.',
  },
  'het-ritje': {
    title: 'Het ritje',
    slug: 'het-ritje',
    year: 2024,
    duration: 12,
    themes: ['grenzen', 'avond', 'reflectie'],
    shortLogline: 'Een avond rit die meer is dan alleen een rit.',
    longSynopsis: `In de stilte van de avond ontstaan momenten van reflectie.

Het ritje is meer dan alleen beweging van A naar B. Het is een reis door gedachten, door gevoelens, door de ruimte tussen wat was en wat komt.

Elke kilometer brengt je dichter bij jezelf, verder van wat je achterlaat.

Dit is een verhaal over de reis, niet alleen de bestemming.`,
    stills: [
      '/films/het-ritje/still-1.jpg',
      '/films/het-ritje/still-2.jpg',
      '/films/het-ritje/still-3.jpg',
      '/films/het-ritje/still-4.jpg',
    ],
    crew: [
      { name: 'Sam Kroon', role: 'Regisseur / Screenplay' },
      { name: 'Valentino', role: 'Producer' },
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=fBivNFTKAmg&t=1s',
  },
  control: {
    title: 'Control',
    slug: 'control',
    year: 2024,
    duration: 18,
    themes: ['eetstoornis', 'controle', 'zelfbeeld'],
    shortLogline: 'Een verhaal over een meisje met boulimia en de strijd met controle.',
    longSynopsis: `Control gaat over de strijd tussen controle verliezen en controle behouden.

Het is een verhaal over een meisje die worstelt met boulimia, een verhaal dat vaak onzichtbaar blijft maar diep geworteld is in pijn en onzekerheid.

We zien de strijd van binnenuit, de momenten van controle en de momenten waarop die controle afbrokkelt.

Dit verhaal maakt zichtbaar wat vaak verborgen blijft, met respect en nuance.`,
    stills: [
      '/films/control/still-1.jpg',
      '/films/control/still-2.jpg',
      '/films/control/still-3.jpg',
      '/films/control/still-4.jpg',
    ],
    crew: [
      { name: 'Sam Kroon', role: 'Regisseur / Screenplay' },
      { name: 'Valentino', role: 'Producer' },
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=fBivNFTKAmg&t=1s',
    triggerWarning: 'Dit verhaal raakt thema\'s zoals eetstoornissen, zelfbeeld en mentale gezondheid. Kijk alleen als je je veilig genoeg voelt.',
  },
};

const FilmDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const film = slug ? FILMS[slug] : null;

  if (!film) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Film niet gevonden</h1>
          <a href="/" className="text-sam-amber underline hover:text-sam-amber/90">
            Terug naar home
          </a>
        </div>
      </div>
    );
  }

  return <SamFilmDetailPage film={film} />;
};

export default FilmDetail;
