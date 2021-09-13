const requireAuth = require("./_require-auth.js");
const { createUser } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const body = req.body;

  // Make sure authenticated user can only create themself in the database
  if (body.uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Created user must have the same uid as authenticated user",
    });
  }

  await createUser(body.uid, body);

  res.send({
    status: "success",
  });
});
