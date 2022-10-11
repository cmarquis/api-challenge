import { pageData, reference, result } from "../models";
import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import puppeteer from "puppeteer";

const cache = new NodeCache();

export const getWebData = async (ref: reference) => {
  const browser = await puppeteer.launch({
    headless: true, timeout: 30000
  });
  const page = await browser.newPage();
  await page.goto(ref.url);
  const meta = await page.evaluate(() => Array.from(document.querySelectorAll('meta'), (e) => { return { name: e.name, content: e.content } }))

  const pd: pageData = {
    title: await page.title(),
    meta,
  }

  await browser.close();

  const res: result = {
    id: uuidv4(),
    referenceId: ref.id,
    data: pd,
    createdAt: moment().unix(),
  }
  cache.set(ref.id, res);
}

export const getWebResult = async (id: string): Promise<result | undefined> => {
  return await cache.get(id);
}