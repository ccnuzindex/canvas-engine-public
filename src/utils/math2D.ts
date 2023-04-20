export class Matrix2D {
  m = [1, 0, 0, 1, 0, 0];

  constructor(m = [1, 0, 0, 1, 0, 0]) {
    this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
  }

  reset() {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;
    this.m[4] = 0;
    this.m[5] = 0;
  }

  point(point: Vector2D) {
    var m = this.m;
    return {
      x: m[0] * point.x + m[2] * point.y + m[4],
      y: m[1] * point.x + m[3] * point.y + m[5],
    };
  }

  translate(x: number, y: number) {
    this.m[4] += this.m[0] * x + this.m[2] * y;
    this.m[5] += this.m[1] * x + this.m[3] * y;
    return this;
  }

  rotate(rad: number) {
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var m11 = this.m[0] * c + this.m[2] * s;
    var m12 = this.m[1] * c + this.m[3] * s;
    var m21 = this.m[0] * -s + this.m[2] * c;
    var m22 = this.m[1] * -s + this.m[3] * c;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }

  scale(sx: number, sy: number) {
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;
    return this;
  }

  multiply(matrix: Matrix2D) {
    var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
    var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

    var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
    var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

    var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
    var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
    return this;
  }

  decompose() {
    var a = this.m[0];
    var b = this.m[1];
    var c = this.m[2];
    var d = this.m[3];
    var e = this.m[4];
    var f = this.m[5];

    var delta = a * d - b * c;

    let result = {
      x: e,
      y: f,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0,
    };

    // Apply the QR-like decomposition.
    if (a != 0 || b != 0) {
      var r = Math.sqrt(a * a + b * b);
      result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
      result.scaleX = r;
      result.scaleY = delta / r;
      result.skewX = (a * c + b * d) / delta;
      result.skewY = 0;
    } else if (c != 0 || d != 0) {
      var s = Math.sqrt(c * c + d * d);
      result.rotation =
        Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
      result.scaleX = delta / s;
      result.scaleY = s;
      result.skewX = 0;
      result.skewY = (a * c + b * d) / delta;
    } else {
      // a = b = c = d = 0
    }

    return result;
  }
}

export class Vector2D {
  x = 0;
  y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface Line {
  start: Vector2D;
  end: Vector2D;
}

const isPointIntersectWithLine = (point: Vector2D, line: Line) => {
  let xi: number;
  // optimisation 1: line below point. no cross
  if (line.start.y < point.y && line.end.y < point.y) {
    return false;
  }

  // optimisation 2: line above point. no cross
  if (line.start.y >= point.y && line.end.y >= point.y) {
    return false;
  }

  // optimisation 3: vertical line case
  if (line.start.x === line.end.x && line.start.x >= point.x) {
    xi = line.start.x;
  } else {
    let b1 = 0;
    let b2 = (line.end.y - line.start.y) / (line.end.x - line.start.x);
    let a1 = point.y - b1 * point.x;
    let a2 = line.start.y - b2 * line.start.x;

    xi = -(a1 - a2) / (b1 - b2);
  }

  // dont count xi < point.x cases
  if (xi >= point.x) {
    return true;
  }

  return false;
};

export const isPointInRect = (point: Vector2D, rect: Vector2D[]) => {
  const lines: Line[] = [];
  rect.forEach((item, idx) => {
    if (idx < rect.length - 1) {
      lines.push({
        start: item,
        end: rect[idx + 1],
      });
    }
  });

  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const flag = isPointIntersectWithLine(point, lines[i]);
    if (flag) {
      count++;
    }
  }

  return count !== 0 && count % 2 === 1;
};
