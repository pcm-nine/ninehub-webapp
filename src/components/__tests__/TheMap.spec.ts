import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TheMap from "../TheMap.vue";

describe("TheMap", () => {
  it("renders properly", () => {
    const wrapper = mount(TheMap);
    expect(wrapper).toBeCalled();
  });
});
