const puppeteer = require('puppeteer');
const fs = require("fs");

// let data = require("./db/stack.json");
let inf = [];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // await page.setViewport({
  //   width: 1440,
  //   height: 1072,
  //   deviceScaleFactor: 1,
  // });
  
  for(let i = 1; i <= 1000; i++){
    await page.goto(`https://api.stackexchange.com/2.2/users?page=${i}&order=desc&sort=reputation&site=stackoverflow&key=U4DMV*8nvpm3EOpvf69Rxw((`);
    let data =  await page.evaluate(() => {
      if(!!document.querySelector('pre') == false){

      } else {
      let text = JSON.parse(document.querySelector('pre').textContent);
      let divs = text.items;
      let datas = []
      divs.forEach(div => {
        let location = (div.location);
        if(location == false || location == undefined){
  
        } else{
          location = location.toLowerCase()
          if(location.includes('ukraine') || location.includes('kiev') || location.includes('киев') || location.includes('russia') || location.includes('киев') || location.includes('bilorus') || location.includes('kazakhstan') || location.includes('россия') || location.includes('moldova')){
            let link = div.link;
            // location.push

            datas.push({link, location}) 
          }
        }
        
        
      });
      
  
      return datas
    }
    })
    if(data != undefined){
      if(data[0]){
        inf.push(data);
      }
    }
    
    
  }
  console.log(inf)
  // inf = JSON.parse(inf)


  await browser.close();

  fs.appendFile("./db/stack.json", JSON.stringify(inf), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  console.log("insert")
})();

  

// https://api.stackexchange.com/2.2/users?page=103&order=desc&sort=reputation&site=stackoverflow