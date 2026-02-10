"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (accepted) {
      confetti({
        particleCount: 150,
        spread: 100,
      });
    }
  }, [accepted]);

  const moveNo = () => {
    setNoPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center overflow-hidden">
      <FloatingHearts />

      {!started ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-rose-700">Hey 😊</h1>
          <p className="mb-6 text-gray-700">I made something special...</p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Open ❤️
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-rose-600">
            Will you be my Valentine, Nikiata? 💕
          </h2>

          {!accepted ? (
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAccepted(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg shadow-lg"
              >
                Yes 😍
              </motion.button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const offsetX = e.clientX - rect.left - rect.width / 2;
                  const offsetY = e.clientY - rect.top - rect.height / 2;

                  setNoPos({
                    x: noPos.x - offsetX * 1.5,
                    y: noPos.y - offsetY * 1.5,
                  });
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white text-gray-700 px-5 py-2 rounded-lg border"
              >
                No 🙈
              </motion.button>
            </div>
          ) : (
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              className="text-rose-600 text-xl font-bold drop-shadow-md"
            >
              YAYYYY ❤️ Best Decision Ever!
            </motion.h3>
          )}
        </motion.div>
      )}
    </main>
  );
}

/* Floating Hearts From Bottom */

function FloatingHearts() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 16,
        duration: Math.random() * 4 + 4,
      };

      setHearts((prev) => [...prev.slice(-40), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "100vh", x: `${h.left}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{ duration: h.duration, ease: "linear" }}
          className="absolute"
          style={{ fontSize: h.size }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
