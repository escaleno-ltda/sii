# sii

[![npm version](https://img.shields.io/npm/v/sii.svg?style=flat-square)](https://www.npmjs.com/package/sii)
[![npm downloads](https://img.shields.io/npm/dm/sii.svg?style=flat-square)](https://www.npmjs.com/package/sii)
[![Build Status](https://img.shields.io/travis/lgaticaq/sii.svg?style=flat-square)](https://travis-ci.org/lgaticaq/sii)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/sii/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/sii?branch=master)
[![dependency Status](https://img.shields.io/david/lgaticaq/sii.svg?style=flat-square)](https://david-dm.org/lgaticaq/sii#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/sii.svg?style=flat-square)](https://david-dm.org/lgaticaq/sii#info=devDependencies)

Crea facilmente boleta de honorarios

## Instalación
```bash
npm i -S sii
```

## Uso
```javascript
import sii from 'sii';

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
sii.byDestinatary(user, work, destinatary, zone, commune).then(() => console.log('Done'))
```
