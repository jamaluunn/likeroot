import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Facttest";

export default async function handler(req: VercelRequest, res: VercelResponse) {




    if (req.method === 'GET') {
        const data = {
            name: "Like Saver",
            icon: "Shield",
            description: "Check to see if you have \"Liked\" this account today",
            aboutUrl: "https://x.com/pnizo",
            action: {
              type: "post",
              url: ADD_URL,
            },
          };
          return res.json(data);
    }
    else {
        //const url = "https://warpcast.com/pnizo.eth/0x3321413d"

        const body = await req['body']['untrustedData'];
        const castId = body['castId']
        const fid = castId['fid'];
        const hash = castId['hash'];

        const cast = await client.lookUpCastByHashOrWarpcastUrl(hash, CastParamType.Hash);

        console.log(cast);
    
        const reactions = cast['cast']['reactions'];
        const likes = reactions['likes'];
        
        var msg = '';

        likes.forEach((like) => { 
            msg += like['fname'] + ' ';
        })
        
        const data = {
            message: msg.substring(0, 29)
        }
    
        return res.json(data);
    }
}