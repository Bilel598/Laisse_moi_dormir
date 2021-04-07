const scraperObject = {
  url: 'http://aurion.yncrea.fr',
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'fr'
    });
    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    });
    await page.goto(this.url);
    await page.type('#username', 'bilel.reziki');
    await page.type('#password', '@SOIR664');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    const myScheduleBtn = await page.$x("//*[contains(text(), 'Mon Planning')]");
    if (myScheduleBtn.length > 0) {
      await myScheduleBtn[0].click();
    } else {
      throw new Error("My Schedule button not found");
    }

    await page.waitForTimeout(5000);
    await page.click(".fc-agendaDay-button");
    await page.waitForTimeout(5000);
    await page.click(".fc-today-button");
    await page.waitForTimeout(5000);
    const result = await page.evaluate(() => {
      return document.querySelector('.fc-title').innerText
    });
    let matiere = result.split("\n")[1];
    console.log(`T'as cours de ${matiere}, je me connecte sur le teams sale fainéant`);

    await page.goto("https://teams.microsoft.com/_#/school//?ctx=teamsGrid");
    await page.waitFor('input[type=email]', { visible: true })
    await page.type('input[type=email]', "bilel.reziki@student.yncrea.fr")
    await page.click('input[type=submit]')
    await page.waitForTimeout(2000)

    await page.waitFor('input[type=password]', { visible: true })
    await page.type('input[type=password]', "@SOIR664")
    await page.click('input[type=submit]')
    await page.waitForTimeout(2000)
    await page.click('input[type=button]')
    await page.waitForTimeout(30000)

    const string = "//div[@class='team-name']/h1[contains(., '" + matiere + "')]"
    const [team] = await page.$x(string);
    if (team) {
      await team.click();
    } else {
      console.log('Equipe non trouve')
    }
    await page.waitForTimeout(2000);
    const [join] = await page.$x("//span[contains(., 'Rejoindre')]");
    if (join) {
      await join.click();
    } else {
      console.log("Impossible de rejoindre!")
    }
    await page.waitForTimeout(1500);
    const [button] = await page.$x("//button[contains(., 'Rejoindre')]");
    if (button) {
      await button.click();
    }

  }
}

module.exports = scraperObject;