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
