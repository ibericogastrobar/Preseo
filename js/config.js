const CONFIG = {
  event: {
    name: 'PRESEO Vol. 003',
    date: new Date('2026-06-25T19:00:00-04:00'),
    pauseAfter: new Date('2026-06-26T05:00:00-04:00'),
    nextEvent: null,
  },

  api: {
    sheetbest: 'https://api.sheetbest.com/sheets/cf692ce3-4eb0-4b57-b77a-9d15989259dc',
    emailsEndpoint: '/tabs/Emails',
  },

  social: {
    preseoIG: 'https://www.instagram.com/preseoccs/',
    ibericoIG: 'https://www.instagram.com/iberico.gastrobar/',
    registroURL: 'https://tinyurl.com/bdffpj5z',
    mapsURL: 'https://maps.app.goo.gl/7uuYMgkDGDVRJmB4A',
  },

  promoters: [
    { id: 1, name: "Ángel Bracovichi",    role: "Promotor" },
    { id: 2, name: "Miguel Ramos",        role: "Promotor" },
    { id: 3, name: "Sammy Esqueda",       role: "Promotor" },
    { id: 4, name: "Carlos Ruiloba",      role: "Promotor" },
    { id: 5, name: "Jhosue Petit",        role: "Promotor" },
    { id: 6, name: "Gabriel Pi",          role: "Promotor" },
    { id: 7, name: "Clarissa Ruan",       role: "Promotora" },
    { id: 8, name: "Gustavo Velázquez",   role: "Promotor" },
    { id: 9, name: "Esteban Correa",      role: "Promotor" },
    { id: 10, name: "Carlos Manaure",     role: "Promotor" },
    { id: 11, name: "Oreste",             role: "Promotor" },
    { id: 12, name: "Cristian Calak",     role: "Promotor" },
    { id: 13, name: "Diana Corredor",     role: "Promotora" },
  ],

  debug: false,
};

if (CONFIG.debug) console.log('🔧 Preseo Config loaded', CONFIG);
