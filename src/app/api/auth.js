import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body.email && req.body.password) {
            if (req.url.includes('/register')) {
                const { email, password } = req.body;
                try {
                    const userExists = await User.findOne({ email });
                    if (userExists) {
                        return res.status(400).json({ message: 'User already exists' });
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);
                    const user = new User({ email, password: hashedPassword });
                    await user.save();
                    res.status(201).json({ message: 'User registered successfully' });
                } catch (error) {
                    res.status(500).json({ message: 'Server error' });
                }
            } else if (req.url.includes('/login')) {
                const { email, password } = req.body;
                try {
                    const user = await User.findOne({ email });
                    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

                    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token });
                } catch (error) {
                    res.status(500).json({ message: 'Server error' });
                }
            }
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
