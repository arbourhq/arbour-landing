import assert from "node:assert/strict";
import { test } from "node:test";
import {
  choosePerch,
  cubic,
  flightVariation,
  overlap,
  perchesOnEdge,
  planFlight,
} from "./flight.ts";

const viewport = { left: 8, right: 382, top: 90, bottom: 790 };
const point = { x: 330, y: 420 };
const perch = (id, x, y, branch = false) => ({ id, x, y, branch });

test("rejects a closer landing if the bird would cover a control", () => {
  const selected = choosePerch(
    [perch("blocked", 330, 430), perch("clear", 330, 650)],
    [{ left: 300, right: 365, top: 390, bottom: 430 }],
    viewport,
    point,
    80,
  );
  assert.equal(selected?.id, "clear");
});

test("rejects perches clipped by the nav, viewport edges or bottom", () => {
  const selected = choosePerch(
    [
      perch("nav", 330, 110),
      perch("edge", 375, 400),
      perch("bottom", 330, 789),
    ],
    [],
    viewport,
    point,
    80,
  );
  assert.equal(selected, undefined);
});

test("prefers a nearby real edge over a floating branch", () => {
  const options = [perch("branch", 330, 420, true), perch("frame", 300, 500)];
  const selected = choosePerch(options, [], viewport, point, 80);
  assert.equal(selected?.id, "frame");
  assert.equal(options[0].id, "branch", "selection must not mutate its inputs");
});

test("uses the branch when the real page edges are outside the viewport", () => {
  const selected = choosePerch(
    [perch("offscreen", 300, 1500), perch("branch", 330, 600, true)],
    [],
    viewport,
    point,
    80,
  );
  assert.equal(selected?.id, "branch");
});

test("crosses a desktop viewport to reach a real ledge instead of staying on its branch", () => {
  const selected = choosePerch(
    [perch("branch", 1350, 420, true), perch("frame", 450, 620)],
    [],
    { left: 8, right: 1432, top: 90, bottom: 852 },
    { x: 1350, y: 420 },
    120,
  );
  assert.equal(selected?.id, "frame");
});

test("finds a clear spot along a desktop ledge when both corners are occupied", () => {
  const candidates = perchesOnEdge(
    { left: 200, right: 1200, top: 500, bottom: 700 },
    120,
    "frame",
  );
  const selected = choosePerch(
    candidates,
    [
      { left: 200, right: 450, top: 380, bottom: 490 },
      { left: 950, right: 1200, top: 380, bottom: 490 },
    ],
    { left: 8, right: 1432, top: 90, bottom: 852 },
    { x: 1350, y: 420 },
    120,
  );
  assert.ok(selected);
  assert.ok(selected.x > 450 && selected.x < 950);
  assert.equal(selected.y, 500);
  assert.equal(selected.branch, false);
});

test("does not offer a ledge that is too narrow to support the bird", () => {
  assert.deepEqual(
    perchesOnEdge(
      { left: 100, right: 180, top: 500, bottom: 700 },
      120,
      "narrow",
    ),
    [],
  );
});

test("landing starts at the current position and ends exactly at the feet anchor", () => {
  const controls = [
    { x: 50, y: 120 },
    { x: 100, y: 20 },
    { x: 330, y: 300 },
    { x: 330, y: 400 },
  ];
  assert.deepEqual(cubic(controls, -1), controls[0]);
  assert.deepEqual(cubic(controls, 0), controls[0]);
  assert.deepEqual(cubic(controls, 1), controls[3]);
  assert.deepEqual(cubic(controls, 2), controls[3]);
  for (let step = 0; step <= 100; step++) {
    const p = cubic(controls, step / 100);
    assert.ok(p.x >= 50 && p.x <= 330);
    assert.ok(p.y >= 20 && p.y <= 400);
  }
});

test("flight variation stays bounded at both random extremes", () => {
  for (const random of [() => 0, () => 1]) {
    const v = flightVariation(random);
    assert.ok(v.lift >= 20 && v.lift <= 55);
    assert.ok(v.wingbeat >= 460 && v.wingbeat <= 600);
    assert.ok(Math.abs(v.approach) >= 24 && Math.abs(v.approach) <= 72);
  }
});

test("successive manoeuvres never repeat and stay inside desktop and phone bounds", () => {
  for (const [bounds, size] of [
    [viewport, 80],
    [{ left: 8, right: 1432, top: 90, bottom: 852 }, 120],
  ]) {
    for (const value of [0, 0.25, 0.5, 0.75, 1]) {
      let start = { x: bounds.right - size, y: 400 };
      let previous;
      for (let leg = 0; leg < 8; leg++) {
        const flight = planFlight(
          start,
          { x: 0, y: 0 },
          bounds,
          size,
          leg % 2 ? 1 : -1,
          previous,
          () => value,
        );
        assert.notEqual(flight.kind, previous);
        assert.deepEqual(cubic(flight.points, 0), start);
        for (let step = 0; step <= 100; step++) {
          const p = cubic(flight.points, step / 100);
          assert.ok(
            p.x >= bounds.left + size * 0.6 - 0.001 &&
              p.x <= bounds.right - size * 0.6 + 0.001,
          );
          assert.ok(
            p.y >= bounds.top + size * 0.8 - 0.001 &&
              p.y <= bounds.bottom - size * 0.2 + 0.001,
          );
        }
        start = flight.points[3];
        previous = flight.kind;
      }
    }
  }
});

test("flight preserves position and incoming velocity when interrupting an approach", () => {
  const start = { x: 280, y: 420 };
  const velocity = { x: -0.12, y: -0.09 };
  const flight = planFlight(
    start,
    velocity,
    viewport,
    80,
    1,
    undefined,
    () => 0.5,
  );
  assert.deepEqual(flight.points[0], start);
  assert.ok(
    Math.abs(
      (3 * (flight.points[1].x - start.x)) / flight.duration - velocity.x,
    ) < 0.0001,
  );
  assert.ok(
    Math.abs(
      (3 * (flight.points[1].y - start.y)) / flight.duration - velocity.y,
    ) < 0.0001,
  );
});

test("the repertoire produces four distinct paths and a hook turns back towards the edge", () => {
  const flights = [0, 0.26, 0.51, 0.76].map((choice) => {
    let first = true;
    return planFlight(point, { x: 0, y: 0 }, viewport, 80, 1, undefined, () => {
      if (first) {
        first = false;
        return choice;
      }
      return 0.5;
    });
  });
  assert.equal(new Set(flights.map((f) => f.kind)).size, 4);
  assert.equal(new Set(flights.map((f) => JSON.stringify(f.points))).size, 4);
  const hook = flights.find((f) => f.kind === "hook");
  assert.ok(cubic(hook.points, 0.5).x < hook.points[0].x);
  assert.ok(hook.points[3].x > cubic(hook.points, 0.5).x);
});

test("touching edges are allowed but positive area overlap is rejected", () => {
  const a = { left: 0, right: 100, top: 0, bottom: 100 };
  assert.equal(overlap(a, { left: 100, right: 200, top: 0, bottom: 100 }), 0);
  assert.equal(overlap(a, { left: 90, right: 200, top: 90, bottom: 200 }), 100);
});
