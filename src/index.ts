import http from "node:http";
import fs from "node:fs";
import { join } from "node:path";
import url from "node:url";

import { Product } from "./types/types";
import templateFunction from "./module/replaceTemlate";

// Reading HTml Templetes
const Data = fs.readFileSync(
  join(process.cwd(), "/dev-data/data.json"),
  "utf-8"
);

const Overview = fs.readFileSync(
  join(process.cwd(), "/templates/overview.html"),
  "utf-8"
);

const figure = fs.readFileSync(
  join(process.cwd(), "/templates/figure.html"),
  "utf-8"
);

const productHTML = fs.readFileSync(
  join(process.cwd(), "/templates/product.html"),
  "utf-8"
);

const JsonData: Product[] = JSON.parse(Data);
const figureHtml = JsonData.map((ele) => templateFunction(figure, ele));

//  For creating Basic Server
const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    let { pathname, query } = url.parse(req.url!, true);
    console.log(pathname);

    res.writeHead(200, "Hello World Hashib", {
      "Content-Type": "text/html",
    });
    if (pathname === "/product") {
      if (typeof query.id === "string") {
        let idNum = parseInt(query.id);
        if (idNum >= JsonData.length) res.end("<h1> Page not found</h1>");
        else {
          const renderHtml = templateFunction(productHTML, JsonData[idNum]);
          res.end(renderHtml);
        }
      } else res.end("<h1> Page not found</h1>");
    } else if (pathname === "/overview") {
      const overviewPage = Overview.replace(
        "{%PRODUCTOVERVIEW %}",
        figureHtml.join("")
      );
      res.end(overviewPage);
    } else if (pathname === "api") {
      fs.readFile(
        join(process.cwd(), "/dev-data/data.json"),
        "utf-8",
        (err, data) => {
          if (err) res.end(err);
          else {
            const json = JSON.parse(data);
            res.end(`
            <h1>Hello Hashib </h1>
            <script>console.log(${data})</script>
            `);
          }
        }
      );
    } else {
      res.end("<h1> Page not found</h1>");
    }
  }
);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
