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
  public x = random(0, 100);
  public y = random(0, 100);
  public size: number;
  public speed: number;
  public direction: number;
  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;
  public duration: number;
  constructor() {
    this.size = random(1, 1);
    // this.speed = random(0.01, 0.1);
    this.speed = (24 - this.size) / 128;

    this.direction = Math.round(Math.random() * 35) + 10;
    this.direction = radians(this.direction);

    this.red = 255; // 빨간색을 최대로 설정
    this.green = 255; // 녹색을 최대로 설정
    this.blue = 0;
    this.alpha = (25 - this.size) / 50;

    this.duration = 0;
  }

  update() {
    this.duration += this.speed * Math.random();
    this.direction += (Math.random() - 0.5) / 10;
    this.direction = constrain(this.direction, radians(12), radians(78));

    this.x += Math.cos(this.direction) * this.speed;
    this.y -= Math.sin(this.direction) * this.speed;
    this.x = this.constrain(this.x);
    this.y = this.constrain(this.y);

    this.size += Math.sin(this.duration) * 0.05;
  }

  get gradient() {
    // Retourne le 'radial-gradient' (CSS)
    let strGradient = "radial-gradient(";
    strGradient += "circle at " + this.x + "% " + this.y + "%, ";
    strGradient += this.color + " 0%, ";
    strGradient += this.rgba(this.alpha / 2) + " " + this.size / 2 + "%, ";
    strGradient += this.rgba(0) + " " + this.size + "%";
    strGradient += ") ";
    return strGradient;
  }

  get color() {
    // Retourne la couleur en 'rgba' (CSS)
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
    // Retourne la couleur en 'rgba' (CSS) avec un alpha différent
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

  constrain(pos: number) {
    if (pos > 100 + this.size * 2) {
      pos = -(this.size * 2);
    } else if (pos < -(this.size * 2)) {
      pos = 100 + this.size * 2;
    }
    return pos;
  }
}

export class HLContainer {
  public haloLights: HaloLight[] = [];
  public direction = 0;
  constructor(private readonly container: HTMLElement) {
    // On ajoute les halo lumineux au containers
    let nbreOfHalo = random(10, 16);

    // for(let i = 0; i < nbreOfHalo; i++){
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
    let backgroundStyle = "";

    for (let i = this.haloLights.length - 1; i >= 0; i--) {
      backgroundStyle += this.haloLights[i].gradient;
      backgroundStyle += ", ";
    }
    backgroundStyle +=
      "linear-gradient(" +
      this.direction +
      "deg, rgba(0, 0, 0,0) 0%, rgba(0, 0, 0,0) 100%)";
    this.container.style.background = backgroundStyle;
  }
}
