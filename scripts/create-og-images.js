// Need `npm run dev` so localhost works
const puppeteer = require("puppeteer") // Require Puppeteer module
const fs = require("fs")

let slugs = fs
	.readdirSync("src/pages/papers/", (err, files) => {
		return files
	})
	.filter((file) => file.match(/\.mdx/))
	.map((file) => file.replace(/\.mdx/, ""))

const Generate = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
  await page.setViewport({
    width: 1024,
    height: 1024,
    deviceScaleFactor: 2,
  });

  // Papers
  for(let i = 0; i < slugs.length; i++) {
    let slug = slugs[i]
    const url =
      `http://localhost:3000/og-images/paper/${slug}`
    console.log(slug)

    await page.goto(url)
    await page.waitForSelector("#og-image")
    const ogImage = await page.$("#og-image")
    await ogImage.screenshot({
      path: `public/og-images/${slug}.png`,
    })
  }

  // Default 
  const url =
  `http://localhost:3000/og-images/default`
  await page.goto(url)
  await page.waitForSelector("#og-image")
  const ogImage = await page.$("#og-image")
  await ogImage.screenshot({
    path: `public/og-images/default.png`,
  })

  await page.close()
  await browser.close()
}
Generate()
