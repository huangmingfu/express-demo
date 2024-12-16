const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFile = path.join(__dirname, "../database/users.json");

// 获取所有用户
async function getUsers() {
  const data = await fs.readFile(usersFile, "utf8");
  return JSON.parse(data);
}

// 查找用户
async function findUser(username) {
  const users = await getUsers();
  return users.find((user) => user.username === username);
}

// 验证用户
async function validateUser(username, password) {
  const user = await findUser(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

// 注册用户
async function registerUser(username, password) {
  const users = await getUsers();
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    throw new Error("用户已存在");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  return newUser;
}

module.exports = {
  findUser,
  validateUser,
  registerUser,
};
