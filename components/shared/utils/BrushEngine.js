export function getSplinePoints(points, tension = 0.5, numOfSegments = 25) {
  const res = [];
  const _points = [...points];

  // Duplicate start/end for spline math
  _points.unshift(points[0], points[1]);
  _points.push(points[points.length - 2], points[points.length - 1]);

  for (let i = 2; i < _points.length - 4; i += 2) {
    for (let t = 0; t <= numOfSegments; t++) {
      const st = t / numOfSegments;
      const st2 = st * st;
      const st3 = st2 * st;

      const t1x = (_points[i + 2] - _points[i - 2]) * tension;
      const t1y = (_points[i + 3] - _points[i - 1]) * tension;
      const t2x = (_points[i + 4] - _points[i]) * tension;
      const t2y = (_points[i + 5] - _points[i + 1]) * tension;

      const c1 = 2 * st3 - 3 * st2 + 1;
      const c2 = -2 * st3 + 3 * st2;
      const c3 = st3 - 2 * st2 + st;
      const c4 = st3 - st2;

      res.push(
        c1 * _points[i] + c2 * _points[i + 2] + c3 * t1x + c4 * t2x,
        c1 * _points[i + 1] + c2 * _points[i + 3] + c3 * t1y + c4 * t2y
      );
    }
  }
  return res;
}
export function generateRandomPoints(num = 10, width, height) {
  let numPoints = num || 10;
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push(
      (width * Math.random() * 0.9 + width * 0.05) | 0,
      (height * Math.random() * 0.9 + height * 0.05) | 0
    );
  }
  return points;
}

class Hair {
  constructor(x, y, inkAmount, color) {
    this.x = x;
    this.y = y;
    this.inkAmount = inkAmount;
    this.color = color;
    this.latestPos = { x, y };
  }
  render(ctx, dx, dy, speed) {
    this.latestPos = { x: this.x, y: this.y };
    this.x += dx;
    this.y += dy;
    let n = speed ? this.inkAmount / speed : 0;
    n = Math.min(Math.max(n, 0), 1);

    ctx.save();
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.inkAmount * n;
    ctx.beginPath();
    ctx.moveTo(this.latestPos.x, this.latestPos.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }
}

class Drop {
  constructor(x, y, size, color, strokeId) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.strokeId = strokeId;
    this.life = 1.5 * size;
    this.latestPos = { x, y };
    this.xOffRatio = 0;
  }
  render(ctx) {
    if (Math.random() < 0.03) this.xOffRatio += Math.random() * 0.06 - 0.03;
    else if (Math.random() < 0.1) this.xOffRatio *= 0.003;

    this.latestPos = { x: this.x, y: this.y };
    this.x += this.life * this.xOffRatio;
    this.y += 0.5 * this.life * Math.random();
    this.life -= Math.random() * 0.04 + 0.01;

    ctx.save();
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size + 0.3 * this.life;
    ctx.beginPath();
    ctx.moveTo(this.latestPos.x, this.latestPos.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }
}

export class BrushEngine {
  constructor(canvas, options = {}) {
    this.ctx = canvas.getContext('2d');
    this.options = {
      size: 35,
      inkAmount: 7,
      splashing: true,
      dripping: true,
      color: '#000',
      angle: 0,
      ...options,
    };
    this.x = 0;
    this.y = 0;
    this.latestPos = { x: 0, y: 0 };
    this.drops = [];
    this.tip = [];
    this.strokeId = null;
  }

  startStroke(x, y) {
    this.x = x;
    this.y = y;
    this.latestPos = { x, y };
    this.strokeId = Math.random().toString(36).substring(2, 9);
    this._resetTip();
  }

  _resetTip() {
    this.tip = [];
    const radius = this.options.size * 0.5;
    let count = Math.floor((Math.PI * radius * radius) / this.options.inkAmount);
    count = Math.max(1, Math.min(1000, count));

    for (let i = 0; i < count; i++) {
      const t = radius * Math.random();
      const s = 2 * Math.PI * Math.random();
      const n = t * Math.sin(s);
      const o = t * 0.5 * Math.cos(s);
      const a = Math.cos(this.options.angle);
      const h = Math.sin(this.options.angle);
      this.tip.push(
        new Hair(
          this.x + n * a - o * h,
          this.y + n * h + o * a,
          this.options.inkAmount,
          this.options.pattern || this.options.color
        )
      );
    }
  }

  render(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    this.x = x;
    this.y = y;

    // Update existing drops
    for (let i = this.drops.length - 1; i >= 0; i--) {
      const drop = this.drops[i];
      if (drop.life <= 0) {
        this.drops.splice(i, 1);
      } else {
        drop.render(this.ctx);
      }
    }

    // Splashing
    if (this.options.splashing && dist > 75) {
      const count = Math.floor((dist - 75) * 0.5 * Math.random());
      this.ctx.save();
      this.ctx.fillStyle = this.options.color;
      this.ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const p = (dist - 1) * Math.random() + 1;
        const angle = 2 * Math.PI * Math.random();
        const r = 5 * Math.random();
        const sx = this.x + p * Math.sin(angle);
        const sy = this.y + p * Math.cos(angle);
        this.ctx.moveTo(sx + r, sy);
        this.ctx.arc(sx, sy, r, 0, 2 * Math.PI);
      }
      this.ctx.fill();
      this.ctx.restore();
    }
    // Dripping
    else if (this.options.dripping && dist < 2 * this.options.inkAmount && Math.random() < 0.05) {
      this.drops.push(
        new Drop(
          this.x,
          this.y,
          0.5 * (this.options.size + this.options.inkAmount) * (0.15 * Math.random() + 0.1),
          this.options.color,
          this.strokeId
        )
      );
    }

    // Render Hairs
    this.tip.forEach((h) => h.render(this.ctx, dx, dy, dist));
  }

  endStroke() {
    this.strokeId = null;
  }
}
