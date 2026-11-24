export type Origin = {
  id: string;
  name: string;
  country: string;
  region: string;
  flag: string;
  elevation: string;
  process: string;
  roast: string;
  tagline: string;
  story: string;
  notes: string[];
  scores: [number, number, number, number, number];
  accent: string;
  price: number;
};

export const origins: Origin[] = [
  {
    id: 'ethiopia', name: 'Daybreak', country: 'Ethiopia', region: 'Guji · Oromia', flag: 'ET',
    elevation: '2,100 MASL', process: 'Natural', roast: 'Light roast',
    tagline: 'A little sunshine in your cup.',
    story: 'Grown high in the misty Guji hills, where slow-ripening cherries develop an extraordinary, fruit-forward character. A bright, expressive cup made for long mornings.',
    notes: ['Blueberry', 'Jasmine', 'Honey'], scores: [4.8, 4.7, 2.5, 4.9, 1.7], accent: '#d49a71', price: 24
  },
  {
    id: 'colombia', name: 'Golden Hour', country: 'Colombia', region: 'Huila · Pitalito', flag: 'CO',
    elevation: '1,850 MASL', process: 'Washed', roast: 'Medium roast',
    tagline: 'Comfort, with a curious side.',
    story: 'From the green hills of Huila comes a beautifully balanced coffee. Careful hand-picking and a clean washed process bring to life its round sweetness and soft citrus sparkle.',
    notes: ['Caramel', 'Orange', 'Cacao'], scores: [4.5, 3.5, 4.0, 2.2, 4.3], accent: '#c9ae72', price: 22
  },
  {
    id: 'guatemala', name: 'Afterglow', country: 'Guatemala', region: 'Antigua · Sacatepéquez', flag: 'GT',
    elevation: '1,700 MASL', process: 'Honey', roast: 'Medium-dark roast',
    tagline: 'The kind of warmth that lingers.',
    story: 'Volcanic soils and cool mountain air give this Antigua lot its quiet depth. A silky, comforting cup with layered sweetness and a long chocolate finish.',
    notes: ['Dark chocolate', 'Almond', 'Brown sugar'], scores: [4.0, 2.7, 4.7, 1.3, 4.9], accent: '#a9a17d', price: 23
  }
];

export const flavorAxes = ['Sweet', 'Bright', 'Body', 'Floral', 'Cocoa'];
