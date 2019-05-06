/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({body, styles, title, state}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="/styles.css">
      ${styles}
    </head>
    <body style="margin:0">
      <div id="root">${body}</div>
   
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
      </script>
        <script src="/client.js"></script>
    </body>
  </html>
`;

export default Html;