// CORS Options


const whiteList = ["*"];
const corsOptions = {
  origin: (origin, callback) => {
     if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Not Allowed"));
  },
  optionSuccessStatus: 200,
};

export default corsOptions;