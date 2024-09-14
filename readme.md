# RUTE API

## KONTER
1. **PAKET INTERNET**
- GET => /api/konter/paket-internet
- - return
```
[
    {
        data: [
            {
                _id:..,
                kode:..,
                provider:..,
                jenisPaket:..,
                produk:..,
                desc:..,
                harga:..,
                hargaJual:..,
                order:..,
                dibuatPada:..
            }
        ],
        options: ["...", "...", "...", ...]
    }
]
```
<!-- - UPDATE DATA GET => /api/konter/update-data/paket-internet -->

2. **VOUCHER INTERNET**
- GET => /api/konter/voucher-internet
- - return
```
[
    {
        data: [
            {
                _id:..,
                kode:..,
                provider:..,
                jenisPaket:..,
                produk:..,
                desc:..,
                harga:..,
                hargaJual:..,
                order:..,
                dibuatPada:..
            }
        ],
        options: ["...", "...", "...", ...]
    }
]
```
<!-- - UPDATE DATA GET => /api/konter/update-data/voucher-internet -->

3. **PULSA**
- GET => /api/konter/pulsa
- - return
```
[
    {
        data: [
            {
                _id:..,
                kode:..,
                provider:..,
                jenisPaket:..,
                produk:..,
                desc:..,
                harga:..,
                hargaJual:..,
                order:..,
                dibuatPada:..
            }
        ],
        options: ["...", "...", "...", ...]
    }
]
```
<!-- - Update Data GET => /api/konter/update-data/pulsa -->

## WIFI
1. **PELANGGAN WIFI**
- GET => /api/wifi
- - return
```
[
    {
        _id:...,
        nama:..,
        macAddress:..,
        dibuatPada:..,
    }
]
```
- Tambah Pelanggan POST => /api/wifi
```
{
    nama: "Contoh Nama",
    macAddress: "CO:NT:OH:MA:CA"
}
```
