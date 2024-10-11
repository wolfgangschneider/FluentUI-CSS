// src/colors/csswg.ts
function isFlat(A) {
  return !Array.isArray(A[0]);
}
function multiplyMatrices(AMatrixOrVector, BMatrixOrVector) {
  const m = AMatrixOrVector.length;
  const A = isFlat(AMatrixOrVector) ? (
    // A is vector, convert to [[a, b, c, ...]]
    [AMatrixOrVector]
  ) : AMatrixOrVector;
  const B = isFlat(BMatrixOrVector) ? (
    // B is vector, convert to [[a], [b], [c], ...]]
    BMatrixOrVector.map((x) => [x])
  ) : BMatrixOrVector;
  const p = B[0].length;
  const B_cols = B[0].map((_, i) => B.map((x) => x[i]));
  let product = A.map(
    (row) => B_cols.map((col) => {
      if (!Array.isArray(row)) {
        return col.reduce((a, c) => a + c * row, 0);
      }
      return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
    })
  );
  if (m === 1) {
    product = product[0];
  }
  if (p === 1) {
    return product.map((x) => x[0]);
  }
  return product;
}
function lin_sRGB(RGB) {
  return RGB.map((val) => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);
    if (abs < 0.04045) {
      return val / 12.92;
    }
    return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
  });
}
function gam_sRGB(RGB) {
  return RGB.map((val) => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);
    if (abs > 31308e-7) {
      return sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    }
    return 12.92 * val;
  });
}
function lin_sRGB_to_XYZ(rgb) {
  const M = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
  ];
  return multiplyMatrices(M, rgb);
}
function XYZ_to_lin_sRGB(XYZ) {
  const M = [
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
    [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
    [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
  ];
  return multiplyMatrices(M, XYZ);
}
function D65_to_D50(XYZ) {
  const M = [
    [1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
    [0.029627815688159344, 0.990434484573249, -0.01707382502938514],
    [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008]
  ];
  return multiplyMatrices(M, XYZ);
}
function D50_to_D65(XYZ) {
  const M = [
    [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
    [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
    [0.012314001688319899, -0.020507696433477912, 1.3303659366080753]
  ];
  return multiplyMatrices(M, XYZ);
}
function XYZ_to_Lab(XYZ) {
  const \u03B5 = 216 / 24389;
  const \u03BA = 24389 / 27;
  const white = [0.96422, 1, 0.82521];
  const xyz = XYZ.map((value, i) => value / white[i]);
  const f = xyz.map((value) => value > \u03B5 ? Math.cbrt(value) : (\u03BA * value + 16) / 116);
  return [
    116 * f[1] - 16,
    // L
    500 * (f[0] - f[1]),
    // a
    200 * (f[1] - f[2])
    // b
  ];
}
function Lab_to_XYZ(Lab) {
  const \u03BA = 24389 / 27;
  const \u03B5 = 216 / 24389;
  const white = [0.96422, 1, 0.82521];
  const f = [];
  f[1] = (Lab[0] + 16) / 116;
  f[0] = Lab[1] / 500 + f[1];
  f[2] = f[1] - Lab[2] / 200;
  const xyz = [
    Math.pow(f[0], 3) > \u03B5 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA,
    Lab[0] > \u03BA * \u03B5 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA,
    Math.pow(f[2], 3) > \u03B5 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA
  ];
  return xyz.map((value, i) => value * white[i]);
}
function Lab_to_LCH(Lab) {
  const hue = Math.atan2(Lab[2], Lab[1]) * 180 / Math.PI;
  return [
    Lab[0],
    // L is still L
    Math.sqrt(Math.pow(Lab[1], 2) + Math.pow(Lab[2], 2)),
    // Chroma
    hue >= 0 ? hue : hue + 360
    // Hue, in degrees [0 to 360)
  ];
}
function LCH_to_Lab(LCH) {
  return [
    LCH[0],
    // L is still L
    LCH[1] * Math.cos(LCH[2] * Math.PI / 180),
    // a
    LCH[1] * Math.sin(LCH[2] * Math.PI / 180)
    // b
  ];
}
function sRGB_to_LCH(RGB) {
  return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB)))));
}
function LCH_to_sRGB(LCH) {
  return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}
function LAB_to_sRGB(LAB) {
  return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LAB))));
}
function is_LCH_inside_sRGB(l, c, h) {
  const \u03B5 = 5e-6;
  const rgb = LCH_to_sRGB([+l, +c, +h]);
  return rgb.reduce((a, b) => a && b >= 0 - \u03B5 && b <= 1 + \u03B5, true);
}
function snap_into_gamut(Lab) {
  const \u03B5 = 1e-4;
  const LCH = Lab_to_LCH(Lab);
  const l = LCH[0];
  let c = LCH[1];
  const h = LCH[2];
  if (is_LCH_inside_sRGB(l, c, h)) {
    return Lab;
  }
  let hiC = c;
  let loC = 0;
  c /= 2;
  while (hiC - loC > \u03B5) {
    if (is_LCH_inside_sRGB(l, c, h)) {
      loC = c;
    } else {
      hiC = c;
    }
    c = (hiC + loC) / 2;
  }
  return LCH_to_Lab([l, c, h]);
}

// src/colors/geometry.ts
var curveResolution = 128;
function equals(v1, v2) {
  return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2];
}
function QuadraticBezierP0(t, p) {
  const k = 1 - t;
  return k * k * p;
}
function QuadraticBezierP1(t, p) {
  return 2 * (1 - t) * t * p;
}
function QuadraticBezierP2(t, p) {
  return t * t * p;
}
function QuadraticBezier(t, p0, p1, p2) {
  return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
}
function getPointOnCurve(curve, t) {
  const [v0, v1, v2] = curve.points;
  return [
    QuadraticBezier(t, v0[0], v1[0], v2[0]),
    QuadraticBezier(t, v0[1], v1[1], v2[1]),
    QuadraticBezier(t, v0[2], v1[2], v2[2])
  ];
}
function getPointsOnCurve(curve, divisions) {
  const points = [];
  for (let d = 0; d <= divisions; d++) {
    points.push(getPointOnCurve(curve, d / divisions));
  }
  return points;
}
function getPointsOnCurvePath(curvePath, divisions = curveResolution) {
  const points = [];
  let last;
  for (let i = 0, curves = curvePath.curves; i < curves.length; i++) {
    const curve = curves[i];
    const pts = getPointsOnCurve(curve, divisions);
    for (const point of pts) {
      if (last && equals(last, point)) {
        continue;
      }
      points.push(point);
      last = point;
    }
  }
  return points;
}

// src/colors/hueMap.ts
function hexToHue(hexColor) {
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const delta = cmax - cmin;
  let hue;
  if (delta === 0) {
    hue = 0;
  } else if (cmax === r) {
    hue = (g - b) / delta % 6;
  } else if (cmax === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }
  return hue;
}
var hueToSnappingPointsMap = [
  [85504e-7, 0.148504, 0.858504],
  [855388e-8, 0.1485388, 0.8585388],
  [85582e-7, 0.148582, 0.858582],
  [856192e-8, 0.1486192, 0.8586192],
  [856644e-8, 0.1486644, 0.8586644],
  [857184e-8, 0.1487184, 0.8587184],
  [85802e-7, 0.148802, 0.858802],
  [858752e-8, 0.1488752, 0.8588752],
  [859616e-8, 0.1489616, 0.8589616],
  [860584e-8, 0.1490584, 0.8590584],
  [861948e-8, 0.1491948, 0.8591948],
  [863172e-8, 0.1493172, 0.8593172],
  [864508e-8, 0.1494508, 0.8594508],
  [865968e-8, 0.1495968, 0.8595968],
  [867968e-8, 0.1497968, 0.8597968],
  [869708e-8, 0.1499708, 0.8599708],
  [871576e-8, 0.1501576, 0.8601576],
  [87358e-7, 0.150358, 0.860358],
  [876272e-8, 0.1506272, 0.8606272],
  [87858e-7, 0.150858, 0.860858],
  [881028e-8, 0.1511028, 0.8611028],
  [88362e-7, 0.151362, 0.861362],
  [88706e-7, 0.151706, 0.861706],
  [88998e-7, 0.151998, 0.861998],
  [893052e-8, 0.1523052, 0.8623052],
  [896272e-8, 0.1526272, 0.8626272],
  [900516e-8, 0.1530516, 0.8630516],
  [904084e-8, 0.1534084, 0.8634084],
  [907812e-8, 0.1537812, 0.8637812],
  [911704e-8, 0.1541704, 0.8641704],
  [916792e-8, 0.1546792, 0.8646792],
  [921048e-8, 0.1551048, 0.8651048],
  [925472e-8, 0.1555472, 0.8655472],
  [930064e-8, 0.1560064, 0.8660064],
  [934824e-8, 0.1564824, 0.8664824],
  [94102e-7, 0.157102, 0.867102],
  [946168e-8, 0.1576168, 0.8676168],
  [951496e-8, 0.1581496, 0.8681496],
  [957e-5, 0.1587, 0.8687],
  [964128e-8, 0.1594128, 0.8694128],
  [970036e-8, 0.1600036, 0.8700036],
  [976128e-8, 0.1606128, 0.8706128],
  [982404e-8, 0.1612404, 0.8712404],
  [990508e-8, 0.1620508, 0.8720508],
  [9972e-6, 0.16272, 0.87272],
  [0.01004084, 0.1634084, 0.8734084],
  [0.0101296, 0.164296, 0.874296],
  [0.01020272, 0.1650272, 0.8750272],
  [0.01027784, 0.1657784, 0.8757784],
  [0.01035488, 0.1665488, 0.8765488],
  [0.01045392, 0.1675392, 0.8775392],
  [0.0105354, 0.168354, 0.878354],
  [0.01061892, 0.1691892, 0.8791892],
  [0.0107044, 0.170044, 0.880044],
  [0.01081412, 0.1711412, 0.8811412],
  [0.0109042, 0.172042, 0.882042],
  [0.01099636, 0.1729636, 0.8829636],
  [0.01109056, 0.1739056, 0.8839056],
  [0.01121124, 0.1751124, 0.8851124],
  [0.01131016, 0.1761016, 0.8861016],
  [0.0114112, 0.177112, 0.887112],
  [0.01138116, 0.1768116, 0.8868116],
  [0.01135176, 0.1765176, 0.8865176],
  [0.01131588, 0.1761588, 0.8861588],
  [0.01128788, 0.1758788, 0.8858788],
  [0.01126048, 0.1756048, 0.8856048],
  [0.01122712, 0.1752712, 0.8852712],
  [0.01120108, 0.1750108, 0.8850108],
  [0.01117568, 0.1747568, 0.8847568],
  [0.01115088, 0.1745088, 0.8845088],
  [0.01112068, 0.1742068, 0.8842068],
  [0.0110972, 0.173972, 0.883972],
  [0.01107428, 0.1737428, 0.8837428],
  [0.01105196, 0.1735196, 0.8835196],
  [0.01102488, 0.1732488, 0.8832488],
  [0.01100384, 0.1730384, 0.8830384],
  [0.0109834, 0.172834, 0.882834],
  [0.01096348, 0.1726348, 0.8826348],
  [0.01094416, 0.1724416, 0.8824416],
  [0.01092072, 0.1722072, 0.8822072],
  [0.01090264, 0.1720264, 0.8820264],
  [0.01088508, 0.1718508, 0.8818508],
  [0.01086388, 0.1716388, 0.8816388],
  [0.01084752, 0.1714752, 0.8814752],
  [0.01083168, 0.1713168, 0.8813168],
  [0.01081636, 0.1711636, 0.8811636],
  [0.010798, 0.17098, 0.88098],
  [0.0107838, 0.170838, 0.880838],
  [0.01077016, 0.1707016, 0.8807016],
  [0.010757, 0.17057, 0.88057],
  [0.01074436, 0.1704436, 0.8804436],
  [0.01072924, 0.1702924, 0.8802924],
  [0.01071768, 0.1701768, 0.8801768],
  [0.01070656, 0.1700656, 0.8800656],
  [0.010696, 0.16996, 0.87996],
  [0.01068336, 0.1698336, 0.8798336],
  [0.01067376, 0.1697376, 0.8797376],
  [0.01066464, 0.1696464, 0.8796464],
  [0.010656, 0.16956, 0.87956],
  [0.01064572, 0.1694572, 0.8794572],
  [0.01063804, 0.1693804, 0.8793804],
  [0.01063076, 0.1693076, 0.8793076],
  [0.01062224, 0.1692224, 0.8792224],
  [0.01061588, 0.1691588, 0.8791588],
  [0.01060996, 0.1690996, 0.8790996],
  [0.0106044, 0.169044, 0.879044],
  [0.0105992, 0.168992, 0.878992],
  [0.01059328, 0.1689328, 0.8789328],
  [0.01058892, 0.1688892, 0.8788892],
  [0.01058496, 0.1688496, 0.8788496],
  [0.01058132, 0.1688132, 0.8788132],
  [0.01057728, 0.1687728, 0.8787728],
  [0.0105744, 0.168744, 0.878744],
  [0.01057184, 0.1687184, 0.8787184],
  [0.01056956, 0.1686956, 0.8786956],
  [0.01056716, 0.1686716, 0.8786716],
  [0.01056556, 0.1686556, 0.8786556],
  [0.0105642, 0.168642, 0.878642],
  [0.01056284, 0.1686284, 0.8786284],
  [0.0105618, 0.168618, 0.878618],
  [0.0105608, 0.168608, 0.878608],
  [0.01056112, 0.1686112, 0.8786112],
  [0.01056148, 0.1686148, 0.8786148],
  [0.01056196, 0.1686196, 0.8786196],
  [0.0105624, 0.168624, 0.878624],
  [0.01056296, 0.1686296, 0.8786296],
  [0.0105636, 0.168636, 0.878636],
  [0.01056452, 0.1686452, 0.8786452],
  [0.0105654, 0.168654, 0.878654],
  [0.0105664, 0.168664, 0.878664],
  [0.01056748, 0.1686748, 0.8786748],
  [0.010569, 0.16869, 0.87869],
  [0.01057036, 0.1687036, 0.8787036],
  [0.0105718, 0.168718, 0.878718],
  [0.01057384, 0.1687384, 0.8787384],
  [0.0105756, 0.168756, 0.878756],
  [0.01057748, 0.1687748, 0.8787748],
  [0.01057948, 0.1687948, 0.8787948],
  [0.01058164, 0.1688164, 0.8788164],
  [0.01058456, 0.1688456, 0.8788456],
  [0.010587, 0.16887, 0.87887],
  [0.01058964, 0.1688964, 0.8788964],
  [0.0105924, 0.168924, 0.878924],
  [0.01059604, 0.1689604, 0.8789604],
  [0.01059916, 0.1689916, 0.8789916],
  [0.0106024, 0.169024, 0.879024],
  [0.01060668, 0.1690668, 0.8790668],
  [0.01061028, 0.1691028, 0.8791028],
  [0.01061408, 0.1691408, 0.8791408],
  [0.010618, 0.16918, 0.87918],
  [0.01062312, 0.1692312, 0.8792312],
  [0.01062744, 0.1692744, 0.8792744],
  [0.01063188, 0.1693188, 0.8793188],
  [0.01063652, 0.1693652, 0.8793652],
  [0.01064132, 0.1694132, 0.8794132],
  [0.0106476, 0.169476, 0.879476],
  [0.0106528, 0.169528, 0.879528],
  [0.01065816, 0.1695816, 0.8795816],
  [0.01066372, 0.1696372, 0.8796372],
  [0.01067092, 0.1697092, 0.8797092],
  [0.01067688, 0.1697688, 0.8797688],
  [0.01068304, 0.1698304, 0.8798304],
  [0.01068936, 0.1698936, 0.8798936],
  [0.01069756, 0.1699756, 0.8799756],
  [0.01070428, 0.1700428, 0.8800428],
  [0.01071124, 0.1701124, 0.8801124],
  [0.0107184, 0.170184, 0.880184],
  [0.0107276, 0.170276, 0.880276],
  [0.0107352, 0.170352, 0.880352],
  [0.01074296, 0.1704296, 0.8804296],
  [0.01075092, 0.1705092, 0.8805092],
  [0.01076116, 0.1706116, 0.8806116],
  [0.0107696, 0.170696, 0.880696],
  [0.01077824, 0.1707824, 0.8807824],
  [0.01078708, 0.1708708, 0.8808708],
  [0.0107984, 0.170984, 0.880984],
  [0.01080772, 0.1710772, 0.8810772],
  [0.0108172, 0.171172, 0.881172],
  [0.0108294, 0.171294, 0.881294],
  [0.0108394, 0.171394, 0.881394],
  [0.0108496, 0.171496, 0.881496],
  [0.01074856, 0.1704856, 0.8804856],
  [0.01064964, 0.1694964, 0.8794964],
  [0.01052896, 0.1682896, 0.8782896],
  [0.01043476, 0.1673476, 0.8773476],
  [0.0103426, 0.166426, 0.876426],
  [0.01025252, 0.1655252, 0.8755252],
  [0.0101428, 0.164428, 0.874428],
  [0.01005732, 0.1635732, 0.8735732],
  [99738e-7, 0.162738, 0.872738],
  [987228e-8, 0.1617228, 0.8717228],
  [9716e-6, 0.16016, 0.87016],
  [96412e-7, 0.159412, 0.869412],
  [9568e-6, 0.15868, 0.86868],
  [947924e-8, 0.1577924, 0.8677924],
  [94104e-7, 0.157104, 0.867104],
  [934348e-8, 0.1564348, 0.8664348],
  [92624e-7, 0.155624, 0.865624],
  [919968e-8, 0.1549968, 0.8649968],
  [91388e-7, 0.154388, 0.864388],
  [907968e-8, 0.1537968, 0.8637968],
  [90224e-7, 0.153224, 0.863224],
  [895336e-8, 0.1525336, 0.8625336],
  [890008e-8, 0.1520008, 0.8620008],
  [88486e-7, 0.151486, 0.861486],
  [878664e-8, 0.1508664, 0.8608664],
  [873904e-8, 0.1503904, 0.8603904],
  [869312e-8, 0.1499312, 0.8599312],
  [864888e-8, 0.1494888, 0.8594888],
  [860632e-8, 0.1490632, 0.8590632],
  [855544e-8, 0.1485544, 0.8585544],
  [851652e-8, 0.1481652, 0.8581652],
  [851652e-8, 0.1481652, 0.8581652],
  [847924e-8, 0.1477924, 0.8577924],
  [844356e-8, 0.1474356, 0.8574356],
  [840112e-8, 0.1470112, 0.8570112],
  [836888e-8, 0.1466888, 0.8566888],
  [83382e-7, 0.146382, 0.856382],
  [8309e-6, 0.14609, 0.85609],
  [827456e-8, 0.1457456, 0.8557456],
  [824868e-8, 0.1454868, 0.8554868],
  [822416e-8, 0.1452416, 0.8552416],
  [819556e-8, 0.1449556, 0.8549556],
  [817416e-8, 0.1447416, 0.8547416],
  [815416e-8, 0.1445416, 0.8545416],
  [813544e-8, 0.1443544, 0.8543544],
  [811804e-8, 0.1441804, 0.8541804],
  [809808e-8, 0.1439808, 0.8539808],
  [808348e-8, 0.1438348, 0.8538348],
  [807012e-8, 0.1437012, 0.8537012],
  [805504e-8, 0.1435504, 0.8535504],
  [804424e-8, 0.1434424, 0.8534424],
  [803456e-8, 0.1433456, 0.8533456],
  [802592e-8, 0.1432592, 0.8532592],
  [801832e-8, 0.1431832, 0.8531832],
  [801024e-8, 0.1431024, 0.8531024],
  [80048e-7, 0.143048, 0.853048],
  [800028e-8, 0.1430028, 0.8530028],
  [799572e-8, 0.1429572, 0.8529572],
  [799224e-8, 0.1429224, 0.8529224],
  [79888e-7, 0.142888, 0.852888],
  [79898e-7, 0.142898, 0.852898],
  [799084e-8, 0.1429084, 0.8529084],
  [79922e-7, 0.142922, 0.852922],
  [79936e-7, 0.142936, 0.852936],
  [79952e-7, 0.142952, 0.852952],
  [799704e-8, 0.1429704, 0.8529704],
  [799984e-8, 0.1429984, 0.8529984],
  [80024e-7, 0.143024, 0.853024],
  [800528e-8, 0.1430528, 0.8530528],
  [800848e-8, 0.1430848, 0.8530848],
  [801296e-8, 0.1431296, 0.8531296],
  [801692e-8, 0.1431692, 0.8531692],
  [802128e-8, 0.1432128, 0.8532128],
  [80272e-7, 0.143272, 0.853272],
  [80324e-7, 0.143324, 0.853324],
  [803796e-8, 0.1433796, 0.8533796],
  [804388e-8, 0.1434388, 0.8534388],
  [805024e-8, 0.1435024, 0.8535024],
  [80588e-7, 0.143588, 0.853588],
  [806604e-8, 0.1436604, 0.8536604],
  [807372e-8, 0.1437372, 0.8537372],
  [8084e-6, 0.14384, 0.85384],
  [809264e-8, 0.1439264, 0.8539264],
  [810176e-8, 0.1440176, 0.8540176],
  [811136e-8, 0.1441136, 0.8541136],
  [8124e-6, 0.14424, 0.85424],
  [81346e-7, 0.144346, 0.854346],
  [814568e-8, 0.1444568, 0.8544568],
  [81572e-7, 0.144572, 0.854572],
  [817236e-8, 0.1447236, 0.8547236],
  [8185e-6, 0.14485, 0.85485],
  [819816e-8, 0.1449816, 0.8549816],
  [82118e-7, 0.145118, 0.855118],
  [8226e-6, 0.14526, 0.85526],
  [82444e-7, 0.145444, 0.855444],
  [826e-5, 0.1456, 0.8556],
  [827552e-8, 0.1457552, 0.8557552],
  [829188e-8, 0.1459188, 0.8559188],
  [831308e-8, 0.1461308, 0.8561308],
  [833064e-8, 0.1463064, 0.8563064],
  [834872e-8, 0.1464872, 0.8564872],
  [837212e-8, 0.1467212, 0.8567212],
  [839148e-8, 0.1469148, 0.8569148],
  [841136e-8, 0.1471136, 0.8571136],
  [843184e-8, 0.1473184, 0.8573184],
  [845288e-8, 0.1475288, 0.8575288],
  [848e-5, 0.1478, 0.8578],
  [850228e-8, 0.1480228, 0.8580228],
  [85252e-7, 0.148252, 0.858252],
  [855464e-8, 0.1485464, 0.8585464],
  [857884e-8, 0.1487884, 0.8587884],
  [860368e-8, 0.1490368, 0.8590368],
  [862908e-8, 0.1492908, 0.8592908],
  [866172e-8, 0.1496172, 0.8596172],
  [868848e-8, 0.1498848, 0.8598848],
  [871588e-8, 0.1501588, 0.8601588],
  [874388e-8, 0.1504388, 0.8604388],
  [877976e-8, 0.1507976, 0.8607976],
  [88092e-7, 0.151092, 0.861092],
  [88392e-7, 0.151392, 0.861392],
  [8829e-6, 0.15129, 0.86129],
  [8819e-6, 0.15119, 0.86119],
  [88068e-7, 0.151068, 0.861068],
  [879732e-8, 0.1509732, 0.8609732],
  [8788e-6, 0.15088, 0.86088],
  [877668e-8, 0.1507668, 0.8607668],
  [876784e-8, 0.1506784, 0.8606784],
  [87592e-7, 0.150592, 0.860592],
  [87508e-7, 0.150508, 0.860508],
  [874256e-8, 0.1504256, 0.8604256],
  [873256e-8, 0.1503256, 0.8603256],
  [87248e-7, 0.150248, 0.860248],
  [87172e-7, 0.150172, 0.860172],
  [8708e-6, 0.15008, 0.86008],
  [870084e-8, 0.1500084, 0.8600084],
  [869388e-8, 0.1499388, 0.8599388],
  [868712e-8, 0.1498712, 0.8598712],
  [867896e-8, 0.1497896, 0.8597896],
  [867264e-8, 0.1497264, 0.8597264],
  [866648e-8, 0.1496648, 0.8596648],
  [866052e-8, 0.1496052, 0.8596052],
  [865332e-8, 0.1495332, 0.8595332],
  [864776e-8, 0.1494776, 0.8594776],
  [86424e-7, 0.149424, 0.859424],
  [86372e-7, 0.149372, 0.859372],
  [863092e-8, 0.1493092, 0.8593092],
  [862612e-8, 0.1492612, 0.8592612],
  [862148e-8, 0.1492148, 0.8592148],
  [8617e-6, 0.14917, 0.85917],
  [861272e-8, 0.1491272, 0.8591272],
  [86076e-7, 0.149076, 0.859076],
  [860368e-8, 0.1490368, 0.8590368],
  [859988e-8, 0.1489988, 0.8589988],
  [859628e-8, 0.1489628, 0.8589628],
  [8592e-6, 0.14892, 0.85892],
  [858876e-8, 0.1488876, 0.8588876],
  [858564e-8, 0.1488564, 0.8588564],
  [858272e-8, 0.1488272, 0.8588272],
  [857924e-8, 0.1487924, 0.8587924],
  [85766e-7, 0.148766, 0.858766],
  [857416e-8, 0.1487416, 0.8587416],
  [85718e-7, 0.148718, 0.858718],
  [856908e-8, 0.1486908, 0.8586908],
  [856708e-8, 0.1486708, 0.8586708],
  [85652e-7, 0.148652, 0.858652],
  [8563e-6, 0.14863, 0.85863],
  [85614e-7, 0.148614, 0.858614],
  [856e-5, 0.1486, 0.8586],
  [85586e-7, 0.148586, 0.858586],
  [855736e-8, 0.1485736, 0.8585736],
  [8556e-6, 0.14856, 0.85856],
  [8555e-6, 0.14855, 0.85855],
  [855412e-8, 0.1485412, 0.8585412],
  [85532e-7, 0.148532, 0.858532],
  [855256e-8, 0.1485256, 0.8585256],
  [8552e-6, 0.14852, 0.85852],
  [855156e-8, 0.1485156, 0.8585156],
  [855108e-8, 0.1485108, 0.8585108],
  [855072e-8, 0.1485072, 0.8585072]
];

// src/colors/palettes.ts
var defaultLinearity = 0.75;
var snappingPointsForKeyColor = (keyColor) => {
  const hue = hexToHue(keyColor);
  const range = [
    hueToSnappingPointsMap[hue][0] * 100,
    hueToSnappingPointsMap[hue][1] * 100,
    hueToSnappingPointsMap[hue][2] * 100
  ];
  return range;
};
var pointsForKeyColor = (keyColor, range, centerPoint) => {
  const hue = hexToHue(keyColor);
  const center = hueToSnappingPointsMap[hue][1] * 100;
  const linear = linearInterpolationThroughPoint(range[0], range[1], center, 16);
  return linear;
};
function linearInterpolationThroughPoint(start, end, inBetween, numSamples) {
  if (numSamples < 3) {
    throw new Error("Number of samples must be at least 3.");
  }
  const inBetweenRatio = (inBetween - start) / (end - start);
  const inBetweenIndex = Math.floor((numSamples - 1) * inBetweenRatio);
  const result = new Array(numSamples);
  result[0] = start;
  result[inBetweenIndex] = inBetween;
  result[numSamples - 1] = end;
  const stepBefore = (inBetween - start) / inBetweenIndex;
  const stepAfter = (end - inBetween) / (numSamples - 1 - inBetweenIndex);
  for (let i = 1; i < inBetweenIndex; i++) {
    result[i] = start + i * stepBefore;
  }
  for (let i = inBetweenIndex + 1; i < numSamples - 1; i++) {
    result[i] = inBetween + (i - inBetweenIndex) * stepAfter;
  }
  return result;
}
var getLogSpace = (min, max, n) => {
  const a = min <= 0 ? 0 : Math.log(min);
  const b = Math.log(max);
  const delta = (b - a) / n;
  const result = [Math.pow(Math.E, a)];
  for (let i = 1; i < n; i += 1) {
    result.push(Math.pow(Math.E, a + delta * i));
  }
  result.push(Math.pow(Math.E, b));
  return result;
};
function paletteShadesFromCurvePoints(curvePoints, nShades, linearity = defaultLinearity, keyColor) {
  if (curvePoints.length <= 2) {
    return [];
  }
  const snappingPoints = snappingPointsForKeyColor(keyColor);
  const paletteShades = [];
  const range = [snappingPoints[0], snappingPoints[2]];
  const logLightness = getLogSpace(Math.log10(0), Math.log10(100), nShades);
  const linearLightness = pointsForKeyColor(keyColor, range, snappingPoints[1]);
  let c = 0;
  for (let i = 0; i < nShades; i++) {
    const l = Math.min(
      range[1],
      Math.max(range[0], logLightness[i] * (1 - linearity) + linearLightness[i] * linearity)
    );
    while (l > curvePoints[c + 1][0]) {
      c++;
    }
    const [l1, a1, b1] = curvePoints[c];
    const [l2, a2, b2] = curvePoints[c + 1];
    const u = (l - l1) / (l2 - l1);
    paletteShades[i] = [l1 + (l2 - l1) * u, a1 + (a2 - a1) * u, b1 + (b2 - b1) * u];
  }
  return paletteShades.map(snap_into_gamut);
}
function paletteShadesFromCurve(keyColor, curve, nShades = 16, linearity = defaultLinearity, curveDepth = 24) {
  const points = getPointsOnCurvePath(curve, Math.ceil(curveDepth * (1 + Math.abs(curve.torsion || 1)) / 2)).map(
    (curvePoint) => getPointOnHelix(curvePoint, curve.torsion, curve.torsionT0)
  );
  return paletteShadesFromCurvePoints(points, nShades, linearity, keyColor);
}
function sRGB_to_hex(rgb) {
  return `#${rgb.map((x) => {
    const channel = x < 0 ? 0 : Math.floor(x >= 1 ? 255 : x * 256);
    return channel.toString(16).padStart(2, "0");
  }).join("")}`;
}
function Lab_to_hex(lab) {
  return sRGB_to_hex(LAB_to_sRGB(lab));
}
function hex_to_sRGB(hex) {
  const aRgbHex = hex.match(/#?(..)(..)(..)/);
  return aRgbHex ? [parseInt(aRgbHex[1], 16) / 255, parseInt(aRgbHex[2], 16) / 255, parseInt(aRgbHex[3], 16) / 255] : [0, 0, 0];
}
function hex_to_LCH(hex) {
  return sRGB_to_LCH(hex_to_sRGB(hex));
}
function paletteShadesToHex(paletteShades) {
  return paletteShades.map(Lab_to_hex);
}
function getPointOnHelix(pointOnCurve, torsion = 0, torsionT0 = 50) {
  const t = pointOnCurve[0];
  const [l, c, h] = Lab_to_LCH(pointOnCurve);
  const hueOffset = torsion * (t - torsionT0);
  return LCH_to_Lab([l, c, h + hueOffset]);
}
function curvePathFromPalette({ keyColor, darkCp, lightCp, hueTorsion }) {
  const blackPosition = [0, 0, 0];
  const whitePosition = [100, 0, 0];
  const keyColorPosition = LCH_to_Lab(keyColor);
  const [l, a, b] = keyColorPosition;
  const darkControlPosition = [l * (1 - darkCp), a, b];
  const lightControlPosition = [l + (100 - l) * lightCp, a, b];
  return {
    curves: [
      { points: [blackPosition, darkControlPosition, keyColorPosition] },
      { points: [keyColorPosition, lightControlPosition, whitePosition] }
    ],
    torsion: hueTorsion,
    torsionT0: l
  };
}
function hexColorsFromPalette(keyColor, palette, nShades = 16, linearity = defaultLinearity, curveDepth = 24) {
  const curve = curvePathFromPalette(palette);
  const shades = paletteShadesFromCurve(keyColor, curve, nShades, linearity, curveDepth);
  return paletteShadesToHex(shades);
}

// src/getBrandTokensFromPalette.ts
function getBrandTokensFromPalette(keyColor, options = {}) {
  const { darkCp = 2 / 3, lightCp = 1 / 3, hueTorsion = 0 } = options;
  const brandPalette = {
    keyColor: hex_to_LCH(keyColor),
    darkCp,
    lightCp,
    hueTorsion
  };
  const hexColors = hexColorsFromPalette(keyColor, brandPalette, 16, 1);
  return hexColors.reduce((acc, hexColor, h) => {
    acc[`${(h + 1) * 10}`] = hexColor;
    return acc;
  }, {});
}
export {
  getBrandTokensFromPalette
};
//# sourceMappingURL=getBrandTokensFromPalette.module.js.map
