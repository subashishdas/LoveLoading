import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ReactHowler from "react-howler";

const logsnag = new LogSnag({
  token: "LOGSNAG_TOKEN",
  project: "PROJECT_NAME",
});

const track = async () => {
  await logsnag.track({
    channel: "yes",
    event: "Valentine's Day",
    description: "She said yes!",
    icon: "💖",
    notify: true,
  });
};

const steps = [
  {
    content: "Hey beautiful, I have something special to tell you...",
    image: "/images/one.png",
    music: "/music/step1.mp3",
  },
  {
    content: "From the moment we met, you've been on my mind every single day.",
    image: "/images/two.png",
    music: "/music/step2.mp3",
  },
  {
    content:
      "Every little moment with you feels magical, like a dream I never want to wake up from.",
    image: "/images/three.png",
    music: "/music/step3.mp3",
  },
  {
    content:
      "You make me smile in ways I never imagined, and my heart races every time I see you.",
    image: "/images/four.png",
    music: "/music/step4.mp3",
  },
  {
    content:
      "I cherish every laugh, every conversation, and every moment we share together.",
    image: "/images/five.png",
    music: "/music/step5.mp3",
  },
  {
    content: "So today, I want to ask you something straight from my heart…",
    image: "/images/six.png",
    music: "/music/step6.mp3",
  },
  {
    content: "Will you be my Valentine?",
    image: "/images/seven.png",
    music: "/music/step7.mp3",
  },
];

const SecretMessage = ({ showSecret }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute top-5 right-5 bg-white p-4 text-red-500 rounded-lg shadow-lg font-semibold z-50"
  >
    You are Cute 🫣❤️
  </motion.div>
);

const ConfettiAnimation = ({ width, height }) => {
  const [showSecret, setShowSecret] = useState(false);

  const handleShowSecret = () => {
    setShowSecret(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-[#FFC5D3]"
    >
      <Confetti width={width} height={height} />
      <div className="h-full flex flex-col items-center justify-center space-y-8">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-white text-5xl font-bold animate-pulse"
        >
          Yayyyyyyy!!!!!
        </motion.h1>
        <motion.img
          src="/images/yayyyy.png"
          alt="Happy"
          className="w-48 animate-bounce"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.5, type: "spring" }}
        />

        {/* Button to open secret message */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShowSecret}
          className="bg-white text-[#FFC5D3] py-4 px-8 text-xl rounded-2xl w-full max-w-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Reveal Secret Message
        </motion.button>
      </div>

      {/* Secret Message */}
      {showSecret && <SecretMessage showSecret={showSecret} />}
    </motion.div>
  );
};

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sheSaidYes, setSheSaidYes] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "pookie") {
        setShowSecret(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFC5D3] overflow-hidden">
      <ReactHowler src={steps[currentStep].music} playing loop />

      {/* Particles Background */}
      <div className="absolute inset-0">
        <Particles
          options={{
            particles: {
              number: { value: 50 },
              move: { speed: 1 },
              shape: { type: "heart" },
              color: { value: "#ffffff" },
              opacity: { value: 0.5 },
            },
          }}
          init={loadFull}
        />
      </div>

      {/* Secret Message */}
      {showSecret && <SecretMessage showSecret={showSecret} />}

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center space-y-8 py-12">
          <motion.img
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={steps[currentStep].image}
            alt="Step Image"
            className="w-48 h-48 object-contain"
          />

          <motion.div
            key={`text-${currentStep}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-h-[120px] text-white font-josefin text-3xl md:text-4xl font-bold text-center px-4"
          >
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                strings: [steps[currentStep].content],
              }}
            />
          </motion.div>

          {currentStep < steps.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-[#FFC5D3] py-4 px-8 text-xl rounded-2xl w-full max-w-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                setSheSaidYes(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-4 px-8 text-xl rounded-2xl w-full max-w-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Yes
            </motion.button>
          )}
        </div>
      </div>

      {/* Success Animation */}
      {sheSaidYes && <ConfettiAnimation width={width} height={height} />}
    </div>
  );
};

export default App;
