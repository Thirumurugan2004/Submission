import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PopupManager from "../Popup/PopupManager";

// Correct CSS mock path:
jest.mock('../Popup/Popup.css', () => ({}));

describe("PopupManager Component Tests", () => {
  test("renders all 3 buttons", () => {
    render(<PopupManager />);
    expect(screen.getByText(/Open Popup 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Popup 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Popup 3/i)).toBeInTheDocument();
  });

  test("button click opens Popup 1 and increments count", () => {
    render(<PopupManager />);
    const btn1 = screen.getByText(/Open Popup 1/i);
    fireEvent.click(btn1);

    expect(screen.getByText(/Popup 1 opened 1 time/i)).toBeInTheDocument();
    expect(screen.getByText(/This is Popup 1 content/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Popup 1 \(1\)/i)).toBeInTheDocument();
  });

  test("close button hides popup", () => {
    render(<PopupManager />);
    const btn1 = screen.getByText(/Open Popup 1/i);
    fireEvent.click(btn1);

    const closeBtn = screen.getByText(/Close/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByText(/Popup 1 opened/i)).not.toBeInTheDocument();
  });
});
