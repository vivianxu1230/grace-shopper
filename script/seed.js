'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Julia',
      lastName: 'Child',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Nayvadius',
      lastName: 'Wilburn',
      email: 'realHitterz@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Patrick',
      lastName: 'Star',
      email: 'underARock@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Patti',
      lastName: 'Labelle',
      email: 'pattiPie@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'White shirt',
      description: 'Soo soft. 100% cotton.',
      price: '10.00',
      category: 'tops',
      imageUrl:
        'https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Shaka-Wear-Max-Heavy-White-T-Shirt-_325409-front-US.jpg',
      quantity: 0,
      orderId: 1
    }),
    Product.create({
      name: 'Black shirt',
      description: 'Soo comfy. 100% hemp.',
      price: '20.00',
      category: 'tops',
      imageUrl:
        'https://www.dhresource.com/0x0/f2/albu/g10/M00/6F/74/rBVaWV6-ZdKAA-iTAACRasUGiXw810.jpg/distressing-black-t-shirt-ripped-cuffs-short.jpg',
      quantity: 0,
      orderId: 1
    }),
    Product.create({
      name: 'Naked Dress',
      description: 'Leave just enough for the imagination.',
      price: '1000.00',
      category: 'rare',
      imageUrl:
        'https://usa-grlk5lagedl.stackpathdns.com/production/usa/images/1588020134914913-Cher-1974-BobMackie.jpg?w=1900&fit=crop&crop=faces&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb',
      quantity: 0,
      orderId: 2
    }),
    Product.create({
      name: 'Canary',
      description: 'Give them a look worthy of a headliner',
      price: '1000.00',
      category: 'rare',
      imageUrl:
        'https://usa-grlk5lagedl.stackpathdns.com/production/usa/images/1588022022414842-037fbca4-9584-4984-951a-b628cd243a49-getty-472217210.jpg?w=1900&fit=crop&crop=faces&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb'
    }),
    Product.create({
      name: 'Cat Suit',
      description: 'Halle Berry has could never.',
      price: '1000.00',
      category: 'rare',
      imageUrl:
        'https://usa-grlk5lagedl.stackpathdns.com/production/usa/images/1588022291020743-2017-Bella-Hadid-Alexander-Wang.jpg?w=1900&fit=crop&crop=faces&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb'
    }),
    Product.create({
      name: 'Red Suit',
      description: 'Make a statement head to toe.',
      price: '3000.00',
      category: 'rare',
      imageUrl:
        'https://media.gq-magazine.co.uk/photos/5d13aac9b6fee9df40c9ff12/master/w_1280%2cc_limit/040-rami-malek-met-gala-menswear-040419-credit-getty-images.jpg'
    }),
    Product.create({
      name: 'Black Bomber',
      description: 'Stay warm and in fashion.',
      price: '150.00',
      category: 'vintage',
      imageUrl:
        'https://media.gq-magazine.co.uk/photos/5d138dcfb6fee9b6b1c9dd17/master/w_1280%2cc_limit/gettyimages-908911244.jpg'
    }),
    Product.create({
      name: 'A Vibe',
      description: 'Eccentric and fearless, make your fashion rebellious.',
      price: '2000.00',
      category: 'rare',
      imageUrl:
        'https://dazedimg-dazedgroup.netdna-ssl.com/701/azure/dazed-prod/1180/4/1184488.jpg'
    }),
    Product.create({
      name: 'Alien Green',
      description: 'Be bold and green.',
      price: '200.00',
      category: 'vintage',
      imageUrl:
        'https://i.pinimg.com/originals/cf/5c/1f/cf5c1f4fa5ff1038933ac6d2dd783356.jpg'
    }),
    Product.create({
      name: 'Animal Print Gown',
      description: 'Fun for the animal in you',
      price: '600.00',
      category: 'vintage',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1982-raquel-welch-gettyimages-118283737-1556563271.jpg?crop=1xw:1xh;center,top&resize=768:*'
    }),
    Product.create({
      name: 'Pink Tracksuit',
      description: 'Soft and pink. What more can you ask for?',
      price: '500.00',
      category: 'streetwear',
      imageUrl:
        'https://video-images.vice.com/_uncategorized/1561754577715-GettyImages-112370037.jpeg?resize=975:*'
    }),
    Product.create({
      name: 'Tommy Fit',
      description: 'Throw it back.',
      price: '200.00',
      category: 'streetwear',
      imageUrl:
        'https://cultureposters.com/wp-content/uploads/2019/05/aliya.jpg'
    }),
    Product.create({
      name: 'Blue Supreme',
      description: 'Take your look to the next level.',
      price: '4000.00',
      category: 'rare',
      imageUrl:
        'http://thesource.com/wp-content/uploads/2018/07/Lil-Kim-Crush-on-You-Blue.jpg'
    }),
    Product.create({
      name: 'Coogi Sweater',
      description: "Stay Coogi'd down to the socks.",
      price: '500.00',
      category: 'streetwear',
      imageUrl:
        'https://news.artnet.com/app/news-upload/2015/11/lixenberg-e1447430235587.jpg'
    }),
    Product.create({
      name: 'Pink and Fluffy',
      description: 'Not just anyone can pull this off.',
      price: '1000.00',
      category: 'streetwear',
      imageUrl:
        'https://media.gq.com/photos/58347f75c764ae804c6d1876/1:1/w_1024%2Cc_limit/cam-ron-lede.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      address: '1234 S Main St, NY, NY',
      orderStatus: 'Shipped',
      paymentInfo: '12345678910',
      userId: 1
    }),
    Order.create({
      address: '5678 N Main St, NO, LA',
      orderStatus: 'Processing',
      paymentInfo: '12345678910',
      userId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
