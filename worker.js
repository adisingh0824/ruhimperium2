// Trigger build update 2
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Serve static assets using the built-in ASSETS binding
    return env.ASSETS.fetch(request);
  }
};
