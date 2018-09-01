#!/usr/local/bin/node

/* eslint-env node */
/* eslint-disable radix, no-param-reassign, no-plusplus, max-len, no-loop-func */
// resize each tile to 1024x1280, slice into 4x5 256px squares

if (!process.argv[2] || !Number.isInteger(process.argv[2])) {
  console.warn('  Usage: slicemaps.js [year]');
  process.exit();
}

const fs = require('fs');
const im = require('simple-imagemagick');

const fsp = fs.promises;
const year = process.argv[2];
const indir = `panels/${year}`;
const outdir = `public/img/jerrysmap/${year}`;

const xtiles = 4;
const ytiles = -5;
const maxzoom = 9;
const minzoom = 3;

function montageZoomTiles(zoomLevel) {
  // zoomLevel is the level you're currently on, creating tiles for the next one up
  // montage tile_12_0_-1.jpg tile_12_1_-1.jpg tile_12_0_0.jpg tile_12_1_0.jpg -geometry 128x128 outfile
  const newZoomLevel = zoomLevel - 1;

  fsp.readdir(outdir)
    .then((result) => {
      const zoomRx = new RegExp(`^tile_${zoomLevel}_(-?\\d+)_(-?\\d+).jpg$`);
      const files = result.filter(e => e.match(zoomRx));
      const maxes = files.reduce((a, c) => { // we're in the NE, so max X and min Y
        const [, x, y] = c.match(zoomRx);
        a.x = (parseInt(x) > a.x) ? parseInt(x) : a.x;
        a.y = (parseInt(y) < a.y) ? parseInt(y) : a.y;
        return a;
      }, {
        x: 0,
        y: 0,
      });

      let montageCount = 0;
      for (let x = 0; x <= maxes.x; x += 2) {
        for (let y = -1; y >= maxes.y; y -= 2) {
          montageCount++;
          const montageFiles = [
            `${outdir}/tile_${zoomLevel}_${x}_${y-1}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x+1}_${y-1}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x}_${y}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x+1}_${y}.jpg`,
          ].map(e => (fs.existsSync(e) ? e : 'null:'));

          const outFile = `${outdir}/tile_${newZoomLevel}_${x/2}_${Math.ceil((y/2)-1)}.jpg`;

          // console.log(montageFiles, ' => ', outFile);
          im.montage([...montageFiles,
            '-tile', '2x2',
            '-geometry', '128x128+0+0',
            outFile,
          ], (err, stdout) => {
            if (err) console.log(err);
            console.log(outFile, 'done', stdout);
            montageCount--;
            if (montageCount === 0 && newZoomLevel > minzoom) {
              montageZoomTiles(newZoomLevel);
            }
          });
        }
      }
    });
}

function makeTilesFromPanels() {
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  fsp.readdir(indir)
    .then((result) => {
      // const files = result.filter(e => e.match(/^n\d+e\d+\.jpg$/));
      const files = result.filter(e => e.match(/^n\de\d\.jpg$/));
      // const files = result.filter(e => e.match(/^n1e1\.jpg$/));
      let fileCount = files.length;
      files.forEach((file) => {
        // console.log(`FILE: ${file}`);
        let [, n, e] = file.match(/^n(\d+)e(\d+)\.jpg$/);
        n = (parseInt(n, 10) - 1) * ytiles;
        e = (parseInt(e, 10) - 1) * xtiles;

        // deepest zoom
        im.convert(
          [`${indir}/${file}`,
            '-resize', '1024x1280',
            '-crop', '256x256',
            '-set', 'filename:tile', `tile_${maxzoom}_%[fx:page.x/256 + ${e}]_%[fx:page.y/256 + ${n + ytiles}]`,
            `${outdir}/%[filename:tile].jpg`,
          ],
          (err) => {
            if (err) {
              console.error('ERROR', err);
            }
            fileCount -= 1;
            if (fileCount === 0) {
              montageZoomTiles(maxzoom);
            }
          },
        );
      });
    });
}

makeTilesFromPanels();

// name tiles: (x,y)
// n1e1 => lower left  = (0,0)
//         lower right = (3,0)
//         upper left  = (0,-4)
//         upper right = (3,-4)
// (n0e0)
//       0,-4  1,-4  2,-4  3,-4
//       0,-3  1,-3  2,-3  3,-3
//       0,-2  1,-2  2,-2  3,-2
//       0,-1  1,-1  2,-1  3,-1
//       0, 0  1, 0  2, 0  3, 0
// (n0e1)
// n1e2 => lower left  = (3,0)
//       4,-4  5,-4  6,-4  7,-4
//       4,-3  5,-3  6,-3  7,-3
//       4,-2  5,-2  6,-2  7,-2
//       4,-1  5,-1  6,-1  7,-1
//       4, 0  5, 0  6, 0  7, 0
// (n1e0)
// n2e1 => lower left  = (0,-4)
//       0,-9  1,-9  2,-9  3,-9
//       0,-8  1,-8  2,-8  3,-8
//       0,-7  1,-7  2,-7  3,-7
//       0,-6  1,-6  2,-6  3,-6
//       0,-5  1,-5  2,-5  3,-5
