import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless:true, args:['--no-sandbox'] });
const page = await browser.newPage({viewport:{width:1366,height:900},reducedMotion:'no-preference'});
const pageErrors = [];
page.on('pageerror', error => pageErrors.push(error.message));
let passed=0;
const check=async(name,fn)=>{try{await fn();console.log('PASS '+name);passed++;}catch(e){console.error('FAIL '+name+'\n'+e);throw e;}};
try{
 await check('New editorial homepage shows two distinct slides and motion control',async()=>{
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.locator('.m57-hero h1').waitFor();
  await page.getByRole('button',{name:'Show hero slide 2'}).click();
  await page.locator('[data-hero-slide="1"]').waitFor();
  await page.getByRole('button',{name:'Pause hero slideshow'}).click();
  await page.getByRole('button',{name:'Turn off animations'}).click();
  await page.getByRole('button',{name:'Enable animations'}).click();
  await page.getByRole('button',{name:'Pause hero slideshow'}).waitFor();
 });
 await check('Brewing sequence animates and has working pause/replay controls',async()=>{
  await page.locator('#m57-brew').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>Number(document.querySelector('.m57-brew-track')?.getAttribute('aria-valuenow')??0)>5,null,{timeout:6500});
  await page.getByRole('button',{name:'Pause brewing demonstration'}).click();
  const prior=await page.locator('.m57-brew-track').getAttribute('aria-valuenow');
  await page.waitForTimeout(350);
  assert.equal(await page.locator('.m57-brew-track').getAttribute('aria-valuenow'),prior,'Pause should freeze progress');
  await page.getByRole('button',{name:/Restart/}).click();
  await page.waitForFunction(()=>Number(document.querySelector('.m57-brew-track')?.getAttribute('aria-valuenow')??0)>2,null,{timeout:3300});
 });
 await check('Drink photos match individual items and café navigation works',async()=>{
  assert.equal(await page.locator('.m57-drink-card img').count(),3);
  const photos=await page.locator('.m57-drink-card img').evaluateAll(els=>els.map(el=>el.getAttribute('src')));
  assert.equal(new Set(photos).size,3,'Distinct drinks need distinct media');
  await page.locator('.m57-drink-card').nth(1).click();
  await page.getByText('Let the coffee take its time.').waitFor();
  await page.getByRole('button',{name:/See the café menu/}).click();
  await page.waitForURL(/\/cafe#menu/,{timeout:10000});
  await page.locator('#menu').waitFor();
  await page.waitForFunction(()=>window.scrollY>250,null,{timeout:5000});
 });
 await check('Product galleries contain three relevant distinct images for each origin',async()=>{
  for(const [id,slug] of [['ethiopia','daybreak'],['colombia','golden-hour'],['guatemala','afterglow']]){
   await page.goto(base+'/coffee/'+id,{waitUntil:'domcontentloaded'});
   await page.getByRole('button',{name:/Show photo 2/}).click();
   await page.waitForFunction(slug=>document.querySelector('.v52-photo-zoom img')?.getAttribute('src')==='/images/'+slug+'-beans.svg',slug,{timeout:4000});
   await page.getByRole('button',{name:/Show photo 3/}).click();
   await page.waitForFunction(slug=>document.querySelector('.v52-photo-zoom img')?.getAttribute('src')==='/images/'+slug+'-notes.svg',slug,{timeout:4000});
   const missing=await page.evaluate(async slug=>{
     const urls=['/images/'+slug+'-beans.svg','/images/'+slug+'-notes.svg'];
     return (await Promise.all(urls.map(async u=>({u,status:(await fetch(u)).status})))).filter(x=>x.status!==200);
   },slug);
   assert.deepEqual(missing,[]);
  }
 });
 await check('Cart and simulated checkout still complete successfully',async()=>{
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
 await check('Mobile menu and FAQ function at narrow viewport',async()=>{
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
 if(pageErrors.length)throw Error('Unhandled page errors: '+pageErrors.join('; '));
 await page.setViewportSize({width:1440,height:900});
 await page.goto(base+'/',{waitUntil:'domcontentloaded'});
 await page.locator('.m57-hero').waitFor();
 await page.waitForTimeout(850);
 await (await import('node:fs/promises')).mkdir('test-results',{recursive:true});
 await page.screenshot({path:'test-results/morrow-desktop.png',fullPage:true,animations:'disabled'});
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/',{waitUntil:'domcontentloaded'});
 await page.locator('.m57-hero').waitFor();
 await page.screenshot({path:'test-results/morrow-mobile.png',fullPage:true,animations:'disabled'});
 console.log('ALL '+passed+' EDITORIAL FRONTEND BROWSER CHECKS PASSED');
}finally{await browser.close();}
