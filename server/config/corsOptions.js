const allowedOrigin = ["http://localhost:5173", "https://yourdomain.com"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
module.exports = corsOptions;
