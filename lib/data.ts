import { addDays, setHours, setMinutes } from 'date-fns'

export type Event = {
  id: string
  title: string
  type: 'jam' | 'open-mic' | 'concert' | 'workshop'
  date: string
  time: string
  location: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  organizer: {
    id: string
    name: string
    role: 'organizer'
    image: string
    bio: string
  }
  description: string
  image: string
  previewImage: string
  status?: 'sold-out' | 'available'
  viewCount: number
  price: number
  capacity: number
  genre: string[]
}

export type Person = {
  id: string
  name: string
  role: 'organizer' | 'musician'
  image: string
  bio: string
  instruments?: string[]
  events?: string[]
}

// Helper function to generate a random future date
const randomFutureDate = (startDate: Date = new Date()) => {
  const daysToAdd = Math.floor(Math.random() * 30) // Random number of days to add (0-29)
  return addDays(startDate, daysToAdd)
}

// Helper function to generate a random time
const randomTime = () => {
  const hours = Math.floor(Math.random() * (23 - 18 + 1)) + 18 // Random hour between 18-23
  const minutes = Math.random() < 0.5 ? 0 : 30 // Either 00 or 30 minutes
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Amsterdam Jazz Jam',
    type: 'jam',
    date: '2024-12-22',
    time: '20:00',
    location: 'The Jazz Cafe',
    address: 'Leidseplein 10, 1017 PT Amsterdam',
    coordinates: {
      lat: 52.3636,
      lng: 4.8824
    },
    organizer: {
      id: '1',
      name: 'Sarah van der Berg',
      role: 'organizer',
      image: 'https://picsum.photos/seed/sarah-van-der-berg/200/200',
      bio: 'Jazz enthusiast and event organizer with 10 years of experience in the Amsterdam music scene.'
    },
    description: 'Join us for a night of improvisational jazz. All skill levels welcome!',
    image: 'https://picsum.photos/seed/event-1/1200/800',
    previewImage: 'https://picsum.photos/seed/event-1-preview/400/300',
    status: 'available',
    viewCount: 1547,
    price: 10.00,
    capacity: 100,
    genre: ['Jazz', 'Improvisation']
  },
  {
    id: '2',
    title: 'Open Mic Night at Waterhole',
    type: 'open-mic',
    date: '2024-12-31',
    time: '21:00',
    location: 'Waterhole',
    address: 'Korte Leidsedwarsstraat 49, 1017 PW Amsterdam',
    coordinates: {
      lat: 52.3639,
      lng: 4.8818
    },
    organizer: {
      id: '2',
      name: 'Mike de Vries',
      role: 'organizer',
      image: 'https://picsum.photos/seed/mike-de-vries/200/200',
      bio: 'Passionate about giving new talents a stage. Running open mic nights for over 5 years.'
    },
    description: 'Show off your talent at our New Year\'s Eve open mic night!',
    image: 'https://picsum.photos/seed/event-2/1200/800',
    previewImage: 'https://picsum.photos/seed/event-2-preview/400/300',
    status: 'available',
    viewCount: 2891,
    price: 5.00,
    capacity: 150,
    genre: ['Various']
  },
  {
    id: '3',
    title: 'Rock Jam Session',
    type: 'jam',
    date: '2025-01-15',
    time: '19:30',
    location: 'The Cave',
    address: 'Prinsengracht 472, 1017 KG Amsterdam',
    coordinates: {
      lat: 52.3676,
      lng: 4.8841
    },
    organizer: {
      id: '3',
      name: 'Lisa Jansen',
      role: 'organizer',
      image: 'https://picsum.photos/seed/lisa-jansen/200/200',
      bio: 'Rock music lover and promoter. Organizing jam sessions and concerts since 2015.'
    },
    description: 'Bring your instruments and rock out with fellow musicians!',
    image: 'https://picsum.photos/seed/event-3/1200/800',
    previewImage: 'https://picsum.photos/seed/event-3-preview/400/300',
    status: 'available',
    viewCount: 983,
    price: 8.00,
    capacity: 80,
    genre: ['Rock', 'Alternative']
  },
  {
    id: '4',
    title: 'Acoustic Open Mic',
    type: 'open-mic',
    date: '2025-02-01',
    time: '20:00',
    location: 'Cafe de Koe',
    address: 'Marnixstraat 381, 1017 PJ Amsterdam',
    coordinates: {
      lat: 52.3664,
      lng: 4.8796
    },
    organizer: {
      id: '4',
      name: 'Tom Bakker',
      role: 'organizer',
      image: 'https://picsum.photos/seed/tom-bakker/200/200',
      bio: 'Acoustic guitar player and cafe owner. Hosting open mic nights to support local talents.'
    },
    description: 'A cozy evening of acoustic performances. Sign up on arrival.',
    image: 'https://picsum.photos/seed/event-4/1200/800',
    previewImage: 'https://picsum.photos/seed/event-4-preview/400/300',
    status: 'available',
    viewCount: 1245,
    price: 0,
    capacity: 50,
    genre: ['Acoustic', 'Folk']
  },
  {
    id: '5',
    title: 'Electronic Music Workshop',
    type: 'workshop',
    date: '2025-02-15',
    time: '14:00',
    location: 'Q-Factory',
    address: 'Atlantisplein 1, 1093 NE Amsterdam',
    coordinates: {
      lat: 52.3599,
      lng: 4.9346
    },
    organizer: {
      id: '5',
      name: 'Emma Visser',
      role: 'organizer',
      image: 'https://picsum.photos/seed/emma-visser/200/200',
      bio: 'Electronic music producer and educator. Passionate about teaching music production to beginners.'
    },
    description: 'Learn the basics of electronic music production in this hands-on workshop.',
    image: 'https://picsum.photos/seed/event-5/1200/800',
    previewImage: 'https://picsum.photos/seed/event-5-preview/400/300',
    status: 'available',
    viewCount: 1876,
    price: 45.00,
    capacity: 30,
    genre: ['Electronic', 'Production']
  },
  {
    id: '6',
    title: 'Blues Jam Night',
    type: 'jam',
    date: '2025-02-28',
    time: '21:00',
    location: 'Maloe Melo',
    address: 'Lijnbaansgracht 163, 1016 VX Amsterdam',
    coordinates: {
      lat: 52.3664,
      lng: 4.8831
    },
    organizer: {
      id: '6',
      name: 'David Cohen',
      role: 'organizer',
      image: 'https://picsum.photos/seed/david-cohen/200/200',
      bio: 'Blues guitarist and promoter. Has been running blues jams in Amsterdam for over a decade.'
    },
    description: 'Feel the blues at our monthly jam session. All blues lovers welcome!',
    image: 'https://picsum.photos/seed/event-6/1200/800',
    previewImage: 'https://picsum.photos/seed/event-6-preview/400/300',
    status: 'available',
    viewCount: 1123,
    price: 7.50,
    capacity: 70,
    genre: ['Blues']
  },
  {
    id: '7',
    title: 'Singer-Songwriter Showcase',
    type: 'concert',
    date: '2025-03-15',
    time: '20:00',
    location: 'Paradiso',
    address: 'Weteringschans 6-8, 1017 SG Amsterdam',
    coordinates: {
      lat: 52.3622,
      lng: 4.8835
    },
    organizer: {
      id: '7',
      name: 'Julia Bakker',
      role: 'organizer',
      image: 'https://picsum.photos/seed/julia-bakker/200/200',
      bio: 'Singer-songwriter and event organizer. Dedicated to promoting local musical talent.'
    },
    description: 'An evening featuring the best local singer-songwriters in Amsterdam.',
    image: 'https://picsum.photos/seed/event-7/1200/800',
    previewImage: 'https://picsum.photos/seed/event-7-preview/400/300',
    status: 'available',
    viewCount: 3456,
    price: 15.00,
    capacity: 250,
    genre: ['Singer-Songwriter', 'Acoustic']
  },
  // Add more events for December 22 and other dates
  {
    id: '8',
    title: 'Winter Solstice Jam',
    type: 'jam',
    date: '2024-12-22',
    time: '19:00',
    location: 'The Cosmic Lounge',
    address: 'Reguliersdwarsstraat 42, 1017 BM Amsterdam',
    coordinates: {
      lat: 52.3664,
      lng: 4.8897
    },
    organizer: {
      id: '8',
      name: 'Luna Starlight',
      role: 'organizer',
      image: 'https://picsum.photos/seed/luna-starlight/200/200',
      bio: 'Astrology enthusiast and music lover organizing cosmic-themed events.'
    },
    description: 'Celebrate the longest night of the year with soulful tunes and celestial vibes.',
    image: 'https://picsum.photos/seed/event-8/1200/800',
    previewImage: 'https://picsum.photos/seed/event-8-preview/400/300',
    status: 'available',
    viewCount: 2103,
    price: 15.00,
    capacity: 120,
    genre: ['Soul', 'R&B', 'Jazz']
  },
  {
    id: '9',
    title: 'Festive Folk Night',
    type: 'concert',
    date: '2024-12-22',
    time: '20:30',
    location: 'The Windmill',
    address: 'Zeedijk 14, 1012 AZ Amsterdam',
    coordinates: {
      lat: 52.3739,
      lng: 4.9003
    },
    organizer: {
      id: '9',
      name: 'Woody Strummer',
      role: 'organizer',
      image: 'https://picsum.photos/seed/woody-strummer/200/200',
      bio: 'Folk music enthusiast and promoter of acoustic talents.'
    },
    description: 'An evening of heartwarming folk music to get you in the holiday spirit.',
    image: 'https://picsum.photos/seed/event-9/1200/800',
    previewImage: 'https://picsum.photos/seed/event-9-preview/400/300',
    status: 'available',
    viewCount: 1876,
    price: 12.50,
    capacity: 80,
    genre: ['Folk', 'Acoustic']
  },
  // Add more events with randomized future dates
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${10 + i}`,
    title: `Event ${10 + i}`,
    type: ['jam', 'open-mic', 'concert', 'workshop'][Math.floor(Math.random() * 4)] as 'jam' | 'open-mic' | 'concert' | 'workshop',
    date: randomFutureDate().toISOString().split('T')[0],
    time: randomTime(),
    location: `Venue ${10 + i}`,
    address: `Address ${10 + i}, Amsterdam`,
    coordinates: {
      lat: 52.3676 + (Math.random() - 0.5) * 0.1,
      lng: 4.9041 + (Math.random() - 0.5) * 0.1
    },
    organizer: {
      id: `${10 + i}`,
      name: `Organizer ${10 + i}`,
      role: 'organizer',
      image: `https://picsum.photos/seed/organizer-${10 + i}/200/200`,
      bio: `Bio for Organizer ${10 + i}`
    },
    description: `Description for Event ${10 + i}`,
    image: `https://picsum.photos/seed/event-${10 + i}/1200/800`,
    previewImage: `https://picsum.photos/seed/event-${10 + i}-preview/400/300`,
    status: Math.random() > 0.8 ? 'sold-out' : 'available',
    viewCount: Math.floor(Math.random() * 3000) + 500,
    price: Math.floor(Math.random() * 30) + 5,
    capacity: Math.floor(Math.random() * 200) + 50,
    genre: ['Rock', 'Pop', 'Jazz', 'Classical', 'Electronic'].sort(() => 0.5 - Math.random()).slice(0, 2)
  }))
]

export const people: Person[] = [
  {
    id: '1',
    name: 'Sarah van der Berg',
    role: 'organizer',
    image: 'https://picsum.photos/seed/sarah-van-der-berg/200/200',
    bio: 'Jazz enthusiast and event organizer with 10 years of experience in the Amsterdam music scene.',
    events: ['1']
  },
  {
    id: '2',
    name: 'Mike de Vries',
    role: 'organizer',
    image: 'https://picsum.photos/seed/mike-de-vries/200/200',
    bio: 'Passionate about giving new talents a stage. Running open mic nights for over 5 years.',
    events: ['2']
  },
  {
    id: '3',
    name: 'Lisa Jansen',
    role: 'organizer',
    image: 'https://picsum.photos/seed/lisa-jansen/200/200',
    bio: 'Rock music lover and promoter. Organizing jam sessions and concerts since 2015.',
    events: ['3']
  },
  {
    id: '4',
    name: 'Tom Bakker',
    role: 'organizer',
    image: 'https://picsum.photos/seed/tom-bakker/200/200',
    bio: 'Acoustic guitar player and cafe owner. Hosting open mic nights to support local talents.',
    events: ['4']
  },
  {
    id: '5',
    name: 'Emma Visser',
    role: 'organizer',
    image: 'https://picsum.photos/seed/emma-visser/200/200',
    bio: 'Electronic music producer and educator. Passionate about teaching music production to beginners.',
    events: ['5']
  },
  {
    id: '6',
    name: 'David Cohen',
    role: 'organizer',
    image: 'https://picsum.photos/seed/david-cohen/200/200',
    bio: 'Blues guitarist and promoter. Has been running blues jams in Amsterdam for over a decade.',
    events: ['6']
  },
  {
    id: '7',
    name: 'Julia Bakker',
    role: 'organizer',
    image: 'https://picsum.photos/seed/julia-bakker/200/200',
    bio: 'Singer-songwriter and event organizer. Dedicated to promoting local musical talent.',
    events: ['7']
  },
  {
    id: '8',
    name: 'Luna Starlight',
    role: 'organizer',
    image: 'https://picsum.photos/seed/luna-starlight/200/200',
    bio: 'Astrology enthusiast and music lover organizing cosmic-themed events.'
  },
  {
    id: '9',
    name: 'Woody Strummer',
    role: 'organizer',
    image: 'https://picsum.photos/seed/woody-strummer/200/200',
    bio: 'Folk music enthusiast and promoter of acoustic talents.'
  },
  {
    id: '10',
    name: 'Liam van Dijk',
    role: 'musician',
    image: 'https://picsum.photos/seed/liam-van-dijk/200/200',
    bio: 'Versatile guitarist proficient in jazz, rock, and blues. Regular performer at local jam sessions.',
    instruments: ['Guitar', 'Bass']
  },
  {
    id: '11',
    name: 'Sophie Mulder',
    role: 'musician',
    image: 'https://picsum.photos/seed/sophie-mulder/200/200',
    bio: 'Classically trained pianist with a love for jazz improvisation.',
    instruments: ['Piano', 'Keyboards']
  },
  {
    id: '12',
    name: 'Daan de Boer',
    role: 'musician',
    image: 'https://picsum.photos/seed/daan-de-boer/200/200',
    bio: 'Drummer with experience in various genres, from rock to electronic music.',
    instruments: ['Drums', 'Percussion']
  },
  {
    id: '13',
    name: 'Eva Müller',
    role: 'musician',
    image: 'https://picsum.photos/seed/eva-muller/200/200',
    bio: 'Classically trained violinist with a passion for experimental electronic music.',
    instruments: ['Violin', 'Synthesizer']
  },
  {
    id: '14',
    name: 'Jack Thompson',
    role: 'musician',
    image: 'https://picsum.photos/seed/jack-thompson/200/200',
    bio: 'Versatile saxophonist experienced in jazz, funk, and soul music.',
    instruments: ['Saxophone', 'Clarinet']
  },
  {
    id: '15',
    name: 'Maria Rodriguez',
    role: 'musician',
    image: 'https://picsum.photos/seed/maria-rodriguez/200/200',
    bio: 'Flamenco guitarist and vocalist, bringing the passion of Spanish music to Amsterdam.',
    instruments: ['Guitar', 'Vocals']
  },
  {
    id: '16',
    name: 'Yuki Tanaka',
    role: 'musician',
    image: 'https://picsum.photos/seed/yuki-tanaka/200/200',
    bio: 'Experimental electronic musician and sound designer, blending traditional Japanese instruments with modern technology.',
    instruments: ['Synthesizer', 'Koto', 'Shamisen']
  },
  {
    id: '17',
    name: 'Oliver Schmidt',
    role: 'musician',
    image: 'https://picsum.photos/seed/oliver-schmidt/200/200',
    bio: 'Versatile session drummer with experience in rock, pop, and jazz genres.',
    instruments: ['Drums', 'Percussion']
  }
]

