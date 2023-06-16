import fs from "fs-extra";
import csv from "csv-parser";

const results = [];

const fill_results = new Promise((resolve, reject) => {
  fs.createReadStream("./sample.csv")
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => console.log(results));
  setTimeout(() => resolve(results), 300);
});

(async () => {
  await fill_results;
  console.log(results.length);
})();
