export const withTemplate = (body: string): string => `
  <div style="
    padding: 20px;
    border: 1px solid black;
    line-height: 2;
    font-family: sans-serif;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${body}</p>
  </div>
`;
