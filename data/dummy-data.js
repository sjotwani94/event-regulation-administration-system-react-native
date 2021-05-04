import Category from '../models/Category';
import Destination from '../models/Destination';
import LiveShowDetails from '../models/LiveShowDetails';
import Bookings from '../models/Bookings';

export const CATEGORIES = [
  new Category('c1', 'Birthday', require("../assets/birthday.jpg")),
  new Category('c2', 'Ceremony', require("../assets/ceremony.jpg")),
  new Category('c3', 'Live Concerts', require("../assets/concert.jpg")),
  new Category('c4', 'Stay At Hotels', require("../assets/hotels.jpg")),
  new Category('c5', 'Live Shows', require("../assets/liveshows.jpg")),
  new Category('c6', 'Wedding', require("../assets/marriage.jpg")),
  new Category('c7', 'Lunch/Dinner Gathering', require("../assets/restaurant.jpg")),
  new Category('c8', 'Tourist Places', require("../assets/tourism.jpg"))
];

export const DESTINATIONS = [
  new Destination(
    'd1',
    'n9u4bf9f777dsaaa',
    'nullified',
    ['c1', 'c7'],
    'Pizza Hut',
    'Ahmedabad, Gujarat, India',
    'Lake, TP No 1, 3rd Floor, Alpha One Mall FP No 216, Vastrapur, Ahmedabad, Gujarat 380015',
    '1800 202 2022',
    'Family-friendly chain known for its made-to-order pizzas, with all available options like Dine-in, Takeaway & Delivery',
    'https://lh3.googleusercontent.com/ZvLtFevkKlZkqCR75KGgnMjkOI_vyIJ4ZV_D8qcdhb9oq1VG0k2L2mJjrKdEuDowMaPvNKSvWhiM7kHHt0kaibUs4Io=w1000',
    8.2,
    2637,
    false,
    [
      {
        name: 'Unlimited Veg Pizzas & Pepsi',
        price: 249
      },
      {
        name: 'Unlimited Non-Veg Pizzas & Pepsi',
        price: 299
      },
      {
        name: 'Super Value Deal: 2 Medium Pizzas',
        price: 599
      },
      {
        name: 'WOW Everyday Value: 2 Personal Pan Pizzas',
        price: 199
      }
    ]
  ),

  new Destination(
    'd2',
    'n9u4bf9nubezw9ub',
    'nullified',
    ['c1', 'c7'],
    'Iscon Thal',
    'Ahmedabad, Gujarat, India',
    'SF-1, Rudra Applis, Above Aishwarya Show Room, Iscon Circle S.G. Road, Satellite, Bodakdev, Ahmedabad, Gujarat 380059',
    '079 4895 5999',
    'We are pioneer in Gujarati thali, Must try our delicious pure gujarati food We also have good option for takeaway and delivery for our Gujarati thali for Family and corporate people we locate at heart of city like S G road, Iscon cross road',
    'https://i.ytimg.com/vi/8LwU_j3MvWo/maxresdefault.jpg',
    9.2,
    2355,
    true,
    [
      {
        name: 'Unlimited Gujarati Thali (Adult)',
        price: 330
      },
      {
        name: 'Unlimited Gujarati Thali (Kids)',
        price: 189
      }
    ]
  ),

  new Destination(
    'd3',
    'n9u488888gfb39ub',
    'nullified',
    ['c1', 'c2', 'c6', 'c7'],
    'Angat 22 The Restaurant & Banquet',
    'Ahmedabad, Gujarat, India',
    '1st Floor, Daffodils Plaza, Gala Gymkhana Rd, Chittavan, South Bopal, Bopal, Ahmedabad, Gujarat 380058',
    '099744 33222',
    'Angat 22 The Restaurant and Banquet is a prime venue to host your special events in the city of Ahmedabad. Angat 22 The Restaurant and Banquet is a wedding venue for a private and intimate gathering of your loved ones. The well made banquet combined with good food facilities and professional staff are all available at this venue for weddings in Ahmedabad. They also offer the facility of DJ and décor. All your party needs under one roof- that’s what Angat 22 The Restaurant and Banquet, Bopal aims for. The Restaurant and Banquet offers its clients an extensive menu of a variety of cuisines for their special functions. The starting price of their party menu is 325 INR per plate.',
    'https://media.weddingz.in/images/640e91e4982c55929c0a827dc6ffe4f9/angat-22-the-restaurant-and-banquet-angat-22-the-restaurant-and-banquet-hall-8.jpg',
    8.2,
    1084,
    true,
    [
      {
        name: 'Unlimited Lunch (Adult)',
        price: 260
      },
      {
        name: 'Unlimited Lunch (Kids)',
        price: 210
      },
      {
        name: 'Unlimited Dinner (Adult)',
        price: 315
      },
      {
        name: 'Unlimited Dinner (Kids)',
        price: 250
      }
    ]
  ),

  new Destination(
    'd4',
    'n9u8ghfss9ufb39ub',
    'nullified',
    ['c2', 'c6'],
    'KRC Lawn',
    'Nagpur, Maharashtra, India',
    'KRC Lawn, Hanuman Mandir, Ring Road, Anant Nagar, Nagpur, Maharashtra 440013',
    '+912249668237',
    'A sprawling outdoor destination perfect to tie the knot with love of your life. A well-manicured lawn able to smoothly accommodate a large gathering for your function. Ideal to host your outdoor wedding and reception ceremonies. The venue comes to life when decorated with canopies, carnations, and eclectic light fixtures. The in-house caterers serve multi-cuisine delicacies in the vegetarian and non-vegetarian menu to their guests. It also allows you to get your own caterer from outside to serve your favorite cuisines. It also provides you with professional decor artists to take care of every minute detail and help you achieve the dream ambiance you desire.',
    'https://media.weddingz.in/images/af2690e201659bb2851c60b39eba87a8/krc-lawn-anant-nagar-nagpur.jpg',
    7.8,
    1700,
    false,
    [
      {
        name: 'Vegetarian Dish/Plate',
        price: 400
      },
      {
        name: 'Non-Vegetarian Dish/Plate',
        price: 500
      }
    ]
  ),

  new Destination(
    'd5',
    'n9u4bf9f9jjhheub',
    'nullified',
    ['c8'],
    'Kankaria Lake',
    'Ahmedabad, Gujarat, India',
    'Himmatnagar Village, Maninagar Area, Ahmedabad, Gujarat, 380022, India',
    '079 2546 3415',
    'Kankaria Lake is the second largest lake in Ahmedabad, Gujarat, India. It is located in the south-eastern part of the city, in the Maninagar area. A lakefront is developed around it, which has many public attractions such as a zoo, toy train, kids city, tethered balloon ride, water rides, water park, food stalls, and entertainment facilities. The lakefront was revamped in 2007–2008. Kankaria Carnival is a week-long festival held here in the last week of December. Many cultural, art, and social activities are organised during the carnival.',
    'https://ahmedabadtourism.in/images/places-to-visit/headers/kankaria-lake-ahmedabad-entry-fee-timings-holidays-reviews-header.jpg',
    9.0,
    10000,
    null,
    [
      {
        name: 'Entry Fee Per Adult',
        price: 25
      },
      {
        name: 'Entry Fee Per Children',
        price: 10
      },
      {
        name: 'Entry Fee for Senior Citizens & Children below 3 years of age',
        price: 0
      },
      {
        name: 'Entry Fee Per Person for Educational trip',
        price: 1
      }
    ]
  ),

  new Destination(
    'd6',
    'n9u4bf9f9ufb39ub',
    'nullified',
    ['c8'],
    'Nagoa Beach Diu',
    'Diu, Diu Island, India',
    'Near Bucharwada Village, Diu, Daman and Diu, 362520, India',
    '079 2546 3415',
    'Nagoa Beach is amongst the most famous attractions of Diu and also one of the tourist places in Diu; for its unsullied beauty, white sand and oscillating palms. The beach is a part of the Nagoa hamlet in Bucharwada Village and is a few kilometres from the main town. It is an ideal place to rejuvenate oneself and get tourists from all over the world visiting. Due to its popularity, the beach has plenty of resorts nearby and some even on the beach, giving you a relaxed and comfortable experience. Many water activities are being offered that further add to the holiday escapade. If you are not an adventurous person, you can still laze around the beach, sunbathing, strolling and swimming in the clear water.',
    'https://cdn1.goibibo.com/voy_ing/t_g/069c051adae911e6ac090a209fbd0127.png',
    8.8,
    2600,
    null,
    [
      {
        name: 'Entry Fee',
        price: 0
      },
      {
        name: 'Speed Boat',
        price: 200
      },
      {
        name: 'Jet Ski',
        price: 500
      },
      {
        name: 'Banana Boat',
        price: 300
      },
      {
        name: 'Hot Air Balloon',
        price: 1000
      },
      {
        name: 'Dolphin Trip',
        price: 2500
      },
      {
        name: 'Parasailing',
        price: 1200
      }
    ]
  )
];

export const LIVE_SHOWS_CONCERTS = [
  new LiveShowDetails(
    'ls1',
    'c3',
    'EDM Night with Lost Stories & Zaeden',
    [
      'Lost Stories',
      'Zaeden'
    ],
    'Music/EDM/English',
    'Cuba Libre Phoenix Mall, Goa, India',
    '1800 202 2022',
    '1844 798 3292',
    'As December passes by the last few memorable moments of the year, Cuba Libre Phoenix Mall presents to you a spectacular eve of elegance as they welcome all the city-fashionista to be a part of this super energy filled night as Lost Stories & Zaeden takes over control to ensure that everybody moves to the grooves.',
    'July 31, 2021 08:00 PM to 01:00 AM',
    'https://loudest.in/wp-content/uploads/2018/05/OyHRU-Q3Ob4ru5bYexUlhkW3cAuec0fZ1zuSvDhfEVyJbi1PMEt3dZgcnn7gqVOhMvP5CtaOKh8w1366-h693.jpg',
    [
      {
        name: 'Single Entry',
        price: 1000
      },
      {
        name: 'Couple Entry',
        price: 1500
      },
      {
        name: 'Group of 5 Entry',
        price: 3500
      }
    ],
    true
  ),

  new LiveShowDetails(
    'ls2',
    'c3',
    'BDM Night with DJ Chetas & Lijo George',
    [
      'DJ Chetas',
      'Lijo George'
    ],
    'Music/Bollywood/EDM',
    'Toy Beach Club, Goa, India',
    '1800 202 2022',
    '1844 798 3292',
    'Toy Beach club is India’s first luxurious beach club on the Candolim beach Goa. The toy is an entire arena of the luxury class, Insta worthy ambiance, lip-smacking food, eye-catching view, and some really great vibes. Toy club turned 2 and we are celebrating with India\'s Best Bollywood Artist, Presenting the Mashup King of India - DJ Chetas.',
    'August 29, 2021 08:00 PM to 02:00 AM',
    'https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-dj-chetas-at-toy-beach-club-goa-0-2021-2-24-t-11-31-18.jpg',
    [
      {
        name: 'Single Entry',
        price: 1000
      },
      {
        name: 'Couple Entry',
        price: 1500
      },
      {
        name: 'Group of 5 Entry',
        price: 3500
      }
    ],
    false
  ),

  new LiveShowDetails(
    'ls3',
    'c5',
    'Comedy Night with Abhishek Upmanyu',
    [
      'Abhishek Upmanyu'
    ],
    'Comedy',
    'Online Through WebEx',
    '1982 242 1842',
    '1844 908 8333',
    'Select Citywalk brings you, Laughathon Ft Abhishek Upmanyu, a stand-up comedy show, to give the capital their dose of laughter! Catch your favorite comedian as he sets to take over the stage and tickle your funny bone.',
    'April 29, 2021 06:00 PM to 07:15 PM',
    'https://media.insider.in/image/upload/c_crop,g_custom/v1609927117/ahx1bv9jzwit7p74szp7.jpg',
    [
      {
        name: 'Single Entry',
        price: 700
      }
    ],
    true
  ),

  new LiveShowDetails(
    'ls4',
    'c5',
    'Comedy Night with Aakash Mehta',
    [
      'Aakash Mehta',
      'Siddharth Dodeja'
    ],
    'Comedy',
    'Online Through Zoom',
    '1982 242 1842',
    '1844 908 8333',
    'Lasoon Live brings you, An hour of whacky jokes for chill folks on zoom!',
    'April 30, 2021 05:00 PM to 06:00 PM',
    'https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-aakash-mehta-live-on-zoom-0-2021-3-31-t-21-26-31.jpg',
    [
      {
        name: 'Single Entry',
        price: 450
      }
    ],
    true
  )
];

export const BOOKINGS = [
  new Bookings(
    'b1',
    'u1',
    'd1',
    'Birthday',
    30,
    'October 13, 2021 07:00:00 PM',
    'October 14, 2021 01:00:00 AM',
    [
      {
        name: 'Unlimited Veg Pizzas & Pepsi',
        price: 249,
        quantity: 15
      },
      {
        name: 'Unlimited Non-Veg Pizzas & Pepsi',
        price: 299,
        quantity: 15
      }
    ],
    8220
  ),
  new Bookings(
    'b2',
    'u2',
    'd3',
    'Ceremony',
    40,
    'November 29, 2021 06:00:00 PM',
    'November 30, 2021 01:00:00 AM',
    [
      {
        name: 'Unlimited Dinner (Adult)',
        price: 315,
        quantity: 25
      },
      {
        name: 'Unlimited Dinner (Kids)',
        price: 250,
        quantity: 15
      }
    ],
    11625
  ),
  new Bookings(
    'b3',
    'u1',
    'ls1',
    'Live Concerts',
    2,
    'July 31, 2021 08:00:00 PM',
    'August 01, 2021 01:00:00 AM',
    [
      {
        name: 'Couple Entry',
        price: 1500,
        quantity: 1
      }
    ],
    1500
  ),
  new Bookings(
    'b4',
    'u2',
    'ls2',
    'Live Concerts',
    5,
    'August 29, 2021 08:00:00 PM',
    'August 30, 2021 02:00:00 AM',
    [
      {
        name: 'Group of 5 Entry',
        price: 3500,
        quantity: 1
      }
    ],
    3500
  ),
  new Bookings(
    'b5',
    'u1',
    'ls3',
    'Live Shows',
    3,
    'April 29, 2021 06:00:00 PM',
    'April 29, 2021 07:15:00 PM',
    [
      {
        name: 'Single Entry',
        price: 700,
        quantity: 3
      }
    ],
    2100
  ),
  new Bookings(
    'b6',
    'u2',
    'ls4',
    'Live Shows',
    2,
    'April 30, 2021 05:00:00 PM',
    'April 30, 2021 06:00:00 PM',
    [
      {
        name: 'Single Entry',
        price: 450,
        quantity: 2
      }
    ],
    900
  )
];
