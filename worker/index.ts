import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

type HandlerEnvironment = NonNullable<Parameters<typeof handler.fetch>[1]>;
type HandlerContext = Parameters<typeof handler.fetch>[2];

interface ImagePipelineResult {
  response(): Response;
}

interface ImagePipeline {
  transform(options: { width?: number }): ImagePipeline;
  output(options: {
    format: string;
    quality: number;
  }): Promise<ImagePipelineResult>;
}

type WorkerEnvironment = HandlerEnvironment & {
  ASSETS: {
    fetch(request: Request): Promise<Response> | Response;
  };
  IMAGES: {
    input(body: ReadableStream): ImagePipeline;
  };
};

const worker = {
  async fetch(
    request: Request,
    env: WorkerEnvironment,
    ctx: HandlerContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        request,
        {
          fetchAsset: async (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
