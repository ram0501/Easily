import { body, validationResult } from "express-validator";

async function RegisterValidator(req, res, next) {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password")
      .isStrongPassword()
      .withMessage("Strong password is required"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.render("register", {
      errorMessage: err.array()[0].msg,
      userEmail: req.session.userEmail,
    });
  }
  next();
}

export default RegisterValidator;
