const { HttpError, BadRequestError } = require("../error");

test("BadRequestError is an instance of HttpError", () => {
  const badRequestError = new BadRequestError("bad request");
  expect(badRequestError instanceof BadRequestError).toBe(true);
  expect((badRequestError instanceof HttpError)).toBe(true);
});