
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Target, Heart, Plus, Minus } from 'lucide-react';
import Image from '../assets/ab.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const faqVariants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const faqsData = [
  {
    question: "What are your operating hours?",
    answer: "We're open Monday through Friday from 5:00 AM to 11:00 PM, and weekends from 6:00 AM to 10:00 PM."
  },
  {
    question: "Do you offer trial memberships?",
    answer: "Yes! We offer a 7-day free trial that includes access to all facilities and one complimentary personal training session."
  },
  {
    question: "What safety protocols do you follow?",
    answer: "We maintain the highest cleanliness standards, provide sanitizing stations throughout the facility, and ensure all equipment is regularly maintained and cleaned."
  },
  {
    question: "Can I freeze my membership?",
    answer: "Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel."
  },
  {
    question: "Do you have parking available?",
    answer: "We provide free parking for all members with over 200 spaces available, including covered parking options."
  }
];

const AboutPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const coreValues = [
    {
      icon: Target,
      title: "Commitment to Goals",
      description: "We are relentlessly focused on helping you achieve your fitness milestones, providing the tools, support, and motivation you need to succeed.",
    },
    {
      icon: Award,
      title: "Excellence in Training",
      description: "Our certified trainers are leaders in the industry, dedicated to delivering the highest quality coaching and personalized workout plans.",
    },
    {
      icon: Heart,
      title: "A Welcoming Community",
      description: "We've built a supportive environment where every member is family. We celebrate victories together and lift each other up on the journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Image})`, backgroundAttachment: 'fixed' }}>
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        </div>
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
            Our <span className="text-red-500">Story</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md">
            More than a gym, we're a community dedicated to transformation.
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <motion.section
        className="py-24 bg-black relative"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
            variants={itemVariants}
          >
            A Vision Built on <span className="text-red-500">Passion</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            FFL Gym was founded on a simple belief: that fitness is a journey of self-improvement, not just a destination. We started with a mission to create a space that inspires, supports, and empowers individuals of all fitness levels to become the best versions of themselves. From our state-of-the-art facilities to our team of dedicated professionals, every aspect of our gym is designed to elevate your experience.
          </motion.p>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our <span className="text-red-500">Core Values</span>
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="mb-6">
                  <value.icon size={48} className="text-red-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <motion.section
        className="py-24 bg-black relative"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-8"
            variants={itemVariants}
          >
            Our <span className="text-red-500">Philosophy</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We believe that true fitness extends beyond the physical. It is a harmonious balance of mind, body, and community. Our approach integrates cutting-edge training methodologies with a supportive, inclusive environment, ensuring every member feels inspired to push their boundaries. We are committed to fostering a culture of positive change, one workout at a time.
          </motion.p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center leading-snug text-white mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Common <span className="text-red-500">Questions</span>
          </motion.h2>
          <div className="space-y-6">
            {faqsData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg md:text-xl font-semibold text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFaq === index ? (
                      <Minus size={24} className="text-red-500" />
                    ) : (
                      <Plus size={24} className="text-red-500" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      variants={faqVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-300 leading-relaxed pl-6 md:pl-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;