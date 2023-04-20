import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card component", () => {
  test("renders Card component with title and children", () => {
    render(<Card title="My Title" icon="my-icon" />);
    const titleElement = screen.getByText(/My Title/i);
    const iconElement = screen.getByAltText(/logo/i);
    expect(titleElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test("renders Card component with children", () => {
    render(
      <Card title="My Title" icon="my-icon">
        <p>My Children</p>
      </Card>
    );
    const childrenElement = screen.getByText(/My Children/i);
    expect(childrenElement).toBeInTheDocument();
  });
  
  test("renders Card component without children", () => {
    render(<Card title="My Title" icon="my-icon" />);
    const childrenElement = screen.queryByText(/My Children/i);
    expect(childrenElement).not.toBeInTheDocument();
  });
  
});

