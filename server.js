const http = require("http");
const url = require("url");
const axios = require("axios");

require("dotenv").config();

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  // Handle potential errors
  req.on("error", (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });

  res.on("error", (err) => {
    console.error(err);
  });

  // Set CORS policies
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://auth.getgitmelocalhost.com:3000"
  );

  const { query, pathname } = url.parse(req.url, true);

  if (pathname == "/auth" && req.method == "GET") {
    const { code, client_id } = query;

    if (!code || !client_id) {
      console.error("did not have either code or client_id");
      res.statusCode = 400;
      res.end();
    }

    // POST request
    axios
      .post(
        "https://github.com/login/oauth/access_token",
        {
          client_id,
          code,
          client_secret: process.env.CLIENT_SECRET,
        },
        { headers: { Accept: "application/json" } }
      )
      .then((axiosResponse) => {
        const data = axiosResponse.data;

        // TODO: Error check if code is expired

        res.statusCode = 200;
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    res.statusCode = 400;
    res.end();
  }
});

server.listen(port, (err) => {
  if (err) {
    console.error("Something went wrong with starting up server", err);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});
