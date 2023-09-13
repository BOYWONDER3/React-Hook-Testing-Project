const matchers = require("@testing-library/jest-dom/types/matchers")
const { cleanup } = require("@testing-library/react")
const { afterEach, expect } = require("vitest")

expect.extend(matchers)

afterEach(() => {
    cleanup()
})