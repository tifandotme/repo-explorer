/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
    typedEnv: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default config;
