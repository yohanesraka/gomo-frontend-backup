/* eslint-disable object-curly-newline */
/* eslint-disable no-template-curly-in-string */

const mixed = {
  default: '${path} tidak valid',
  required: '${path} wajib diisi',
  defined: '${path} wajib didefinisikan',
  notNull: '${path} tidak boleh null',
  oneOf: '${path} harus salah satu dari nilai berikut: ${values}',
  notOneOf: '${path} harus bukan salah satu dari nilai berikut: ${values}',
  notType: '${path} harus valid dan tidak boleh kosong',
};

const string = {
  length: '${path} harus sepanjang ${length} karakter',
  min: '${path} minimal ${min} karakter',
  max: '${path} maksimal ${max} karakter',
  matches: '${path} harus cocok dengan format: "${regex}"',
  email: '${path} harus berupa email yang valid',
  url: '${path} harus berupa URL yang valid',
  uuid: '${path} harus berupa UUID yang valid',
  trim: '${path} harus dihapus spasi kiri dan kanan',
  lowercase: '${path} harus diubah ke huruf kecil',
  uppercase: '${path} harus diubah ke huruf besar',
};

const number = {
  min: '${path} harus lebih besar atau sama dengan ${min}',
  max: '${path} harus lebih kecil atau sama dengan ${max}',
  lessThan: '${path} harus kurang dari ${less}',
  moreThan: '${path} harus lebih dari ${more}',
  positive: '${path} harus bernilai positif',
  negative: '${path} harus bernilai negatif',
  integer: '${path} harus bernilai integer',
};

const date = {
  min: '${path} harus lebih lambat dari ${min}',
  max: '${path} harus lebih cepat dari ${max}',
};

const boolean = {
  isValue: '${path} harus ${value}',
};

const object = {
  noUnknown: '${path} terdapat field yang tidak valid: ${unknown}',
};

const array = {
  min: '${path} harus mempunyai minimal ${min} item',
  max: '${path} harus mempunyai kurang dari atau sama dengan ${max} item',
  length: '${path} harus mempunyai ${length} item',
};

export {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
