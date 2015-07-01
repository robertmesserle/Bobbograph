/// <reference path="../typings/tsd.d.ts" />

import Trig from './Trig';
import expect = require('expect.js');

describe('Trig', () => {
  describe('rad()', () => {
    it('should convert deg to rad', () => {
      expect(Trig.rad(180)).to.be(Math.PI);
      expect(Trig.rad(90)).to.be(Math.PI / 2);
      expect(Trig.rad(45)).to.be(Math.PI / 4);
    });
  });
  describe('deg()', () => {
    it('should convert rad to deg', () => {
      expect(Trig.deg(Math.PI)).to.be(180);
      expect(Trig.deg(Math.PI / 2)).to.be(90);
      expect(Trig.deg(Math.PI / 4)).to.be(45);
    });
  });
  describe('getBaseAngleFromPoints()', () => {
    it('should work on 90-degree angles', () => {
      expect(Trig.getBaseAngleFromPoints(1, 0)).to.be(Trig.rad(0));
      expect(Trig.getBaseAngleFromPoints(0, 1)).to.be(Trig.rad(90));
      expect(Trig.getBaseAngleFromPoints(-1, 0)).to.be(Trig.rad(0));
      expect(Trig.getBaseAngleFromPoints(0, -1)).to.be(Trig.rad(90));
    });
    it('should work on 45-degree angles', () => {
      expect(Trig.getBaseAngleFromPoints(1, 1)).to.be(Trig.rad(45));
      expect(Trig.getBaseAngleFromPoints(-1, 1)).to.be(Trig.rad(45));
      expect(Trig.getBaseAngleFromPoints(-1, -1)).to.be(Trig.rad(45));
      expect(Trig.getBaseAngleFromPoints(1, -1)).to.be(Trig.rad(45));
    });
    it('should work on other angles', () => {
      expect(Trig.getBaseAngleFromPoints(1, 2)).to.be.near(Trig.rad(63.5));
      expect(Trig.getBaseAngleFromPoints(-1, 2)).to.be.near(Trig.rad(63.5));
      expect(Trig.getBaseAngleFromPoints(-1, -2)).to.be.near(Trig.rad(63.5));
      expect(Trig.getBaseAngleFromPoints(1, -2)).to.be.near(Trig.rad(63.5));
    });
  });
  describe('getQuadrant()', () => {
    it('should provide the correct quadrant for any angle', () => {
      expect(Trig.getQuadrant(1, 1)).to.be(1);
      expect(Trig.getQuadrant(-1, 1)).to.be(2);
      expect(Trig.getQuadrant(-1, -1)).to.be(3);
      expect(Trig.getQuadrant(1, -1)).to.be(4);
    });
  });
  describe('getAngleFromPoint()', () => {
    it('should work on 90-degree angles', () => {
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 1, y: 0})).to.be.near(Trig.rad(0));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 0, y: 1})).to.be.near(Trig.rad(90));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: -1, y: 0})).to.be.near(Trig.rad(180));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 0, y: -1})).to.be.near(Trig.rad(270));
    });
    it('should work on 45-degree angles', () => {
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 1, y: 1})).to.be.near(Trig.rad(45));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: -1, y: 1})).to.be.near(Trig.rad(135));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: -1, y: -1})).to.be.near(Trig.rad(225));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 1, y: -1})).to.be.near(Trig.rad(315));
    });
    it('should work on other angles', () => {
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 1, y: 2})).to.be.near(Trig.rad(63.5));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: -1, y: 2})).to.be.near(Trig.rad(116.5));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: -1, y: -2})).to.be.near(Trig.rad(243.5));
      expect(Trig.getAngleFromPoints({x: 0, y: 0}, {x: 1, y: -2})).to.be.near(Trig.rad(296.5));
    });
  });
  describe('getDistanceBetweenPoints()', () => {
    it('should work with 90-degree angles', () => {
      expect(Trig.getDistanceBetweenPoints({x: 1, y: 1}, {x: 1, y: 3})).to.be(2);
      expect(Trig.getDistanceBetweenPoints({x: 1, y: 1}, {x: 3, y: 1})).to.be(2);
    });
    it('should work with other angles', () => {
      expect(Trig.getDistanceBetweenPoints({x: 1, y: 1}, {x: 2, y: 2})).to.be(Math.sqrt(2));
      expect(Trig.getDistanceBetweenPoints({x: 1, y: 1}, {x: 3, y: 2})).to.be(Math.sqrt(5));
    });
    it('should work with the same point', () => {
      expect(Trig.getDistanceBetweenPoints({x: 0, y: 0}, {x: 0, y: 0})).to.be(0);
      expect(Trig.getDistanceBetweenPoints({x: 1, y: 1}, {x: 1, y: 1})).to.be(0);
    });
  });
});