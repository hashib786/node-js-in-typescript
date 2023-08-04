import http from "node:http";
import fs from "node:fs";
import { join } from "node:path";

// console.log("first");
// const hello: string = "Hello";
// console.log(hello);
// const filePath = join(__dirname, "../txt/input.txt");
// console.log(process.cwd());
// console.log(filePath);
// console.log("cwr", process.cwd() + "/txt/input.txt");
// console.log(fs.readFileSync(process.cwd() + "/txt/input.txt", "utf-8"));
// console.log(process);
// console.log(path.join.toString());

// console.log(fs.readFileSync("../txt/input.txt", "utf8"));

// Using Asycronus way
// const pathName = join(process.cwd(), "/txt/input.txt");

// const readingFIleFunc = (
//   err: NodeJS.ErrnoException | null,
//   data: string
// ): void => {
//   if (err) return console.log("Error reading input file", err);
//   console.log(data);
// };

// fs.readFile(pathName, "utf-8", readingFIleFunc);
// fs.unlink(join(process.cwd(), "/txt/final.txt"), (err) => {
//   console.log(err);
// });

// fs.exists(join(process.cwd(), "/txt/final.txt"), (exist) => {
//   console.log(exist);
// });
// fs.readFile(
//   join(process.cwd(), "/dev-data/data.json"),
//   "utf-8",
//   (err, data) => {
//     err ? console.log(err) : console.log(data);
//   }
// );

//  For creating Basic Server
const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    let URL: string = req.url!;
    URL = URL.substring(1, URL.length);
    res.writeHead(200, "Hello World Hashib", {
      "Content-Type": "text/html",
    });
    // console.log(req);
    // res.end(`
    // <h1>Hello Saba</h1>
    // <script>console.log("req")</script>
    // `);

    if (URL === "api") {
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
      res.end(`
      <h1>Hello Saba</h1>
      <script>console.log("req")</script>
      `);
    }

    // Overview page
    // if (pathname === '/' || pathname === '/overview') {
    //   res.writeHead(200, {
    //     'Content-type': 'text/html'
    //   });

    //   const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    //   const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    //   res.end(output);

    //   // Product page
    // } else if (pathname === '/product') {
    //   res.writeHead(200, {
    //     'Content-type': 'text/html'
    //   });
    //   const product = dataObj[query.id];
    //   const output = replaceTemplate(tempProduct, product);
    //   res.end(output);

    //   // API
    // } else if (pathname === '/api') {
    //   res.writeHead(200, {
    //     'Content-type': 'application/json'
    //   });
    //   res.end(data);

    //   // Not found
    // } else {
    //   res.writeHead(404, {
    //     'Content-type': 'text/html',
    //     'my-own-header': 'hello-world'
    //   });
    //   res.end('<h1>Page not found!</h1>');
    // }
  }
);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
