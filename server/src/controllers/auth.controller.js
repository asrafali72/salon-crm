const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone
    } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
      phone,
      roleName: "CUSTOMER",
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: "Registration successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await loginUser({
      email,
      password,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        branchIds: user.branches.map(
          (branch) => branch.branchId
        ),
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};