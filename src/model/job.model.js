export default class JobModel {
  constructor(id, name, role, location, salary, img) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.location = location;
    this.salary = salary;
    this.img = img;
  }

  static getAll() {
    return Jobs;
  }

  static addJob(name, role, location, salary, img) {
    const newJob = new JobModel(
      Jobs.length + 1,
      name,
      role,
      location,
      salary,
      img
    );
    Jobs.push(newJob);
  }
  static update(id, jobObj) {
    const job = Jobs.find((job) => job.id == id);
    job.role = jobObj.role;
    job.location = jobObj.location;
    job.salary = jobObj.salary;
  }

  static delete(id) {
    const index = Jobs.findIndex((job) => job.id == id);
    Jobs.splice(index, 1);
  }

  static searchJob(role) {
    return Jobs.filter(
      (job) => job.role.toLowerCase().trim() == role.toLowerCase().trim()
    );
  }

  static getJobByID(id) {
    return Jobs.find((job) => job.id == id);
  }
}

const Jobs = [
  new JobModel(
    "1",
    "Coding Ninja",
    "SDE",
    "New Delhi",
    "10",
    "images/Coding-Ninjas.jpg"
  ),
  new JobModel(
    "2",
    "Amazon",
    "BackEnd Developer",
    "Greator Noida",
    "15 LPA",
    "images/Amazon-Logo.png"
  ),
  new JobModel(
    "3",
    "Google",
    "Full Stack Web Developer",
    "Gurugram",
    "20",
    "images/Google_Images.png"
  ),
  new JobModel(
    "4",
    "TCS",
    "FrontEnd Developer",
    "Pune",
    "12",
    "images/tcs.png"
  ),
  new JobModel(
    "5",
    "Infosys",
    "MERN Stack Developer",
    "Jaipur",
    "10",
    "images/infosys.png"
  ),
];
