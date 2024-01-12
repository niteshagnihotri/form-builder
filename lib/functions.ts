import { Parser } from "expr-eval";

export const evaluateExpression = (data: any, rule: any) => {
  const { op, value } = rule;

  const expression = `"${data}" ${op} "${value}"`;

  const parser = new Parser();
  if (expression) {
    let result = parser.parse(expression).evaluate();
    return result;
  }
  return false;
};

export const getErrorMessage = (inputName: any, errors: any) => {
  let keys = inputName.split(".");
  let value = errors;

  for (const key of keys) {
    value = value[key];
    if (!value) {
      break;
    }
  }

  if (value?.message) {
    return value?.message;
  }

  return null;
};
