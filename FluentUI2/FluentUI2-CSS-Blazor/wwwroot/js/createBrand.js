


import { getBrandTokensFromPalette } from '/getBrandTokensFromPalette.module.js'
import { setBrandTheme } from '/js/setcolor.js'

//createBrand("ff0000", 0, 0);
export function createBrand(color, hueTorsion, vibrancy) 
{
   
    let p = getBrandTokensFromPalette(color, {
        hueTorsion,
        darkCp: vibrancy,
        lightCp: vibrancy,
    });

    let b = setBrandTheme(true, p)
    return b;
}



 



