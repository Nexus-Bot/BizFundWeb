import * as React from "react";
import { render } from "@testing-library/react";
import { expect } from "chai";
import App from "../App/Layout/App";

describe("<App>", () => {
    test("renders learn react link", () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/learn react/i);
        expect(document.body.contains(linkElement));
    });
});
