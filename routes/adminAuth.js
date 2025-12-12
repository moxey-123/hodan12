const admin = await Admin.findOne({ username });
if (!admin) return res.status(400).json({ message: "Admin not found" });

// Plain text comparison
if (admin.password !== password)
  return res.status(400).json({ message: "Incorrect password" });

const token = generateJWT(admin._id);
res.json({ token });
