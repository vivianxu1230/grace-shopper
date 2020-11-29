'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({
      firstName: 'Gianni',
      lastName: 'LaTange',
      email: 'gianni@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Madison',
      lastName: 'Kneller',
      email: 'madison@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Samantha',
      lastName: 'Jardanowski',
      email: 'sam@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Vivian',
      lastName: 'Xu',
      email: 'vivian@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Patrick',
      lastName: 'Star',
      email: 'underarock@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Robyn',
      lastName: 'Fenty',
      email: 'riri@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Ashlee',
      lastName: 'Fellow',
      email: 'ashlee@email.com',
      password: '123',
      isAdmin: true
    })
  ])

  await Promise.all([
    Product.create({
      name: 'Prada FW1999 Split Boots',
      description: 'Iconic futuristic split sole boot design',
      price: '100.00',
      category: 'shoes',
      imageUrl:
        'https://process.fs.heroine.com/AFb875wTiRuaf060oJed7z/cache=expiry:max/rotate=deg:exif/resize=width:1200,fit:crop/output=quality:70/compress/MfGxhuPbSeCYGiYMO3bR',
      quantity: 0,
      orderId: 1
    }),
    Product.create({
      name: 'Miu Miu FW1999 Fur Tech Bag',
      description: 'Extremely rare runway piece.',
      price: '20.00',
      category: 'accessories',
      imageUrl:
        'https://d2h1pu99sxkfvn.cloudfront.net/b0/12675972/525748506_ji7ltvQ9NP/P0.jpg',
      quantity: 0,
      orderId: 1
    }),
    Product.create({
      name: 'Gaultier Fluid Twill Dress',
      description:
        'This silk twill dress with a micro-check print reminiscent of typical tie patterns is characterized by its austere allure and flowing silhouette with band collar.',
      price: '1000.00',
      category: 'wholebody',
      imageUrl:
        'https://live.staticflickr.com/65535/48302062717_0b80b85e9e_b.jpg',
      quantity: 1,
      orderId: 2,
      onHold: true
    }),
    Product.create({
      name: 'Noritaka Tatehana Ballet Shoes',
      description: 'Pink leather ballerina pointe-style shoes',
      price: '1000.00',
      category: 'shoes',
      imageUrl:
        'https://live.staticflickr.com/65535/49014186342_61220d9aa3_b.jpg',
      quantity: 1,
      orderId: 2,
      onHold: true
    }),
    Product.create({
      name: '18th-Century Guipure Dress',
      description:
        'The dress is made of refined lace with hand-embroidered floral motifs and buttons that illuminate the garment.',
      price: '1000.00',
      category: 'wholebody',
      imageUrl:
        'https://live.staticflickr.com/4786/25918424607_d2377d33a3_b.jpg',
      quantity: 1,
      orderId: 2,
      onHold: true
    }),
    Product.create({
      name: 'Helmut Lang White Bodysuit',
      description: 'Make a statement head to toe.',
      price: '3000.00',
      category: 'wholebody',
      imageUrl:
        'https://live.staticflickr.com/4245/34829438805_89a4de6165_b.jpg',
      quantity: 0,
      orderId: 3
    }),
    Product.create({
      name: 'Vivienne Westwood FW1992 Headscarf',
      description:
        'Vivienne Westwood ivory silk headscarf. Hand rolled hem, dog print with gold leaf text. Always on Camera Fall-Winter 1992',
      price: '1500.00',
      category: 'accessories',
      imageUrl:
        'https://a.1stdibscdn.com/vivienne-westwood-silk-dog-print-headscarf-always-on-camera-fw-1992-for-sale/1121189/v_68215521560328551629/6821552_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Kaat Tilley Beaded Dress',
      description:
        'This set features a Les Habitudes beaded bustier and Kaat Tilley crinkle skirt. The bustier has a corset back. The crinkle skirt has a zipper closure. In excellent vintage condition.',
      price: '500.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_18194631470660595770/1819463_master.jpg?disable=upscale&auto=webp&quality=60&width=960',
      quantity: 0,
      orderId: 3
    }),
    Product.create({
      name: 'Mugler Quilted Silver Dress',
      description:
        'Vintage THIERRY MUGLER Quilted Silver Space Age Futuristic Dress',
      price: '2000.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/vintage-thierry-mugler-quilted-silver-space-age-futuristic-dress-for-sale/1121189/v_94730921589305103001/9473092_master.jpeg?disable=upscale&auto=webp&quality=60&width=960',
      quantity: 0,
      orderId: 3
    }),
    Product.create({
      name: 'Mugler Eyelash Top',
      description:
        ' Size 36/ US Small. We accept returns for refund, please see our terms. We offer free ground shipping within the US. Please let us know if you have any questions.',
      price: '150.00',
      category: 'tops',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_19902331475481486796/1990233_master.jpg?disable=upscale&auto=webp&quality=60&width=960',
      quantity: 0,
      orderId: 3
    }),
    Product.create({
      name: 'Hussein Chalayan 2002 heels',
      description:
        'Hussein Chalayan Autumn-Winter 2002 black leather shoes with metal heel.',
      price: '600.00',
      category: 'shoes',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_34695811510039304110/3469581_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Margiela 4-Piece Sweater Set',
      description:
        'A fabulous black wool knit 4 piece sweater set from Martin Margiela. It consists of a crop long sleeve turtleneck, a long sleeve shrug, a crop sleeveless vest and a wide hip band. All can be configured in different ways or worn separately. ',
      price: '300.00',
      category: 'tops',
      imageUrl:
        'https://a.1stdibscdn.com/martin-margiela-4-piece-cardigan-pullover-vest-for-sale/1121189/v_99597521603467707710/9959752_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Plein Sud Tie-Dye Skirt',
      description:
        'Unique mini skirt by Plein Sud Jeans done in a tie dyed felted wool with leather panel and lace up sides. Unlined with side zip closure. The marked size is 40/8. 80% wool, 20% nylon. The low waist measures 28", hips 36" and the total length 18.5". Excellent vintage condition with no noted flaws. Made in France.',
      price: '500.00',
      category: 'bottoms',
      imageUrl:
        'https://a.1stdibscdn.com/2000s-plein-sud-jeans-asymmetric-leather-tie-dye-felted-wool-lace-up-mini-skirt-for-sale/1121189/v_66917821558623265552/6691782_master.jpg?disable=upscale&auto=webp&quality=60&width=960',
      onHold: true,
      orderId: 4
    }),
    Product.create({
      name: 'Alexander McQueen SS2003 Top',
      description:
        'Against a giant screen projection of underwater scenes and Blair Witch–style haunted woods, McQueen unfolded a sartorial narrative that began with pirates and drowned maidens and ended in the rainforest. This top is from that very collection. ',
      price: '500.00',
      category: 'tops',
      imageUrl:
        'https://a.1stdibscdn.com/s-s-2003-alexander-mcqueen-runway-shipwrecked-sheer-nude-silk-top-for-sale/1121189/v_108293721605603545990/10829372_master.jpeg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Issey Miyake Art Glasses',
      description:
        'Extremely rare art piece from Issey Miyake dating to the 1980s in the form of silver-toned bent wire glasses with amber nose pads and removable rubber neck strap. Can be worn or displayed. Made in Japan. Excellent condition.',
      price: '200.00',
      category: 'accessories',
      imageUrl:
        'https://a.1stdibscdn.com/1980s-issey-miyake-silver-wire-art-glasses-with-rubber-neck-strap-for-sale/1121189/v_104254221600989391382/10425422_master.jpeg?disable=upscale&auto=webp&quality=60&width=960',
      onHold: true,
      orderId: 4
    }),
    Product.create({
      name: 'Issey Miyake Bi-Color Vintage Dress',
      description:
        'Reinterpreting the classic Chelsea boot, these brushed leather booties are characterized by the rubber welt with an indented motif.',
      price: '900.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_35458311511273245459/3545831_master.jpg?disable=upscale&auto=webp&quality=60&width=960',
      onHold: true,
      orderId: 4
    }),
    Product.create({
      name: 'Junya Black Frayed Edge Hat',
      description:
        'Vintage Junya Watanabe black wool hat featuring intentional frayed edges and adorned with a vintage hat pin at the center front.',
      price: '2000.00',
      category: 'accessories',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_18484931471326489750/1848493_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Issey Miyake Machine Gun Baby Dress',
      description:
        'Issey Miyake Pleats Please Machine Gun Baby. Limited Edition Dress. Labeled size 3. Excellent Condition',
      price: '1000.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/issey-miyake-pleats-please-machine-gun-baby-dress-for-sale/1121189/v_76541111570447182073/7654111_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'XULY.Bët (Lamine Kouyaté) Ensemble',
      description: 'Acrylic and nylon, fall 1994, France. ',
      price: '3500.00',
      category: 'wholebody',
      imageUrl:
        'https://live.staticflickr.com/4777/40747846332_98929945a4_b.jpg'
    }),
    Product.create({
      name: 'Baby The Stars Shine Bright Ensemble',
      description: '2009, Japan, museum purchase.',
      price: '200.00',
      category: 'wholebody',
      imageUrl: 'https://live.staticflickr.com/817/41344765111_ea9407e31b_b.jpg'
    }),
    Product.create({
      name: 'Gaultier Madonna Multi Chain Necklace',
      description:
        'The Jean Paul Gaultier Madonna Multi Chain Necklace is a tribute to the iconic figure in haute style. Featuring medallions and charms with the Madonna in pewter and brass, crosses and metal balls all in Gothic style with adjustable chain. French design.',
      price: '100.00',
      category: 'accessories',
      imageUrl: 'https://i1.adis.ws/i/forzieri/jp292713-001-1x-t?$nlpv$'
    }),
    Product.create({
      name: 'Comme Des Garcons AW2005 Skirt',
      description:
        "Vintage Comme des Garcons ivory satin tiered ruffle skirt with trompe l'oeil print and asymmetric hem. Broken Bride collection AW 2005.",
      price: '700.00',
      category: 'bottoms',
      imageUrl:
        'https://a.1stdibscdn.com/vintage-comme-des-garcons-broken-bride-ivory-tiered-skirt-2005-for-sale/1121189/v_70359221562915119143/7035922_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Comme des Garcons Bustle Dress',
      description:
        "Rei Kawakubo for Comme des Garcons high concept creation with Victorian flair. Most likely inspired by Vivienne Westwood's wench style dresses. Asymmetric heavy cotton dress extraordinarily constructed with fan pleating and manipulation of fabric into bustle style back. The gathers and tucks of the skirt allow for irregular hemline and the hand ruched bodice creates a feminine corset single strap style. Side zipper closure.",
      price: '1700.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/comme-des-garcons-asymmetric-victorian-flair-bustle-dress-westwood-inspiration-for-sale/1121189/v_75104321568183635744/7510432_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Vivienne Westwood FW1994Trapper Hat',
      description:
        'Vivienne Westwood grey sheepskin topless trapper hat, fw 1994',
      price: '350.00',
      category: 'accessories',
      imageUrl:
        'https://a.1stdibscdn.com/vivienne-westwood-grey-sheepskin-topless-trapper-hat-fw-1994-for-sale/1121189/v_93455821587663541464/9345582_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Helmut Lang AW03 Layering Skirt',
      description:
        "This is one of the most detailed and unique iterations of the famed aviator pieces. Looks great over pants. Compared to other iterations, this had much more organic patterning and layering, with a number of open slits that can be styled with chaps as originally presented in Arena Homme's iconic 10 year Helmut Lang retrospective in 2003.",
      price: '1200.00',
      category: 'bottoms',
      imageUrl:
        'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:1400,fit:scale/output=quality:90/compress/https://cdn.fs.grailed.com/api/file/mNZnRgf6QKew6wgBtYE2'
    }),
    Product.create({
      name: 'John Galliano Hooded Bodysuit',
      description: 'Circa 1986 John Galliano with an asymmetrical, daring cut',
      price: '700.00',
      category: 'wholebody',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_64846311555940445949/6484631_master.jpeg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Vivienne Westwood Corset',
      description:
        '1990s-era silhouette from the genius mind of the British dame of punk fashion.',
      price: '1500.00',
      category: 'tops',
      imageUrl:
        'https://a.1stdibscdn.com/archivesE/upload/1121189/v_18913531472553850267/1891353_master.jpg?disable=upscale&auto=webp&quality=60&width=960'
    }),
    Product.create({
      name: 'Alice Auaa FW13 Knit',
      description:
        'Creepy and deconstructed shipwreck ghost chic dress from the fall/winter 2013 runway collection.',
      price: '1500.00',
      category: 'wholebody',
      imageUrl:
        'https://i.pinimg.com/564x/76/14/8c/76148cca953bb246cd83266e8b369c03.jpg'
    })
  ])

  await Promise.all([
    Order.create({
      address: '1234 S Main St, New York, NY',
      status: 'Shipped',
      paymentInfo: '12345678910',
      userId: 6
    }),
    Order.create({
      address: '5678 N Main St, New Orleans, LA',
      status: 'Cart',
      paymentInfo: '12345678910',
      userId: 2
    }),
    Order.create({
      address: '314 Cherry Lane, Detroit, MI',
      status: 'Shipped',
      paymentInfo: '12345678910',
      userId: 3
    }),
    Order.create({
      address: '5325 S Michigan Ave, Chicago IL',
      status: 'Cart',
      paymentInfo: '12345678910',
      userId: 5
    })
  ])

  await Promise.all([
    OrderItem.create({
      orderId: 1,
      productId: 1,
      price: 100.0
    }),
    OrderItem.create({
      orderId: 1,
      productId: 2,
      price: 20.0
    }),
    OrderItem.create({
      orderId: 2,
      productId: 3,
      price: 1000.0
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
    }),
    OrderItem.create({
      orderId: 3,
      productId: 6,
      price: 3000.0
    }),
    OrderItem.create({
      orderId: 3,
      productId: 7,
      price: 500.0
    }),
    OrderItem.create({
      orderId: 3,
      productId: 8,
      price: 2000.0
    }),
    OrderItem.create({
      orderId: 3,
      productId: 9,
      price: 200.0
    }),
    OrderItem.create({
      orderId: 4,
      productId: 10,
      price: 500.0
    }),
    OrderItem.create({
      orderId: 4,
      productId: 11,
      price: 200.0
    }),
    OrderItem.create({
      orderId: 4,
      productId: 12,
      price: 900.0
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
