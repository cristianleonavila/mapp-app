require('dotenv').config();
const { writeFileSync, mkdir, mkdirSync } = require('fs');

const root = './src/environments';
const target = `${root}/environment.ts`;
const content = `
export const environment = {
    mapbox_key: "${process.env['mapbox_key']}"
};
`;

mkdirSync(root, {recursive: true});
writeFileSync( target, content);