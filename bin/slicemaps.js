#!/usr/local/bin/node

/* eslint-env node */
/* eslint-disable radix, no-param-reassign, no-plusplus, max-len, no-loop-func, indent, no-nested-ternary, no-multi-spaces */
// resize each tile to 1024x1280, slice into 4x5 256px squares

const fs = require('fs');
const im = require('simple-imagemagick');
const ProcessBuffer = require('./ProcessBuffer');

if (!process.argv[2] || !process.argv[2].match(/^\d{4}$/)) {
  console.warn('  Usage: slicemaps.js [year]');
  process.exit();
}

const panelFilter = (process.argv[3] === 'one') ? /^n1e1\.jpg$/ :
                    (process.argv[3] === 'ten') ? /^n\de\d\.jpg$/ :
                                                  /^n\d+e\d+\.jpg$/;

const fsp = fs.promises;
const year = process.argv[2];
const indir = `panels/${year}`;
const outdir = `public/img/jerrysmap/${year}`;

const X_TILES = 4;
const Y_TILES = -5;
const MAX_ZOOM = 9;
const MIN_ZOOM = 2;

function montageZoomTiles(zoomLevel) { // zoomLevel is the current zoom level, not the new one
  const newZoomLevel = zoomLevel - 1;
  const buffer = new ProcessBuffer();
  buffer.callback = () => {
    console.log(`* Done with zoom level ${zoomLevel}`);
    if (newZoomLevel > MIN_ZOOM) {
      montageZoomTiles(newZoomLevel);
    }
  };

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

      for (let x = 0; x <= maxes.x; x += 2) {
        for (let y = -1; y >= maxes.y; y -= 2) {
          const outFile = `${outdir}/tile_${newZoomLevel}_${x / 2}_${Math.ceil((y / 2) - 1)}.jpg`;
          const montageFiles = [
            `${outdir}/tile_${zoomLevel}_${x}_${y - 1}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x + 1}_${y - 1}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x}_${y}.jpg`,
            `${outdir}/tile_${zoomLevel}_${x + 1}_${y}.jpg`,
          ].map(e => (fs.existsSync(e) ? e : 'null:'));

          buffer.add((cb) => {
            im.montage([...montageFiles,
              '-tile', '2x2',
              '-geometry', '128x128+0+0',
              outFile,
            ], (err) => {
              if (err) console.log(err);
              console.log(outFile, 'done');
              cb();
            });
          });
        }
      }

      buffer.run();
    });
}

function createNETiles(files) {
  const buffer = new ProcessBuffer();
  buffer.callback = () => {
    montageZoomTiles(MAX_ZOOM);
  };

  files.forEach((file) => {
    console.log(`Panel: ${file}`);

    let [, n, e] = file.match(/^n(\d+)e(\d+)\.jpg$/);
    n = (parseInt(n, 10) - 1) * Y_TILES;
    e = (parseInt(e, 10) - 1) * X_TILES;

    buffer.add((cb) => {
      im.convert(
        [`${indir}/${file}`,
          '-resize', '1024x1280',
          '-crop', '256x256',
          '-set', 'filename:tile', `tile_${MAX_ZOOM}_%[fx:page.x/256 + ${e}]_%[fx:page.y/256 + ${n + Y_TILES}]`,
          `${outdir}/%[filename:tile].jpg`,
        ],
        (err) => {
          if (err) console.error(err);
          console.log(file, 'done.');
          cb();
        },
      );
    });
  });

  buffer.run();
}

function makeTilesFromPanels() {
  // Create output directory, if it doesn't already exist
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  fsp.readdir(indir)
    .then((result) => {
      const files = result.filter(e => e.match(panelFilter));
      createNETiles(files);
    });
}

makeTilesFromPanels();
