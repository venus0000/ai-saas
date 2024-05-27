import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { SocksProxyAgent } from 'socks-proxy-agent'; // Import SocksProxyAgent

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  baseOptions: {
              httpsAgent: new SocksProxyAgent("socks5://14ad233e7a90f:ce8df0589a@216.75.159.170:12324"),
          }
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    // const { userId } = getAuth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();
    // if (!freeTrial && !isPro) {
    //   return new NextResponse(
    //     "Free trial has expired. Please upgrade to pro.",
    //     { status: 403 }
    //   );
    // }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
