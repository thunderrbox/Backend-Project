import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));//*use for url type of data and it will parse the data and make it available in req.body, and we are also setting the limit for the request body to 16kb to prevent large payloads from being sent to the server, which can help protect against denial of service attacks and improve performance.

app.use(express.static("public"));
app.use(cookieParser());




export { app };

    



    
    
    










    



// * for middleware we are using app.use always like : for `CORS` we will use ----> app.use(cors()) and for `body-parser` we will use ----> app.use(bodyParser.json()) and for `morgan` we will use ----> app.use(morgan("dev")) and so on, this is a common pattern in Express.js applications to use middleware for handling various aspects of the request-response cycle, such as parsing request bodies, logging requests, handling CORS, and so on. We can also create our own custom middleware for handling specific tasks in our application.