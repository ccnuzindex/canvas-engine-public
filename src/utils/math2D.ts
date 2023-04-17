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
  // todo
  // iLine = lines[lineKey];
  // // optimisation 1: line below point. no cross
  // if ((iLine.o.y < point.y) && (iLine.d.y < point.y)) {
  //   continue;
  // }
  // // optimisation 2: line above point. no cross
  // if ((iLine.o.y >= point.y) && (iLine.d.y >= point.y)) {
  //   continue;
  // }
  // // optimisation 3: vertical line case
  // if ((iLine.o.x === iLine.d.x) && (iLine.o.x >= point.x)) {
  //   xi = iLine.o.x;
  //   // yi = point.y;
  // }
  // // calculate the intersection point
  // else {
  //   b1 = 0;
  //   b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
  //   a1 = point.y - b1 * point.x;
  //   a2 = iLine.o.y - b2 * iLine.o.x;

  //   xi = -(a1 - a2) / (b1 - b2);
  //   // yi = a1 + b1 * xi;
  // }
  return true;
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

  return count % 2 === 0;
};
