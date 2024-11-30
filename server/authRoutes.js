const express = require("express");
const router = express.Router();
const { validateUser, registerUser } = require("./userModel");
const { generateToken } = require("./authMiddleware");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "用户名和密码不能为空" });
    }

    const user = await validateUser(username, password);

    if (!user) {
      return res.status(403).json({ message: "用户名或密码错误" });
    }

    const token = generateToken(user);

    res.json({
      message: "登录成功",
      code: 200,
      token,
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("登录错误:", error);
    res.status(500).json({ message: "服务器错误" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "用户名和密码不能为空" });
    }

    const newUser = await registerUser(username, password);

    res.status(201).json({
      message: "注册成功",
      user: {
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("注册错误:", error);
    res.status(500).json({ message: error.message || "服务器错误" });
  }
});

module.exports = router;
