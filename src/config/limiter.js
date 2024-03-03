
import { rateLimit } from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: "You have exceeded your requests per minute limit.",
  });

  export default limiter;