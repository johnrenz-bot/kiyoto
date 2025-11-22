import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.post("/api/register", async (req, res) => {
    try {
        const { fullName, contactNumber, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                fullName,
                contactNumber,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            user: { id: user.id, email: user.email, fullName: user.fullName }
        });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                contactNumber: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                email: true,
                contactNumber: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({ message: "Server error" });
    }
});



app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        res.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
