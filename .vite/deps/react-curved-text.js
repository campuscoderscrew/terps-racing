import {
  __toESM,
  require_react
} from "./chunk-AK4TLUUY.js";

// node_modules/react-curved-text/dist/index.es.js
var import_react = __toESM(require_react());
function i() {
  return i = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (t2[n2] = r2[n2]);
    }
    return t2;
  }, i.apply(this, arguments);
}
var a = { origin: [0, 0, 0], round: 4 };
var o = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 };
function m(t2) {
  let e2 = t2.pathValue[t2.segmentStart], r2 = e2.toLowerCase();
  const { data: n2 } = t2;
  for (; n2.length >= o[r2] && ("m" === r2 && n2.length > 2 ? (t2.segments.push([e2, ...n2.splice(0, 2)]), r2 = "l", e2 = "m" === e2 ? "l" : "L") : t2.segments.push([e2, ...n2.splice(0, o[r2])]), o[r2]); ) ;
}
var c = "SVGPathCommander error";
function u(t2) {
  const { index: e2, pathValue: r2 } = t2, n2 = r2.charCodeAt(e2);
  return 48 === n2 ? (t2.param = 0, void (t2.index += 1)) : 49 === n2 ? (t2.param = 1, void (t2.index += 1)) : void (t2.err = `${c}: invalid Arc flag "${r2[e2]}", expecting 0 or 1 at index ${e2}`);
}
function l(t2) {
  return t2 >= 48 && t2 <= 57;
}
var h = "Invalid path value";
function f(t2) {
  const { max: e2, pathValue: r2, index: n2 } = t2;
  let s2, i2 = n2, a2 = false, o2 = false, m2 = false, u2 = false;
  if (i2 >= e2) t2.err = `${c}: ${h} at index ${i2}, "pathValue" is missing param`;
  else if (s2 = r2.charCodeAt(i2), 43 !== s2 && 45 !== s2 || (i2 += 1, s2 = r2.charCodeAt(i2)), l(s2) || 46 === s2) {
    if (46 !== s2) {
      if (a2 = 48 === s2, i2 += 1, s2 = r2.charCodeAt(i2), a2 && i2 < e2 && s2 && l(s2)) return void (t2.err = `${c}: ${h} at index ${n2}, "${r2[n2]}" illegal number`);
      for (; i2 < e2 && l(r2.charCodeAt(i2)); ) i2 += 1, o2 = true;
      s2 = r2.charCodeAt(i2);
    }
    if (46 === s2) {
      for (u2 = true, i2 += 1; l(r2.charCodeAt(i2)); ) i2 += 1, m2 = true;
      s2 = r2.charCodeAt(i2);
    }
    if (101 === s2 || 69 === s2) {
      if (u2 && !o2 && !m2) return void (t2.err = `${c}: ${h} at index ${i2}, "${r2[i2]}" invalid float exponent`);
      if (i2 += 1, s2 = r2.charCodeAt(i2), 43 !== s2 && 45 !== s2 || (i2 += 1), !(i2 < e2 && l(r2.charCodeAt(i2)))) return void (t2.err = `${c}: ${h} at index ${i2}, "${r2[i2]}" invalid integer exponent`);
      for (; i2 < e2 && l(r2.charCodeAt(i2)); ) i2 += 1;
    }
    t2.index = i2, t2.param = +t2.pathValue.slice(n2, i2);
  } else t2.err = `${c}: ${h} at index ${i2}, "${r2[i2]}" is not a number`;
}
function y(t2) {
  const { pathValue: e2, max: r2 } = t2;
  for (; t2.index < r2 && (10 === (n2 = e2.charCodeAt(t2.index)) || 13 === n2 || 8232 === n2 || 8233 === n2 || 32 === n2 || 9 === n2 || 11 === n2 || 12 === n2 || 160 === n2 || n2 >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].includes(n2)); ) t2.index += 1;
  var n2;
}
function x(t2) {
  return t2 >= 48 && t2 <= 57 || 43 === t2 || 45 === t2 || 46 === t2;
}
function p(t2) {
  const { max: e2, pathValue: r2, index: n2 } = t2, s2 = r2.charCodeAt(n2), i2 = o[r2[n2].toLowerCase()];
  if (t2.segmentStart = n2, function(t3) {
    switch (32 | t3) {
      case 109:
      case 122:
      case 108:
      case 104:
      case 118:
      case 99:
      case 115:
      case 113:
      case 116:
      case 97:
        return true;
      default:
        return false;
    }
  }(s2)) if (t2.index += 1, y(t2), t2.data = [], i2) {
    for (; ; ) {
      for (let n3 = i2; n3 > 0; n3 -= 1) {
        if (97 != (32 | s2) || 3 !== n3 && 4 !== n3 ? f(t2) : u(t2), t2.err.length) return;
        t2.data.push(t2.param), y(t2), t2.index < e2 && 44 === r2.charCodeAt(t2.index) && (t2.index += 1, y(t2));
      }
      if (t2.index >= t2.max) break;
      if (!x(r2.charCodeAt(t2.index))) break;
    }
    m(t2);
  } else m(t2);
  else t2.err = `${c}: ${h} "${r2[n2]}" is not a path command`;
}
function g(t2) {
  return t2.map((t3) => Array.isArray(t3) ? [...t3] : t3);
}
function d(t2) {
  this.segments = [], this.pathValue = t2, this.max = t2.length, this.index = 0, this.param = 0, this.segmentStart = 0, this.data = [], this.err = "";
}
function b(t2) {
  return Array.isArray(t2) && t2.every((t3) => {
    const e2 = t3[0].toLowerCase();
    return o[e2] === t3.length - 1 && "achlmqstvz".includes(e2);
  });
}
function M(t2) {
  if (b(t2)) return g(t2);
  const e2 = new d(t2);
  for (y(e2); e2.index < e2.max && !e2.err.length; ) p(e2);
  return e2.err ? e2.err : e2.segments;
}
function w(t2) {
  return b(t2) && t2.every(([t3]) => t3 === t3.toUpperCase());
}
function v(t2) {
  if (w(t2)) return g(t2);
  const e2 = M(t2);
  let r2 = 0, n2 = 0, s2 = 0, i2 = 0;
  return e2.map((t3) => {
    const e3 = t3.slice(1).map(Number), [a2] = t3, o2 = a2.toUpperCase();
    if ("M" === a2) return [r2, n2] = e3, s2 = r2, i2 = n2, ["M", r2, n2];
    let m2 = [];
    if (a2 !== o2) switch (o2) {
      case "A":
        m2 = [o2, e3[0], e3[1], e3[2], e3[3], e3[4], e3[5] + r2, e3[6] + n2];
        break;
      case "V":
        m2 = [o2, e3[0] + n2];
        break;
      case "H":
        m2 = [o2, e3[0] + r2];
        break;
      default:
        m2 = [o2, ...e3.map((t4, e4) => t4 + (e4 % 2 ? n2 : r2))];
    }
    else m2 = [o2, ...e3];
    const c2 = m2.length;
    switch (o2) {
      case "Z":
        r2 = s2, n2 = i2;
        break;
      case "H":
        [, r2] = m2;
        break;
      case "V":
        [, n2] = m2;
        break;
      default:
        r2 = m2[c2 - 2], n2 = m2[c2 - 1], "M" === o2 && (s2 = r2, i2 = n2);
    }
    return m2;
  });
}
function A(t2) {
  return b(t2) && t2.slice(1).every(([t3]) => t3 === t3.toLowerCase());
}
function N(t2) {
  if (A(t2)) return g(t2);
  const e2 = M(t2);
  let r2 = 0, n2 = 0, s2 = 0, i2 = 0;
  return e2.map((t3) => {
    const e3 = t3.slice(1).map(Number), [a2] = t3, o2 = a2.toLowerCase();
    if ("M" === a2) return [r2, n2] = e3, s2 = r2, i2 = n2, ["M", r2, n2];
    let m2 = [];
    if (a2 !== o2) switch (o2) {
      case "a":
        m2 = [o2, e3[0], e3[1], e3[2], e3[3], e3[4], e3[5] - r2, e3[6] - n2];
        break;
      case "v":
        m2 = [o2, e3[0] - n2];
        break;
      case "h":
        m2 = [o2, e3[0] - r2];
        break;
      default:
        m2 = [o2, ...e3.map((t4, e4) => t4 - (e4 % 2 ? n2 : r2))];
    }
    else "m" === a2 && (s2 = e3[0] + r2, i2 = e3[1] + n2), m2 = [o2, ...e3];
    const c2 = m2.length;
    switch (o2) {
      case "z":
        r2 = s2, n2 = i2;
        break;
      case "h":
        r2 += m2[1];
        break;
      case "v":
        n2 += m2[1];
        break;
      default:
        r2 += m2[c2 - 2], n2 += m2[c2 - 1];
    }
    return m2;
  });
}
function C(t2, e2, r2) {
  if (t2[r2].length > 7) {
    t2[r2].shift();
    const n2 = t2[r2];
    let s2 = r2;
    for (; n2.length; ) e2[r2] = "A", t2.splice(s2 += 1, 0, ["C", ...n2.splice(0, 6)]);
    t2.splice(r2, 1);
  }
}
function P(t2) {
  return w(t2) && t2.every(([t3]) => "ACLMQZ".includes(t3));
}
function S(t2) {
  return P(t2) && t2.every(([t3]) => "MC".includes(t3));
}
function k(t2, e2) {
  const [r2] = t2, { x1: n2, y1: s2, x2: i2, y2: a2 } = e2, o2 = t2.slice(1).map(Number);
  let m2 = t2;
  if ("TQ".includes(r2) || (e2.qx = null, e2.qy = null), "H" === r2) m2 = ["L", t2[1], s2];
  else if ("V" === r2) m2 = ["L", n2, t2[1]];
  else if ("S" === r2) {
    const t3 = 2 * n2 - i2, r3 = 2 * s2 - a2;
    e2.x1 = t3, e2.y1 = r3, m2 = ["C", t3, r3, ...o2];
  } else if ("T" === r2) {
    const t3 = 2 * n2 - e2.qx, r3 = 2 * s2 - e2.qy;
    e2.qx = t3, e2.qy = r3, m2 = ["Q", t3, r3, ...o2];
  } else if ("Q" === r2) {
    const [t3, r3] = o2;
    e2.qx = t3, e2.qy = r3;
  }
  return m2;
}
var T = { x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null };
function $(t2) {
  if (P(t2)) return g(t2);
  const e2 = v(t2), r2 = { ...T }, n2 = e2.length;
  for (let t3 = 0; t3 < n2; t3 += 1) {
    e2[t3], e2[t3] = k(e2[t3], r2);
    const n3 = e2[t3], s2 = n3.length;
    r2.x1 = +n3[s2 - 2], r2.y1 = +n3[s2 - 1], r2.x2 = +n3[s2 - 4] || r2.x1, r2.y2 = +n3[s2 - 3] || r2.y1;
  }
  return e2;
}
function E(t2, e2, r2) {
  return { x: t2 * Math.cos(r2) - e2 * Math.sin(r2), y: t2 * Math.sin(r2) + e2 * Math.cos(r2) };
}
function q(t2, e2, r2, n2, s2, i2, a2, o2, m2, c2) {
  let u2 = t2, l2 = e2, h2 = r2, f2 = n2, y2 = o2, x2 = m2;
  const p2 = 120 * Math.PI / 180, g2 = Math.PI / 180 * (+s2 || 0);
  let d2, b2, M2, w2, v2, A2 = [];
  if (c2) [b2, M2, w2, v2] = c2;
  else {
    d2 = E(u2, l2, -g2), u2 = d2.x, l2 = d2.y, d2 = E(y2, x2, -g2), y2 = d2.x, x2 = d2.y;
    const t3 = (u2 - y2) / 2, e3 = (l2 - x2) / 2;
    let r3 = t3 * t3 / (h2 * h2) + e3 * e3 / (f2 * f2);
    r3 > 1 && (r3 = Math.sqrt(r3), h2 *= r3, f2 *= r3);
    const n3 = h2 * h2, s3 = f2 * f2, o3 = (i2 === a2 ? -1 : 1) * Math.sqrt(Math.abs((n3 * s3 - n3 * e3 * e3 - s3 * t3 * t3) / (n3 * e3 * e3 + s3 * t3 * t3)));
    w2 = o3 * h2 * e3 / f2 + (u2 + y2) / 2, v2 = o3 * -f2 * t3 / h2 + (l2 + x2) / 2, b2 = Math.asin(((l2 - v2) / f2 * 10 ** 9 >> 0) / 10 ** 9), M2 = Math.asin(((x2 - v2) / f2 * 10 ** 9 >> 0) / 10 ** 9), b2 = u2 < w2 ? Math.PI - b2 : b2, M2 = y2 < w2 ? Math.PI - M2 : M2, b2 < 0 && (b2 = 2 * Math.PI + b2), M2 < 0 && (M2 = 2 * Math.PI + M2), a2 && b2 > M2 && (b2 -= 2 * Math.PI), !a2 && M2 > b2 && (M2 -= 2 * Math.PI);
  }
  let N2 = M2 - b2;
  if (Math.abs(N2) > p2) {
    const t3 = M2, e3 = y2, r3 = x2;
    M2 = b2 + p2 * (a2 && M2 > b2 ? 1 : -1), y2 = w2 + h2 * Math.cos(M2), x2 = v2 + f2 * Math.sin(M2), A2 = q(y2, x2, h2, f2, s2, 0, a2, e3, r3, [M2, t3, w2, v2]);
  }
  N2 = M2 - b2;
  const C2 = Math.cos(b2), P2 = Math.sin(b2), S2 = Math.cos(M2), k2 = Math.sin(M2), T2 = Math.tan(N2 / 4), $2 = 4 / 3 * h2 * T2, O2 = 4 / 3 * f2 * T2, V2 = [u2, l2], j2 = [u2 + $2 * P2, l2 - O2 * C2], L2 = [y2 + $2 * k2, x2 - O2 * S2], I2 = [y2, x2];
  if (j2[0] = 2 * V2[0] - j2[0], j2[1] = 2 * V2[1] - j2[1], c2) return [...j2, ...L2, ...I2, ...A2];
  A2 = [...j2, ...L2, ...I2, ...A2];
  const z2 = [];
  for (let t3 = 0, e3 = A2.length; t3 < e3; t3 += 1) z2[t3] = t3 % 2 ? E(A2[t3 - 1], A2[t3], g2).y : E(A2[t3], A2[t3 + 1], g2).x;
  return z2;
}
function O(t2, e2, r2, n2, s2, i2) {
  const a2 = 1 / 3, o2 = 2 / 3;
  return [a2 * t2 + o2 * r2, a2 * e2 + o2 * n2, a2 * s2 + o2 * r2, a2 * i2 + o2 * n2, s2, i2];
}
function V(t2, e2, r2) {
  const [n2, s2] = t2, [i2, a2] = e2;
  return [n2 + (i2 - n2) * r2, s2 + (a2 - s2) * r2];
}
function j(t2, e2) {
  return Math.sqrt((t2[0] - e2[0]) * (t2[0] - e2[0]) + (t2[1] - e2[1]) * (t2[1] - e2[1]));
}
function L(t2, e2, r2, n2, s2) {
  const i2 = j([t2, e2], [r2, n2]);
  let a2 = { x: 0, y: 0 };
  if ("number" == typeof s2) if (s2 <= 0) a2 = { x: t2, y: e2 };
  else if (s2 >= i2) a2 = { x: r2, y: n2 };
  else {
    const [o2, m2] = V([t2, e2], [r2, n2], s2 / i2);
    a2 = { x: o2, y: m2 };
  }
  return { length: i2, point: a2, min: { x: Math.min(t2, r2), y: Math.min(e2, n2) }, max: { x: Math.max(t2, r2), y: Math.max(e2, n2) } };
}
function I(t2, e2, r2, n2) {
  const s2 = 0.5, i2 = [t2, e2], a2 = [r2, n2], o2 = V(i2, a2, s2), m2 = V(a2, o2, s2), c2 = V(o2, m2, s2), u2 = V(m2, c2, s2), l2 = V(c2, u2, s2), h2 = L(...[...i2, ...o2, ...c2, ...l2, s2]).point, f2 = L(...[...l2, ...u2, ...m2, ...a2, 0]).point;
  return [h2.x, h2.y, f2.x, f2.y, r2, n2];
}
function z(t2, e2) {
  const [r2] = t2, n2 = t2.slice(1).map(Number), [s2, i2] = n2;
  let a2;
  const { x1: o2, y1: m2, x: c2, y: u2 } = e2;
  switch ("TQ".includes(r2) || (e2.qx = null, e2.qy = null), r2) {
    case "M":
      return e2.x = s2, e2.y = i2, t2;
    case "A":
      return a2 = [o2, m2, ...n2], ["C", ...q(...a2)];
    case "Q":
      return e2.qx = s2, e2.qy = i2, a2 = [o2, m2, ...n2], ["C", ...O(...a2)];
    case "L":
      return ["C", ...I(o2, m2, s2, i2)];
    case "Z":
      return ["C", ...I(o2, m2, c2, u2)];
  }
  return t2;
}
function Z(t2) {
  if (S(t2)) return g(t2);
  const e2 = $(t2), r2 = { ...T }, n2 = [];
  let s2 = "", i2 = e2.length;
  for (let t3 = 0; t3 < i2; t3 += 1) {
    [s2] = e2[t3], n2[t3] = s2, e2[t3] = z(e2[t3], r2), C(e2, n2, t3), i2 = e2.length;
    const a2 = e2[t3], o2 = a2.length;
    r2.x1 = +a2[o2 - 2], r2.y1 = +a2[o2 - 1], r2.x2 = +a2[o2 - 4] || r2.x1, r2.y2 = +a2[o2 - 3] || r2.y1;
  }
  return e2;
}
function Q(t2, e2) {
  let { round: r2 } = a;
  if ("off" === e2 || "off" === r2) return g(t2);
  r2 = e2 >= 0 ? e2 : r2;
  const n2 = "number" == typeof r2 && r2 >= 1 ? 10 ** r2 : 1;
  return t2.map((t3) => {
    const e3 = t3.slice(1).map(Number).map((t4) => r2 ? Math.round(t4 * n2) / n2 : Math.round(t4));
    return [t3[0], ...e3];
  });
}
function R(t2, e2) {
  return Q(t2, e2).map((t3) => t3[0] + t3.slice(1).join(" ")).join("");
}
function F(t2) {
  const e2 = v(t2), r2 = "Z" === e2.slice(-1)[0][0], n2 = $(e2).map((t3, r3) => {
    const [n3, s2] = t3.slice(-2).map(Number);
    return { seg: e2[r3], n: t3, c: e2[r3][0], x: n3, y: s2 };
  }).map((t3, e3, n3) => {
    const s2 = t3.seg, i2 = t3.n, a2 = e3 && n3[e3 - 1], o2 = n3[e3 + 1], m2 = t3.c, c2 = n3.length, u2 = e3 ? n3[e3 - 1].x : n3[c2 - 1].x, l2 = e3 ? n3[e3 - 1].y : n3[c2 - 1].y;
    let h2 = [];
    switch (m2) {
      case "M":
        h2 = r2 ? ["Z"] : [m2, u2, l2];
        break;
      case "A":
        h2 = [m2, ...s2.slice(1, -3), 1 === s2[5] ? 0 : 1, u2, l2];
        break;
      case "C":
        h2 = o2 && "S" === o2.c ? ["S", s2[1], s2[2], u2, l2] : [m2, s2[3], s2[4], s2[1], s2[2], u2, l2];
        break;
      case "S":
        h2 = !a2 || !"CS".includes(a2.c) || o2 && "S" === o2.c ? [m2, i2[1], i2[2], u2, l2] : ["C", i2[3], i2[4], i2[1], i2[2], u2, l2];
        break;
      case "Q":
        h2 = o2 && "T" === o2.c ? ["T", u2, l2] : [m2, ...s2.slice(1, -2), u2, l2];
        break;
      case "T":
        h2 = !a2 || !"QT".includes(a2.c) || o2 && "T" === o2.c ? [m2, u2, l2] : ["Q", i2[1], i2[2], u2, l2];
        break;
      case "Z":
        h2 = ["M", u2, l2];
        break;
      case "H":
        h2 = [m2, u2];
        break;
      case "V":
        h2 = [m2, l2];
        break;
      default:
        h2 = [m2, ...s2.slice(1, -2), u2, l2];
    }
    return h2;
  });
  return r2 ? n2.reverse() : [n2[0], ...n2.slice(1).reverse()];
}
function H(t2) {
  const e2 = [];
  let r2, n2 = -1;
  return t2.forEach((t3) => {
    "M" === t3[0] ? (r2 = [t3], n2 += 1) : r2 = [...r2, t3], e2[n2] = r2;
  }), e2;
}
function D(t2, e2, r2, n2) {
  const [s2] = t2, i2 = (t3) => Math.round(1e4 * t3) / 1e4, a2 = t2.slice(1).map((t3) => +t3), o2 = e2.slice(1).map((t3) => +t3), { x1: m2, y1: c2, x2: u2, y2: l2, x: h2, y: f2 } = r2;
  let y2 = t2;
  const [x2, p2] = o2.slice(-2);
  if ("TQ".includes(s2) || (r2.qx = null, r2.qy = null), ["V", "H", "S", "T", "Z"].includes(s2)) y2 = [s2, ...a2];
  else if ("L" === s2) i2(h2) === i2(x2) ? y2 = ["V", p2] : i2(f2) === i2(p2) && (y2 = ["H", x2]);
  else if ("C" === s2) {
    const [t3, e3] = o2;
    "CS".includes(n2) && (i2(t3) === i2(2 * m2 - u2) && i2(e3) === i2(2 * c2 - l2) || i2(m2) === i2(2 * u2 - h2) && i2(c2) === i2(2 * l2 - f2)) && (y2 = ["S", ...o2.slice(-4)]), r2.x1 = t3, r2.y1 = e3;
  } else if ("Q" === s2) {
    const [t3, e3] = o2;
    r2.qx = t3, r2.qy = e3, "QT".includes(n2) && (i2(t3) === i2(2 * m2 - u2) && i2(e3) === i2(2 * c2 - l2) || i2(m2) === i2(2 * u2 - h2) && i2(c2) === i2(2 * l2 - f2)) && (y2 = ["T", ...o2.slice(-2)]);
  }
  return y2;
}
function X(t2, e2) {
  const r2 = v(t2), n2 = $(r2), s2 = { ...T }, i2 = [], a2 = r2.length;
  let o2 = "", m2 = "", c2 = 0, u2 = 0, l2 = 0, h2 = 0;
  for (let t3 = 0; t3 < a2; t3 += 1) {
    [o2] = r2[t3], i2[t3] = o2, t3 && (m2 = i2[t3 - 1]), r2[t3] = D(r2[t3], n2[t3], s2, m2);
    const e3 = r2[t3], a3 = e3.length;
    switch (s2.x1 = +e3[a3 - 2], s2.y1 = +e3[a3 - 1], s2.x2 = +e3[a3 - 4] || s2.x1, s2.y2 = +e3[a3 - 3] || s2.y1, o2) {
      case "Z":
        c2 = l2, u2 = h2;
        break;
      case "H":
        [, c2] = e3;
        break;
      case "V":
        [, u2] = e3;
        break;
      default:
        [c2, u2] = e3.slice(-2).map(Number), "M" === o2 && (l2 = c2, h2 = u2);
    }
    s2.x = c2, s2.y = u2;
  }
  const f2 = Q(r2, e2), y2 = Q(N(r2), e2);
  return f2.map((t3, e3) => e3 ? t3.join("").length < y2[e3].join("").length ? t3 : y2[e3] : t3);
}
function Y(t2) {
  const e2 = new st(), r2 = Array.from(t2);
  if (!r2.every((t3) => !Number.isNaN(t3))) throw TypeError(`CSSMatrix: "${t2}" must only have numbers.`);
  if (16 === r2.length) {
    const [t3, n2, s2, i2, a2, o2, m2, c2, u2, l2, h2, f2, y2, x2, p2, g2] = r2;
    e2.m11 = t3, e2.a = t3, e2.m21 = a2, e2.c = a2, e2.m31 = u2, e2.m41 = y2, e2.e = y2, e2.m12 = n2, e2.b = n2, e2.m22 = o2, e2.d = o2, e2.m32 = l2, e2.m42 = x2, e2.f = x2, e2.m13 = s2, e2.m23 = m2, e2.m33 = h2, e2.m43 = p2, e2.m14 = i2, e2.m24 = c2, e2.m34 = f2, e2.m44 = g2;
  } else {
    if (6 !== r2.length) throw new TypeError("CSSMatrix: expecting an Array of 6/16 values.");
    {
      const [t3, n2, s2, i2, a2, o2] = r2;
      e2.m11 = t3, e2.a = t3, e2.m12 = n2, e2.b = n2, e2.m21 = s2, e2.c = s2, e2.m22 = i2, e2.d = i2, e2.m41 = a2, e2.e = a2, e2.m42 = o2, e2.f = o2;
    }
  }
  return e2;
}
function B(t2) {
  const e2 = Object.keys(new st());
  if ("object" == typeof t2 && e2.every((e3) => e3 in t2)) return Y([t2.m11, t2.m12, t2.m13, t2.m14, t2.m21, t2.m22, t2.m23, t2.m24, t2.m31, t2.m32, t2.m33, t2.m34, t2.m41, t2.m42, t2.m43, t2.m44]);
  throw TypeError(`CSSMatrix: "${JSON.stringify(t2)}" is not a DOMMatrix / CSSMatrix / JSON compatible object.`);
}
function J(t2) {
  if ("string" != typeof t2) throw TypeError(`CSSMatrix: "${t2}" is not a string.`);
  const e2 = String(t2).replace(/\s/g, "");
  let r2 = new st();
  const n2 = `CSSMatrix: invalid transform string "${t2}"`;
  return e2.split(")").filter((t3) => t3).forEach((t3) => {
    const [e3, s2] = t3.split("(");
    if (!s2) throw TypeError(n2);
    const i2 = s2.split(",").map((t4) => t4.includes("rad") ? parseFloat(t4) * (180 / Math.PI) : parseFloat(t4)), [a2, o2, m2, c2] = i2, u2 = [a2, o2, m2], l2 = [a2, o2, m2, c2];
    if ("perspective" === e3 && a2 && [o2, m2].every((t4) => void 0 === t4)) r2.m34 = -1 / a2;
    else if (e3.includes("matrix") && [6, 16].includes(i2.length) && i2.every((t4) => !Number.isNaN(+t4))) {
      const t4 = i2.map((t5) => Math.abs(t5) < 1e-6 ? 0 : t5);
      r2 = r2.multiply(Y(t4));
    } else if ("translate3d" === e3 && u2.every((t4) => !Number.isNaN(+t4))) r2 = r2.translate(a2, o2, m2);
    else if ("translate" === e3 && a2 && void 0 === m2) r2 = r2.translate(a2, o2 || 0, 0);
    else if ("rotate3d" === e3 && l2.every((t4) => !Number.isNaN(+t4)) && c2) r2 = r2.rotateAxisAngle(a2, o2, m2, c2);
    else if ("rotate" === e3 && a2 && [o2, m2].every((t4) => void 0 === t4)) r2 = r2.rotate(0, 0, a2);
    else if ("scale3d" === e3 && u2.every((t4) => !Number.isNaN(+t4)) && u2.some((t4) => 1 !== t4)) r2 = r2.scale(a2, o2, m2);
    else if ("scale" !== e3 || Number.isNaN(a2) || 1 === a2 || void 0 !== m2) if ("skew" === e3 && (a2 || !Number.isNaN(a2) && o2) && void 0 === m2) r2 = r2.skew(a2, o2 || 0);
    else {
      if (!(/[XYZ]/.test(e3) && a2 && [o2, m2].every((t4) => void 0 === t4) && ["translate", "rotate", "scale", "skew"].some((t4) => e3.includes(t4)))) throw TypeError(n2);
      if (["skewX", "skewY"].includes(e3)) r2 = r2[e3](a2);
      else {
        const t4 = e3.replace(/[XYZ]/, ""), n3 = e3.replace(t4, ""), s3 = ["X", "Y", "Z"].indexOf(n3), i3 = "scale" === t4 ? 1 : 0, o3 = [0 === s3 ? a2 : i3, 1 === s3 ? a2 : i3, 2 === s3 ? a2 : i3];
        r2 = r2[t4](...o3);
      }
    }
    else {
      const t4 = Number.isNaN(+o2) ? a2 : o2;
      r2 = r2.scale(a2, t4, 1);
    }
  }), r2;
}
function G(t2, e2) {
  return e2 ? [t2.a, t2.b, t2.c, t2.d, t2.e, t2.f] : [t2.m11, t2.m12, t2.m13, t2.m14, t2.m21, t2.m22, t2.m23, t2.m24, t2.m31, t2.m32, t2.m33, t2.m34, t2.m41, t2.m42, t2.m43, t2.m44];
}
function U(t2, e2, r2) {
  const n2 = new st();
  return n2.m41 = t2, n2.e = t2, n2.m42 = e2, n2.f = e2, n2.m43 = r2, n2;
}
function K(t2, e2, r2) {
  const n2 = new st(), s2 = Math.PI / 180, i2 = t2 * s2, a2 = e2 * s2, o2 = r2 * s2, m2 = Math.cos(i2), c2 = -Math.sin(i2), u2 = Math.cos(a2), l2 = -Math.sin(a2), h2 = Math.cos(o2), f2 = -Math.sin(o2), y2 = u2 * h2, x2 = -u2 * f2;
  n2.m11 = y2, n2.a = y2, n2.m12 = x2, n2.b = x2, n2.m13 = l2;
  const p2 = c2 * l2 * h2 + m2 * f2;
  n2.m21 = p2, n2.c = p2;
  const g2 = m2 * h2 - c2 * l2 * f2;
  return n2.m22 = g2, n2.d = g2, n2.m23 = -c2 * u2, n2.m31 = c2 * f2 - m2 * l2 * h2, n2.m32 = c2 * h2 + m2 * l2 * f2, n2.m33 = m2 * u2, n2;
}
function W(t2, e2, r2, n2) {
  const s2 = new st(), i2 = Math.sqrt(t2 * t2 + e2 * e2 + r2 * r2);
  if (0 === i2) return s2;
  const a2 = t2 / i2, o2 = e2 / i2, m2 = r2 / i2, c2 = n2 * (Math.PI / 360), u2 = Math.sin(c2), l2 = Math.cos(c2), h2 = u2 * u2, f2 = a2 * a2, y2 = o2 * o2, x2 = m2 * m2, p2 = 1 - 2 * (y2 + x2) * h2;
  s2.m11 = p2, s2.a = p2;
  const g2 = 2 * (a2 * o2 * h2 + m2 * u2 * l2);
  s2.m12 = g2, s2.b = g2, s2.m13 = 2 * (a2 * m2 * h2 - o2 * u2 * l2);
  const d2 = 2 * (o2 * a2 * h2 - m2 * u2 * l2);
  s2.m21 = d2, s2.c = d2;
  const b2 = 1 - 2 * (x2 + f2) * h2;
  return s2.m22 = b2, s2.d = b2, s2.m23 = 2 * (o2 * m2 * h2 + a2 * u2 * l2), s2.m31 = 2 * (m2 * a2 * h2 + o2 * u2 * l2), s2.m32 = 2 * (m2 * o2 * h2 - a2 * u2 * l2), s2.m33 = 1 - 2 * (f2 + y2) * h2, s2;
}
function _(t2, e2, r2) {
  const n2 = new st();
  return n2.m11 = t2, n2.a = t2, n2.m22 = e2, n2.d = e2, n2.m33 = r2, n2;
}
function tt(t2, e2) {
  const r2 = new st();
  if (t2) {
    const e3 = t2 * Math.PI / 180, n2 = Math.tan(e3);
    r2.m21 = n2, r2.c = n2;
  }
  if (e2) {
    const t3 = e2 * Math.PI / 180, n2 = Math.tan(t3);
    r2.m12 = n2, r2.b = n2;
  }
  return r2;
}
function et(t2) {
  return tt(t2, 0);
}
function rt(t2) {
  return tt(0, t2);
}
function nt(t2, e2) {
  return Y([e2.m11 * t2.m11 + e2.m12 * t2.m21 + e2.m13 * t2.m31 + e2.m14 * t2.m41, e2.m11 * t2.m12 + e2.m12 * t2.m22 + e2.m13 * t2.m32 + e2.m14 * t2.m42, e2.m11 * t2.m13 + e2.m12 * t2.m23 + e2.m13 * t2.m33 + e2.m14 * t2.m43, e2.m11 * t2.m14 + e2.m12 * t2.m24 + e2.m13 * t2.m34 + e2.m14 * t2.m44, e2.m21 * t2.m11 + e2.m22 * t2.m21 + e2.m23 * t2.m31 + e2.m24 * t2.m41, e2.m21 * t2.m12 + e2.m22 * t2.m22 + e2.m23 * t2.m32 + e2.m24 * t2.m42, e2.m21 * t2.m13 + e2.m22 * t2.m23 + e2.m23 * t2.m33 + e2.m24 * t2.m43, e2.m21 * t2.m14 + e2.m22 * t2.m24 + e2.m23 * t2.m34 + e2.m24 * t2.m44, e2.m31 * t2.m11 + e2.m32 * t2.m21 + e2.m33 * t2.m31 + e2.m34 * t2.m41, e2.m31 * t2.m12 + e2.m32 * t2.m22 + e2.m33 * t2.m32 + e2.m34 * t2.m42, e2.m31 * t2.m13 + e2.m32 * t2.m23 + e2.m33 * t2.m33 + e2.m34 * t2.m43, e2.m31 * t2.m14 + e2.m32 * t2.m24 + e2.m33 * t2.m34 + e2.m34 * t2.m44, e2.m41 * t2.m11 + e2.m42 * t2.m21 + e2.m43 * t2.m31 + e2.m44 * t2.m41, e2.m41 * t2.m12 + e2.m42 * t2.m22 + e2.m43 * t2.m32 + e2.m44 * t2.m42, e2.m41 * t2.m13 + e2.m42 * t2.m23 + e2.m43 * t2.m33 + e2.m44 * t2.m43, e2.m41 * t2.m14 + e2.m42 * t2.m24 + e2.m43 * t2.m34 + e2.m44 * t2.m44]);
}
var st = class _st {
  constructor(...t2) {
    const e2 = this;
    if (e2.a = 1, e2.b = 0, e2.c = 0, e2.d = 1, e2.e = 0, e2.f = 0, e2.m11 = 1, e2.m12 = 0, e2.m13 = 0, e2.m14 = 0, e2.m21 = 0, e2.m22 = 1, e2.m23 = 0, e2.m24 = 0, e2.m31 = 0, e2.m32 = 0, e2.m33 = 1, e2.m34 = 0, e2.m41 = 0, e2.m42 = 0, e2.m43 = 0, e2.m44 = 1, t2.length) {
      const r2 = [16, 6].some((e3) => e3 === t2.length) ? t2 : t2[0];
      return e2.setMatrixValue(r2);
    }
    return e2;
  }
  get isIdentity() {
    const t2 = this;
    return 1 === t2.m11 && 0 === t2.m12 && 0 === t2.m13 && 0 === t2.m14 && 0 === t2.m21 && 1 === t2.m22 && 0 === t2.m23 && 0 === t2.m24 && 0 === t2.m31 && 0 === t2.m32 && 1 === t2.m33 && 0 === t2.m34 && 0 === t2.m41 && 0 === t2.m42 && 0 === t2.m43 && 1 === t2.m44;
  }
  get is2D() {
    const t2 = this;
    return 0 === t2.m31 && 0 === t2.m32 && 1 === t2.m33 && 0 === t2.m34 && 0 === t2.m43 && 1 === t2.m44;
  }
  setMatrixValue(t2) {
    return "string" == typeof t2 && t2.length && "none" !== t2 ? J(t2) : [Array, Float64Array, Float32Array].some((e2) => t2 instanceof e2) ? Y(t2) : [_st, DOMMatrix, Object].some((e2) => t2 instanceof e2) ? B(t2) : this;
  }
  toFloat32Array(t2) {
    return Float32Array.from(G(this, t2));
  }
  toFloat64Array(t2) {
    return Float64Array.from(G(this, t2));
  }
  toString() {
    const { is2D: t2 } = this;
    return `${t2 ? "matrix" : "matrix3d"}(${this.toFloat64Array(t2).join(", ")})`;
  }
  toJSON() {
    const { is2D: t2, isIdentity: e2 } = this;
    return { ...this, is2D: t2, isIdentity: e2 };
  }
  multiply(t2) {
    return nt(this, t2);
  }
  translate(t2, e2, r2) {
    let n2 = e2, s2 = r2;
    return void 0 === n2 && (n2 = 0), void 0 === s2 && (s2 = 0), nt(this, U(t2, n2, s2));
  }
  scale(t2, e2, r2) {
    let n2 = e2, s2 = r2;
    return void 0 === n2 && (n2 = t2), void 0 === s2 && (s2 = 1), nt(this, _(t2, n2, s2));
  }
  rotate(t2, e2, r2) {
    let n2 = t2, s2 = e2 || 0, i2 = r2 || 0;
    return "number" == typeof t2 && void 0 === e2 && void 0 === r2 && (i2 = n2, n2 = 0, s2 = 0), nt(this, K(n2, s2, i2));
  }
  rotateAxisAngle(t2, e2, r2, n2) {
    if ([t2, e2, r2, n2].some((t3) => Number.isNaN(+t3))) throw new TypeError("CSSMatrix: expecting 4 values");
    return nt(this, W(t2, e2, r2, n2));
  }
  skewX(t2) {
    return nt(this, et(t2));
  }
  skewY(t2) {
    return nt(this, rt(t2));
  }
  skew(t2, e2) {
    return nt(this, tt(t2, e2));
  }
  transformPoint(t2) {
    const e2 = this, r2 = e2.m11 * t2.x + e2.m21 * t2.y + e2.m31 * t2.z + e2.m41 * t2.w, n2 = e2.m12 * t2.x + e2.m22 * t2.y + e2.m32 * t2.z + e2.m42 * t2.w, s2 = e2.m13 * t2.x + e2.m23 * t2.y + e2.m33 * t2.z + e2.m43 * t2.w, i2 = e2.m14 * t2.x + e2.m24 * t2.y + e2.m34 * t2.z + e2.m44 * t2.w;
    return t2 instanceof DOMPoint ? new DOMPoint(r2, n2, s2, i2) : { x: r2, y: n2, z: s2, w: i2 };
  }
};
Object.assign(st, { Translate: U, Rotate: K, RotateAxisAngle: W, Scale: _, SkewX: et, SkewY: rt, Skew: tt, Multiply: nt, fromArray: Y, fromMatrix: B, fromString: J, toArray: G });
function it(t2, e2, r2) {
  const [n2, s2, i2] = r2, [a2, o2, m2] = (
    /**
     * Transforms a specified point using a matrix, returning a new
     * Tuple *Object* comprising of the transformed point.
     * Neither the matrix nor the original point are altered.
     *
     * @copyright thednp © 2021
     *
     * @param {SVGPath.CSSMatrix} M CSSMatrix instance
     * @param {[number, number, number, number]} v Tuple
     * @return {[number, number, number, number]} the resulting Tuple
     */
    function(t3, e3) {
      let r3 = U(...e3);
      return [, , , r3.m44] = e3, r3 = t3.multiply(r3), [r3.m41, r3.m42, r3.m43, r3.m44];
    }(t2, [...e2, 0, 1])
  ), c2 = o2 - s2, u2 = m2 - i2;
  return [(a2 - n2) * (Math.abs(i2) / Math.abs(u2) || 1) + n2, c2 * (Math.abs(i2) / Math.abs(u2) || 1) + s2];
}
function at(t2, e2) {
  let r2, n2, s2, i2, o2, m2, c2 = 0, u2 = 0;
  const l2 = v(t2), h2 = e2 && Object.keys(e2);
  if (!e2 || !h2.length) return g(l2);
  const f2 = $(l2);
  if (!e2.origin) {
    const { origin: t3 } = a;
    Object.assign(e2, { origin: t3 });
  }
  const y2 = function(t3) {
    let e3 = new st();
    const { origin: r3 } = t3, [n3, s3] = r3, { translate: i3 } = t3, { rotate: a2 } = t3, { skew: o3 } = t3, { scale: m3 } = t3;
    return Array.isArray(i3) && i3.every((t4) => !Number.isNaN(+t4)) && i3.some((t4) => 0 !== t4) ? e3 = e3.translate(...i3) : "number" != typeof i3 || Number.isNaN(i3) || (e3 = e3.translate(i3)), (a2 || o3 || m3) && (e3 = e3.translate(n3, s3), Array.isArray(a2) && a2.every((t4) => !Number.isNaN(+t4)) && a2.some((t4) => 0 !== t4) ? e3 = e3.rotate(...a2) : "number" != typeof a2 || Number.isNaN(a2) || (e3 = e3.rotate(a2)), Array.isArray(o3) && o3.every((t4) => !Number.isNaN(+t4)) && o3.some((t4) => 0 !== t4) ? (e3 = o3[0] ? e3.skewX(o3[0]) : e3, e3 = o3[1] ? e3.skewY(o3[1]) : e3) : "number" != typeof o3 || Number.isNaN(o3) || (e3 = e3.skewX(o3)), Array.isArray(m3) && m3.every((t4) => !Number.isNaN(+t4)) && m3.some((t4) => 1 !== t4) ? e3 = e3.scale(...m3) : "number" != typeof m3 || Number.isNaN(m3) || (e3 = e3.scale(m3)), e3 = e3.translate(-n3, -s3)), e3;
  }(e2), { origin: x2 } = e2, p2 = { ...T };
  let d2 = [], b2 = 0, M2 = "", w2 = [];
  const A2 = [];
  if (!y2.isIdentity) {
    for (r2 = 0, s2 = l2.length; r2 < s2; r2 += 1) {
      d2 = l2[r2], l2[r2] && ([M2] = d2), A2[r2] = M2, "A" === M2 && (d2 = z(f2[r2], p2), l2[r2] = z(f2[r2], p2), C(l2, A2, r2), f2[r2] = z(f2[r2], p2), C(f2, A2, r2), s2 = Math.max(l2.length, f2.length)), d2 = f2[r2], b2 = d2.length, p2.x1 = +d2[b2 - 2], p2.y1 = +d2[b2 - 1], p2.x2 = +d2[b2 - 4] || p2.x1, p2.y2 = +d2[b2 - 3] || p2.y1;
      const t3 = { s: l2[r2], c: l2[r2][0], x: p2.x1, y: p2.y1 };
      w2 = [...w2, t3];
    }
    return w2.map((t3) => {
      switch (M2 = t3.c, d2 = t3.s, M2) {
        case "L":
        case "H":
        case "V":
          return [o2, m2] = it(y2, [t3.x, t3.y], x2), c2 !== o2 && u2 !== m2 ? d2 = ["L", o2, m2] : u2 === m2 ? d2 = ["H", o2] : c2 === o2 && (d2 = ["V", m2]), c2 = o2, u2 = m2, d2;
        default:
          for (n2 = 1, i2 = d2.length; n2 < i2; n2 += 2) [c2, u2] = it(y2, [+d2[n2], +d2[n2 + 1]], x2), d2[n2] = c2, d2[n2 + 1] = u2;
          return d2;
      }
    });
  }
  return g(l2);
}
function ot(t2, e2) {
  const { x: r2, y: n2 } = t2, { x: s2, y: i2 } = e2, a2 = r2 * s2 + n2 * i2, o2 = Math.sqrt((r2 ** 2 + n2 ** 2) * (s2 ** 2 + i2 ** 2));
  return (r2 * i2 - n2 * s2 < 0 ? -1 : 1) * Math.acos(a2 / o2);
}
function mt(t2, e2, r2, n2, s2, i2, a2, o2, m2, c2) {
  const { abs: u2, sin: l2, cos: h2, sqrt: f2, PI: y2 } = Math;
  let x2 = u2(r2), p2 = u2(n2);
  const g2 = (s2 % 360 + 360) % 360 * (y2 / 180);
  if (t2 === o2 && e2 === m2) return { x: t2, y: e2 };
  if (0 === x2 || 0 === p2) return L(t2, e2, o2, m2, c2).point;
  const d2 = (t2 - o2) / 2, b2 = (e2 - m2) / 2, M2 = h2(g2) * d2 + l2(g2) * b2, w2 = -l2(g2) * d2 + h2(g2) * b2, v2 = M2 ** 2 / x2 ** 2 + w2 ** 2 / p2 ** 2;
  v2 > 1 && (x2 *= f2(v2), p2 *= f2(v2));
  let A2 = (x2 ** 2 * p2 ** 2 - x2 ** 2 * w2 ** 2 - p2 ** 2 * M2 ** 2) / (x2 ** 2 * w2 ** 2 + p2 ** 2 * M2 ** 2);
  A2 = A2 < 0 ? 0 : A2;
  const N2 = (i2 !== a2 ? 1 : -1) * f2(A2), C2 = N2 * (x2 * w2 / p2), P2 = N2 * (-p2 * M2 / x2), S2 = h2(g2) * C2 - l2(g2) * P2 + (t2 + o2) / 2, k2 = l2(g2) * C2 + h2(g2) * P2 + (e2 + m2) / 2, T2 = { x: (M2 - C2) / x2, y: (w2 - P2) / p2 }, $2 = ot({ x: 1, y: 0 }, T2);
  let E2 = ot(T2, { x: (-M2 - C2) / x2, y: (-w2 - P2) / p2 });
  !a2 && E2 > 0 ? E2 -= 2 * y2 : a2 && E2 < 0 && (E2 += 2 * y2), E2 %= 2 * y2;
  const q2 = $2 + E2 * c2, O2 = x2 * h2(q2), V2 = p2 * l2(q2);
  return { x: h2(g2) * O2 - l2(g2) * V2 + S2, y: l2(g2) * O2 + h2(g2) * V2 + k2 };
}
function ct(t2, e2, r2, n2, s2, i2, a2, o2, m2, c2) {
  const u2 = "number" == typeof c2;
  let l2 = t2, h2 = e2, f2 = 0, y2 = [l2, h2, f2], x2 = [l2, h2], p2 = 0, g2 = { x: 0, y: 0 }, d2 = [{ x: l2, y: h2 }];
  u2 && c2 <= 0 && (g2 = { x: l2, y: h2 });
  for (let b2 = 0; b2 <= 300; b2 += 1) {
    if (p2 = b2 / 300, { x: l2, y: h2 } = mt(t2, e2, r2, n2, s2, i2, a2, o2, m2, p2), d2 = [...d2, { x: l2, y: h2 }], f2 += j(x2, [l2, h2]), x2 = [l2, h2], u2 && f2 > c2 && c2 > y2[2]) {
      const t3 = (f2 - c2) / (f2 - y2[2]);
      g2 = { x: x2[0] * (1 - t3) + y2[0] * t3, y: x2[1] * (1 - t3) + y2[1] * t3 };
    }
    y2 = [l2, h2, f2];
  }
  return u2 && c2 >= f2 && (g2 = { x: o2, y: m2 }), { length: f2, point: g2, min: { x: Math.min(...d2.map((t3) => t3.x)), y: Math.min(...d2.map((t3) => t3.y)) }, max: { x: Math.max(...d2.map((t3) => t3.x)), y: Math.max(...d2.map((t3) => t3.y)) } };
}
function ut(t2, e2, r2, n2, s2, i2, a2, o2, m2) {
  const c2 = 1 - m2;
  return { x: c2 ** 3 * t2 + 3 * c2 ** 2 * m2 * r2 + 3 * c2 * m2 ** 2 * s2 + m2 ** 3 * a2, y: c2 ** 3 * e2 + 3 * c2 ** 2 * m2 * n2 + 3 * c2 * m2 ** 2 * i2 + m2 ** 3 * o2 };
}
function lt(t2, e2, r2, n2, s2, i2, a2, o2, m2) {
  const c2 = "number" == typeof m2;
  let u2 = t2, l2 = e2, h2 = 0, f2 = [u2, l2, h2], y2 = [u2, l2], x2 = 0, p2 = { x: 0, y: 0 }, g2 = [{ x: u2, y: l2 }];
  c2 && m2 <= 0 && (p2 = { x: u2, y: l2 });
  for (let d2 = 0; d2 <= 300; d2 += 1) {
    if (x2 = d2 / 300, { x: u2, y: l2 } = ut(t2, e2, r2, n2, s2, i2, a2, o2, x2), g2 = [...g2, { x: u2, y: l2 }], h2 += j(y2, [u2, l2]), y2 = [u2, l2], c2 && h2 > m2 && m2 > f2[2]) {
      const t3 = (h2 - m2) / (h2 - f2[2]);
      p2 = { x: y2[0] * (1 - t3) + f2[0] * t3, y: y2[1] * (1 - t3) + f2[1] * t3 };
    }
    f2 = [u2, l2, h2];
  }
  return c2 && m2 >= h2 && (p2 = { x: a2, y: o2 }), { length: h2, point: p2, min: { x: Math.min(...g2.map((t3) => t3.x)), y: Math.min(...g2.map((t3) => t3.y)) }, max: { x: Math.max(...g2.map((t3) => t3.x)), y: Math.max(...g2.map((t3) => t3.y)) } };
}
function ht(t2, e2, r2, n2, s2, i2, a2) {
  const o2 = 1 - a2;
  return { x: o2 ** 2 * t2 + 2 * o2 * a2 * r2 + a2 ** 2 * s2, y: o2 ** 2 * e2 + 2 * o2 * a2 * n2 + a2 ** 2 * i2 };
}
function ft(t2, e2, r2, n2, s2, i2, a2) {
  const o2 = "number" == typeof a2;
  let m2 = t2, c2 = e2, u2 = 0, l2 = [m2, c2, u2], h2 = [m2, c2], f2 = 0, y2 = { x: 0, y: 0 }, x2 = [{ x: m2, y: c2 }];
  o2 && a2 <= 0 && (y2 = { x: m2, y: c2 });
  for (let p2 = 0; p2 <= 300; p2 += 1) {
    if (f2 = p2 / 300, { x: m2, y: c2 } = ht(t2, e2, r2, n2, s2, i2, f2), x2 = [...x2, { x: m2, y: c2 }], u2 += j(h2, [m2, c2]), h2 = [m2, c2], o2 && u2 > a2 && a2 > l2[2]) {
      const t3 = (u2 - a2) / (u2 - l2[2]);
      y2 = { x: h2[0] * (1 - t3) + l2[0] * t3, y: h2[1] * (1 - t3) + l2[1] * t3 };
    }
    l2 = [m2, c2, u2];
  }
  return o2 && a2 >= u2 && (y2 = { x: s2, y: i2 }), { length: u2, point: y2, min: { x: Math.min(...x2.map((t3) => t3.x)), y: Math.min(...x2.map((t3) => t3.y)) }, max: { x: Math.max(...x2.map((t3) => t3.x)), y: Math.max(...x2.map((t3) => t3.y)) } };
}
function yt(t2, e2) {
  const r2 = $(t2), n2 = "number" == typeof e2;
  let s2, i2, a2, o2 = [], m2 = 0, c2 = 0, u2 = 0, l2 = 0, h2 = [], f2 = [], y2 = 0, x2 = { x: 0, y: 0 }, p2 = x2, g2 = x2, d2 = x2, b2 = 0;
  for (let t3 = 0, M2 = r2.length; t3 < M2; t3 += 1) a2 = r2[t3], [i2] = a2, s2 = "M" === i2, o2 = s2 ? o2 : [m2, c2, ...a2.slice(1)], s2 ? ([, u2, l2] = a2, x2 = { x: u2, y: l2 }, p2 = x2, y2 = 0, n2 && e2 < 1e-3 && (d2 = x2)) : "L" === i2 ? { length: y2, min: x2, max: p2, point: g2 } = L(...o2, (e2 || 0) - b2) : "A" === i2 ? { length: y2, min: x2, max: p2, point: g2 } = ct(...o2, (e2 || 0) - b2) : "C" === i2 ? { length: y2, min: x2, max: p2, point: g2 } = lt(...o2, (e2 || 0) - b2) : "Q" === i2 ? { length: y2, min: x2, max: p2, point: g2 } = ft(...o2, (e2 || 0) - b2) : "Z" === i2 && (o2 = [m2, c2, u2, l2], { length: y2, min: x2, max: p2, point: g2 } = L(...o2, (e2 || 0) - b2)), n2 && b2 < e2 && b2 + y2 >= e2 && (d2 = g2), f2 = [...f2, p2], h2 = [...h2, x2], b2 += y2, [m2, c2] = "Z" !== i2 ? a2.slice(-2) : [u2, l2];
  return n2 && e2 >= b2 && (d2 = { x: m2, y: c2 }), { length: b2, point: d2, min: { x: Math.min(...h2.map((t3) => t3.x)), y: Math.min(...h2.map((t3) => t3.y)) }, max: { x: Math.max(...f2.map((t3) => t3.x)), y: Math.max(...f2.map((t3) => t3.y)) } };
}
function xt(t2) {
  if (!t2) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0, cx: 0, cy: 0, cz: 0 };
  const { min: { x: e2, y: r2 }, max: { x: n2, y: s2 } } = yt(t2), i2 = n2 - e2, a2 = s2 - r2;
  return { width: i2, height: a2, x: e2, y: r2, x2: n2, y2: s2, cx: e2 + i2 / 2, cy: r2 + a2 / 2, cz: Math.max(i2, a2) + Math.min(i2, a2) / 2 };
}
function pt(t2) {
  return yt(t2).length;
}
function gt(t2, e2) {
  return yt(t2, e2).point;
}
Object.assign(st, { Version: "1.0.3" });
var dt = class {
  constructor(t2, e2) {
    const r2 = e2 || {}, n2 = void 0 === t2;
    if (n2 || !t2.length) throw TypeError(`${c}: "pathValue" is ${n2 ? "undefined" : "empty"}`);
    const s2 = M(t2);
    if ("string" == typeof s2) throw TypeError(s2);
    this.segments = s2;
    const { width: i2, height: o2, cx: m2, cy: u2, cz: l2 } = this.getBBox(), { round: h2, origin: f2 } = r2;
    let y2, x2;
    if ("auto" === h2) {
      const t3 = `${Math.floor(Math.max(i2, o2))}`.length;
      y2 = t3 >= 4 ? 0 : 4 - t3;
    } else Number.isInteger(h2) || "off" === h2 ? y2 = h2 : { round: y2 } = a;
    if (Array.isArray(f2) && f2.length >= 2) {
      const [t3, e3, r3] = f2.map(Number);
      x2 = [Number.isNaN(t3) ? m2 : t3, Number.isNaN(e3) ? u2 : e3, Number.isNaN(r3) ? l2 : r3];
    } else x2 = [m2, u2, l2];
    return this.round = y2, this.origin = x2, this;
  }
  getBBox() {
    return xt(this.segments);
  }
  getTotalLength() {
    return pt(this.segments);
  }
  getPointAtLength(t2) {
    return gt(this.segments, t2);
  }
  toAbsolute() {
    const { segments: t2 } = this;
    return this.segments = v(t2), this;
  }
  toRelative() {
    const { segments: t2 } = this;
    return this.segments = N(t2), this;
  }
  toCurve() {
    const { segments: t2 } = this;
    return this.segments = Z(t2), this;
  }
  reverse(t2) {
    this.toAbsolute();
    const { segments: e2 } = this, r2 = H(e2), n2 = r2.length > 1 ? r2 : 0, s2 = n2 && g(n2).map((e3, r3) => t2 ? r3 ? F(e3) : M(e3) : F(e3));
    let i2 = [];
    return i2 = n2 ? s2.flat(1) : t2 ? e2 : F(e2), this.segments = g(i2), this;
  }
  normalize() {
    const { segments: t2 } = this;
    return this.segments = $(t2), this;
  }
  optimize() {
    const { segments: t2 } = this;
    return this.segments = X(t2, this.round), this;
  }
  transform(t2) {
    if (!t2 || "object" != typeof t2 || "object" == typeof t2 && !["translate", "rotate", "skew", "scale"].some((e3) => e3 in t2)) return this;
    const e2 = {};
    Object.keys(t2).forEach((r3) => {
      e2[r3] = Array.isArray(t2[r3]) ? [...t2[r3]] : Number(t2[r3]);
    });
    const { segments: r2 } = this, [n2, s2, i2] = this.origin, { origin: a2 } = e2;
    if (Array.isArray(a2) && a2.length >= 2) {
      const [t3, r3, o2] = a2.map(Number);
      e2.origin = [Number.isNaN(t3) ? n2 : t3, Number.isNaN(r3) ? s2 : r3, o2 || i2];
    } else e2.origin = [n2, s2, i2];
    return this.segments = at(r2, e2), this;
  }
  flipX() {
    return this.transform({ rotate: [0, 180, 0] }), this;
  }
  flipY() {
    return this.transform({ rotate: [180, 0, 0] }), this;
  }
  toString() {
    return R(this.segments, this.round);
  }
};
function bt(t2) {
  let e2 = 0, r2 = 0, n2 = 0;
  return Z(t2).map((t3) => "M" === t3[0] ? ([, e2, r2] = t3, 0) : (n2 = function(t4, e3, r3, n3, s2, i2, a2, o2) {
    return 3 * ((o2 - e3) * (r3 + s2) - (a2 - t4) * (n3 + i2) + n3 * (t4 - s2) - r3 * (e3 - i2) + o2 * (s2 + t4 / 3) - a2 * (i2 + e3 / 3)) / 20;
  }(e2, r2, ...t3.slice(1)), [e2, r2] = t3.slice(-2), n2)).reduce((t3, e3) => t3 + e3, 0);
}
function Mt(t2, e2) {
  const r2 = M(t2);
  if ("string" == typeof r2) throw TypeError(r2);
  let n2 = [...r2], s2 = pt(n2), i2 = n2.length - 1, a2 = 0, o2 = 0, m2 = r2[0];
  const [c2, u2] = m2.slice(-2), l2 = { x: c2, y: u2 };
  if (i2 <= 0 || !e2 || !Number.isFinite(e2)) return { segment: m2, index: 0, length: o2, point: l2, lengthAtSegment: a2 };
  if (e2 >= s2) return n2 = r2.slice(0, -1), a2 = pt(n2), o2 = s2 - a2, { segment: r2[i2], index: i2, length: o2, lengthAtSegment: a2 };
  const h2 = [];
  for (; i2 > 0; ) m2 = n2[i2], n2 = n2.slice(0, -1), a2 = pt(n2), o2 = s2 - a2, s2 = a2, h2.push({ segment: m2, index: i2, length: o2, lengthAtSegment: a2 }), i2 -= 1;
  return h2.find(({ lengthAtSegment: t3 }) => t3 <= e2);
}
function wt(t2, e2) {
  const r2 = M(t2), n2 = $(r2), s2 = pt(r2), i2 = (t3) => {
    const r3 = t3.x - e2.x, n3 = t3.y - e2.y;
    return r3 * r3 + n3 * n3;
  };
  let a2, o2, m2, c2, u2 = 8, l2 = 0, h2 = 0, f2 = 1 / 0;
  for (let t3 = 0; t3 <= s2; t3 += u2) a2 = gt(n2, t3), l2 = i2(a2), l2 < f2 && (o2 = a2, h2 = t3, f2 = l2);
  u2 /= 2;
  let y2 = 0, x2 = 0, p2 = 0, g2 = 0;
  for (; u2 > 0.5; ) y2 = h2 - u2, m2 = gt(n2, y2), p2 = i2(m2), x2 = h2 + u2, c2 = gt(n2, x2), g2 = i2(c2), y2 >= 0 && p2 < f2 ? (o2 = m2, h2 = y2, f2 = p2) : x2 <= s2 && g2 < f2 ? (o2 = c2, h2 = x2, f2 = g2) : u2 /= 2;
  const d2 = Mt(r2, h2);
  return { closest: o2, distance: Math.sqrt(f2), segment: d2 };
}
function vt(t2) {
  if ("string" != typeof t2) return false;
  const e2 = new d(t2);
  for (y(e2); e2.index < e2.max && !e2.err.length; ) p(e2);
  return !e2.err.length && "mM".includes(e2.segments[0][0]);
}
var At = { line: ["x1", "y1", "x2", "y2"], circle: ["cx", "cy", "r"], ellipse: ["cx", "cy", "rx", "ry"], rect: ["width", "height", "x", "y", "rx", "ry"], polygon: ["points"], polyline: ["points"], glyph: ["d"] };
var Nt = { CSSMatrix: st, parsePathString: M, isPathArray: b, isCurveArray: S, isAbsoluteArray: w, isRelativeArray: A, isNormalizedArray: P, isValidPath: vt, pathToAbsolute: v, pathToRelative: N, pathToCurve: Z, pathToString: R, getDrawDirection: function(t2) {
  return bt(Z(t2)) >= 0;
}, getPathArea: bt, getPathBBox: xt, pathLengthFactory: yt, getTotalLength: pt, getPointAtLength: gt, getClosestPoint: function(t2, e2) {
  return wt(t2, e2).closest;
}, getSegmentOfPoint: function(t2, e2) {
  return wt(t2, e2).segment;
}, getPropertiesAtPoint: wt, getPropertiesAtLength: Mt, getSegmentAtLength: function(t2, e2) {
  return Mt(t2, e2).segment;
}, isPointInStroke: function(t2, e2) {
  const { distance: r2 } = wt(t2, e2);
  return Math.abs(r2) < 1e-3;
}, clonePath: g, splitPath: H, fixPath: function(t2) {
  const e2 = M(t2), r2 = $(e2), { length: n2 } = e2, s2 = "Z" === r2.slice(-1)[0][0], i2 = s2 ? n2 - 2 : n2 - 1, [a2, o2] = r2[0].slice(1), [m2, c2] = r2[i2].slice(-2);
  return s2 && a2 === m2 && o2 === c2 ? e2.slice(0, -1) : e2;
}, roundPath: Q, optimizePath: X, reverseCurve: function(t2) {
  const e2 = t2.slice(1).map((e3, r2, n2) => r2 ? [...n2[r2 - 1].slice(-2), ...e3.slice(1)] : [...t2[0].slice(1), ...e3.slice(1)]).map((t3) => t3.map((e3, r2) => t3[t3.length - r2 - 2 * (1 - r2 % 2)])).reverse();
  return [["M", ...e2[0].slice(0, 2)], ...e2.map((t3) => ["C", ...t3.slice(2)])];
}, reversePath: F, normalizePath: $, transformPath: at, shapeToPath: function(t2, e2) {
  const r2 = Object.keys(At), { tagName: n2 } = t2;
  if (n2 && !r2.some((t3) => n2 === t3)) throw TypeError(`${c}: "${n2}" is not SVGElement`);
  const s2 = document.createElementNS("http://www.w3.org/2000/svg", "path"), i2 = n2 || t2.type, o2 = {};
  o2.type = i2;
  const m2 = At[i2];
  let u2;
  n2 ? (m2.forEach((e3) => {
    o2[e3] = t2.getAttribute(e3);
  }), Object.values(t2.attributes).forEach(({ name: t3, value: e3 }) => {
    m2.includes(t3) || s2.setAttribute(t3, e3);
  })) : (Object.assign(o2, t2), Object.keys(o2).forEach((t3) => {
    m2.includes(t3) || "type" === t3 || s2.setAttribute(t3.replace(/[A-Z]/g, (t4) => `-${t4.toLowerCase()}`), o2[t3]);
  }));
  const { round: l2 } = a;
  return "circle" === i2 ? u2 = R(function(t3) {
    const { cx: e3, cy: r3, r: n3 } = t3;
    return [["M", e3 - n3, r3], ["a", n3, n3, 0, 1, 0, 2 * n3, 0], ["a", n3, n3, 0, 1, 0, -2 * n3, 0]];
  }(o2), l2) : "ellipse" === i2 ? u2 = R(function(t3) {
    const { cx: e3, cy: r3, rx: n3, ry: s3 } = t3;
    return [["M", e3 - n3, r3], ["a", n3, s3, 0, 1, 0, 2 * n3, 0], ["a", n3, s3, 0, 1, 0, -2 * n3, 0]];
  }(o2), l2) : ["polyline", "polygon"].includes(i2) ? u2 = R(function(t3) {
    const e3 = [], r3 = (t3.points || "").trim().split(/[\s|,]/).map(Number);
    let n3 = 0;
    for (; n3 < r3.length; ) e3.push([n3 ? "L" : "M", r3[n3], r3[n3 + 1]]), n3 += 2;
    return "polygon" === t3.type ? [...e3, ["z"]] : e3;
  }(o2), l2) : "rect" === i2 ? u2 = R(function(t3) {
    const e3 = +t3.x || 0, r3 = +t3.y || 0, n3 = +t3.width, s3 = +t3.height;
    let i3 = +t3.rx, a2 = +t3.ry;
    return i3 || a2 ? (i3 = i3 || a2, a2 = a2 || i3, 2 * i3 > n3 && (i3 -= (2 * i3 - n3) / 2), 2 * a2 > s3 && (a2 -= (2 * a2 - s3) / 2), [["M", e3 + i3, r3], ["h", n3 - 2 * i3], ["s", i3, 0, i3, a2], ["v", s3 - 2 * a2], ["s", 0, a2, -i3, a2], ["h", 2 * i3 - n3], ["s", -i3, 0, -i3, -a2], ["v", 2 * a2 - s3], ["s", 0, -a2, i3, -a2]]) : [["M", e3, r3], ["h", n3], ["v", s3], ["H", e3], ["Z"]];
  }(o2), l2) : "line" === i2 ? u2 = R(function(t3) {
    const { x1: e3, y1: r3, x2: n3, y2: s3 } = t3;
    return [["M", e3, r3], ["L", n3, s3]];
  }(o2), l2) : "glyph" === i2 && (u2 = n2 ? t2.getAttribute("d") : t2.d), !!vt(u2) && (s2.setAttribute("d", u2), e2 && n2 && (t2.before(s2, t2), t2.remove()), s2);
}, options: a };
Object.assign(dt, Nt, { Version: "1.0.5" });
var Ct = (t2) => null == t2;
var Pt = (a2) => {
  const { width: o2, height: m2, cx: c2, cy: u2, rx: l2, ry: h2, startOffset: f2, reversed: y2, text: x2, svgProps: p2, ellipseProps: g2, textPathProps: d2, textProps: b2, tspanProps: M2 } = a2, [w2, v2] = (0, import_react.useState)(false), A2 = (0, import_react.useId)(), N2 = `ellipse-id${A2.replaceAll(":", "-").substring(0, A2.length - 1)}`, C2 = (0, import_react.useRef)();
  if ((0, import_react.useEffect)(() => {
    if (C2.current) {
      const t2 = { id: N2, type: "ellipse", rx: l2, ry: h2, cx: c2, cy: u2, style: "fill: none;", ...g2 }, e2 = C2.current, r2 = dt.shapeToPath(t2, true), n2 = document.getElementById(N2);
      if (n2 && n2.remove(), e2.prepend(r2), y2) {
        const t3 = r2.getAttribute("d"), e3 = dt.reversePath(t3), n3 = dt.pathToString(e3);
        r2.setAttribute("d", n3);
      }
      v2(true);
    }
  }, [C2.current, y2, o2, m2, p2, c2, u2, l2, h2, g2]), Ct(o2)) throw new Error("ReactCurvedText Error: width is required");
  if (Ct(m2)) throw new Error("ReactCurvedText Error: height is required");
  if (Ct(c2)) throw new Error("ReactCurvedText Error: cx is required");
  if (Ct(u2)) throw new Error("ReactCurvedText Error: cy is required");
  if (Ct(l2)) throw new Error("ReactCurvedText Error: rx is required");
  if (Ct(h2)) throw new Error("ReactCurvedText Error: ry is required");
  if (Ct(x2)) throw new Error("ReactCurvedText Error: text is required");
  const P2 = JSON.stringify({ width: o2, height: m2, cx: c2, cy: u2, rx: l2, ry: h2, startOffset: f2, reversed: y2, text: x2, svgProps: p2, ellipseProps: g2, textPathProps: d2, textProps: b2, tspanProps: M2, rendered: w2 });
  return import_react.default.createElement("svg", i({ ref: C2, height: m2, width: o2 }, p2), import_react.default.createElement("text", i({ key: P2 }, b2), import_react.default.createElement("textPath", i({ xlinkHref: `#${N2}`, startOffset: f2 }, d2), import_react.default.createElement("tspan", M2, x2))));
};
export {
  Pt as ReactCurvedText,
  Pt as default
};
//# sourceMappingURL=react-curved-text.js.map
