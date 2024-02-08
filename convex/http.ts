import { httpRouter } from "convex/server";

// import { linkedInOAuth } from "./oauth";

const http = httpRouter();

// http.route({
//   path: "/api/oauth/linkedin",
//   method: "GET",
//   handler: linkedInOAuth,
// });

// Define additional routes
// http.route({
//   path: "/getMessagesByAuthor",
//   method: "GET",
//   handler: getByAuthor,
// });

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
