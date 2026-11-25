import { chromium } from 'playwright';

const base='http://127.0.0.1:5173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'no-preference'});
let count=0;
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const check=async(name,fn)=>{
 try { await fn(); count++; console.log('PASS '+name);}
 catch(e){ console.error('FAIL '+name+'\n'+(e?.stack??e));throw e; }
};
try{
 await check('Home renders animated hero and brewing control',async()=>{
   await page.goto(base+'/',{waitUntil:'domcontentloaded'});
   await page.getByRole('heading',{name:/COFFEE HOUSE/i}).first().waitFor();
   const brew=page.getByRole('button',{name:'Play brewing animation'});
   await brew.scrollIntoViewIfNeeded(); await brew.click();
   await page.waitForFunction(()=>Number(document.querySelector('.m56-brew-progress')?.getAttribute('aria-valuenow')??0)>4,{timeout:4500});
   await page.getByRole('button',{name:/Pause brewing animation/}).click();
   await page.getByRole('button',{name:/Reset/}).click();
 });
 await check('Menu link reaches menu content after page transition',async()=>{
   await page.getByRole('button',{name:/EXPLORE THE FULL MENU/}).click();
   await page.waitForURL(/\/cafe#menu/,{timeout:10000});
   await page.locator('#menu').waitFor();
   await page.waitForFunction(()=>window.scrollY>250,{timeout:4000});
 });
 await check('Shop, variant cart and demo checkout',async()=>{
   await page.goto(base+'/coffee/ethiopia',{waitUntil:'domcontentloaded'});
   await page.getByRole('button',{name:/Add to bag ·/}).first().click();
   await page.getByRole('button',{name:/View bag/i}).click();
   await page.getByRole('button',{name:/Preview checkout/i}).click();
   await page.waitForURL(/\/checkout/);
   await page.getByRole('checkbox',{name:/I understand this is a simulated checkout/}).check();
   await page.getByRole('button',{name:/Complete demo checkout/}).click();
   await page.waitForURL(/\/order-success/);
   await page.getByRole('heading',{name:/great taste/i}).waitFor();
 });
 await check('Story photo reel opens and supports keyboard navigation',async()=>{
   await page.goto(base+'/',{waitUntil:'domcontentloaded'});
   await page.getByRole('button',{name:/PLAY THE STORY/}).click();
   const dialog=page.getByRole('dialog',{name:/Interactive three-part/});
   await dialog.waitFor();
   await page.getByRole('button',{name:'Next photo'}).click();
   await dialog.getByText('The slow pour.').waitFor();
   await page.keyboard.press('Escape');
   await dialog.waitFor({state:'hidden'});
 });
 await check('Mobile navigation and FAQ',async()=>{
   await page.setViewportSize({width:390,height:844});
   await page.goto(base+'/',{waitUntil:'domcontentloaded'});
   await page.getByRole('button',{name:'Open menu'}).click();
   const mobile=page.getByRole('dialog',{name:'Mobile navigation'});
   await mobile.waitFor();
   await mobile.getByRole('link',{name:/Coffee/}).first().click();
   await page.waitForURL(/\/coffee$/);
   await page.goto(base+'/faq',{waitUntil:'domcontentloaded'});
   await page.getByRole('searchbox',{name:/Search frequently asked questions/}).fill('real order');
   await page.getByText(/Can I place and pay for a real order?/).waitFor();
 });
 if(errors.length)throw Error('Browser page errors: '+errors.join('; '));
 console.log('ALL '+count+' BROWSER INTERACTION CHECKS PASSED');
} finally { await browser.close(); }
