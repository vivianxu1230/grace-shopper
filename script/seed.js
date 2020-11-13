'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
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

  await Promise.all([
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
      name: 'Fluid Twill Dress',
      description:
        'This silk twill dress with a micro-check print reminiscent of typical tie patterns is characterized by its austere allure and flowing silhouette with band collar.',
      price: '1000.00',
      category: 'vintage',
      imageUrl:
        'https://live.staticflickr.com/65535/48302062717_0b80b85e9e_b.jpg',
      quantity: 0,
      orderId: 2
    }),
    Product.create({
      name: 'Canary',
      description: 'Pink leather ballerina pointe-style shoes',
      price: '1000.00',
      category: 'shoes',
      imageUrl:
        'https://live.staticflickr.com/65535/49014186342_61220d9aa3_b.jpg',
      quantity: 1,
      orderId: 2
    }),
    Product.create({
      name: 'Guipure',
      description:
        'The dress is made of refined lace with hand-embroidered floral motifs and buttons that illuminate the garment.',
      price: '1000.00',
      category: 'rare',
      imageUrl:
        'https://live.staticflickr.com/4786/25918424607_d2377d33a3_b.jpg',
      quantity: 1,
      orderId: 2
    }),
    Product.create({
      name: 'White Body Suit',
      description: 'Make a statement head to toe.',
      price: '3000.00',
      category: 'vintage',
      imageUrl:
        'https://live.staticflickr.com/4245/34829438805_89a4de6165_b.jpg'
    }),
    Product.create({
      name: 'Fringe Black Bootie',
      description: 'Stay warm and in fashion.',
      price: '500.00',
      category: 'shoes',
      imageUrl:
        'https://cdn.rickowens.eu/products/80056/large/RP20F2843LGFLWN_9999__1.jpg?1588690637'
    }),
    Product.create({
      name: 'Ganni',
      description:
        "Meet the epitome of party dresses. Boasting a flared design and whimsical rose print, this mini dress from GANNI will turn you into the prettiest one of any event. Now let's have some fun.",
      price: '2000.00',
      category: 'vintage',
      imageUrl:
        'https://cdn-images.farfetch-contents.com/15/87/78/22/15877822_30100693_1000.jpg'
    }),
    Product.create({
      name: 'Strada',
      description:
        "Florals in spring may be overrated, but they'll always be adored. Made from breathable cotton, the ones on this shirt will make you look great no matter the occasion. It's just too good.",
      price: '200.00',
      category: 'tops',
      imageUrl:
        'https://cdn-images.farfetch-contents.com/15/41/01/91/15410191_30129490_1000.jpg'
    }),
    Product.create({
      name: 'Hoodie With Band',
      description: 'Black hoodie with reflective band.',
      price: '600.00',
      category: 'streetwear',
      imageUrl:
        'https://www.givenchy.com/dw/image/v2/BBRT_PRD/on/demandware.static/-/Sites-Givenchy_master/default/dw4f24be96/images/BMJ09030AF001/BMJ09030AF001-02-01.jpg'
    }),
    Product.create({
      name: 'Extreme-Tex Rain Jacket',
      description:
        'A sleek, distinctive design characterizes this rain jacket born from the desire to combine cutting-edge textile technologies with eco-sustainable manufacturing methods.',
      price: '500.00',
      category: 'rare',
      imageUrl:
        'https://www.prada.com/content/dam/pradanux_products/S/SGB/SGB625/1XV1F0342/SGB625_1XV1_F0342_S_202_SLF.png/_jcr_content/renditions/cq5dam.web.white.1200.1500.webp'
    }),
    Product.create({
      name: 'Light Bonded Bottoms',
      description:
        'Highly waterproof and breathable pants made of Komatsu Matere® fabric.',
      price: '200.00',
      category: 'streetwear',
      imageUrl:
        'https://cdn.rickowens.eu/products/80447/large/RP20F2300QLX_09_40_-1.jpg?1588775617'
    }),
    Product.create({
      name: 'Performa',
      description:
        'Reinterpreting the classic Chelsea boot, these brushed leather booties are characterized by the rubber welt with an indented motif.',
      price: '900.00',
      category: 'shoes',
      imageUrl:
        'https://cdn.rickowens.eu/products/81425/large/RP20F2884LDE_90_-_1.jpg?1591352033'
    }),
    Product.create({
      name: 'Sheepskin Coat',
      description:
        'This sheepskin coat is characterized by its striking vintage finish. A frog toggle closure decorates the front of the coat with distinctive shirt-style collar.',
      price: '2000.00',
      category: 'vintage',
      imageUrl:
        'https://www.prada.com/content/dam/pradanux_products/U/UPS/UPS418/889F0002/UPS418_889_F0002_SLF.png/_jcr_content/renditions/cq5dam.web.white.1200.1500.webp'
    }),
    Product.create({
      name: 'Sable Dress',
      description:
        'Flowing lines moved by the sunray pleats on the skirt define the design of this light sablé dress. The garment with refined three-quarter sleeves and a waist belt in the same fabric has a vibrant floral print.',
      price: '1000.00',
      category: 'rare',
      imageUrl:
        'https://www.prada.com/content/dam/pradanux_products/P/P3C/P3C65H/1X5TF0002/P3C65H_1X5T_F0002_S_202_SLF.png/jcr:content/renditions/cq5dam.web.white.2400.3000.webp'
    })
  ])

  await Promise.all([
    Order.create({
      address: '1234 S Main St, NY, NY',
      orderStatus: 'Shipped',
      paymentInfo: '12345678910',
      userId: 1
    }),
    Order.create({
      address: '5678 N Main St, NO, LA',
      orderStatus: 'Cart',
      paymentInfo: '12345678910',
      userId: 2
    })
  ])

  await Promise.all([
    OrderItem.create({
      orderId: 1,
      productId: 1,
      price: 10.0
    }),
    OrderItem.create({
      orderId: 1,
      productId: 2,
      price: 20.0
    }),
    OrderItem.create({
      orderId: 2,
      productId: 4,
      price: 1000.0
    }),
    OrderItem.create({
      orderId: 2,
      productId: 5,
      price: 1000.0
    })
  ])

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
