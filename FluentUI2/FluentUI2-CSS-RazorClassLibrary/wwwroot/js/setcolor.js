

import { setFluentui2Theme, setFluentui2BrandTheme } from '/easybyte.fluentui2.css.lib.module.js'
//setFluentui2Theme(0);
export function SetTheme(t)
{
    setFluentui2Theme(t);
}


export function setBrandTheme(light, theme)
{
    let b = setFluentui2BrandTheme(light, theme);
    return b;
}
export function SetBrandTheme(light) {
    let easybyte = {
        10: "#080100",
        20: "#2B0E00",
        30: "#491001",
        40: "#620E01",
        50: "#7C0700",
        60: "#901309",
        70: "#9C2D1B",
        80: "#A7412C",
        90: "#B2543E",
        100: "#BC6650",
        110: "#C67763",
        120: "#CF8976",
        130: "#D89A8A",
        140: "#E0AC9E",
        150: "#E8BEB2",
        160: "#EFD0C7"
    };
    setFluentui2BrandTheme(light, easybyte);

   // darkTheme.colorBrandForeground1 = easybyte[110];
   // darkTheme.colorBrandForeground2 = easybyte[120];
}



 



