import JobModel from "../model/job.model.js";
import ApplicantModel from "../model/applicant.model.js";

export default class JobController {
  getIndex(req, res) {
    res.render("index", {
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }

  getJobs(req, res) {
    const jobs = JobModel.getAll();
    res.render("jobs", {
      jobs,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }

  getNewJob(req, res) {
    res.render("addNewJob", {
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }

  addNewJob(req, res) {
    const { name, role, location, salary } = req.body;

    const img = "/images/" + req.file.filename;
    JobModel.addJob(name, role, location, salary, img);
    res.redirect("/jobs");
  }

  getUpdateJobForm(req, res) {
    const id = req.params.id;
    res.render("updateJob", {
      id,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  postUpdateJob(req, res) {
    const id = req.params.id;
    JobModel.update(id, req.body);
    res.redirect("/jobs");
  }

  deleteJob(req, res) {
    const id = req.params.id;
    JobModel.delete(id);
    res.redirect("/jobs");
  }

  //search Job
  search(req, res) {
    const role = req.body.search;
    const filterJobs = JobModel.searchJob(role);

    res.render("jobs", {
      jobs: filterJobs,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }

  viewDetail(req, res) {
    const id = req.params.id;

    const job = JobModel.getJobByID(id);
    const aplicants = ApplicantModel.getAplicantCount(id);
    if (job) {
      return res.render("viewDetails", {
        job,
        userEmail: req.session.userEmail,
        name: req.session.name,
        count: aplicants.length,
      });
    } else {
      res.status(401).send("Details is not found");
    }
  }
}
