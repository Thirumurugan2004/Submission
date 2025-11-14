import React from "react";
import { render, screen } from "@testing-library/react";
import TimeoutButton from "../Buttons/TimeoutButton";

describe("TimeoutButton RED Tests", () => {
  test("renders timeout button only", () => {
    render(<TimeoutButton />);
    expect(screen.getByTestId("timeout-btn")).toBeInTheDocument();
  });
});


// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import TimeoutButton from "../Buttons/TimeoutButton";

// describe("TimeoutButton Tests", () => {
//   test("renders timeout button", () => {
//     render(<TimeoutButton />);
//     expect(screen.getByTestId("timeout-btn")).toBeInTheDocument();
//   });

//   test("timeout button clicked", () => {
//     const mockFn = jest.fn();

//     render(
//       <button data-testid="timeout-btn" onClick={mockFn}>
//         SetTimeout Button
//       </button>
//     );

//     fireEvent.click(screen.getByTestId("timeout-btn"));

//     expect(mockFn).toHaveBeenCalled();
//   });
// });





