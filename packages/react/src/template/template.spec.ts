import React from "react";
import { createTemplate } from "./template";
import z from "zod";
import { createTemplateBuilder } from "./template-builder";

describe("Template", () => {
  it("Works with functional style", () => {
    const template = createTemplate({
      title: "Test",
      propSchema: z.object({ name: z.string() }),
      view: (props) => React.createElement("a"),
    });
    expect(template).toBeDefined();
    expect(template.schema.Props).toBeDefined();
  });

  it("Works with builder style", () => {
    const template = createTemplateBuilder()
      .props(z.object({ name: z.string() }))
      .view((props) => React.createElement("a"));

    expect(template).toBeDefined();
    expect(template.schema.Props).toBeDefined();
  });
});
