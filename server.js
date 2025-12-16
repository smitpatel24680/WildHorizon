import http, { get } from "node:http";
import { getDataFromDB } from "./db.js";
import { sendJSONResponse } from "./sendJSONResponse.js";
import { getDataByPathParams } from "./getDataByPathParams.js";
import { getDataByQueryParams } from "./getDataByQueryParams.js";


const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  const queryObj = Object.fromEntries(urlObj.searchParams.entries());

  console.log("Query Object:", queryObj);

  if (req.method === "GET" && urlObj.pathname === "/api") {
    let filteredData = getDataByQueryParams(destinations, queryObj);

    sendJSONResponse(res, 200, filteredData);
  } else if (req.method === "GET" && req.url.startsWith("/api/continent")) {
    const continent = req.url.split("/").pop();
    const filteredData = getDataByPathParams(destinations, "continent", continent);
    sendJSONResponse(res, 200, filteredData);
  } else if (req.method === "GET" && req.url.startsWith("/api/country")) {
    const country = req.url.split("/").pop();
    const filteredData = getDataByPathParams(destinations, "country", country);
    sendJSONResponse(res, 200, filteredData);
  } else {
    sendJSONResponse(res, 404, {
      error: "something fishy",
      message: "Route not found",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// console.log(req.url);
// res.write(`Thus far and no further!\\n`);
// res.write(`You shall not pass!\\n`);
// res.end();

// res.end("Hello from Wild Horizon server!!!!", "utf8", () => {

//     console.log(`Response sent to ${req.socket.remoteAddress}`);
// });
