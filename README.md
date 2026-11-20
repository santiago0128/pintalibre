# PintaLibre 🎨

App de dibujo y pintura digital inspirada en ibisPaint, hecha con HTML5 Canvas y JavaScript puro (un solo archivo, sin dependencias). Funciona en el navegador (PC y celular) y como app de escritorio para Windows.

## Funciones

- **38 pinceles** en categorías (plumas, boceto, cómic, aerógrafo, acuarela, pintura, rotuladores, especiales y borradores), con favoritos y búsqueda.
- **Ajustes por pincel**: grosor y opacidad inicial/final, duración, dureza, redondez, ángulo, dispersión, variación de tamaño y tono, espaciado, flujo y presión.
- **Corrección de trazo**: estabilizador en tiempo real, corrección posterior, curvas suaves (Catmull-Rom) y presión simulada por velocidad.
- **Trazos nítidos**: los pinceles duros se rellenan como una sola figura vectorial (antialiasing limpio) y la vista usa reescalado de alta calidad.
- **Capas**: máscara de recorte, proteger alfa, 17 modos de fusión, opacidad, combinar, duplicar, voltear, renombrar.
- **Herramientas**: transformar, varita mágica, lazo (selección / relleno / borrar), filtros, difuminar, desenfocar, degradado, cubeta, figuras, texto, cuentagotas.
- **Color**: rueda de tono con cuadro saturación/brillo, color principal y secundario, HEX/RGB, paletas y recientes.
- **Simetría**: espejo, cuadrantes, radial y caleidoscopio.
- **14 filtros**: tono/saturación, brillo/contraste, desenfoque, resplandor, contorno, sombra, mosaico, extraer líneas, etc.
- **Interruptor pintar/borrar** en la barra inferior, gestos táctiles (dos dedos = deshacer, tres = rehacer), atajos de teclado.
- **Archivos**: autoguardado (IndexedDB), exportar PNG, guardar/abrir proyectos `.pintalibre`.

## Estructura

```
web/index.html            La app completa (abrir directamente en el navegador)
desktop/                  Versión de escritorio con Electron
  app/main.js             Ventana, protocolo app://, descargas y guardado al cerrar
  installer.nsi           Instalador de Windows (NSIS)
  scripts/prepare.js      Copia web/index.html a la app y genera los iconos (.png/.ico)
assets/icon.svg           Icono de la app (los .png/.ico se generan a partir de este)
windows-edge/             Alternativa para PCs con "Control inteligente de aplicaciones"
```

## Usar en el navegador

Abre `web/index.html` en Chrome, Edge, Brave o Firefox. No necesita servidor ni instalación.

## App de escritorio (Windows)

Requisitos: Node.js 18+ y, para el instalador, [NSIS](https://nsis.sourceforge.io/) (`makensis`).

```bash
cd desktop
npm install
npm start            # ejecuta la app en modo desarrollo
npm run build:win    # genera desktop/dist/PintaLibre-win32-x64/PintaLibre.exe
npm run installer    # genera desktop/release/PintaLibre-Instalador-1.0.0.exe
```

### Nota sobre el Control inteligente de aplicaciones (Smart App Control)

Windows 11 con *Smart App Control* activado bloquea ejecutables que no estén firmados con un certificado de firma de código. Opciones:

1. Firmar `PintaLibre.exe` y el instalador con un certificado de confianza (por ejemplo, Azure Trusted Signing).
2. Usar la alternativa de `windows-edge/`: un acceso directo que abre `PintaLibre.html` como app con Microsoft Edge (firmado por Microsoft). Ver `windows-edge/LEEME.txt`.
