// Vildation on the level of the server
const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  assignedTo: Joi.string()
    .hex()
    .length(24)
    .required(),
}).unknown(false);

const validateCreateNote = (req, res, next) => {
  const { error } = createNoteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error?.details[0]?.message||"Please Enter valid data",
    });
  }

  next();
};

// note: in update schema , fileds are optional, cant be required , because not all fileds will be updated
const updateNoteSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
  assignedTo: Joi.string().hex().length(24),
  state: Joi.string().valid("pending", "started", "completed"),
  completed: Joi.boolean(),
}).min(1);

const validateUpdateNote = (req, res, next) => {
  const { error } = updateNoteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error?.details[0]?.message||"Please Enter valid data",
    });
  }

  next();
}

const createUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
  role: Joi.string().trim(),
})

const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error?.details[0]?.message||"Please Enter valid data",
    });
  }

  next();
}

// note in update user schema, fileds are optional, cant be required , because not all fileds will be updated
const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid("admin", "user"),
})
const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error?.details[0]?.message||"Please Enter valid data",
    });
  }

  next();
}



module.exports = { validateCreateNote,validateCreateUser,validateUpdateNote,validateUpdateUser };