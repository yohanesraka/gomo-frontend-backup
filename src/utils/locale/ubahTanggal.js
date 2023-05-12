export const ubahTanggal = (tanggal) => new Intl.DateTimeFormat('id-ID', {dateStyle: 'full'}).format(new Date(tanggal));

