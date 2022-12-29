import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import OfferForm from "../OfferForm";
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { myProp: "myValue" },
  }),
}));
describe("render display invitations", () => {
  it("renders a heading", () => {
    render(<OfferForm />);

    const heading = screen.getByRole("description");
    const description = screen.getByText("Description");
    const price = screen.getByText("Price");
    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
