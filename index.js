import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import JobController from "./src/controller/job.controller.js";
import { uploadFile } from "./src/middleware/uploadFile.middleware.js";
import UserController from "./src/controller/user.controller.js";
import session from "express-session";
import auth from "./src/middleware/auth.middleware.js";
import { resumeUpload } from "./src/middleware/resumeUpload.middleware.js";
import AplicantController from "./src/controller/aplicant.controller.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";
import RegisterValidator from "./src/middleware/Validation.middleware.js";

const server = express();

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const jobController = new JobController();
const userController = new UserController();
const aplicantController = new AplicantController();
//
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "view"));

//
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(express.static("src/view"));
server.use(express.static("src/staticFiles"));
server.use(express.json());
server.use(expressLayouts);
server.use(cookieParser());
server.use(setLastVisit);
//index page
server.get("/", jobController.getIndex);

//Get all Jobs
server.get("/jobs", jobController.getJobs);

//Add new Job
server.get("/add-job", jobController.getNewJob);
server.post(
  "/add-job-new",
  uploadFile.single("imgUrl"),
  jobController.addNewJob
);

//update Job
server.get("/updateJob/:id", jobController.getUpdateJobForm);
server.post("/updateJob/:id", jobController.postUpdateJob);

//delete job
server.post("/deleteJob/:id", jobController.deleteJob);

//Recruiter
server.get("/login", userController.getLogin);
server.get("/register", userController.getRegister);
server.post("/register", RegisterValidator, userController.postRegister);
server.post("/login", userController.postLogin);
//Logout
server.get("/logout", userController.logout);

//search Job
server.post("/search", jobController.search);

//view Job Details
server.get("/view-detail/:id", jobController.viewDetail);

//Applicant form submission
server.post(
  "/job-apply/:id",
  resumeUpload.single("resume"),
  aplicantController.applicationSubmission
);

//view Applicants Details
server.get("/view-applicants/:id", aplicantController.viewAplicants);
export default server;
