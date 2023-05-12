# Dashboard Monitoring Domba

## Situs Gembala Apps
https://gembala.sembadafarm.com

## Petunjuk Pemasangan pada _Localhost_
1. `git clone https://gitlab.com/mbkm/code-repositories/batch-3/peternakan_sobat_ternak/dashboard-monitoring-domba.git`
2. `cd dashboard-monitoring-domba`
3. `yarn` atau `npm i`
4. `yarn dev` atau `npm run dev`
5. Buka `http://localhost:3000/` pada browser

## Pemasangan pada _Localhost_ dengan _Backend_ Lokal
1. Ikuti [petunjuk instalasi _backend_](https://gitlab.com/mbkm/code-repositories/batch-3/peternakan_sobat_ternak/BackEnd_GembalaApps#instalasi)
2. Ubah konstanta `host` pada `src/utils/constant.js` menjadi alamat URL _backend_ atau `http://localhost:51009`
