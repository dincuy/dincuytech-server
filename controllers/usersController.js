const asyncHandler = require("express-async-handler");
const { db } = require("../config/firebase");

const usersRef = db.collection("users");
// GET
const getAllUsers = asyncHandler(async (req, res) => {
  const users = [];
  const snapshot = await usersRef.get();

  if (snapshot.empty) {
    return res.status(500).json({ message: "Tidak ada user gaess" });
  }

  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  res.json(users);
});

// POST
const createNewUser = asyncHandler(async (req, res) => {});

// PATCH
const updateUser = asyncHandler(async (req, res) => {});

// DELETE
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
