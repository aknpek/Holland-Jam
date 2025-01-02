"use client"

import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-black text-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-indigo-400">About us</p>
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Bringing Amsterdam's Music Scene to Life
          </h1>
          <p className="mt-6 text-balance text-xl/8 text-gray-300">
            At Holland Jam, we're passionate about creating spaces for musicians to connect, collaborate, and showcase their talents through OpenMics, Jam sessions, and various musical events throughout Amsterdam.
          </p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-white">Our mission</h2>
            <p className="mt-6 text-base/7 text-gray-300">
              Our journey began with a simple idea: to foster a community of musicians and music lovers in the heart of Amsterdam. Today, we're proud to be at the forefront of the city's dynamic music culture, offering a platform for both emerging and established artists to express themselves and grow their craft.
            </p>
            <p className="mt-8 text-base/7 text-gray-300">
              We believe in the power of live music to bring people together. Our events range from intimate acoustic sessions in cozy cafes to energetic jam nights in bustling venues. We cater to all genres and styles, embracing the diversity that makes Amsterdam's music scene so unique and exciting.
            </p>
          </div>
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  alt="Musicians jamming together"
                  src="https://picsum.photos/seed/hollandjam1/560/560"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-white/10 lg:-mt-40">
                <Image
                  alt="Singer performing at an open mic"
                  src="https://picsum.photos/seed/hollandjam2/560/560"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  alt="Crowd enjoying a concert"
                  src="https://picsum.photos/seed/hollandjam3/560/560"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-white/10 lg:-mt-40">
                <Image
                  alt="DJ performing at a Holland Jam event"
                  src="https://picsum.photos/seed/hollandjam4/560/560"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-400">The numbers</p>
            <hr className="mt-6 border-t border-gray-800" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-800 pb-4">
                <dt className="text-sm/6 text-gray-400">Events Hosted</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-white">
                  <span>500</span>+
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-800 pb-4">
                <dt className="text-sm/6 text-gray-400">Musicians Featured</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-white">
                  <span>2</span>K+
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-800 max-sm:pb-4">
                <dt className="text-sm/6 text-gray-400">Venues Partnered</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-white">
                  <span>50</span>+
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-400">Happy Attendees</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-white">
                  <span>100</span>K+
                </dd>
              </div>
            </dl>
          </div>
        </section>
        
        <section className="mt-20">
          <h2 className="text-3xl font-semibold text-white mb-8">Our Events</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="jams" className="border-b border-gray-800">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-indigo-400">Jams at Holland Jam</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p className="mb-4">
                  Welcome to the heart of Holland Jam - our legendary jam sessions! These vibrant, impromptu musical gatherings are where the magic truly happens. Our jams bring together musicians of all levels and backgrounds, creating a melting pot of creativity and spontaneity.
                </p>
                <p className="mb-4">
                  At a Holland Jam session, you'll experience the thrill of live, unscripted music creation. Whether you're a seasoned pro or a passionate beginner, our jams offer a supportive environment to express yourself, collaborate with others, and push your musical boundaries.
                </p>
                <h3 className="text-lg font-semibold text-white mt-6 mb-2">What to expect:</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>A welcoming, inclusive atmosphere for musicians of all skill levels</li>
                  <li>High-quality instruments and equipment available for use</li>
                  <li>Experienced hosts to guide the session and ensure everyone gets a chance to shine</li>
                  <li>Opportunities to network and form new musical partnerships</li>
                  <li>A supportive audience of fellow musicians and music lovers</li>
                </ul>
                <p>
                  Remember, at Holland Jam, every jam session is a unique journey of musical discovery. Come with an open mind, your instrument (or use ours), and let's make some unforgettable music together!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="openmics" className="border-b border-gray-800">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-indigo-400">Open Mics at Holland Jam</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p className="mb-4">
                  Step into the spotlight at Holland Jam's Open Mic nights! Our open mics are the perfect platform for artists of all kinds to showcase their talent, test new material, and connect with Amsterdam's diverse music community.
                </p>
                <p className="mb-4">
                  Whether you're a singer-songwriter, poet, comedian, or any other type of performer, our open mic nights provide a supportive and encouraging environment to share your art. It's a place where creativity flourishes, new talents are discovered, and the unexpected becomes extraordinary.
                </p>
                <h3 className="text-lg font-semibold text-white mt-6 mb-2">What sets us apart:</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>A diverse range of performances from music to spoken word and beyond</li>
                  <li>High-quality sound system and stage setup</li>
                  <li>Friendly, attentive audiences eager to discover new talent</li>
                  <li>Networking opportunities with fellow performers and industry professionals</li>
                  <li>Constructive feedback and encouragement from our experienced hosts</li>
                  <li>Potential for future bookings at Holland Jam events</li>
                </ul>
                <p>
                  Remember, at Holland Jam's Open Mics, every voice matters. Bring your talent, your enthusiasm, and let's create some magical moments together!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  )
}

