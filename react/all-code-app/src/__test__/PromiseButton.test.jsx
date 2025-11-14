import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PromiseButton from "../Buttons/PromiseButton";

describe("PromiseButton YELLOW Tests", () => {
  test("renders promise button", () => {
    render(<PromiseButton />);
    expect(screen.getByTestId("promise-btn")).toBeInTheDocument();
  });

  test("promise button clicked only", () => {
    render(<PromiseButton />);
    fireEvent.click(screen.getByTestId("promise-btn"));
  });
});


// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import PromiseButton from "../Buttons/PromiseButton";

// describe("PromiseButton Tests", () => {
//   test("renders promise button", () => {
//     render(<PromiseButton />);
//     expect(screen.getByTestId("promise-btn")).toBeInTheDocument();
//   });

//   test("promise button clicked", () => {
//     const mockFn = jest.fn();

//     render(
//       <button data-testid="promise-btn" onClick={mockFn}>
//         Promise Button
//       </button>
//     );

//     fireEvent.click(screen.getByTestId("promise-btn"));

//     expect(mockFn).toHaveBeenCalled();
//   });
// });



