const html = String.raw;

const indexHtml = html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link
        rel="shortcut icon"
        href="https://relay.dev/img/favicon.png"
        type="image/png"
      />
      <title>Relay Defer and Stream</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          outline: 0;
          box-sizing: border-box;
        }

        *:focus {
          outline: 0;
        }

        html,
        body,
        #root {
          min-height: 100vh;
        }

        body {
          -webkit-font-smoothing: antialiased;
        }

        button {
          background: none;
          border: 0;
          cursor: pointer;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        body,
        input,
        textarea,
        button {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 400;
        }
      </style>
    </head>

    <body>
      <div id="root"></div>
    </body>
  </html>
`;

module.exports = indexHtml;
