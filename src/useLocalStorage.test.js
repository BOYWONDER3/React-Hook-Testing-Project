import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./useLocalStorage";
import { act } from "react-dom/test-utils";

describe("#useLocalStorage", () => {
  function renderLocalStorageHook(key, initialValue) {
    return renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      {
        initialProps: { key, initialValue },
      }
    );
  }

  afterEach(() => {
    localStorage.clear()
  })

  it("should use the initial value passed to the hook and store in localStorage", () => {
    const key = "key"
    const initialValue = "initial2"
    const { result } = renderLocalStorageHook(key, initialValue);

    expect(result.current).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  });

  it("should use the initial value as a function passed to the hook and store in localStorage", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, () => initialValue);

    expect(result.current).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  });

  it("should update localStorage when setValue is called", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, initialValue);

    const newValue = "new"
    act(() => result.current[1](newValue))

    expect(result.current[0]).toBe(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
  })

  it("should clear localStorage when setValue is called", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, initialValue);

    act(() => result.current[1](undefined))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(key)).toBeNull
  })

  it("should use the value in localStorage if it exists", () => {
    const key = "key"
    const initialValue = 'initial2'
    const existingValue = "existing"
    localStorage.setItem(key, JSON.stringify(existingValue))
    const { result } = renderLocalStorageHook(key, initialValue);

    expect(result.current).toBe(existingValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue))
  });

});
