const multer = require('multer');
const path = require('path');//lib do proprio node
const crypto = require('crypto');


module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),//para onde esses arquivos serão salvos, __dirname referece a pasta config,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {//gerar numero aleatório com 16 carac, me devolve uma callback
                if (err) {
                    callback(err)
                } else {
                    const filename = `${hash.toString('hex')}-${file.originalname}`//toString('hex') para formaro hexadecimal letras e numeros
                    callback(null, filename)
                }
            })
        }
    }),
    limits: {//alguns limites ao arquivo
        fileSize: 2 * 1024 * 1024,//como aqui é em bytes * 1024 = kilobytes * 1024 = até 2 Megabytes
    },
    fileFilter: (req, file, callback) => {//função para filtar o upload de arquivos
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ]
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);//passo null pro erro
        } else {
            callback(new Error('Invalid file type'))
        }
    }
}