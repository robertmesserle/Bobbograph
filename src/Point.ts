import Trig from './Trig';
import {PointInterface} from './Interfaces';

export default class Point implements PointInterface {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getAngle(point: PointInterface): number {
    return point.x > this.x ? Trig.getAngleFromPoints(this, point)
                            : Trig.getAngleFromPoints(point, this);
  }

  getPointFromAngle(angle: number, distance: number): Point {
    var point = Trig.getPointFromAngle(this, angle, distance);
    return new Point(point.x, point.y);
  }
}
