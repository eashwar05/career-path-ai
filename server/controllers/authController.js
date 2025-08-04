const User = require('../models/User'); // Import User model to interact with user data in MongoDB
const bcrypt = require('bcryptjs');    // For hashing and comparing passwords securely
const jwt = require('jsonwebtoken');   // For creating JSON Web Tokens (JWT) for authentication

// Controller function to handle user signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the plain text password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds is a good balance of security & speed

    // Create a new user document with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token that encodes the user id and expires in 2 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    // Respond with user data (excluding sensitive info like password) and a token
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// Controller function to handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password in DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token for successful login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    // Respond with user details and the token
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Controller function stub for forgot password (to be implemented later)
exports.forgotPassword = async (req, res) => {
  // Here you would trigger a password reset process in production (email a reset link)
  // For now, just return a generic message to avoid user enumeration
  res.json({ message: 'If this email exists, a password reset link will be sent.' });
};
