# Netlify Analytics Script

Get data from the undocumented Netlify Analytics API and save it as a csv-file.

Currently fetches pageviews and visitors for the previous 30 days.

## Usage

1. Figure out your `page_id` and your `bearer token`. (network tab is your friend here)
2. Copy `.env-example` and rename it to `.env`
3. Insert the `page_id` and `bearer token` to correct places in the `.env`-file.
4. `npm install`
5. `node script.js`
6. Check `data`-directory for the data

## Disclaimer

This is in no way a Netlify product or feature. This is just me hacking away.

## License

MIT (c) Juho Salli 2021
