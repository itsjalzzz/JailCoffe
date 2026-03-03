const fs = require("fs");
const inquirer = require("inquirer");
const { type } = require("os");
const log = console.log;

log('========== SELAMAT DATANG DI WELCOME JAIL COFFE =========');

function startAplication(){
    riwayat();

    inquirer.prompt([
        {
            type: 'input',
            name: 'nama',
            message: 'masukkan nama anda : '
        }
    ]).then((answer) =>{
        prosesPesan(answer.nama, [])
    })
}

function riwayat(){
    fs.existsSync('dataPesanan.txt')
    const riwayat = fs.readFileSync('dataPesanan.txt','utf-8')
            log(('========== RIWAYAT PESANAN =========='));
            log((riwayat));
            log(('====================================='));
}

function prosesPesan(nama, keranjang){
    inquirer.prompt([
        {
            type: 'list',
            name: 'pilihan',
            message: `hai ${nama}mau pesan apa? `,
            choices: ['Kopi Hitam','Kopi Susu','Kopi Aren','Cappucino']
        },
        {
            type: 'confirm',
            name: 'pesanManing',
            message: 'masu pesan lagi kah?',
            default : true
        }
    ]).then((answer) =>{
        keranjang.push(answer.pilihan)

        if(answer.pesanManing){
            prosesPesan(nama,keranjang)
        }else{
            const data = keranjang.join(', ');
            const daftar = `Pelanggan : ${nama} | Pesanan : ${data}\n`;
            log('terima kasih,pesanan sedang di proses');

            fs.appendFileSync('dataPesanan.txt',daftar)
        }
    })
}

startAplication();