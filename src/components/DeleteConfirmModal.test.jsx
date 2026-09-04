import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// The store pulls in axios, which ships ESM that CRA's jest config does not
// transform. The modal only reads `theme` from it.
jest.mock("../store/authStore", () => ({
  __esModule: true,
  default: () => ({ theme: "light" }),
}));

// eslint-disable-next-line import/first
import DeleteConfirmModal, { DELETE_PASSCODE } from "./DeleteConfirmModal";

const setup = () => {
  const onConfirm = jest.fn();
  const onHide = jest.fn();
  render(
    <DeleteConfirmModal show onHide={onHide} onConfirm={onConfirm} />
  );
  return { onConfirm, onHide };
};

const type = (value) =>
  fireEvent.change(screen.getByLabelText(/delete password/i), {
    target: { value },
  });

test("does not delete when the passcode is wrong", () => {
  const { onConfirm } = setup();
  type("wrong");
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));

  expect(onConfirm).not.toHaveBeenCalled();
  expect(screen.getByText(/incorrect password/i)).toBeInTheDocument();
});

test("deletes when the passcode is correct", () => {
  const { onConfirm } = setup();
  type(DELETE_PASSCODE);
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));

  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test("an empty passcode cannot be submitted", () => {
  const { onConfirm } = setup();
  expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));
  expect(onConfirm).not.toHaveBeenCalled();
});

test("cancel closes without deleting", () => {
  const { onConfirm, onHide } = setup();
  type(DELETE_PASSCODE);
  fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

  expect(onConfirm).not.toHaveBeenCalled();
  expect(onHide).toHaveBeenCalled();
});
