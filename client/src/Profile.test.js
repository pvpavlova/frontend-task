import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from "./pages/Profile";
import React from "react";
import * as api from "./api/api";

jest.mock("./api/api");

describe("Profile component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders loading state initially", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders the profile after successful fetch", async () => {
    api.fetchProfile.mockResolvedValue({ data: { fullName: "John Doe" } });

    render(
      <Router>
        <Profile />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument()
    );
  });

  it("fetches and displays a quote when the 'Update' button is clicked", async () => {
    const mockAuthor = { name: "Albert Einstein", id: 1 };
    const mockQuote =
      "Life is like riding a bicycle. To keep your balance you must keep moving.";

    api.fetchAuthor.mockResolvedValue(mockAuthor);
    api.fetchQuote.mockResolvedValue(mockQuote);

    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => screen.getByText("Welcome, John Doe"));

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(screen.getByText(/Albert Einstein/)).toBeInTheDocument();
      expect(
        screen.getByText(/Life is like riding a bicycle/)
      ).toBeInTheDocument();
    });
  });

  it("displays loading spinner while fetching quote", async () => {
    api.fetchAuthor.mockResolvedValue({ name: "Albert Einstein" });

    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => screen.getByText("Welcome, John Doe"));

    fireEvent.click(screen.getByText("Update"));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("cancels the quote fetch request when the 'Cancel' button is clicked", async () => {
    api.fetchAuthor.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Albert Einstein" }), 1000)
        )
    );

    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => screen.getByText("Welcome, John Doe"));

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => screen.getByRole("progressbar"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText(/Albert Einstein/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Life is like riding a bicycle/)
    ).not.toBeInTheDocument();
  });

  it("handles error during fetching quote", async () => {
    api.fetchAuthor.mockRejectedValue(new Error("Network Error"));

    render(
      <Router>
        <Profile />
      </Router>
    );

    await waitFor(() => screen.getByText("Welcome, John Doe"));

    console.log('Before clicking "Update"');

    fireEvent.click(screen.getByText("Update"));

    console.log('After clicking "Update"');

    await waitFor(() => {
      console.log("Waiting for error message...");
      expect(
        screen.getByText("Ошибка при получении цитаты")
      ).toBeInTheDocument();
    });
  });
});
