// const dotenv = require("dotenv");
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const TOKEN = process.env.NTL_BEARER_TOKEN;
const PAGE_ID = process.env.NTL_PAGE_ID;

const baseUrl = `https://analytics.services.netlify.com/v2/${PAGE_ID}`;

const getPageViews = async () => {
  let from = "1633381200000";
  let to = "1636006082559";

  const pageViewsUrl = `${baseUrl}/visitors?from=${from}&to=${to}&timezone=%2B0200&resolution=day`;

  let response = await fetch(pageViewsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const data = await response.json();
  console.log(data);
};

getPageViews();
