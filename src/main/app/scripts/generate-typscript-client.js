const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const path = require('path');

const CodeGen = require('swagger-typescript-codegen').CodeGen;

const generateHash = (content) => {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex')
};

const getSaggerJson = async () => {
    return await new Promise((resolve, reject) => {
        http.get('http://localhost:8080/v2/api-docs', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};


(async () => {
    console.log('directory', process.cwd());
    const outputFileDirectory = path.resolve(process.cwd(), 'src', 'client', `online-store-client.ts`);
    const swagger = await getSaggerJson();
    const tsSourceCode = CodeGen.getTypescriptCode({
        className: 'OnlineStoreClient',
        swagger: swagger
    });

    const fileOption = {encoding: 'utf8', flag: 'w'};

    if (fs.existsSync(outputFileDirectory)) {
        const existingClientHash = generateHash(fs.readFileSync(outputFileDirectory).toString());
        const currentClientHash = generateHash(tsSourceCode);
        if (existingClientHash !== currentClientHash) {
            console.log('override existing shop client');
            fs.writeFileSync(outputFileDirectory, tsSourceCode, fileOption);

        } else {
            console.log('nothing to do shop client already up-to-date')
        }
    } else {
        console.log('generating shop client');
        fs.writeFileSync(outputFileDirectory, tsSourceCode, fileOption);
    }
})();

