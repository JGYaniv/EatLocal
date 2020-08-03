const puppeteer = require('puppeteer')
const fs = require('fs')

async function getLinks(){
    const data = {}
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('werk it')

    await page.goto(`https://www.localharvest.org/search.jsp?m&lat=37.11073&lon=-97.44299&scale=1&p=1`);
    page.$$eval('.membercell a:first-child', anchor => {
        data[anchor.textContent] = anchor.href;
    })


    // fs.writeFile('links.json', JSON.stringify(data), (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // })

    browser.close()
        .catch(e => console.log(e))
        
    return data;
}

getLinks()
    .catch(e => console.log(e))
