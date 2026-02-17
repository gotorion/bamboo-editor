import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  it("renders editor", () => {
    render(<App />);

    expect(screen.getByLabelText("Editor")).toBeInTheDocument();
  });

  it("updates editor value as user types", async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByLabelText("Editor");
    await user.clear(textarea);
    await user.type(textarea, "# 标题");

    expect(textarea).toHaveValue("# 标题");
  });

  it("applies selected font family", async () => {
    const user = userEvent.setup();
    render(<App />);

    const select = screen.getByLabelText("Font family");
    await user.selectOptions(select, "Fira Code");

    const wrapper = screen.getByTestId("editor-wrapper");
    expect(wrapper).toHaveStyle({ fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, monospace' });
  });
});
