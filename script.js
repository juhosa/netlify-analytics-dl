import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

const TOKEN = process.env.NTL_BEARER_TOKEN;
const PAGE_ID = process.env.NTL_PAGE_ID;

const baseUrl = `https://analytics.services.netlify.com/v2/${PAGE_ID}`;

const getData = async (from, to, type, resolution = "day") => {
  const pageViewsUrl = `${baseUrl}/${type}?from=${from}&to=${to}&timezone=%2B0200&resolution=${resolution}`;

  let response = await fetch(pageViewsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const data = await response.json();
  return data.data;
};

const processData = (data) => {
  // change the epoch timestamp to some more readable
  let new_data = data.map((d) => {
    let [epoch, count] = d;
    const date = new Date(epoch);
    return [date.toISOString(), count];
  });

  return new_data;
};

const writeFile = (data, type) => {
  let csv = "date,count\r\n";
  for (let row of data) {
    csv += row.join(",") + "\r\n";
  }

  fs.writeFileSync(`data/${type}-data.csv`, csv);
};

// from 30 days ago to today
// because it looks you can't query longer time periods
// from the API (atleast pageviews)
const today = new Date();
const to = today.getTime();
const from = today.setTime(today.getDate() - 30);

const types = ["visitors", "pageviews"];

for (let type of types) {
  console.log(`Working on ${type}`);
  const visitors = await getData(from, to, type);

  const processed_data = processData(visitors);

  writeFile(processed_data, type);
}
