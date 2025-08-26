// Matchers de jest-dom para Vitest
import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Limpia el DOM después de cada test
afterEach(() => cleanup());

// (Opcional) polyfill de webcrypto por si algo lo necesita en jsdom
import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;
if (!globalThis.crypto.subtle && webcrypto?.subtle) {
  globalThis.crypto.subtle = webcrypto.subtle;
}
