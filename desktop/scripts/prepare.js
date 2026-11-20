// Prepara la app de escritorio antes de ejecutarla o empaquetarla:
//  1. copia la app web (../web/index.html) a app/web/index.html
//  2. genera los iconos (app/icon.png y build/icon.ico) a partir de ../assets/icon.svg
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const pngToIcoMod = require('png-to-ico');
const pngToIco = pngToIcoMod.default || pngToIcoMod;

const root = path.join(__dirname, '..', '..');
const desktop = path.join(__dirname, '..');

async function main() {
  const webDir = path.join(desktop, 'app', 'web');
  fs.mkdirSync(webDir, { recursive: true });
  fs.copyFileSync(path.join(root, 'web', 'index.html'), path.join(webDir, 'index.html'));

  const svg = fs.readFileSync(path.join(root, 'assets', 'icon.svg'));
  const png = (size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  fs.writeFileSync(path.join(desktop, 'app', 'icon.png'), png(512));
  fs.mkdirSync(path.join(desktop, 'build'), { recursive: true });
  const ico = await pngToIco([256, 128, 64, 48, 32, 24, 16].map(png));
  fs.writeFileSync(path.join(desktop, 'build', 'icon.ico'), ico);
  fs.writeFileSync(path.join(root, 'windows-edge', 'icon.ico'), ico);
  console.log('Listo: app/web/index.html, app/icon.png, build/icon.ico, windows-edge/icon.ico');
}
main().catch((e) => { console.error(e); process.exit(1); });
