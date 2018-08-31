/* eslint-env node */
/* eslint-disable */
// resize each tile to 1024x1280, slice into 4x5 256px squares

const im = require('imagemagick');
const indir = 'panels/2013'
const outdir = 'zout';

// const infiles = ['n1e1.jpg', 'n1e2.jpg', 'n2e1.jpg'];
const infiles = ['n1e2.jpg'];
const xtiles = 4;
const ytiles = -5;

infiles.forEach(file => {
    console.log(`FILE: ${file}`);
    let [_, n, e] = file.match(/^n(\d+)e(\d+)\.jpg$/);
    n = (parseInt(n)-1) * ytiles;
    e = (parseInt(e)-1) * xtiles;

    im.convert([`${indir}/${file}`, '-resize', '1024x1280', '-crop', '256x256',
                '-set', 'filename:tile', `tile_x_%[fx:page.x/256 + ${e}]_%[fx:page.y/256 + ${n-4}]`,
                `${outdir}/%[filename:tile].jpg`],
        (err, stdout) => {
            if (err) throw err;
            console.log(file, 'done', stdout);
        });

    // if (_) {
    //     for (let j = -4; j <= 0; j++) {
    //         let ln = [];
    //         for (let i = 0; i <= 3; i++) {
    //             ln.push(`(${(x*xtiles)+i}, ${(y*ytiles)+j})`);
    //         }
    //         console.log(ln.join(' '));
    //     }
    // }
    // console.log('--------------------------------');
});



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