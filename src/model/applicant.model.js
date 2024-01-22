export default class ApplicantModel {
  constructor(id, name, email, qualification, mobile, companyId, resumePDF) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.qualification = qualification;
    this.mobile = mobile;
    this.companyId = companyId;
    this.resumePDF = resumePDF;
  }
  static addAplicant(name, email, qualification, mobile, companyId, resumePDF) {
    const aplicant = new ApplicantModel(
      applicants.length + 1,
      name,
      email,
      qualification,
      mobile,
      companyId,
      resumePDF
    );
    applicants.push(aplicant);
  }

  static getAplicantCount(id) {
    const result = applicants.filter((aplicant) => aplicant.companyId == id);
    return result;
  }

  static getAll() {
    return applicants;
  }
}

const applicants = [];
