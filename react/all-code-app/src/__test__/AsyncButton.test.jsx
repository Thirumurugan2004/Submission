import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AsyncButton from "../Buttons/AsyncButton";

global.fetch = jest.fn();

describe("AsyncButton GREEN Tests", () => {
  test("renders async button", () => {
    render(<AsyncButton />);
    expect(screen.getByTestId("async-btn")).toBeInTheDocument();
  });

  test("async logic fully tested", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: "OK" })
    });

    render(<AsyncButton />);
    fireEvent.click(screen.getByTestId("async-btn"));

    await waitFor(() =>
      expect(screen.getByTestId("async-result")).toHaveTextContent("Async: OK")
    );
  });
});


// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import AsyncButton from "../Buttons/AsyncButton";

// describe("AsyncButton Tests", () => {
//   test("renders async button", () => {
//     render(<AsyncButton />);
//     expect(screen.getByTestId("async-btn")).toBeInTheDocument();
//   });

//   test("async button clicked", () => {
//     const mockFn = jest.fn();

//     // Override existing onClick without modifying component
//     render(<button data-testid="async-btn" onClick={mockFn}>Async Await Button</button>);

//     fireEvent.click(screen.getByTestId("async-btn"));

//     expect(mockFn).toHaveBeenCalled();
//   });
// });





