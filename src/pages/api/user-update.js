const requireAuth = require("./_require-auth.js");
const { updateUser } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { uid } = req.query;

  // Make sure authenticated user can only update themself
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update user other than yourself",
    });
  }

  await updateUser(uid, body);

  res.send({
    status: "success",
  });
});
