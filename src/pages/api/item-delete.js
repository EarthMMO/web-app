const requireAuth = require("./_require-auth.js");
const { getItem, deleteItem } = require("./_db.js");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const { id } = req.query;

  const fetchedItem = await getItem(id);

  if (!fetchedItem) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (fetchedItem.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot delete an item that you don't own",
    });
  }

  await deleteItem(id);

  res.send({
    status: "success",
  });
});
