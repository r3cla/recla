import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Heart, BanknoteIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.5
      }
    }
  };

  // Animation variant for cards with a slight bounce
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="py-20 md:py-32 bg-white overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
          variants={itemVariants}
        >
          Hi, I'm Nathan
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          I'm a web developer passionate about crafting exceptional digital experiences 
          that empower businesses to thrive online, without breaking the bank.
        </motion.p>
        
        {/* Value Propositions */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center space-x-4 text-left p-4 rounded-lg bg-gray-50 transform-gpu"
            variants={cardVariants}
          >
            <Globe className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Global Reach</h3>
              <p className="text-gray-600">Serving clients in NZ and worldwide with quality web solutions</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4 text-left p-4 rounded-lg bg-gray-50 transform-gpu"
            variants={cardVariants}
          >
            <Heart className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Community Focus</h3>
              <p className="text-gray-600">Special rates for NZ non-profits to amplify their impact</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4 text-left p-4 rounded-lg bg-gray-50 transform-gpu"
            variants={cardVariants}
          >
            <BanknoteIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Affordable Solutions</h3>
              <p className="text-gray-600">Competitive pricing tailored to your business needs</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Button size="lg" className="min-w-[160px]">
              View My Work
            </Button>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button size="lg" variant="outline" className="min-w-[160px]">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

