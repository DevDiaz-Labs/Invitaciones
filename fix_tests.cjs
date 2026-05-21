const fs = require('fs');
const path = require('path');
const baseDir = 'c:\\\\Users\\\\Lenovo-PC\\\\Desktop\\\\Invitaciones\\\\Invitaciones';

// 1. Split Itinerario y DressCode Minimalista
const initCodePath = path.join(baseDir, 'src/components/itinerario/ItinerarioDressCodeMinimalista.astro');
if (fs.existsSync(initCodePath)) {
  const content = fs.readFileSync(initCodePath, 'utf8');
  
  const dressCodeContent = `---
const { data } = Astro.props;
const dressCode = data?.dressCode || {
  titulo: 'Formal',
  subtitulo: 'Traje oscuro y vestido largo.',
  nota: 'La recepción será en un jardín, sugerimos considerar el calzado para tu comodidad.'
};
---
<section class="py-24 px-4 bg-white fade-up flex justify-center">
  <div class="flex flex-col items-center justify-center p-12 bg-stone-50 rounded-2xl border border-stone-100 max-w-md w-full">
    <h2 class="text-3xl font-serif mb-6 text-stone-800">Dress Code</h2>
    <div class="text-center mb-8">
      <span class="block text-xl font-medium tracking-wide uppercase mb-2">{dressCode.titulo}</span>
      <span class="block text-stone-500 font-light text-sm italic">{dressCode.subtitulo}</span>
    </div>
    <p class="text-center text-sm text-stone-400 font-light max-w-xs">
      {dressCode.nota}
    </p>
  </div>
</section>
`;
  fs.writeFileSync(path.join(baseDir, 'src/components/dresscode/DressCodeMinimalista.astro'), dressCodeContent);
  
  const itinerarioContent = `---
const { data } = Astro.props;
const itinerary = data?.itinerario || [
  { time: '17:00', event: 'Ceremonia Religiosa', desc: 'Parroquia de San Miguel' },
  { time: '18:30', event: 'Cóctel de Bienvenida', desc: 'Jardines de la Hacienda' },
  { time: '20:00', event: 'Cena y Brindis', desc: 'Salón Principal' },
  { time: '22:00', event: 'Apertura de Pista', desc: '¡A bailar toda la noche!' },
];
---
<section class="py-24 px-4 bg-white fade-up">
  <div class="max-w-xl mx-auto">
    <h2 class="text-3xl font-serif mb-12 text-stone-800 text-center">Itinerario</h2>
    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-stone-200">
      {itinerary.map((item, idx) => (
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-stone-100 text-stone-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded bg-stone-50 shadow-sm border border-stone-100">
            <div class="flex items-center justify-between space-x-2 mb-1">
              <h4 class="font-serif text-lg">{item.event}</h4>
              <span class="font-medium text-stone-400 text-sm">{item.time}</span>
            </div>
            <p class="text-sm text-stone-500 font-light">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
`;
  fs.writeFileSync(path.join(baseDir, 'src/components/itinerario/ItinerarioMinimalista.astro'), itinerarioContent);
  fs.unlinkSync(initCodePath); // Remove old combined file
}

// 2. Fix the test pages with comprehensive mockData
const pruebasDir = path.join(baseDir, 'src/pages/pruebas');
const files = fs.readdirSync(pruebasDir);

const betterMockData = `
const mockData = {
  mostrar: true,
  nombres: 'Ana & Carlos',
  titulo: 'Mesa de Regalos / Lluvia de Sobres',
  fechaVista: '13 · Junio · 2026',
  fecha: '2026-06-13',
  frase: 'El mejor regalo es tu presencia',
  imagenFondo: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  hashtag: '#AnaYCarlos',
  mensaje: 'Esperamos contar con tu presencia',
  texto: 'Haremos de este día algo inolvidable',
  urlSpotify: 'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI',
  banco: 'BBVA',
  cuenta: '0123456789',
  clabe: '012345678901234567',
  titular: 'Ana Sofia Valdes',
  amazon: '#',
  liverpool: '#',
  eventos: [
    { hora: '16:00', nombre: 'Ceremonia', lugar: 'Templo Expiatorio', icono: 'iglesia' },
    { hora: '18:00', nombre: 'Recepción', lugar: 'Salón de Eventos', icono: 'fiesta' }
  ],
  itinerario: [
    { time: '16:00', event: 'Ceremonia', desc: 'Templo Expiatorio' },
    { time: '18:00', event: 'Recepción', desc: 'Salón de Eventos' }
  ],
  dressCode: {
    titulo: 'Formal',
    subtitulo: 'Traje oscuro y vestido largo',
    nota: 'La recepción será en un jardín, sugerimos considerar el calzado para tu comodidad.'
  },
  galeria: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800'
  ]
};
`;

files.forEach(file => {
  if (file.endsWith('-pruebas.astro')) {
    let content = fs.readFileSync(path.join(pruebasDir, file), 'utf8');
    
    // Replace old mockData definition with better one
    content = content.replace(/const mockData = \{[\s\S]*?\};\n/m, betterMockData);
    
    // Fix ItinerarioDressCodeMini import
    content = content.replace(/ItinerarioDressCodeMinimalista/g, 'ItinerarioMinimalista');
    
    // If it's dresscode, ensure DressCodeMinimalista is there
    if (file === 'dresscode-pruebas.astro' && !content.includes('DressCodeMinimalista')) {
      content = content.replace('---', '---\nimport DressCodeMinimalista from "../../components/dresscode/DressCodeMinimalista.astro";');
      content = content.replace('</main>', `
      <div class="p-4 bg-gray-100 text-center font-bold text-gray-700 border-b border-gray-200 mt-8">
        DRESSCODEMINIMALISTA STYLE
      </div>
      <div class="relative w-full">
        <DressCodeMinimalista data={mockData} />
      </div>
    </main>`);
    }

    fs.writeFileSync(path.join(pruebasDir, file), content);
  }
});
