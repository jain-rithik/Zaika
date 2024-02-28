const { render, screen } = require("@testing-library/react")
const { default: About } = require("../About")
import "@testing-library/jest-dom";

test("should load about component", () => {
    //Render
    render(<About/>);
    //Query
    const heading = screen.getByRole("heading", { name: /More About this project/i });
    //Assert
    expect(heading).toBeInTheDocument();
})

test("should find a question", () => {
    render(<About/>);

    const question = screen.getByText("How is data fetched in Zaika?");

    expect(question).toBeInTheDocument();
})

test("should load 7 headings", () => {
    render(<About/>);

    const headings = screen.getAllByRole("heading");

    expect(headings.length).toBe(7);
})