import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { reference } from "../models";
import { getWebData, getWebResult } from "../services";
import moment from "moment";

export interface TypedRequestBody<T> extends Request {
  body: T
}

export const getReference = async (req: TypedRequestBody<{ url: string }>, res: Response) => {
  // construct reference object
  let ref: reference = {
    id: uuidv4(),
    url: req.body.url,
    createdAt: moment().unix(),
  };
  // submit async task to getWebData function
  getWebData(ref);
  // return reference from endpoint
  res.json(ref);
}

export const getResult = async (req: Request, res: Response) => {
  let webRes = await getWebResult(req.params.referenceId);
  if (webRes) {
    res.json(webRes);
  } else {
    res.status(500);
  }
}