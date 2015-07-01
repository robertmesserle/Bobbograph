/// <reference path="../typings/tsd.d.ts" />

import {PointInterface} from './Interfaces';
import Point from './Point';
import Trig from './Trig';
import expect = require('expect.js');

describe('Point', () => {
  describe('#constructor()', () => {
    it('should exist', () => { expect(Point).to.be.a('function'); });
    it('should set x and y', () => {
      var point = new Point(5, 10);
      expect(point.x).to.be(5);
      expect(point.y).to.be(10);
    });
  });
  describe('#getAngle()', () => {
    var point = new Point(0, 0);
    it('should work for 45 degree angles', () => {
      var angle = point.getAngle({x: 1, y: 1});
      expect(angle).to.be(Math.PI / 4);
    });
  });
  describe('#getPointFromAngle()', () => {
    var origin = new Point(0, 0);
    it('should work with 90-degree angles', () => {
      expect(origin.getPointFromAngle(Trig.rad(0), 5)).to.eql(new Point(5, 0));
      expect(origin.getPointFromAngle(Trig.rad(90), 5)).to.eql(new Point(0, 5));
      expect(origin.getPointFromAngle(Trig.rad(180), 5)).to.eql(new Point(-5, 0));
      expect(origin.getPointFromAngle(Trig.rad(270), 5)).to.eql(new Point(0, -5));
    });
    it('should work with 45-degree angles', () => {
      var point: PointInterface;

      point = origin.getPointFromAngle(Trig.rad(45), Math.sqrt(2));
      expect(point.x).to.be.near(1);
      expect(point.y).to.be.near(1);

      point = origin.getPointFromAngle(Trig.rad(135), Math.sqrt(2));
      expect(point.x).to.be.near(-1);
      expect(point.y).to.be.near(1);

      point = origin.getPointFromAngle(Trig.rad(225), Math.sqrt(2));
      expect(point.x).to.be.near(-1);
      expect(point.y).to.be.near(-1);

      point = origin.getPointFromAngle(Trig.rad(315), Math.sqrt(2));
      expect(point.x).to.be.near(1);
      expect(point.y).to.be.near(-1);
    });
    it('should work with other angles', () => {
      [new Point(5, 3), new Point(-5, 3), new Point(-5, -3), new Point(5, -3)].forEach(point => {
        var angle = Trig.getAngleFromPoints(origin, point);
        var distance = Trig.getDistanceBetweenPoints(origin, point);
        var newPoint = origin.getPointFromAngle(angle, distance);
        expect(newPoint.x).to.be.near(point.x);
        expect(newPoint.y).to.be.near(point.y);
      });
    });
  });
});