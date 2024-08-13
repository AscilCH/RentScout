import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// ----------------------------------------------------------------------

const users = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  MaisonName: faker.company.name(),
  cliniques: [
    'Sfax El Medina',
    'Clinique Echifa',
    'Polyclinique Ennour',
    'Polyclinique Syphax',
    'Errayhane',
    'El Hanene',
    'Azur',
    'Imen',
  ],
  key: index,
  price: faker.datatype.float({ min: 100, max: 1000, precision: 2 }),
  isAvailable: sample(['disponible', 'indisponible']),
  location: {
    lat: parseFloat(faker.address.latitude()),
    lng: parseFloat(faker.address.longitude()),
  },
  images: Array.from({ length: 3 }, () => faker.image.imageUrl()),
  calendar: Array.from({ length: 3 }, () => faker.date.future().toISOString()),
}));


export default users;
