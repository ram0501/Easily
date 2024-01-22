import ApplicantModel from "../model/applicant.model.js";
import JobModel from "../model/job.model.js";

export default class AplicantController {
  applicationSubmission(req, res) {
    const { name, email, qualification, mobile } = req.body;
    const companyId = req.params.id;
    const resumePDF = "/resume/" + req.file.filename;

    ApplicantModel.addAplicant(
      name,
      email,
      qualification,
      mobile,
      companyId,
      resumePDF
    );

    res.redirect("/jobs");
  }

  viewAplicants(req, res) {
    const companyId = req.params.id;
    const aplicants = ApplicantModel.getAplicantCount(companyId);
    const company = JobModel.getJobByID(companyId);
    if (company && aplicants) {
      res.render("viewApplicants", {
        aplicants,
        companyName: company.name,
        userEmail: req.session.userEmail,
        name: req.session.name,
      });
    } else {
      res.status(401).send("No details found");
    }
  }
}
