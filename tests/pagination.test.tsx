import { test, expect } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";
import Pagination from "../index";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";


type Label = "Next" | "Previous" | number;
describe("Pagination testing", () => {
  function getPage(label: Label) {
    let btn;
    btn = screen.getByText(label);

    fireEvent(
      btn,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: false,
      })
    );
    const current = screen.getByRole("current").textContent;
    return current;
  }

  test("clicking on next button", () => {
    render(
      <MemoryRouter>1
        <Pagination itemsPerPage={2} totalItems={20} />
      </MemoryRouter>
    );
    expect(getPage("Next")).toEqual("2");
    expect(getPage("Next")).toEqual("3");
  });
  test("click on pagination listitem it should set the correct current page", () => {
    render(
      <MemoryRouter>
        <Pagination itemsPerPage={2} totalItems={5} />
      </MemoryRouter>
    );
    const item = screen.getByText("3");
    fireEvent(
      item,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const current = screen.getByRole("current").textContent;
    expect(current).toEqual("3");
  });
  test("click on previous button", () => {
    render(
      <MemoryRouter>
        <Pagination itemsPerPage={2} totalItems={5} />
      </MemoryRouter>
    );

    getPage("Next");
    expect(getPage("Previous")).toEqual("1");
  });
  it("should hide the prev button when the current page is the first page", async () => {
    render(
      <MemoryRouter>
        <Pagination itemsPerPage={2} totalItems={2} />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText("Previous")).not.toBeInTheDocument();
    getPage("Next");
    getPage("Previous");
    expect(screen.queryByLabelText("Previous")).not.toBeInTheDocument();
    getPage(1);
    expect(screen.queryByLabelText("Previous")).not.toBeInTheDocument();
  });
  it("should hide the next button when the current page is the last page", async () => {
    render(
      <MemoryRouter>
        <Pagination itemsPerPage={2} totalItems={2} />
      </MemoryRouter>
    );
    getPage("Next");
    expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
    getPage("Previous");
    getPage("Next");
    expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
    getPage(2)
    expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
  });
  test('rendering a component that uses useLocation', async () => {
    let history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
          <Pagination itemsPerPage={2} totalItems={20} />
        </Router>
      );
    getPage("Next")
    expect(history.location.search).toEqual("?page=2")
    cleanup()
    render(
        <Router location={history.location} navigator={history}>
          <Pagination itemsPerPage={2} totalItems={20} />
        </Router>
      );
    getPage("Next")
    expect(history.location.search).toEqual("?page=3")
    getPage(1)
    cleanup()
    render(
        <Router location={history.location} navigator={history}>
          <Pagination itemsPerPage={2} totalItems={20} />
        </Router>
      );
      expect(history.location.search).toEqual("?page=1")
  })
});
