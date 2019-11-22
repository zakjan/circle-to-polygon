const { assert } = require("chai");
const circleToPolygon = require("./");

describe("Input verification", () => {
  describe("Validating center input", () => {
    it("should throw error on invalid longitude values", () => {
      assert.throws(
        () => circleToPolygon([-181, -58.99029], 100, 32),
        Error,
        `ERROR! Longitude has to be between -180 and 180 but was ${-181}`
      );
      assert.throws(
        () => circleToPolygon([181, -58.99029], 100, 32),
        Error,
        `ERROR! Longitude has to be between -180 and 180 but was ${181}`
      );
      assert.throws(
        () => circleToPolygon([1000, -58.99029], 100, 32),
        Error,
        `ERROR! Longitude has to be between -180 and 180 but was ${1000}`
      );
    });

    it("should throw error on invalid latitude values", () => {
      assert.throws(
        () => circleToPolygon([-58.99029, -91], 100, 32),
        Error,
        `ERROR! Latitude has to be between -90 and 90 but was ${-91}`
      );
      assert.throws(
        () => circleToPolygon([-58.99029, 91], 100, 32),
        Error,
        `ERROR! Latitude has to be between -90 and 90 but was ${91}`
      );
      assert.throws(
        () => circleToPolygon([-58.99029, 120], 100, 32),
        Error,
        `ERROR! Latitude has to be between -90 and 90 but was ${120}`
      );
    });

    it("should throw error on invalid type input", () => {
      assert.throws(
        () => circleToPolygon(["hello", -91], 100, 32),
        Error,
        "ERROR! Longitude and Latitude has to be numbers but where string and number"
      );
      assert.throws(
        () => circleToPolygon([-58.99029, "konichiha"], 100, 32),
        Error,
        "ERROR! Longitude and Latitude has to be numbers but where number and string"
      );
    });

    it("should only accept an array of length 2 as the circles center", () => {
      assert.throws(
        () => circleToPolygon([150, -91, 34], 100, 32),
        Error,
        "ERROR! Center has to be an array of length two"
      );
      assert.throws(
        () => circleToPolygon({}, 100, 32),
        Error,
        "ERROR! Center has to be an array of length two"
      );
    });
  });
  describe("Validating radius input", () => {
    it("should throw error on invalidy type input", () => {
      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], [], 32),
        Error,
        "ERROR! Radius has to a positive number but was: object"
      );

      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], "[]", 32),
        Error,
        "ERROR! Radius has to a positive number but was: string"
      );
    });

    xit("should throw error on too big radius value", () => {
      // TODO: Find biggest value
    });

    it("should throw error on too smal radius value", () => {
      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], 0, 32),
        Error,
        `ERROR! Radius has to a positive number but was: 0`
      );

      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], -1, 32),
        Error,
        `ERROR! Radius has to a positive number but was: -1`
      );

      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], -10, 32),
        Error,
        `ERROR! Radius has to a positive number but was: -10`
      );
    });
  });

  describe("Validating number of segments input", () => {
    it("should throw error on invalid numberOfSegments values", () => {
      assert.throws(
        () => circleToPolygon([-59.99029, -58.99029], 50, -1),
        Error,
        "ERROR! Number of segments has to be at least 3 but was: -1"
      );
    });

    assert.throws(
      () => circleToPolygon([-59.99029, -58.99029], 50, 0),
      Error,
      "ERROR! Number of segments has to be at least 3 but was: 0"
    );

    assert.throws(
      () => circleToPolygon([-59.99029, -58.99029], 50, 1),
      Error,
      "ERROR! Number of segments has to be at least 3 but was: 1"
    );

    assert.throws(
      () => circleToPolygon([-59.99029, -58.99029], 50, 2),
      Error,
      "ERROR! Number of segments has to be at least 3 but was: 2"
    );
  });
});
