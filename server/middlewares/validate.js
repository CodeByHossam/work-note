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

module.exports = { validateCreateNote };