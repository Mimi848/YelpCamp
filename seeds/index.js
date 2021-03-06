const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;



db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fe8ac3d70dd89f724442eeb',
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
                    url: 'https://res.cloudinary.com/dzei3l8nl/image/upload/v1608717825/YelpCamp/jfhw9tbefuuybah246f9.jpg',
                    filename: 'YelpCamp/jfhw9tbefuuybah246f9'
                },
                {
                    url: 'https://res.cloudinary.com/dzei3l8nl/image/upload/v1608717825/YelpCamp/fmmaazxsukgtoioqgpqx.jpg',
                    filename: 'YelpCamp/fmmaazxsukgtoioqgpqx'
                },
                {
                    url: 'https://res.cloudinary.com/dzei3l8nl/image/upload/v1608717825/YelpCamp/l40xa0zokgcmcxdlmvmj.jpg',
                    filename: 'YelpCamp/l40xa0zokgcmcxdlmvmj'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}) 