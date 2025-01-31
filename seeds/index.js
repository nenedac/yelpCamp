const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
///////////////////////////////////////////////
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
/////////////////////////////////////////////// 
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66a2d067a1e0d09d38df8008',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqb0u6rvs/image/upload/v1722200140/yelpCamp/i8ti8edobc6zwueeyoep.png',
                    filename: 'yelpCamp/i8ti8edobc6zwueeyoep'
                },
                {
                    url: 'https://res.cloudinary.com/dqb0u6rvs/image/upload/v1722201014/yelpCamp/ygfto3k523c2utrpujap.jpg',
                    filename: 'yelpCamp/ygfto3k523c2utrpujap'
                }
            ]
        });
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
});