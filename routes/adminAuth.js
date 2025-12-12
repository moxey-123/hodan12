// TEMP: Create admin account (use once)
router.post("/create-admin", async (req, res) => {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashed });

    res.send("Admin created");
});
