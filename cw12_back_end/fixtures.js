const mongoose = require('mongoose');
const config = require('./config');
const Photo = require('./models/Photo');
const User = require('./models/User');
const nanoid = require('nanoid');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user2, user1, user3] = await User.create(
        {
            username: 'stgqseykpp_1558629434@tfbnw.net',
            facebookId: '109980593577521',
            name: 'Mark Alcfifgdcadhf McDonaldman',
            password: '111aaa',
            token: nanoid(),
            image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=109980593577521&height=50&width=50&ext=1561277553&hash=AeQt7Ybkjlpi2F6W'
        },
        {
            username: 'johnbone',
            name: 'John',
            password: '123',
            token: nanoid(),
            image: 'john.jpeg'
        },
        {
            username: 'alancalan',
            name: 'Alan',
            password: '123',
            token: nanoid(),
            image: 'alan.jpeg'
        }
    );

    await Photo.create(
        {
            title: "The Changing Surface of Mars",
            image: "the_changing.jpg",
            user: user2._id
        },
        {
            title: "A Snow Plow Landslide ",
            image: "snow.jpg",
            user: user1._id
        },
        {
            title: "A Frosted Surface",
            image: "frosted_surface.jpg",
            user: user3._id
        },
        {
            title: "Resistant Lava and Erosion",
            image: "resistant_lava.jpg",
            user: user3._id
        },
        {
            title: "Central Region of Rocky Impact Crater ",
            image: "central_region.jpg",
            user: user2._id
        },
        {
            title: "Slope Monitoring ",
            image: "slope_monitoring.jpg",
            user: user1._id
        },
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});