import UserModel from "../model/user.model.js";
import JobModel from "../model/job.model.js";

export default class UserController {
  //Recruiter Login
  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  getRegister(req, res) {
    res.render("register", {
      userEmail: req.session.userEmail,
      errorMessage: null,
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;

    UserModel.add(name, email, password);

    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;

    const user = UserModel.isValid(email, password);
    if (!user) {
      return res.render("login", {
        errorMessage: "Invalid Credentials",
        userEmail: req.session.userEmail,
      });
    }
    req.session.userEmail = email;
    req.session.name = user.name;
    res.redirect("/");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        throw new Error(err);
      } else {
        res.redirect("/login");
      }
    });
  }
}
