import { Agentica } from "@agentica/core";
import typia from "typia";
import dotenv from "dotenv";
import { OpenAI } from "openai";

import { GoogleImageService } from "@wrtnlabs/connector-google-image";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "GoogleImage Connector",
      protocol: "class",
      application: typia.llm.application<GoogleImageService, "chatgpt">(),
      execute: new GoogleImageService({
        apiKey: process.env.SERP_API_KEY!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("Search for cute cat images."));
};

main();
