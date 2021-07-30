const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
  for (let i = 0; i < 60; i++) {
    const random60 = Math.floor(Math.random() * 60);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User Id
      author: '60ec490eedd1620ee8d51308',
      location: `${cities[random60].city}, ${cities[random60].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, magni?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, in!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random60].longitude,
          cities[random60].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/cloudnishant08/image/upload/v1626680571/YelpCamp/jdp2fttwb6obr0jrwo2n.jpg',
          filename: 'YelpCamp/jdp2fttwb6obr0jrwo2n'
        },
        {
          url: 'https://res.cloudinary.com/cloudnishant08/image/upload/v1626680571/YelpCamp/nxdzk7ew2lfjctfouovc.jpg',
          filename: 'YelpCamp/nxdzk7ew2lfjctfouovc'
        },
        {
          url: 'https://res.cloudinary.com/cloudnishant08/image/upload/v1626680571/YelpCamp/rjiboqu9wz0ljwccgq03.jpg',
          filename: 'YelpCamp/rjiboqu9wz0ljwccgq03'
        }
      ]
    });
    await camp.save();
  }
}


seedDB().then(() => {
  mongoose.connection.close();
})