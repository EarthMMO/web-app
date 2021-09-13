const requireAuth = require("./_require-auth.js");
const { getItemsByOwner } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const { owner } = req.query;

  // Make sure owner is authenticated user
  if (owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot get items that belong to a different owner",
    });
  }

  const items = await getItemsByOwner(owner);

  res.send({
    status: "success",
    data: items,
  });
});
