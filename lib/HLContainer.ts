const random = (min: number, max: number, integer = false) => {
  let value = Math.random() * (max - min) + min;
  if (integer) {
    value = Math.round(value);
  }
  return value;
};

const radians = (value: number) => {
  return value * (Math.PI / 180);
};

const constrain = (value: number, min: number, max: number) => {
  if (value < min) value = min;
  else if (value > max) value = max;
  return value;
};

export class HaloLight {
  public x = random(0, document.body.clientWidth / 2);
  public y = random(0, document.body.clientHeight);
  public size: number;
  public speed: number;
  public direction: number;
  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;
  public duration: number;
  constructor() {
    this.size = random(1, 3);
    this.speed = 0.1;

    this.direction = Math.round(Math.random() * 35) + 10;
    this.direction = radians(this.direction);

    this.red = 255; // 빨간색을 최대로 설정
    this.green = 255; // 녹색을 최대로 설정
    this.blue = 0;
    this.alpha = Math.random();

    this.duration = 0;
  }

  update() {
    this.duration += this.speed * Math.random();
    this.direction += (Math.random() - 0.5) / 10;
    this.direction = constrain(this.direction, radians(12), radians(78));

    this.x += Math.cos(this.direction) * this.speed;
    this.y -= Math.sin(this.direction) * this.speed;
    this.y -= this.speed * 5;
    const { x, y } = this.constrain({ x: this.x, y: this.y });
    this.x = x;
    this.y = y;

    const durationRatio = Math.sin(this.duration);
    this.size += durationRatio * 0.05;
    this.alpha = Math.min((durationRatio + 1) / 2 + 0.1, 1);
  }

  get gradient() {
    // Retourne le 'radial-gradient' (CSS)
    let strGradient = "radial-gradient(";
    strGradient += "circle at " + 50 + "% " + 50 + "%, ";
    strGradient += this.color + " 0%, ";
    strGradient += this.rgba(this.alpha / 2) + " " + this.size / 2 + "%, ";
    strGradient += this.rgba(1) + " " + this.alpha * 100 + "%";
    strGradient += ") ";
    return strGradient;
  }

  get color() {
    return (
      "rgba( " +
      this.red +
      ", " +
      this.green +
      ", " +
      this.blue +
      ", " +
      this.alpha +
      ")"
    );
  }

  rgba(p_alpha = 1) {
    return (
      "rgba( " +
      this.red +
      ", " +
      this.green +
      ", " +
      this.blue +
      ", " +
      p_alpha +
      ")"
    );
  }

  constrain(pos: { x: number; y: number }) {
    if (pos.y < -(this.size * 2)) {
      pos.y = Math.random() * document.body.clientHeight + this.size * 2;
      pos.x = Math.random() * document.body.clientWidth - this.size * 10;
    }

    return pos;
  }
}

export class HLContainer {
  public haloLights: HaloLight[] = [];
  public direction = 0;
  private dpr: number;
  private ctx: CanvasRenderingContext2D | null;
  private readonly canvasWidth = document.body.clientWidth;
  private readonly canvasHeight = document.body.clientHeight;
  constructor(private readonly container: HTMLCanvasElement) {
    const nbreOfHalo = random(16, 20);

    this.ctx = this.container.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    if (this.ctx) {
      this.container.style.height = this.canvasHeight * this.dpr + "px";
      this.container.height = this.canvasHeight * this.dpr;
      this.ctx.scale(1, this.dpr);
    }

    while (this.haloLights.length < nbreOfHalo) {
      this.haloLights.push(new HaloLight());
    }
  }

  update() {
    this.direction += 0.1;

    for (let i = this.haloLights.length - 1; i >= 0; i--) {
      this.haloLights[i].update();
    }
  }
  render() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.haloLights.forEach((haloLight) => {
        if (this.ctx) {
          if (haloLight.size > 0) {
            const gradient = this.ctx.createRadialGradient(
              haloLight.x,
              haloLight.y,
              0,
              haloLight.x,
              haloLight.y,
              haloLight.size * haloLight.alpha,
            );
            gradient.addColorStop(0, haloLight.color);
            gradient.addColorStop(0.4, haloLight.rgba(haloLight.alpha * 0.5));
            gradient.addColorStop(1, haloLight.rgba(haloLight.alpha * 0.2));

            this.ctx.beginPath();
            this.ctx.arc(
              haloLight.x,
              haloLight.y,
              haloLight.size,
              0,
              Math.PI * 2,
            );
            this.ctx.fillStyle = gradient;
            this.ctx?.fill();
          }
          this.ctx?.closePath();
        }
      });
    }
  }
}
