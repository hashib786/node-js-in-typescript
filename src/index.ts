import fs from "node:fs";
import { join } from "node:path";

console.log("first");
const hello: string = "Hello";
console.log(hello);
const filePath = join(__dirname, "../txt/input.txt");
console.log(process.cwd());
console.log(filePath);
console.log("cwr", process.cwd() + "/txt/input.txt");
console.log(fs.readFileSync(process.cwd() + "/txt/input.txt", "utf-8"));
// console.log(process);
// console.log(path.join.toString());

// console.log(fs.readFileSync("../txt/input.txt", "utf8"));
