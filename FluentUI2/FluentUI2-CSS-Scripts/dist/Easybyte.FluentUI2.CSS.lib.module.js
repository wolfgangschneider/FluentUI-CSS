// node_modules/@microsoft/fast-web-utilities/dist/strings.js
var uniqueIdCounter = 0;
function uniqueId(prefix = "") {
  return `${prefix}${uniqueIdCounter++}`;
}

// node_modules/@fluentui/web-components/dist/esm/theme/set-theme.js
var SUPPORTS_ADOPTED_STYLE_SHEETS = "adoptedStyleSheets" in document;
var SUPPORTS_CSS_SCOPE = "CSSScopeRule" in window;
var themeStyleTextMap = /* @__PURE__ */ new Map();
var scopedThemeKeyMap = /* @__PURE__ */ new Map();
var shadowAdoptedStyleSheetMap = /* @__PURE__ */ new Map();
var elementThemeMap = /* @__PURE__ */ new Map();
var globalThemeStyleSheet = new CSSStyleSheet();
function setTheme(theme, node = document) {
  if (!node || !isThemeableNode(node)) {
    return;
  }
  if (!SUPPORTS_ADOPTED_STYLE_SHEETS || node instanceof HTMLElement && !node.shadowRoot && !SUPPORTS_CSS_SCOPE) {
    const target = node === document ? document.documentElement : node;
    setThemePropertiesOnElement(theme, target);
    return;
  }
  if ([document, document.documentElement, document.body].includes(node)) {
    setGlobalTheme(theme);
  } else {
    setLocalTheme(theme, node);
  }
}
function getThemeStyleText(theme) {
  if (!themeStyleTextMap.has(theme)) {
    const tokenDeclarations = [];
    for (const [tokenName, tokenValue] of Object.entries(theme)) {
      tokenDeclarations.push(`--${tokenName}:${tokenValue.toString()};`);
    }
    themeStyleTextMap.set(theme, tokenDeclarations.join(""));
  }
  return themeStyleTextMap.get(theme);
}
function isThemeableNode(node) {
  return [document, document.documentElement].includes(node) || node instanceof HTMLElement && !!node.closest("body");
}
function setGlobalTheme(theme) {
  if (theme === null) {
    if (document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
      globalThemeStyleSheet.replaceSync("");
    }
    return;
  }
  globalThemeStyleSheet.replaceSync(`
    html {
      ${getThemeStyleText(theme)}
    }
  `);
  if (!document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
    document.adoptedStyleSheets.push(globalThemeStyleSheet);
  }
}
function setLocalTheme(theme, element) {
  if (theme === null) {
    if (element.shadowRoot && shadowAdoptedStyleSheetMap.has(element)) {
      shadowAdoptedStyleSheetMap.get(element).replaceSync("");
    } else {
      delete element.dataset.fluentTheme;
      forceRepaint(element);
    }
    return;
  }
  if (element.shadowRoot) {
    getShadowAdoptedStyleSheet(element).replaceSync(`
      :host {
        ${getThemeStyleText(theme)}
      }
    `);
  } else {
    element.dataset.fluentTheme = getScopedThemeKey(theme);
    forceRepaint(element);
  }
}
function getShadowAdoptedStyleSheet(element) {
  var _a;
  if (!shadowAdoptedStyleSheetMap.has(element)) {
    const shadowAdoptedStyleSheet = new CSSStyleSheet();
    shadowAdoptedStyleSheetMap.set(element, shadowAdoptedStyleSheet);
    (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.adoptedStyleSheets.push(shadowAdoptedStyleSheet);
  }
  return shadowAdoptedStyleSheetMap.get(element);
}
function getScopedThemeKey(theme) {
  if (!scopedThemeKeyMap.has(theme)) {
    const themeKey = uniqueId("fluent-theme-");
    const scopedThemeStyleSheet = new CSSStyleSheet();
    scopedThemeKeyMap.set(theme, themeKey);
    scopedThemeStyleSheet.replaceSync(`
      @scope ([data-fluent-theme="${themeKey}"]) {
        :scope {
          ${getThemeStyleText(theme)}
        }
      }
    `);
    document.adoptedStyleSheets.push(scopedThemeStyleSheet);
  }
  return scopedThemeKeyMap.get(theme);
}
function setThemePropertiesOnElement(theme, element) {
  let tokens;
  if (theme === null) {
    if (!elementThemeMap.has(element)) {
      return;
    }
    tokens = elementThemeMap.get(element);
  } else {
    elementThemeMap.set(element, theme);
    tokens = theme;
  }
  for (const [tokenName, tokenValue] of Object.entries(tokens)) {
    if (theme === null) {
      element.style.removeProperty(`--${tokenName}`);
    } else {
      element.style.setProperty(`--${tokenName}`, tokenValue.toString());
    }
  }
}
var { userAgent: UA } = navigator;
var isWebkit = /\bAppleWebKit\/[\d+\.]+\b/.test(UA);
function forceRepaint(element) {
  if (!isWebkit) {
    return;
  }
  const name = "visibility";
  const tempValue = "hidden";
  const currentValue = element.style.getPropertyValue(name);
  element.style.setProperty(name, tempValue);
  requestAnimationFrame(() => {
    element.style.setProperty(name, currentValue);
  });
}

// node_modules/@fluentui/tokens/lib/global/colors.js
var grey = {
  "2": "#050505",
  "4": "#0a0a0a",
  "6": "#0f0f0f",
  "8": "#141414",
  "10": "#1a1a1a",
  "12": "#1f1f1f",
  "14": "#242424",
  "16": "#292929",
  "18": "#2e2e2e",
  "20": "#333333",
  "22": "#383838",
  "24": "#3d3d3d",
  "26": "#424242",
  "28": "#474747",
  "30": "#4d4d4d",
  "32": "#525252",
  "34": "#575757",
  "36": "#5c5c5c",
  "38": "#616161",
  "40": "#666666",
  "42": "#6b6b6b",
  "44": "#707070",
  "46": "#757575",
  "48": "#7a7a7a",
  "50": "#808080",
  "52": "#858585",
  "54": "#8a8a8a",
  "56": "#8f8f8f",
  "58": "#949494",
  "60": "#999999",
  "62": "#9e9e9e",
  "64": "#a3a3a3",
  "66": "#a8a8a8",
  "68": "#adadad",
  "70": "#b3b3b3",
  "72": "#b8b8b8",
  "74": "#bdbdbd",
  "76": "#c2c2c2",
  "78": "#c7c7c7",
  "80": "#cccccc",
  "82": "#d1d1d1",
  "84": "#d6d6d6",
  "86": "#dbdbdb",
  "88": "#e0e0e0",
  "90": "#e6e6e6",
  "92": "#ebebeb",
  "94": "#f0f0f0",
  "96": "#f5f5f5",
  "98": "#fafafa"
};
var whiteAlpha = {
  "5": "rgba(255, 255, 255, 0.05)",
  "10": "rgba(255, 255, 255, 0.1)",
  "20": "rgba(255, 255, 255, 0.2)",
  "30": "rgba(255, 255, 255, 0.3)",
  "40": "rgba(255, 255, 255, 0.4)",
  "50": "rgba(255, 255, 255, 0.5)",
  "60": "rgba(255, 255, 255, 0.6)",
  "70": "rgba(255, 255, 255, 0.7)",
  "80": "rgba(255, 255, 255, 0.8)",
  "90": "rgba(255, 255, 255, 0.9)"
};
var blackAlpha = {
  "5": "rgba(0, 0, 0, 0.05)",
  "10": "rgba(0, 0, 0, 0.1)",
  "20": "rgba(0, 0, 0, 0.2)",
  "30": "rgba(0, 0, 0, 0.3)",
  "40": "rgba(0, 0, 0, 0.4)",
  "50": "rgba(0, 0, 0, 0.5)",
  "60": "rgba(0, 0, 0, 0.6)",
  "70": "rgba(0, 0, 0, 0.7)",
  "80": "rgba(0, 0, 0, 0.8)",
  "90": "rgba(0, 0, 0, 0.9)"
};
var grey10Alpha = {
  "5": "rgba(26, 26, 26, 0.05)",
  "10": "rgba(26, 26, 26, 0.1)",
  "20": "rgba(26, 26, 26, 0.2)",
  "30": "rgba(26, 26, 26, 0.3)",
  "40": "rgba(26, 26, 26, 0.4)",
  "50": "rgba(26, 26, 26, 0.5)",
  "60": "rgba(26, 26, 26, 0.6)",
  "70": "rgba(26, 26, 26, 0.7)",
  "80": "rgba(26, 26, 26, 0.8)",
  "90": "rgba(26, 26, 26, 0.9)"
};
var grey12Alpha = {
  "5": "rgba(31, 31, 31, 0.05)",
  "10": "rgba(31, 31, 31, 0.1)",
  "20": "rgba(31, 31, 31, 0.2)",
  "30": "rgba(31, 31, 31, 0.3)",
  "40": "rgba(31, 31, 31, 0.4)",
  "50": "rgba(31, 31, 31, 0.5)",
  "60": "rgba(31, 31, 31, 0.6)",
  "70": "rgba(31, 31, 31, 0.7)",
  "80": "rgba(31, 31, 31, 0.8)",
  "90": "rgba(31, 31, 31, 0.9)"
};
var grey14Alpha = {
  "5": "rgba(36, 36, 36, 0.05)",
  "10": "rgba(36, 36, 36, 0.1)",
  "20": "rgba(36, 36, 36, 0.2)",
  "30": "rgba(36, 36, 36, 0.3)",
  "40": "rgba(36, 36, 36, 0.4)",
  "50": "rgba(36, 36, 36, 0.5)",
  "60": "rgba(36, 36, 36, 0.6)",
  "70": "rgba(36, 36, 36, 0.7)",
  "80": "rgba(36, 36, 36, 0.8)",
  "90": "rgba(36, 36, 36, 0.9)"
};
var white = "#ffffff";
var black = "#000000";
var darkRed = {
  shade50: "#130204",
  shade40: "#230308",
  shade30: "#420610",
  shade20: "#590815",
  shade10: "#690a19",
  primary: "#750b1c",
  tint10: "#861b2c",
  tint20: "#962f3f",
  tint30: "#ac4f5e",
  tint40: "#d69ca5",
  tint50: "#e9c7cd",
  tint60: "#f9f0f2"
};
var cranberry = {
  shade50: "#200205",
  shade40: "#3b0509",
  shade30: "#6e0811",
  shade20: "#960b18",
  shade10: "#b10e1c",
  primary: "#c50f1f",
  tint10: "#cc2635",
  tint20: "#d33f4c",
  tint30: "#dc626d",
  tint40: "#eeacb2",
  tint50: "#f6d1d5",
  tint60: "#fdf3f4"
};
var red = {
  shade50: "#210809",
  shade40: "#3f1011",
  shade30: "#751d1f",
  shade20: "#9f282b",
  shade10: "#bc2f32",
  primary: "#d13438",
  tint10: "#d7494c",
  tint20: "#dc5e62",
  tint30: "#e37d80",
  tint40: "#f1bbbc",
  tint50: "#f8dadb",
  tint60: "#fdf6f6"
};
var darkOrange = {
  shade50: "#230900",
  shade40: "#411200",
  shade30: "#7a2101",
  shade20: "#a62d01",
  shade10: "#c43501",
  primary: "#da3b01",
  tint10: "#de501c",
  tint20: "#e36537",
  tint30: "#e9835e",
  tint40: "#f4bfab",
  tint50: "#f9dcd1",
  tint60: "#fdf6f3"
};
var pumpkin = {
  shade50: "#200d03",
  shade40: "#3d1805",
  shade30: "#712d09",
  shade20: "#9a3d0c",
  shade10: "#b6480e",
  primary: "#ca5010",
  tint10: "#d06228",
  tint20: "#d77440",
  tint30: "#df8e64",
  tint40: "#efc4ad",
  tint50: "#f7dfd2",
  tint60: "#fdf7f4"
};
var orange = {
  shade50: "#271002",
  shade40: "#4a1e04",
  shade30: "#8a3707",
  shade20: "#bc4b09",
  shade10: "#de590b",
  primary: "#f7630c",
  tint10: "#f87528",
  tint20: "#f98845",
  tint30: "#faa06b",
  tint40: "#fdcfb4",
  tint50: "#fee5d7",
  tint60: "#fff9f5"
};
var peach = {
  shade50: "#291600",
  shade40: "#4d2a00",
  shade30: "#8f4e00",
  shade20: "#c26a00",
  shade10: "#e67e00",
  primary: "#ff8c00",
  tint10: "#ff9a1f",
  tint20: "#ffa83d",
  tint30: "#ffba66",
  tint40: "#ffddb3",
  tint50: "#ffedd6",
  tint60: "#fffaf5"
};
var marigold = {
  shade50: "#251a00",
  shade40: "#463100",
  shade30: "#835b00",
  shade20: "#b27c00",
  shade10: "#d39300",
  primary: "#eaa300",
  tint10: "#edad1c",
  tint20: "#efb839",
  tint30: "#f2c661",
  tint40: "#f9e2ae",
  tint50: "#fcefd3",
  tint60: "#fefbf4"
};
var yellow = {
  shade50: "#282400",
  shade40: "#4c4400",
  shade30: "#817400",
  shade20: "#c0ad00",
  shade10: "#e4cc00",
  primary: "#fde300",
  tint10: "#fde61e",
  tint20: "#fdea3d",
  tint30: "#feee66",
  tint40: "#fef7b2",
  tint50: "#fffad6",
  tint60: "#fffef5"
};
var gold = {
  shade50: "#1f1900",
  shade40: "#3a2f00",
  shade30: "#6c5700",
  shade20: "#937700",
  shade10: "#ae8c00",
  primary: "#c19c00",
  tint10: "#c8a718",
  tint20: "#d0b232",
  tint30: "#dac157",
  tint40: "#ecdfa5",
  tint50: "#f5eece",
  tint60: "#fdfbf2"
};
var brass = {
  shade50: "#181202",
  shade40: "#2e2103",
  shade30: "#553e06",
  shade20: "#745408",
  shade10: "#89640a",
  primary: "#986f0b",
  tint10: "#a47d1e",
  tint20: "#b18c34",
  tint30: "#c1a256",
  tint40: "#e0cea2",
  tint50: "#efe4cb",
  tint60: "#fbf8f2"
};
var brown = {
  shade50: "#170e07",
  shade40: "#2b1a0e",
  shade30: "#50301a",
  shade20: "#6c4123",
  shade10: "#804d29",
  primary: "#8e562e",
  tint10: "#9c663f",
  tint20: "#a97652",
  tint30: "#bb8f6f",
  tint40: "#ddc3b0",
  tint50: "#edded3",
  tint60: "#faf7f4"
};
var forest = {
  shade50: "#0c1501",
  shade40: "#162702",
  shade30: "#294903",
  shade20: "#376304",
  shade10: "#427505",
  primary: "#498205",
  tint10: "#599116",
  tint20: "#6ba02b",
  tint30: "#85b44c",
  tint40: "#bdd99b",
  tint50: "#dbebc7",
  tint60: "#f6faf0"
};
var seafoam = {
  shade50: "#002111",
  shade40: "#003d20",
  shade30: "#00723b",
  shade20: "#009b51",
  shade10: "#00b85f",
  primary: "#00cc6a",
  tint10: "#19d279",
  tint20: "#34d889",
  tint30: "#5ae0a0",
  tint40: "#a8f0cd",
  tint50: "#cff7e4",
  tint60: "#f3fdf8"
};
var lightGreen = {
  shade50: "#031a02",
  shade40: "#063004",
  shade30: "#0b5a08",
  shade20: "#0e7a0b",
  shade10: "#11910d",
  primary: "#13a10e",
  tint10: "#27ac22",
  tint20: "#3db838",
  tint30: "#5ec75a",
  tint40: "#a7e3a5",
  tint50: "#cef0cd",
  tint60: "#f2fbf2"
};
var green = {
  shade50: "#031403",
  shade40: "#052505",
  shade30: "#094509",
  shade20: "#0c5e0c",
  shade10: "#0e700e",
  primary: "#107c10",
  tint10: "#218c21",
  tint20: "#359b35",
  tint30: "#54b054",
  tint40: "#9fd89f",
  tint50: "#c9eac9",
  tint60: "#f1faf1"
};
var darkGreen = {
  shade50: "#021102",
  shade40: "#032003",
  shade30: "#063b06",
  shade20: "#085108",
  shade10: "#0a5f0a",
  primary: "#0b6a0b",
  tint10: "#1a7c1a",
  tint20: "#2d8e2d",
  tint30: "#4da64d",
  tint40: "#9ad29a",
  tint50: "#c6e7c6",
  tint60: "#f0f9f0"
};
var lightTeal = {
  shade50: "#001d1f",
  shade40: "#00373a",
  shade30: "#00666d",
  shade20: "#008b94",
  shade10: "#00a5af",
  primary: "#00b7c3",
  tint10: "#18bfca",
  tint20: "#32c8d1",
  tint30: "#58d3db",
  tint40: "#a6e9ed",
  tint50: "#cef3f5",
  tint60: "#f2fcfd"
};
var teal = {
  shade50: "#001516",
  shade40: "#012728",
  shade30: "#02494c",
  shade20: "#026467",
  shade10: "#037679",
  primary: "#038387",
  tint10: "#159195",
  tint20: "#2aa0a4",
  tint30: "#4cb4b7",
  tint40: "#9bd9db",
  tint50: "#c7ebec",
  tint60: "#f0fafa"
};
var steel = {
  shade50: "#000f12",
  shade40: "#001b22",
  shade30: "#00333f",
  shade20: "#004555",
  shade10: "#005265",
  primary: "#005b70",
  tint10: "#0f6c81",
  tint20: "#237d92",
  tint30: "#4496a9",
  tint40: "#94c8d4",
  tint50: "#c3e1e8",
  tint60: "#eff7f9"
};
var blue = {
  shade50: "#001322",
  shade40: "#002440",
  shade30: "#004377",
  shade20: "#005ba1",
  shade10: "#006cbf",
  primary: "#0078d4",
  tint10: "#1a86d9",
  tint20: "#3595de",
  tint30: "#5caae5",
  tint40: "#a9d3f2",
  tint50: "#d0e7f8",
  tint60: "#f3f9fd"
};
var royalBlue = {
  shade50: "#000c16",
  shade40: "#00172a",
  shade30: "#002c4e",
  shade20: "#003b6a",
  shade10: "#00467e",
  primary: "#004e8c",
  tint10: "#125e9a",
  tint20: "#286fa8",
  tint30: "#4a89ba",
  tint40: "#9abfdc",
  tint50: "#c7dced",
  tint60: "#f0f6fa"
};
var cornflower = {
  shade50: "#0d1126",
  shade40: "#182047",
  shade30: "#2c3c85",
  shade20: "#3c51b4",
  shade10: "#4760d5",
  primary: "#4f6bed",
  tint10: "#637cef",
  tint20: "#778df1",
  tint30: "#93a4f4",
  tint40: "#c8d1fa",
  tint50: "#e1e6fc",
  tint60: "#f7f9fe"
};
var navy = {
  shade50: "#00061d",
  shade40: "#000c36",
  shade30: "#001665",
  shade20: "#001e89",
  shade10: "#0023a2",
  primary: "#0027b4",
  tint10: "#173bbd",
  tint20: "#3050c6",
  tint30: "#546fd2",
  tint40: "#a3b2e8",
  tint50: "#ccd5f3",
  tint60: "#f2f4fc"
};
var lavender = {
  shade50: "#120f25",
  shade40: "#221d46",
  shade30: "#3f3682",
  shade20: "#5649b0",
  shade10: "#6656d1",
  primary: "#7160e8",
  tint10: "#8172eb",
  tint20: "#9184ee",
  tint30: "#a79cf1",
  tint40: "#d2ccf8",
  tint50: "#e7e4fb",
  tint60: "#f9f8fe"
};
var purple = {
  shade50: "#0f0717",
  shade40: "#1c0e2b",
  shade30: "#341a51",
  shade20: "#46236e",
  shade10: "#532982",
  primary: "#5c2e91",
  tint10: "#6b3f9e",
  tint20: "#7c52ab",
  tint30: "#9470bd",
  tint40: "#c6b1de",
  tint50: "#e0d3ed",
  tint60: "#f7f4fb"
};
var grape = {
  shade50: "#160418",
  shade40: "#29072e",
  shade30: "#4c0d55",
  shade20: "#671174",
  shade10: "#7a1589",
  primary: "#881798",
  tint10: "#952aa4",
  tint20: "#a33fb1",
  tint30: "#b55fc1",
  tint40: "#d9a7e0",
  tint50: "#eaceef",
  tint60: "#faf2fb"
};
var berry = {
  shade50: "#1f091d",
  shade40: "#3a1136",
  shade30: "#6d2064",
  shade20: "#932b88",
  shade10: "#af33a1",
  primary: "#c239b3",
  tint10: "#c94cbc",
  tint20: "#d161c4",
  tint30: "#da7ed0",
  tint40: "#edbbe7",
  tint50: "#f5daf2",
  tint60: "#fdf5fc"
};
var lilac = {
  shade50: "#1c0b1f",
  shade40: "#35153a",
  shade30: "#63276d",
  shade20: "#863593",
  shade10: "#9f3faf",
  primary: "#b146c2",
  tint10: "#ba58c9",
  tint20: "#c36bd1",
  tint30: "#cf87da",
  tint40: "#e6bfed",
  tint50: "#f2dcf5",
  tint60: "#fcf6fd"
};
var pink = {
  shade50: "#24091b",
  shade40: "#441232",
  shade30: "#80215d",
  shade20: "#ad2d7e",
  shade10: "#cd3595",
  primary: "#e43ba6",
  tint10: "#e750b0",
  tint20: "#ea66ba",
  tint30: "#ef85c8",
  tint40: "#f7c0e3",
  tint50: "#fbddf0",
  tint60: "#fef6fb"
};
var magenta = {
  shade50: "#1f0013",
  shade40: "#390024",
  shade30: "#6b0043",
  shade20: "#91005a",
  shade10: "#ac006b",
  primary: "#bf0077",
  tint10: "#c71885",
  tint20: "#ce3293",
  tint30: "#d957a8",
  tint40: "#eca5d1",
  tint50: "#f5cee6",
  tint60: "#fcf2f9"
};
var plum = {
  shade50: "#13000c",
  shade40: "#240017",
  shade30: "#43002b",
  shade20: "#5a003b",
  shade10: "#6b0045",
  primary: "#77004d",
  tint10: "#87105d",
  tint20: "#98246f",
  tint30: "#ad4589",
  tint40: "#d696c0",
  tint50: "#e9c4dc",
  tint60: "#faf0f6"
};
var beige = {
  shade50: "#141313",
  shade40: "#252323",
  shade30: "#444241",
  shade20: "#5d5958",
  shade10: "#6e6968",
  primary: "#7a7574",
  tint10: "#8a8584",
  tint20: "#9a9594",
  tint30: "#afabaa",
  tint40: "#d7d4d4",
  tint50: "#eae8e8",
  tint60: "#faf9f9"
};
var mink = {
  shade50: "#0f0e0e",
  shade40: "#1c1b1a",
  shade30: "#343231",
  shade20: "#474443",
  shade10: "#54514f",
  primary: "#5d5a58",
  tint10: "#706d6b",
  tint20: "#84817e",
  tint30: "#9e9b99",
  tint40: "#cecccb",
  tint50: "#e5e4e3",
  tint60: "#f8f8f8"
};
var platinum = {
  shade50: "#111314",
  shade40: "#1f2426",
  shade30: "#3b4447",
  shade20: "#505c60",
  shade10: "#5f6d71",
  primary: "#69797e",
  tint10: "#79898d",
  tint20: "#89989d",
  tint30: "#a0adb2",
  tint40: "#cdd6d8",
  tint50: "#e4e9ea",
  tint60: "#f8f9fa"
};
var anchor = {
  shade50: "#090a0b",
  shade40: "#111315",
  shade30: "#202427",
  shade20: "#2b3135",
  shade10: "#333a3f",
  primary: "#394146",
  tint10: "#4d565c",
  tint20: "#626c72",
  tint30: "#808a90",
  tint40: "#bcc3c7",
  tint50: "#dbdfe1",
  tint60: "#f6f7f8"
};

// node_modules/@fluentui/tokens/lib/global/colorPalette.js
var statusSharedColors = {
  red,
  green,
  darkOrange,
  yellow,
  berry,
  lightGreen,
  marigold
};
var personaSharedColors = {
  darkRed,
  cranberry,
  pumpkin,
  peach,
  gold,
  brass,
  brown,
  forest,
  seafoam,
  darkGreen,
  lightTeal,
  teal,
  steel,
  blue,
  royalBlue,
  cornflower,
  navy,
  lavender,
  purple,
  grape,
  lilac,
  pink,
  magenta,
  plum,
  beige,
  mink,
  platinum,
  anchor
};
var mappedStatusColors = {
  cranberry,
  green,
  orange
};

// node_modules/@fluentui/tokens/lib/sharedColorNames.js
var statusSharedColorNames = [
  "red",
  "green",
  "darkOrange",
  "yellow",
  "berry",
  "lightGreen",
  "marigold"
];
var personaSharedColorNames = [
  "darkRed",
  "cranberry",
  "pumpkin",
  "peach",
  "gold",
  "brass",
  "brown",
  "forest",
  "seafoam",
  "darkGreen",
  "lightTeal",
  "teal",
  "steel",
  "blue",
  "royalBlue",
  "cornflower",
  "navy",
  "lavender",
  "purple",
  "grape",
  "lilac",
  "pink",
  "magenta",
  "plum",
  "beige",
  "mink",
  "platinum",
  "anchor"
];

// node_modules/@fluentui/tokens/lib/statusColorMapping.js
var statusColorMapping = {
  success: "green",
  warning: "orange",
  danger: "cranberry"
};

// node_modules/@fluentui/tokens/lib/alias/lightColorPalette.js
var statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
statusColorPaletteTokens.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;
statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;
var personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
var colorPaletteTokens = {
  ...statusColorPaletteTokens,
  ...personaColorPaletteTokens
};
var colorStatusTokens = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
  const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
  const statusColorTokens = {
    [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].tint60,
    [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].shade10,
    [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].shade30,
    [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].primary
  };
  return Object.assign(acc, statusColorTokens);
}, {});
colorStatusTokens.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;
colorStatusTokens.colorStatusWarningForeground1 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens.colorStatusWarningForeground3 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens.colorStatusWarningBorder2 = mappedStatusColors[statusColorMapping.warning].shade20;

// node_modules/@fluentui/tokens/lib/alias/lightColor.js
var generateColorTokens = (brand) => ({
  colorNeutralForeground1: grey[14],
  colorNeutralForeground1Hover: grey[14],
  colorNeutralForeground1Pressed: grey[14],
  colorNeutralForeground1Selected: grey[14],
  colorNeutralForeground2: grey[26],
  colorNeutralForeground2Hover: grey[14],
  colorNeutralForeground2Pressed: grey[14],
  colorNeutralForeground2Selected: grey[14],
  colorNeutralForeground2BrandHover: brand[80],
  colorNeutralForeground2BrandPressed: brand[70],
  colorNeutralForeground2BrandSelected: brand[80],
  colorNeutralForeground3: grey[38],
  colorNeutralForeground3Hover: grey[26],
  colorNeutralForeground3Pressed: grey[26],
  colorNeutralForeground3Selected: grey[26],
  colorNeutralForeground3BrandHover: brand[80],
  colorNeutralForeground3BrandPressed: brand[70],
  colorNeutralForeground3BrandSelected: brand[80],
  colorNeutralForeground4: grey[44],
  colorNeutralForegroundDisabled: grey[74],
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
  colorBrandForegroundLink: brand[70],
  colorBrandForegroundLinkHover: brand[60],
  colorBrandForegroundLinkPressed: brand[40],
  colorBrandForegroundLinkSelected: brand[70],
  colorNeutralForeground2Link: grey[26],
  colorNeutralForeground2LinkHover: grey[14],
  colorNeutralForeground2LinkPressed: grey[14],
  colorNeutralForeground2LinkSelected: grey[14],
  colorCompoundBrandForeground1: brand[80],
  colorCompoundBrandForeground1Hover: brand[70],
  colorCompoundBrandForeground1Pressed: brand[60],
  colorBrandForeground1: brand[80],
  colorBrandForeground2: brand[70],
  colorBrandForeground2Hover: brand[60],
  colorBrandForeground2Pressed: brand[30],
  colorNeutralForeground1Static: grey[14],
  colorNeutralForegroundStaticInverted: white,
  colorNeutralForegroundInverted: white,
  colorNeutralForegroundInvertedHover: white,
  colorNeutralForegroundInvertedPressed: white,
  colorNeutralForegroundInvertedSelected: white,
  colorNeutralForegroundInverted2: white,
  colorNeutralForegroundOnBrand: white,
  colorNeutralForegroundInvertedLink: white,
  colorNeutralForegroundInvertedLinkHover: white,
  colorNeutralForegroundInvertedLinkPressed: white,
  colorNeutralForegroundInvertedLinkSelected: white,
  colorBrandForegroundInverted: brand[100],
  colorBrandForegroundInvertedHover: brand[110],
  colorBrandForegroundInvertedPressed: brand[100],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[50],
  colorBrandForegroundOnLightSelected: brand[60],
  colorNeutralBackground1: white,
  colorNeutralBackground1Hover: grey[96],
  colorNeutralBackground1Pressed: grey[88],
  colorNeutralBackground1Selected: grey[92],
  colorNeutralBackground2: grey[98],
  colorNeutralBackground2Hover: grey[94],
  colorNeutralBackground2Pressed: grey[86],
  colorNeutralBackground2Selected: grey[90],
  colorNeutralBackground3: grey[96],
  colorNeutralBackground3Hover: grey[92],
  colorNeutralBackground3Pressed: grey[84],
  colorNeutralBackground3Selected: grey[88],
  colorNeutralBackground4: grey[94],
  colorNeutralBackground4Hover: grey[98],
  colorNeutralBackground4Pressed: grey[96],
  colorNeutralBackground4Selected: white,
  colorNeutralBackground5: grey[92],
  colorNeutralBackground5Hover: grey[96],
  colorNeutralBackground5Pressed: grey[94],
  colorNeutralBackground5Selected: grey[98],
  colorNeutralBackground6: grey[90],
  colorNeutralBackgroundInverted: grey[16],
  colorNeutralBackgroundStatic: grey[20],
  colorNeutralBackgroundAlpha: whiteAlpha[50],
  colorNeutralBackgroundAlpha2: whiteAlpha[80],
  colorSubtleBackground: "transparent",
  colorSubtleBackgroundHover: grey[96],
  colorSubtleBackgroundPressed: grey[88],
  colorSubtleBackgroundSelected: grey[92],
  colorSubtleBackgroundLightAlphaHover: whiteAlpha[70],
  colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50],
  colorSubtleBackgroundLightAlphaSelected: "transparent",
  colorSubtleBackgroundInverted: "transparent",
  colorSubtleBackgroundInvertedHover: blackAlpha[10],
  colorSubtleBackgroundInvertedPressed: blackAlpha[30],
  colorSubtleBackgroundInvertedSelected: blackAlpha[20],
  colorTransparentBackground: "transparent",
  colorTransparentBackgroundHover: "transparent",
  colorTransparentBackgroundPressed: "transparent",
  colorTransparentBackgroundSelected: "transparent",
  colorNeutralBackgroundDisabled: grey[94],
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
  colorNeutralStencil1: grey[90],
  colorNeutralStencil2: grey[98],
  colorNeutralStencil1Alpha: blackAlpha[10],
  colorNeutralStencil2Alpha: blackAlpha[5],
  colorBackgroundOverlay: blackAlpha[40],
  colorScrollbarOverlay: blackAlpha[50],
  colorBrandBackground: brand[80],
  colorBrandBackgroundHover: brand[70],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[80],
  colorCompoundBrandBackgroundHover: brand[70],
  colorCompoundBrandBackgroundPressed: brand[60],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[160],
  colorBrandBackground2Hover: brand[150],
  colorBrandBackground2Pressed: brand[130],
  colorBrandBackground3Static: brand[60],
  colorBrandBackground4Static: brand[40],
  colorBrandBackgroundInverted: white,
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[150],
  colorNeutralCardBackground: grey[98],
  colorNeutralCardBackgroundHover: white,
  colorNeutralCardBackgroundPressed: grey[96],
  colorNeutralCardBackgroundSelected: grey[92],
  colorNeutralCardBackgroundDisabled: grey[94],
  colorNeutralStrokeAccessible: grey[38],
  colorNeutralStrokeAccessibleHover: grey[34],
  colorNeutralStrokeAccessiblePressed: grey[30],
  colorNeutralStrokeAccessibleSelected: brand[80],
  colorNeutralStroke1: grey[82],
  colorNeutralStroke1Hover: grey[78],
  colorNeutralStroke1Pressed: grey[70],
  colorNeutralStroke1Selected: grey[74],
  colorNeutralStroke2: grey[88],
  colorNeutralStroke3: grey[94],
  colorNeutralStrokeSubtle: grey[88],
  colorNeutralStrokeOnBrand: white,
  colorNeutralStrokeOnBrand2: white,
  colorNeutralStrokeOnBrand2Hover: white,
  colorNeutralStrokeOnBrand2Pressed: white,
  colorNeutralStrokeOnBrand2Selected: white,
  colorBrandStroke1: brand[80],
  colorBrandStroke2: brand[140],
  colorBrandStroke2Hover: brand[120],
  colorBrandStroke2Pressed: brand[80],
  colorBrandStroke2Contrast: brand[140],
  colorCompoundBrandStroke: brand[80],
  colorCompoundBrandStrokeHover: brand[70],
  colorCompoundBrandStrokePressed: brand[60],
  colorNeutralStrokeDisabled: grey[88],
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
  colorTransparentStroke: "transparent",
  colorTransparentStrokeInteractive: "transparent",
  colorTransparentStrokeDisabled: "transparent",
  colorNeutralStrokeAlpha: blackAlpha[5],
  colorNeutralStrokeAlpha2: whiteAlpha[20],
  colorStrokeFocus1: white,
  colorStrokeFocus2: black,
  colorNeutralShadowAmbient: "rgba(0,0,0,0.12)",
  colorNeutralShadowKey: "rgba(0,0,0,0.14)",
  colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.06)",
  colorNeutralShadowKeyLighter: "rgba(0,0,0,0.07)",
  colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.20)",
  colorNeutralShadowKeyDarker: "rgba(0,0,0,0.24)",
  colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
  colorBrandShadowKey: "rgba(0,0,0,0.25)"
});

// node_modules/@fluentui/tokens/lib/global/borderRadius.js
var borderRadius = {
  borderRadiusNone: "0",
  borderRadiusSmall: "2px",
  borderRadiusMedium: "4px",
  borderRadiusLarge: "6px",
  borderRadiusXLarge: "8px",
  borderRadiusCircular: "10000px"
};

// node_modules/@fluentui/tokens/lib/global/curves.js
var curves = {
  curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
  curveAccelerateMid: "cubic-bezier(1,0,1,1)",
  curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
  curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
  curveDecelerateMid: "cubic-bezier(0,0,0,1)",
  curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
  curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
  curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
  curveLinear: "cubic-bezier(0,0,1,1)"
};

// node_modules/@fluentui/tokens/lib/global/durations.js
var durations = {
  durationUltraFast: "50ms",
  durationFaster: "100ms",
  durationFast: "150ms",
  durationNormal: "200ms",
  durationGentle: "250ms",
  durationSlow: "300ms",
  durationSlower: "400ms",
  durationUltraSlow: "500ms"
};

// node_modules/@fluentui/tokens/lib/global/fonts.js
var fontSizes = {
  fontSizeBase100: "10px",
  fontSizeBase200: "12px",
  fontSizeBase300: "14px",
  fontSizeBase400: "16px",
  fontSizeBase500: "20px",
  fontSizeBase600: "24px",
  fontSizeHero700: "28px",
  fontSizeHero800: "32px",
  fontSizeHero900: "40px",
  fontSizeHero1000: "68px"
};
var lineHeights = {
  lineHeightBase100: "14px",
  lineHeightBase200: "16px",
  lineHeightBase300: "20px",
  lineHeightBase400: "22px",
  lineHeightBase500: "28px",
  lineHeightBase600: "32px",
  lineHeightHero700: "36px",
  lineHeightHero800: "40px",
  lineHeightHero900: "52px",
  lineHeightHero1000: "92px"
};
var fontWeights = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700
};
var fontFamilies = {
  fontFamilyBase: (
    // eslint-disable-next-line @fluentui/max-len
    "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
  ),
  fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
  fontFamilyNumeric: (
    // eslint-disable-next-line @fluentui/max-len
    "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
  )
};

// node_modules/@fluentui/tokens/lib/global/spacings.js
var spacings = {
  none: "0",
  xxs: "2px",
  xs: "4px",
  sNudge: "6px",
  s: "8px",
  mNudge: "10px",
  m: "12px",
  l: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px"
};
var horizontalSpacings = {
  spacingHorizontalNone: spacings.none,
  spacingHorizontalXXS: spacings.xxs,
  spacingHorizontalXS: spacings.xs,
  spacingHorizontalSNudge: spacings.sNudge,
  spacingHorizontalS: spacings.s,
  spacingHorizontalMNudge: spacings.mNudge,
  spacingHorizontalM: spacings.m,
  spacingHorizontalL: spacings.l,
  spacingHorizontalXL: spacings.xl,
  spacingHorizontalXXL: spacings.xxl,
  spacingHorizontalXXXL: spacings.xxxl
};
var verticalSpacings = {
  spacingVerticalNone: spacings.none,
  spacingVerticalXXS: spacings.xxs,
  spacingVerticalXS: spacings.xs,
  spacingVerticalSNudge: spacings.sNudge,
  spacingVerticalS: spacings.s,
  spacingVerticalMNudge: spacings.mNudge,
  spacingVerticalM: spacings.m,
  spacingVerticalL: spacings.l,
  spacingVerticalXL: spacings.xl,
  spacingVerticalXXL: spacings.xxl,
  spacingVerticalXXXL: spacings.xxxl
};

// node_modules/@fluentui/tokens/lib/global/strokeWidths.js
var strokeWidths = {
  strokeWidthThin: "1px",
  strokeWidthThick: "2px",
  strokeWidthThicker: "3px",
  strokeWidthThickest: "4px"
};

// node_modules/@fluentui/tokens/lib/utils/shadows.js
function createShadowTokens(ambientColor, keyColor, tokenSuffix = "") {
  return {
    [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
    [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`
  };
}

// node_modules/@fluentui/tokens/lib/utils/createLightTheme.js
var createLightTheme = (brand) => {
  const colorTokens = generateColorTokens(brand);
  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations,
    ...curves,
    ...colorTokens,
    ...colorPaletteTokens,
    ...colorStatusTokens,
    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
  };
};

// node_modules/@fluentui/tokens/lib/global/brandColors.js
var brandWeb = {
  10: `#061724`,
  20: `#082338`,
  30: `#0a2e4a`,
  40: `#0c3b5e`,
  50: `#0e4775`,
  60: `#0f548c`,
  70: `#115ea3`,
  80: `#0f6cbd`,
  90: `#2886de`,
  100: `#479ef5`,
  110: `#62abf5`,
  120: `#77b7f7`,
  130: `#96c6fa`,
  140: `#b4d6fa`,
  150: `#cfe4fa`,
  160: `#ebf3fc`
};
var brandTeams = {
  10: `#2b2b40`,
  20: `#2f2f4a`,
  30: `#333357`,
  40: `#383966`,
  50: `#3d3e78`,
  60: `#444791`,
  70: `#4f52b2`,
  80: `#5b5fc7`,
  90: `#7579eb`,
  100: `#7f85f5`,
  110: `#9299f7`,
  120: `#aab1fa`,
  130: `#b6bcfa`,
  140: `#c5cbfa`,
  150: `#dce0fa`,
  160: `#e8ebfa`
};

// node_modules/@fluentui/tokens/lib/themes/teams/lightTheme.js
var teamsLightTheme = createLightTheme(brandTeams);

// node_modules/@fluentui/tokens/lib/alias/darkColorPalette.js
var statusColorPaletteTokens2 = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].tint20
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
statusColorPaletteTokens2.colorPaletteRedForeground3 = statusSharedColors.red.tint30;
statusColorPaletteTokens2.colorPaletteRedBorder2 = statusSharedColors.red.tint30;
statusColorPaletteTokens2.colorPaletteGreenForeground3 = statusSharedColors.green.tint40;
statusColorPaletteTokens2.colorPaletteGreenBorder2 = statusSharedColors.green.tint40;
statusColorPaletteTokens2.colorPaletteDarkOrangeForeground3 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens2.colorPaletteDarkOrangeBorder2 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens2.colorPaletteRedForegroundInverted = statusSharedColors.red.primary;
statusColorPaletteTokens2.colorPaletteGreenForegroundInverted = statusSharedColors.green.primary;
statusColorPaletteTokens2.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.shade30;
var personaColorPaletteTokens2 = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].tint30
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
personaColorPaletteTokens2.colorPaletteDarkRedBackground2 = personaSharedColors.darkRed.shade20;
personaColorPaletteTokens2.colorPalettePlumBackground2 = personaSharedColors.plum.shade20;
var colorPaletteTokens2 = {
  ...statusColorPaletteTokens2,
  ...personaColorPaletteTokens2
};
var colorStatusTokens2 = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
  const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
  const statusColorTokens = {
    [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].shade40,
    [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].shade30,
    [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].tint20,
    [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].shade10,
    [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].tint20
  };
  return Object.assign(acc, statusColorTokens);
}, {});
colorStatusTokens2.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens2.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;
colorStatusTokens2.colorStatusDangerForeground3 = mappedStatusColors[statusColorMapping.danger].tint40;
colorStatusTokens2.colorStatusDangerBorder2 = mappedStatusColors[statusColorMapping.danger].tint30;
colorStatusTokens2.colorStatusSuccessForeground3 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens2.colorStatusSuccessBorder2 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens2.colorStatusWarningForegroundInverted = mappedStatusColors[statusColorMapping.warning].shade20;

// node_modules/@fluentui/tokens/lib/alias/teamsDarkColor.js
var generateColorTokens2 = (brand) => ({
  colorNeutralForeground1: white,
  colorNeutralForeground1Hover: white,
  colorNeutralForeground1Pressed: white,
  colorNeutralForeground1Selected: white,
  colorNeutralForeground2: grey[84],
  colorNeutralForeground2Hover: white,
  colorNeutralForeground2Pressed: white,
  colorNeutralForeground2Selected: white,
  colorNeutralForeground2BrandHover: brand[100],
  colorNeutralForeground2BrandPressed: brand[90],
  colorNeutralForeground2BrandSelected: brand[100],
  colorNeutralForeground3: grey[68],
  colorNeutralForeground3Hover: grey[84],
  colorNeutralForeground3Pressed: grey[84],
  colorNeutralForeground3Selected: grey[84],
  colorNeutralForeground3BrandHover: brand[100],
  colorNeutralForeground3BrandPressed: brand[90],
  colorNeutralForeground3BrandSelected: brand[100],
  colorNeutralForeground4: grey[60],
  colorNeutralForegroundDisabled: grey[36],
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
  colorBrandForegroundLink: brand[100],
  colorBrandForegroundLinkHover: brand[110],
  colorBrandForegroundLinkPressed: brand[90],
  colorBrandForegroundLinkSelected: brand[100],
  colorNeutralForeground2Link: grey[84],
  colorNeutralForeground2LinkHover: white,
  colorNeutralForeground2LinkPressed: white,
  colorNeutralForeground2LinkSelected: white,
  colorCompoundBrandForeground1: brand[100],
  colorCompoundBrandForeground1Hover: brand[110],
  colorCompoundBrandForeground1Pressed: brand[90],
  colorBrandForeground1: brand[100],
  colorBrandForeground2: brand[120],
  colorBrandForeground2Hover: brand[130],
  colorBrandForeground2Pressed: brand[160],
  colorNeutralForeground1Static: grey[14],
  colorNeutralForegroundStaticInverted: white,
  colorNeutralForegroundInverted: grey[14],
  colorNeutralForegroundInvertedHover: grey[14],
  colorNeutralForegroundInvertedPressed: grey[14],
  colorNeutralForegroundInvertedSelected: grey[14],
  colorNeutralForegroundInverted2: grey[14],
  colorNeutralForegroundOnBrand: white,
  colorNeutralForegroundInvertedLink: white,
  colorNeutralForegroundInvertedLinkHover: white,
  colorNeutralForegroundInvertedLinkPressed: white,
  colorNeutralForegroundInvertedLinkSelected: white,
  colorBrandForegroundInverted: brand[80],
  colorBrandForegroundInvertedHover: brand[70],
  colorBrandForegroundInvertedPressed: brand[60],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[50],
  colorBrandForegroundOnLightSelected: brand[60],
  colorNeutralBackground1: grey[16],
  colorNeutralBackground1Hover: grey[24],
  colorNeutralBackground1Pressed: grey[12],
  colorNeutralBackground1Selected: grey[22],
  colorNeutralBackground2: grey[14],
  colorNeutralBackground2Hover: grey[22],
  colorNeutralBackground2Pressed: grey[10],
  colorNeutralBackground2Selected: grey[20],
  colorNeutralBackground3: grey[12],
  colorNeutralBackground3Hover: grey[20],
  colorNeutralBackground3Pressed: grey[8],
  colorNeutralBackground3Selected: grey[18],
  colorNeutralBackground4: grey[8],
  colorNeutralBackground4Hover: grey[16],
  colorNeutralBackground4Pressed: grey[4],
  colorNeutralBackground4Selected: grey[14],
  colorNeutralBackground5: grey[4],
  colorNeutralBackground5Hover: grey[12],
  colorNeutralBackground5Pressed: black,
  colorNeutralBackground5Selected: grey[10],
  colorNeutralBackground6: grey[20],
  colorNeutralBackgroundInverted: white,
  colorNeutralBackgroundStatic: grey[24],
  colorNeutralBackgroundAlpha: grey10Alpha[50],
  colorNeutralBackgroundAlpha2: grey12Alpha[70],
  colorSubtleBackground: "transparent",
  colorSubtleBackgroundHover: grey[22],
  colorSubtleBackgroundPressed: grey[18],
  colorSubtleBackgroundSelected: grey[20],
  colorSubtleBackgroundLightAlphaHover: grey14Alpha[80],
  colorSubtleBackgroundLightAlphaPressed: grey14Alpha[50],
  colorSubtleBackgroundLightAlphaSelected: "transparent",
  colorSubtleBackgroundInverted: "transparent",
  colorSubtleBackgroundInvertedHover: blackAlpha[10],
  colorSubtleBackgroundInvertedPressed: blackAlpha[30],
  colorSubtleBackgroundInvertedSelected: blackAlpha[20],
  colorTransparentBackground: "transparent",
  colorTransparentBackgroundHover: "transparent",
  colorTransparentBackgroundPressed: "transparent",
  colorTransparentBackgroundSelected: "transparent",
  colorNeutralBackgroundDisabled: grey[8],
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
  colorNeutralStencil1: grey[34],
  colorNeutralStencil2: grey[20],
  colorNeutralStencil1Alpha: whiteAlpha[10],
  colorNeutralStencil2Alpha: whiteAlpha[5],
  colorBackgroundOverlay: blackAlpha[50],
  colorScrollbarOverlay: whiteAlpha[60],
  colorBrandBackground: brand[70],
  colorBrandBackgroundHover: brand[80],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[100],
  colorCompoundBrandBackgroundHover: brand[110],
  colorCompoundBrandBackgroundPressed: brand[90],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[20],
  colorBrandBackground2Hover: brand[40],
  colorBrandBackground2Pressed: brand[10],
  colorBrandBackground3Static: brand[60],
  colorBrandBackground4Static: brand[40],
  colorBrandBackgroundInverted: white,
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[150],
  colorNeutralCardBackground: grey[20],
  colorNeutralCardBackgroundHover: grey[24],
  colorNeutralCardBackgroundPressed: grey[18],
  colorNeutralCardBackgroundSelected: grey[22],
  colorNeutralCardBackgroundDisabled: grey[8],
  colorNeutralStrokeAccessible: grey[68],
  colorNeutralStrokeAccessibleHover: grey[74],
  colorNeutralStrokeAccessiblePressed: grey[70],
  colorNeutralStrokeAccessibleSelected: brand[100],
  colorNeutralStroke1: grey[40],
  colorNeutralStroke1Hover: grey[46],
  colorNeutralStroke1Pressed: grey[42],
  colorNeutralStroke1Selected: grey[44],
  colorNeutralStroke2: grey[32],
  colorNeutralStroke3: grey[24],
  colorNeutralStrokeSubtle: grey[4],
  colorNeutralStrokeOnBrand: grey[16],
  colorNeutralStrokeOnBrand2: white,
  colorNeutralStrokeOnBrand2Hover: white,
  colorNeutralStrokeOnBrand2Pressed: white,
  colorNeutralStrokeOnBrand2Selected: white,
  colorBrandStroke1: brand[100],
  colorBrandStroke2: brand[50],
  colorBrandStroke2Hover: brand[50],
  colorBrandStroke2Pressed: brand[30],
  colorBrandStroke2Contrast: brand[50],
  colorCompoundBrandStroke: brand[90],
  colorCompoundBrandStrokeHover: brand[100],
  colorCompoundBrandStrokePressed: brand[80],
  colorNeutralStrokeDisabled: grey[26],
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
  colorTransparentStroke: "transparent",
  colorTransparentStrokeInteractive: "transparent",
  colorTransparentStrokeDisabled: "transparent",
  colorNeutralStrokeAlpha: whiteAlpha[10],
  colorNeutralStrokeAlpha2: whiteAlpha[20],
  colorStrokeFocus1: black,
  colorStrokeFocus2: white,
  colorNeutralShadowAmbient: "rgba(0,0,0,0.24)",
  colorNeutralShadowKey: "rgba(0,0,0,0.28)",
  colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.12)",
  colorNeutralShadowKeyLighter: "rgba(0,0,0,0.14)",
  colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.40)",
  colorNeutralShadowKeyDarker: "rgba(0,0,0,0.48)",
  colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
  colorBrandShadowKey: "rgba(0,0,0,0.25)"
});

// node_modules/@fluentui/tokens/lib/utils/createTeamsDarkTheme.js
var createTeamsDarkTheme = (brand) => {
  const colorTokens = generateColorTokens2(brand);
  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations,
    ...curves,
    ...colorTokens,
    ...colorPaletteTokens2,
    ...colorStatusTokens2,
    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
  };
};

// node_modules/@fluentui/tokens/lib/themes/teams/darkTheme.js
var teamsDarkTheme = createTeamsDarkTheme(brandTeams);

// node_modules/@fluentui/tokens/lib/themes/web/lightTheme.js
var webLightTheme = createLightTheme(brandWeb);

// node_modules/@fluentui/tokens/lib/alias/darkColor.js
var generateColorTokens3 = (brand) => ({
  colorNeutralForeground1: white,
  colorNeutralForeground1Hover: white,
  colorNeutralForeground1Pressed: white,
  colorNeutralForeground1Selected: white,
  colorNeutralForeground2: grey[84],
  colorNeutralForeground2Hover: white,
  colorNeutralForeground2Pressed: white,
  colorNeutralForeground2Selected: white,
  colorNeutralForeground2BrandHover: brand[100],
  colorNeutralForeground2BrandPressed: brand[90],
  colorNeutralForeground2BrandSelected: brand[100],
  colorNeutralForeground3: grey[68],
  colorNeutralForeground3Hover: grey[84],
  colorNeutralForeground3Pressed: grey[84],
  colorNeutralForeground3Selected: grey[84],
  colorNeutralForeground3BrandHover: brand[100],
  colorNeutralForeground3BrandPressed: brand[90],
  colorNeutralForeground3BrandSelected: brand[100],
  colorNeutralForeground4: grey[60],
  colorNeutralForegroundDisabled: grey[36],
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
  colorBrandForegroundLink: brand[100],
  colorBrandForegroundLinkHover: brand[110],
  colorBrandForegroundLinkPressed: brand[90],
  colorBrandForegroundLinkSelected: brand[100],
  colorNeutralForeground2Link: grey[84],
  colorNeutralForeground2LinkHover: white,
  colorNeutralForeground2LinkPressed: white,
  colorNeutralForeground2LinkSelected: white,
  colorCompoundBrandForeground1: brand[100],
  colorCompoundBrandForeground1Hover: brand[110],
  colorCompoundBrandForeground1Pressed: brand[90],
  colorBrandForeground1: brand[100],
  colorBrandForeground2: brand[110],
  colorBrandForeground2Hover: brand[130],
  colorBrandForeground2Pressed: brand[160],
  colorNeutralForeground1Static: grey[14],
  colorNeutralForegroundStaticInverted: white,
  colorNeutralForegroundInverted: grey[14],
  colorNeutralForegroundInvertedHover: grey[14],
  colorNeutralForegroundInvertedPressed: grey[14],
  colorNeutralForegroundInvertedSelected: grey[14],
  colorNeutralForegroundInverted2: grey[14],
  colorNeutralForegroundOnBrand: white,
  colorNeutralForegroundInvertedLink: white,
  colorNeutralForegroundInvertedLinkHover: white,
  colorNeutralForegroundInvertedLinkPressed: white,
  colorNeutralForegroundInvertedLinkSelected: white,
  colorBrandForegroundInverted: brand[80],
  colorBrandForegroundInvertedHover: brand[70],
  colorBrandForegroundInvertedPressed: brand[60],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[50],
  colorBrandForegroundOnLightSelected: brand[60],
  colorNeutralBackground1: grey[16],
  colorNeutralBackground1Hover: grey[24],
  colorNeutralBackground1Pressed: grey[12],
  colorNeutralBackground1Selected: grey[22],
  colorNeutralBackground2: grey[12],
  colorNeutralBackground2Hover: grey[20],
  colorNeutralBackground2Pressed: grey[8],
  colorNeutralBackground2Selected: grey[18],
  colorNeutralBackground3: grey[8],
  colorNeutralBackground3Hover: grey[16],
  colorNeutralBackground3Pressed: grey[4],
  colorNeutralBackground3Selected: grey[14],
  colorNeutralBackground4: grey[4],
  colorNeutralBackground4Hover: grey[12],
  colorNeutralBackground4Pressed: black,
  colorNeutralBackground4Selected: grey[10],
  colorNeutralBackground5: black,
  colorNeutralBackground5Hover: grey[8],
  colorNeutralBackground5Pressed: grey[2],
  colorNeutralBackground5Selected: grey[6],
  colorNeutralBackground6: grey[20],
  colorNeutralBackgroundInverted: white,
  colorNeutralBackgroundStatic: grey[24],
  colorNeutralBackgroundAlpha: grey10Alpha[50],
  colorNeutralBackgroundAlpha2: grey12Alpha[70],
  colorSubtleBackground: "transparent",
  colorSubtleBackgroundHover: grey[22],
  colorSubtleBackgroundPressed: grey[18],
  colorSubtleBackgroundSelected: grey[20],
  colorSubtleBackgroundLightAlphaHover: grey14Alpha[80],
  colorSubtleBackgroundLightAlphaPressed: grey14Alpha[50],
  colorSubtleBackgroundLightAlphaSelected: "transparent",
  colorSubtleBackgroundInverted: "transparent",
  colorSubtleBackgroundInvertedHover: blackAlpha[10],
  colorSubtleBackgroundInvertedPressed: blackAlpha[30],
  colorSubtleBackgroundInvertedSelected: blackAlpha[20],
  colorTransparentBackground: "transparent",
  colorTransparentBackgroundHover: "transparent",
  colorTransparentBackgroundPressed: "transparent",
  colorTransparentBackgroundSelected: "transparent",
  colorNeutralBackgroundDisabled: grey[8],
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
  colorNeutralStencil1: grey[34],
  colorNeutralStencil2: grey[20],
  colorNeutralStencil1Alpha: whiteAlpha[10],
  colorNeutralStencil2Alpha: whiteAlpha[5],
  colorBackgroundOverlay: blackAlpha[50],
  colorScrollbarOverlay: whiteAlpha[60],
  colorBrandBackground: brand[70],
  colorBrandBackgroundHover: brand[80],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[100],
  colorCompoundBrandBackgroundHover: brand[110],
  colorCompoundBrandBackgroundPressed: brand[90],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[20],
  colorBrandBackground2Hover: brand[40],
  colorBrandBackground2Pressed: brand[10],
  colorBrandBackground3Static: brand[60],
  colorBrandBackground4Static: brand[40],
  colorBrandBackgroundInverted: white,
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[150],
  colorNeutralCardBackground: grey[20],
  colorNeutralCardBackgroundHover: grey[24],
  colorNeutralCardBackgroundPressed: grey[18],
  colorNeutralCardBackgroundSelected: grey[22],
  colorNeutralCardBackgroundDisabled: grey[8],
  colorNeutralStrokeAccessible: grey[68],
  colorNeutralStrokeAccessibleHover: grey[74],
  colorNeutralStrokeAccessiblePressed: grey[70],
  colorNeutralStrokeAccessibleSelected: brand[100],
  colorNeutralStroke1: grey[40],
  colorNeutralStroke1Hover: grey[46],
  colorNeutralStroke1Pressed: grey[42],
  colorNeutralStroke1Selected: grey[44],
  colorNeutralStroke2: grey[32],
  colorNeutralStroke3: grey[24],
  colorNeutralStrokeSubtle: grey[4],
  colorNeutralStrokeOnBrand: grey[16],
  colorNeutralStrokeOnBrand2: white,
  colorNeutralStrokeOnBrand2Hover: white,
  colorNeutralStrokeOnBrand2Pressed: white,
  colorNeutralStrokeOnBrand2Selected: white,
  colorBrandStroke1: brand[100],
  colorBrandStroke2: brand[50],
  colorBrandStroke2Hover: brand[50],
  colorBrandStroke2Pressed: brand[30],
  colorBrandStroke2Contrast: brand[50],
  colorCompoundBrandStroke: brand[100],
  colorCompoundBrandStrokeHover: brand[110],
  colorCompoundBrandStrokePressed: brand[90],
  colorNeutralStrokeDisabled: grey[26],
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
  colorTransparentStroke: "transparent",
  colorTransparentStrokeInteractive: "transparent",
  colorTransparentStrokeDisabled: "transparent",
  colorNeutralStrokeAlpha: whiteAlpha[10],
  colorNeutralStrokeAlpha2: whiteAlpha[20],
  colorStrokeFocus1: black,
  colorStrokeFocus2: white,
  colorNeutralShadowAmbient: "rgba(0,0,0,0.24)",
  colorNeutralShadowKey: "rgba(0,0,0,0.28)",
  colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.12)",
  colorNeutralShadowKeyLighter: "rgba(0,0,0,0.14)",
  colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.40)",
  colorNeutralShadowKeyDarker: "rgba(0,0,0,0.48)",
  colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
  colorBrandShadowKey: "rgba(0,0,0,0.25)"
});

// node_modules/@fluentui/tokens/lib/utils/createDarkTheme.js
var createDarkTheme = (brand) => {
  const colorTokens = generateColorTokens3(brand);
  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations,
    ...curves,
    ...colorTokens,
    ...colorPaletteTokens2,
    ...colorStatusTokens2,
    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
  };
};

// node_modules/@fluentui/tokens/lib/themes/web/darkTheme.js
var webDarkTheme = createDarkTheme(brandWeb);

// src/FluentUI2-CSS-Script.ts
function setFluentui2Theme(theme) {
  if (theme == 0) {
    setTheme(webLightTheme);
  } else if (theme == 1) {
    setTheme(webDarkTheme);
  } else if (theme == 2) {
    setTheme(teamsLightTheme);
  } else if (theme == 3) {
    setTheme(teamsDarkTheme);
  } else {
    var darkTheme = createDarkTheme(myNewTheme);
    setTheme(darkTheme);
  }
}
function setFluentui2BrandTheme(light, brant) {
  if (light)
    var theme = createLightTheme(brant);
  else {
    var theme = createDarkTheme(brant);
    theme.colorBrandForeground1 = brant[110];
    theme.colorBrandForeground2 = brant[120];
  }
  setTheme(theme);
  return theme;
}
var myNewTheme = {
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
export {
  setFluentui2BrandTheme,
  setFluentui2Theme
};
//# sourceMappingURL=Easybyte.FluentUI2.CSS.lib.module.js.map
