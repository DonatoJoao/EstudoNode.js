import pegaArquivo from './index.js';
import chalk from 'chalk'; 
import fs from 'fs';

const caminho = process.argv;

function imprimeLista (resultado, indentificador = '') {
    console.log(chalk.yellow('Lista de links'),
    chalk.black.bgGreen(indentificador),
    resultado);
}

async function processaTexto (argumentos) {
    const caminho = argumentos[2];

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT'){
            console.log('Arquivo ou diretório não existe');
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(resultado);        
    } else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async(nomeDeArquivo) => {
        const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
        imprimeLista(lista, nomeDeArquivo)
        })
    }
}

processaTexto(caminho);