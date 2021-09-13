const requireAuth = require("./_require-auth.js");
const { createItem } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const body = req.body;

  // Make sure authenticated user is not setting someone else as the owner
  if (body.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "You can only set yourself as the item owner",
    });
  }

  const item = await createItem(body);

  res.send({
    status: "success",
    data: item,
  });
});
