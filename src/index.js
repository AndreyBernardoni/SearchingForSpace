const puppeteer = require("puppeteer");

const search = "Meteoro";

const list = [];

const url = "https://www.nationalgeographicbrasil.com/search?q=" + search;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const links = await page.$$eval(
    ".css-1m7s89o > .css-1h8y03z > .css-k04jqx > .css-fufwrz > .css-17hfzqr > a",
    (element) => element.map((el) => el.href)
  );
  console.log(links);

  for (const link of links) {
    console.log("Acessei a página");

    await page.goto(link);

    try {
      const title = await page.$eval(
        ".css-1sgbwt8",
        (element) => element.innerText
      );

      const subtitle = await page.$eval(
        ".css-ju6on1",
        (element) => element.innerText
      );

      const obj = { title, subtitle, link };

      list.push(obj);
    } catch (error) {
      console.log("não consegui");
    }
  }

  console.log(list);
  await browser.close();
})();
