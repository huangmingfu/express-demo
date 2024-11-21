const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFile = path.join(__dirname, "users.json");

// 确保用户文件存在
async function ensureUsersFile() {
  try {
    await fs.access(usersFile);
  } catch {
    // 创建默认管理员账户
    const defaultAdmin = {
      username: "admin",
      // 密码: 123456
      password: "$2a$10$3w3HkJFwH0T5S0h0ZB2YXu.AQS1jPqQmwqwkZHDPqfT9lV15OyR.O",
    };
    await fs.writeFile(usersFile, JSON.stringify([defaultAdmin], null, 2));
  }
}

// 获取所有用户
async function getUsers() {
  await ensureUsersFile();
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

module.exports = {
  findUser,
  validateUser,
};
