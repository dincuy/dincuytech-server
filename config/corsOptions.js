const allowedOrigins = ['https://dincuy.netlify.app', 'http://localhost:5173', 'https://wificuy.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
