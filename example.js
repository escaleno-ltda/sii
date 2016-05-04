const sii = require('sii');

const user = {
  rut: '11.111.111-1',
  password: '0123456789'
};
const work = {
  description: 'AMAZING WORK',
  value: 555556
};
const destinatary = {
  rut: 22222222,
  dv: '2',
  name: 'AMAZING COMPANY',
  address: 'STREET 1'
};
const zone = 13;
const commune = 15103;
const sucess = await sii.byDestinatary(user, work, destinatary, zone, commune)
