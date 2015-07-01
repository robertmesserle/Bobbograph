import {PointInterface} from './Interfaces';

export default class Trig {
  static rad(deg: number): number { return deg * Math.PI / 180; }
  static deg(rad: number): number { return rad * 180 / Math.PI; }
  static getBaseAngleFromPoints(dx: number, dy: number): number {
    return Math.abs(Math.atan(dy / dx));
  }
  static getQuadrant(dx: number, dy: number): number {
    return dy >= 0 ? dx >= 0 ? 1 : 2 : dx < 0 ? 3 : 4;
  }
  static getAngleFromPoints(p1: PointInterface, p2: PointInterface): number {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var baseAngle = Trig.getBaseAngleFromPoints(dx, dy);
    switch (Trig.getQuadrant(dx, dy)) {
      case 1:
        return baseAngle;
      case 2:
        return Math.PI - baseAngle;
      case 3:
        return Math.PI + baseAngle;
      case 4:
        return 2 * Math.PI - baseAngle;
    }
  }
  static getDistanceBetweenPoints(p1: PointInterface, p2: PointInterface): number {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  static getPointFromAngle(origin: PointInterface, angle: number,
                           distance: number): PointInterface {
    var {x, y} = origin;
    switch (angle) {
      case Math.PI:
        return {x: x - distance, y: y};
      case Math.PI * 0.5:
        return {x: x, y: y + distance};
      case Math.PI * 1.5:
        return {x: x, y: y - distance};
      case 0:
        return {x: x + distance, y: y};
      default:
        return {x: Math.cos(angle) * distance + x, y: Math.sin(angle) * distance + y};
    }
  }
}