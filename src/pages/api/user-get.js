const requireAuth = require("./_require-auth.js");
const { getUser } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const { uid } = req.query;

  // Prevent access to user other than yourself
  // Note: You may want to remove this depending on your needs
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself",
    });
  }

  const user = await getUser(uid);

  res.send({
    status: "success",
    data: user,
  });
});
