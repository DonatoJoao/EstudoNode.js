import chalk from 'chalk';

import fs from 'fs';



function extraiLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados;
}


function trataErro (erro) {
    throw new Error(erro.code, 'não foi encontrado o arquivo no diretório');
}

// ***trabalhando com async/await***
async function pegaArquivo (caminhoDoArquivo){
    try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    console.log(extraiLinks(texto));
    } catch (erro) {
        trataErro(erro)
    }
    
}
 pegaArquivo('./arquivos/texto.md');


// ***modelo código assíncrono com metodo .then***
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch(trataErro)
// }



// ***código síncrono***
// function pegaArquivo (caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro){
//             trataErro(erro);
//         }

//         console.log(chalk.bgGray(texto));
//     })
//}



