import { setTheme } from '@fluentui/web-components';
import { webLightTheme, webDarkTheme, teamsLightTheme, teamsDarkTheme, BrandVariants, createLightTheme, createDarkTheme, createTeamsDarkTheme } from '@fluentui/tokens';

export function setFluentui2Theme(theme: number) {
    //enum Themes{WebLight,WebDark,TeamsLight,TeamsDark}
    if (theme == 0) {
        setTheme(webLightTheme);
    }
    else if (theme == 1) { 
        setTheme(webDarkTheme);
    }
    else if (theme == 2) {
        setTheme(teamsLightTheme);
    }
    else if (theme == 3) {
        setTheme(teamsDarkTheme);
    }
    else {
        var darkTheme = createDarkTheme(myNewTheme);
        
        //darkTheme.colorBrandForeground1 = myNewTheme[110];
        //darkTheme.colorBrandForeground2 = myNewTheme[120];
        setTheme(darkTheme);
    }
}

export function setFluentui2BrandTheme(light: boolean,brant:any) {
    //enum Themes{WebLight,WebDark,TeamsLight,TeamsDark}
    if (light)
        var theme = createLightTheme(brant);
    else {
        var theme = createDarkTheme(brant);

        theme.colorBrandForeground1 = brant[110];
        theme.colorBrandForeground2 = brant[120];
    }
    setTheme(theme);
}

// https://react.fluentui.dev/?path=/docs/theme-theme-designer--docs
const myNewTheme: BrandVariants = {
    10: "#070200",
    20: "#281004",
    30: "#441608",
    40: "#5B190A",
    50: "#741B0B",
    60: "#8D1B0B",
    70: "#A71B09",
    80: "#C21807",
    90: "#DD1204",
    100: "#F90400",
    110: "#FF4425",
    120: "#FF6946",
    130: "#FF8665",
    140: "#FF9E83",
    150: "#FFB59F",
    160: "#FFCBBB"
};




