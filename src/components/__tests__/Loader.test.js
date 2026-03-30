import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader Component", () => {
  test("renders loader text", () => {
    render(<Loader />);

    expect(screen.getByText("AI is typing...")).toBeInTheDocument();
  });

  test("has correct class name", () => {
    render(<Loader />);

    const loaderElement = screen.getByText("AI is typing...");
    expect(loaderElement).toHaveClass("loader");
  });
});