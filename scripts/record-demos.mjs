/** Record the real, already-running seeded Arbour app. Run with Node, not Bun. */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.resolve(
  process.env.ARBOUR_REPO ?? path.join(root, "../arbour"),
);
const requireE2e = createRequire(path.join(app, "apps/e2e/package.json"));
const requireApi = createRequire(path.join(app, "apps/api/package.json"));
requireApi("tsx/cjs/api").register();
const { chromium, expect } = requireE2e("@playwright/test");
const { clerkSetup } = requireE2e("@clerk/testing/playwright");
const { loadRootEnv, appHost } = requireE2e("./helpers/env.ts");
const { signInAsSeedUser } = requireE2e("./helpers/sign-in.ts");
const { dismissNewAccountPrompts } = requireE2e("./helpers/onboarding.ts");
const sharp = createRequire(path.join(root, "package.json"))("sharp");
loadRootEnv();
if (!process.env.CLERK_SECRET_KEY?.startsWith("sk_test_")) {
  throw new Error("Recordings require the seeded Clerk development instance.");
}
if (!new URL(appHost()).hostname.endsWith("localhost")) {
  throw new Error("Recordings require the local Arbour session.");
}
const out = path.join(root, "public/product/demos");
const work = mkdtempSync(path.join(tmpdir(), "arbour-recordings-"));
mkdirSync(out, { recursive: true });
const viewport = { width: 1440, height: 900 };
const hold = (page, ms = 1200) => page.waitForTimeout(ms);
async function click(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error("Recording target is not visible");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
    steps: 24,
  });
  await hold(page, 250);
  await locator.click();
  await hold(page);
}
async function settle(page) {
  await page.waitForLoadState("load");
  await expect(page.locator("main")).not.toBeEmpty();
  await expect(page.locator('[aria-busy="true"]:visible')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );
  await hold(page, 900);
}
async function period(page, name) {
  await click(page, page.getByRole("combobox", { name: /Period/ }));
  await click(page, page.getByRole("option", { name, exact: true }));
}
const demos = [
  {
    id: "enquiries-board",
    route: "/enquiries",
    description:
      "Switch from the enquiry board to its list and back. No records are changed.",
    record: async (page) => {
      await click(
        page,
        page.getByRole("button", { name: "List layout", exact: true }),
      );
      await hold(page, 1000);
      await click(
        page,
        page.getByRole("button", { name: "Board layout", exact: true }),
      );
    },
  },
  {
    id: "quote",
    route: "/enquiries/pit_seed_acme_ruby",
    description:
      "Change an unsaved quote to flexible, show optional lines, then restore fixed. No save or send.",
    prepare: async (page) => {
      await page.getByRole("tab", { name: "Money", exact: true }).click();
      await page
        .getByRole("button", { name: "Open", exact: true })
        .first()
        .click();
      await page
        .getByRole("combobox", { name: "Quote type", exact: true })
        .waitFor();
    },
    record: async (page) => {
      await click(
        page,
        page.getByRole("combobox", { name: "Quote type", exact: true }),
      );
      await click(page, page.getByRole("option", { name: /Flexible/ }));
      await click(
        page,
        page
          .getByRole("combobox", { name: "How it's offered", exact: true })
          .last(),
      );
      await click(
        page,
        page.getByRole("option", { name: "Optional", exact: true }),
      );
      await hold(page, 1000);
      await click(
        page,
        page.getByRole("combobox", { name: "Quote type", exact: true }),
      );
      await click(page, page.getByRole("option", { name: /Fixed/ }));
    },
  },
  {
    id: "booking",
    route: "/bookings/pit_seed_acme_ella",
    description:
      "Explore a booking's money and documents, then return to its overview.",
    record: async (page) => {
      for (const name of ["Money", "Documents", "Overview"]) {
        await click(page, page.getByRole("tab", { name, exact: true }));
        await hold(page, 1000);
      }
    },
  },
  {
    id: "calendar",
    route: "/calendar",
    description:
      "Open the October booking, view the year, then return to October.",
    prepare: async (page) => {
      await page
        .getByRole("button", { name: "Next month", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "October", exact: true })
        .waitFor();
    },
    record: async (page) => {
      await click(
        page,
        page.getByRole("button", { name: "Ella & Jack", exact: true }),
      );
      await hold(page, 1200);
      await page.keyboard.press("Escape");
      await click(page, page.getByRole("tab", { name: "Year", exact: true }));
      await hold(page, 1200);
      await click(page, page.getByRole("tab", { name: "Month", exact: true }));
      // Changing from Year resets the app to the current month (September).
      await click(
        page,
        page.getByRole("button", { name: "Next month", exact: true }),
      );
      await expect(
        page.getByRole("heading", { name: "October", exact: true }),
      ).toBeVisible();
    },
  },
  {
    id: "payments",
    route: "/payments",
    description:
      "Compare collected payments across the calendar and financial year.",
    record: async (page) => {
      await period(page, "This calendar year");
      await hold(page, 1600);
      await period(page, "This financial year");
    },
  },
];

await clerkSetup({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});
const browser = await chromium.launch();
try {
  const login = await browser.newContext({ baseURL: appHost(), viewport });
  const loginPage = await login.newPage();
  await signInAsSeedUser(loginPage, "arbour+clerk_test_owner@example.com");
  await loginPage.goto("/");
  await dismissNewAccountPrompts(loginPage);
  const storageState = await login.storageState();
  await login.close();
  const selected = process.argv.slice(2);
  for (const demo of demos.filter(
    (item) => !selected.length || selected.includes(item.id),
  )) {
    console.log(`Recording ${demo.id}`);
    const context = await browser.newContext({
      baseURL: appHost(),
      storageState,
      viewport,
      deviceScaleFactor: 2,
      colorScheme: "light",
      locale: "en-AU",
      timezoneId: "Australia/Melbourne",
    });
    const page = await context.newPage();
    try {
      await page.clock.setFixedTime(new Date("2026-09-11T10:00:00+10:00"));
      // The recorder does not include the OS cursor. This follows real mouse events.
      await page.addInitScript(() => {
        document.addEventListener("DOMContentLoaded", () => {
          const style = document.createElement("style");
          style.textContent =
            "nextjs-portal{display:none!important}*{caret-color:transparent!important}";
          document.head.append(style);
          const cursor = document.createElement("div");
          cursor.id = "demo-cursor";
          cursor.style.cssText =
            "position:fixed;top:0;left:0;width:20px;height:24px;z-index:2147483647;pointer-events:none;transform:translate(1200px,100px)";
          cursor.innerHTML =
            '<svg width="20" height="24" viewBox="0 0 20 24"><path d="M2 2v17l4.5-4 4 7 3-1.5-4-7H16Z" fill="#0F2A1E" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>';
          document.body.append(cursor);
          document.addEventListener("mousemove", (event) => {
            cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
          });
        });
      });
      await page.goto(demo.route);
      await settle(page);
      await demo.prepare?.(page);
      await settle(page);
      const home = { x: 1200, y: 100 };
      await page.mouse.move(home.x, home.y);
      await hold(page, 400);
      const poster = await page.screenshot({ scale: "device" });
      // Capture actual device pixels. Playwright's video recorder can downscale
      // browser screencasts; PNG frames preserve the 2x text and fine UI rules.
      const framesDir = path.join(work, demo.id);
      mkdirSync(framesDir);
      const frames = [];
      const captureController = new AbortController();
      const startedAt = Date.now();
      const captureFrames = (async () => {
        while (!captureController.signal.aborted) {
          const timestamp = Date.now();
          const file = path.join(
            framesDir,
            `${String(frames.length).padStart(4, "0")}.png`,
          );
          await page.screenshot({ path: file, scale: "device" });
          frames.push({ file, timestamp });
          await hold(page, Math.max(1, 100 - (Date.now() - timestamp)));
        }
      })();
      try {
        await hold(page, 1400);
        await demo.record(page);
        await page.mouse.move(home.x, home.y, { steps: 24 });
        await hold(page, 1700);
      } finally {
        captureController.abort();
        await captureFrames;
      }
      const finishedAt = Date.now();
      await context.close();
      const output = path.join(out, `${demo.id}.webp`);
      const timedFrames = frames.flatMap((frame, index) => [
        "-d",
        String(
          Math.max(
            20,
            (frames[index + 1]?.timestamp ?? finishedAt) - frame.timestamp,
          ),
        ),
        frame.file,
      ]);
      execFileSync("img2webp", [
        "-loop",
        "0",
        "-lossless",
        "-m",
        "4",
        ...timedFrames,
        "-o",
        output,
      ]);
      await sharp(poster)
        .webp({ lossless: true })
        .toFile(path.join(out, `${demo.id}-poster.webp`));
      const meta = await sharp(output, { animated: true }).metadata();
      if (!meta.pages || meta.pages < 2)
        throw new Error(`${demo.id} is not animated`);
      const bytes = readFileSync(output);
      const provenance = {
        prompt: `Real Playwright screen recording of the local seeded Arbour console. ${demo.description} No generated product UI.`,
        createdAt: new Date().toISOString(),
        route: demo.route,
        sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], {
          cwd: app,
          encoding: "utf8",
        }).trim(),
        width: meta.width,
        height: meta.pageHeight,
        frames: meta.pages,
        targetFps: 10,
        capturedFrames: frames.length,
        elapsedMs: finishedAt - startedAt,
        durationMs: meta.delay.reduce((sum, delay) => sum + delay, 0),
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        script: "scripts/record-demos.mjs",
      };
      writeFileSync(
        `${output}.json`,
        `${JSON.stringify(provenance, null, 2)}\n`,
      );
      writeFileSync(
        path.join(out, `${demo.id}-poster.webp.json`),
        `${JSON.stringify({ prompt: `Still frame from the same Playwright capture as ${demo.id}.webp, before the interaction starts.`, createdAt: provenance.createdAt }, null, 2)}\n`,
      );
      console.log(
        `${demo.id}: ${meta.width}x${meta.pageHeight}, ${meta.pages} frames, ${(bytes.length / 1024).toFixed(0)} KB`,
      );
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
console.log(`Source recording frames: ${work}`);
