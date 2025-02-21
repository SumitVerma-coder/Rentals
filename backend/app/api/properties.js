import Property from '../../models/Property';
import { verifyToken } from './authMiddleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;

                const { title, description, price, location, imageUrl } = req.body;
                const newProperty = new Property({ title, description, price, location, imageUrl, user: req.user.id });
                await newProperty.save();
                res.status(201).json({ message: 'Property listed successfully', property: newProperty });
            } catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        } else {
            res.status(403).json({ message: 'Authorization required' });
        }
    } else if (req.method === 'GET') {
        try {
            const properties = await Property.find();
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    } else if (req.method === 'PUT') {
        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;

                const { id } = req.query;
                const { title, description, price, location, imageUrl } = req.body;

                const property = await Property.findById(id);
                if (!property) return res.status(404).json({ message: 'Property not found' });

                if (property.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

                property.title = title;
                property.description = description;
                property.price = price;
                property.location = location;
                property.imageUrl = imageUrl;

                await property.save();
                res.status(200).json({ message: 'Property updated successfully', property });
            } catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        } else {
            res.status(403).json({ message: 'Authorization required' });
        }
    } else if (req.method === 'DELETE') {
        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;

                const { id } = req.query;
                const property = await Property.findById(id);
                if (!property) return res.status(404).json({ message: 'Property not found' });

                if (property.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

                await property.remove();
                res.status(200).json({ message: 'Property deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        } else {
            res.status(403).json({ message: 'Authorization required' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
