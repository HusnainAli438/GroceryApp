import joi from "joi";


const userSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
});

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export default userValidator;