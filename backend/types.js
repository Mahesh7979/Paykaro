const zod = require("zod");
const signupTypes = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  mobile: zod.string().min(10),
});

const signinTypes = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateTypes = zod.object({
  password: zod.string(),
  newPassword : zod.string(),
  // firstname: zod.string().optional(),
});

module.exports = {
  signupTypes,
  signinTypes,
  updateTypes,
};
