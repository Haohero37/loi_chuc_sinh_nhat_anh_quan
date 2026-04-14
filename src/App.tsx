import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, Sparkles, Volume2, VolumeX, Gift, Cake, PartyPopper, Camera, ChevronLeft, Play, Headphones } from 'lucide-react';

// Cấu hình ngày sinh nhật tại đây (Năm, Tháng, Ngày)
const BIRTHDAY_YEAR = 1998; // Năm sinh
const BIRTHDAY_MONTH = 4;    // Tháng 4
const BIRTHDAY_DAY = 14;   // Ngày 14

const GIFTS = [
  "Chúc bố tuổi mới luôn rạng rỡ và vững vàng! ☀️",
  "Mong mọi ước mơ của bố đều trở thành hiện thực. ✨",
  "Chúc bố luôn bình an và hạnh phúc bên hai mẹ con. 💖",
  "Mãi là người bố, người chồng tuyệt vời nhất nhé! 🎂",
  "Chúc bố sức khỏe dồi dào để làm chỗ dựa vững chắc cho gia đình. 🌸",
  "Mong bố gặt hái được nhiều thành công trong công việc. 💼",
  "Chúc gia đình mình có những chuyến đi thật thú vị cùng nhau. ✈️",
  "Mong nụ cười luôn nở trên môi bố mỗi ngày. 😊",
  "Chúc bố luôn khỏe mạnh và tràn đầy năng lượng. 💪",
  "Mong tình yêu của gia đình mình mãi mãi bền lâu. 👨‍👩‍👧",
  "Chúc bố luôn được yêu thương và trân trọng. 💎",
  "Món quà lớn nhất của bố chính là hai mẹ con em! 🎁"
];

const INTRO_PHOTOS = [
  `${import.meta.env.BASE_URL}gallery/8.jpg`,
  `${import.meta.env.BASE_URL}gallery/1.jpg`,
  `${import.meta.env.BASE_URL}gallery/9.jpg`,
  `${import.meta.env.BASE_URL}gallery/10.jpg`,
];

const MESSAGES = [
  {
    type: 'intro',
    title: "Chào bố, người đàn ông tuyệt vời của gia đình! ❤️",
    content: "Hai mẹ con có một điều nhỏ muốn dành tặng bố. Hãy nhấn nút phía dưới để bắt đầu nhé!",
    button: "Bắt đầu hành trình",
    bg: "from-blue-50 to-cyan-100"
  },
  {
    type: 'text',
    title: "Bố biết không?",
    content: "Mỗi ngày trôi qua, hai mẹ con lại thấy mình may mắn hơn một chút vì có bố bên cạnh.",
    button: "Tiếp tục nào",
    bg: "from-cyan-100 to-blue-200"
  },
  {
    type: 'photo_runner',
    title: "Khoảnh khắc của gia đình mình",
    content: "Những kỷ niệm ngọt ngào mà hai mẹ con luôn trân trọng và giữ gìn trong tim.",
    bg: "from-blue-100 to-indigo-100",
    images: [
      `${import.meta.env.BASE_URL}gallery/2.jpg`,
      `${import.meta.env.BASE_URL}gallery/3.jpg`,
      `${import.meta.env.BASE_URL}gallery/4.jpg`,
      `${import.meta.env.BASE_URL}gallery/5.jpg`,
      `${import.meta.env.BASE_URL}gallery/6.jpg`,
      `${import.meta.env.BASE_URL}gallery/7.jpg`,
    ],
    button: "Xem tiếp điều bất ngờ"
  },
  {
    type: 'birthday_intro',
    title: "Và đặc biệt hơn hết...",
    content: "AAA", // Sẽ được cập nhật động dựa trên ngày sinh nhật
    button: "Mở quà thôi nào! 🎁",
    bg: "from-amber-50 to-orange-100"
  },
  {
    type: 'birthday_gifts',
    title: "Những lời chúc đặc biệt bất ngờ",
    content: "Hãy trượt sang trái phải và nhấn vào từng hộp quà lời chúc để khám phá nhé!",
    bg: "from-orange-100 to-yellow-100",
    gifts: GIFTS,
    button: "Tiếp tục hành trình"
  },
  {
    type: 'text',
    title: "Dù mai sau thế nào",
    content: "Hai mẹ con vẫn muốn luôn nắm tay bố, cùng gia đình mình đi qua mọi buồn vui trong cuộc sống.",
    button: "Còn nữa nè...",
    bg: "from-indigo-100 to-blue-200"
  },
  {
    type: 'audio_wishes',
    title: "Lời chúc từ hai mẹ con 🎧",
    content: "Hãy nhấn vào nút bên dưới để nghe những lời chúc bí mật nhé!",
    button: "Tiếp tục",
    bg: "from-blue-100 to-cyan-200"
  },
  {
    type: 'final',
    title: "Cả nhà yêu bố! 💖",
    content: "Cảm ơn bố đã là chỗ dựa vững chắc cho hai mẹ con. Mãi bên nhau bố nhé!",
    button: "Quay lại từ đầu",
    bg: "from-blue-300 to-cyan-400",
    isFinal: true
  }
];

const flowerParticles = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 14 + Math.floor(Math.random() * 14),
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 10,
  drift: (Math.random() - 0.5) * 80,
}));

const FlowerFall = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {flowerParticles.map((p) => (
      <div
        key={p.id}
        className="absolute text-pink-300/60"
        style={{
          left: `${p.left}%`,
          top: '-40px',
          willChange: 'transform, opacity',
          animation: `flowerFall ${p.duration}s ${p.delay}s linear infinite`,
          '--drift': `${p.drift}px`,
        } as React.CSSProperties}
      >
        <Sparkles size={p.size} />
      </div>
    ))}
  </div>
);

const RadiatingBalloons = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      return {
        id: i,
        tx: `${tx}vw`,
        ty: `${ty}vh`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        size: 16 + Math.random() * 20,
        isHeart: Math.random() > 0.5
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.isHeart ? 'text-pink-400/60' : 'text-rose-300/60'}`}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            x: p.tx,
            y: p.ty,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.5, 1],
            rotate: 360
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          {p.isHeart ? <Heart size={p.size} fill="currentColor" /> : <Sparkles size={p.size} />}
        </motion.div>
      ))}
    </div>
  );
};

const FloatingHeart = ({ delay = 0, x = 0, size = 32 }: { delay?: number; x?: number; size?: number; key?: number }) => (
  <div
    className="absolute text-rose-300/40 pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: '-40px',
      willChange: 'transform, opacity',
      animation: `floatHeart ${7 + delay % 4}s ${delay % 6}s linear infinite`,
    }}
  >
    <Heart size={size} fill="currentColor" />
  </div>
);

const confettiParticles = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  duration: 3 + Math.random() * 3,
  delay: Math.random() * 5,
  color: ['#fb7185', '#f472b6', '#fbbf24', '#34d399', '#60a5fa'][i % 5],
  drift: (Math.random() - 0.5) * 60,
}));

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {confettiParticles.map((p) => (
      <div
        key={p.id}
        className="absolute w-3 h-3 rounded-sm"
        style={{
          left: `${p.left}%`,
          top: '-12px',
          backgroundColor: p.color,
          willChange: 'transform',
          animation: `confettiFall ${p.duration}s ${p.delay}s linear infinite`,
          '--drift': `${p.drift}px`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

// Component slideshow ảnh ở màn hình giới thiệu
const IntroPhotoSlideshow = ({ photos }: { photos: string[] }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % photos.length), 2500);
    return () => clearInterval(t);
  }, [photos.length]);
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white/60 mb-5">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={photos[current]}
          alt={`Ảnh ${current + 1}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dots indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const GiftSlider = ({ gifts, dismissedGifts, onOpenGift }: {
  gifts: string[],
  dismissedGifts: number[],
  onOpenGift: (message: string, index: number) => void,
}) => {
  const constraintsRef = useRef(null);

  const visibleGifts = gifts
    .map((msg, idx) => ({ msg, idx }))
    .filter(({ idx }) => !dismissedGifts.includes(idx));

  return (
    <div className="relative w-full overflow-hidden py-8 mb-4" ref={constraintsRef}>
      <motion.div
        drag="x"
        dragConstraints={{ left: -(visibleGifts.length * 140 - 300), right: 0 }}
        className="flex gap-6 px-4 cursor-grab active:cursor-grabbing w-max"
      >
        <AnimatePresence>
          {visibleGifts.map(({ idx }) => (
            <motion.div
              key={idx}
              layout
              exit={{ opacity: 0, scale: 0.5, width: 0, marginRight: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenGift(gifts[idx], idx)}
                className="w-32 h-32 relative group cursor-pointer drop-shadow-2xl"
              >
                {/* Thân hộp */}
                <div className="absolute bottom-2 w-24 h-20 bg-gradient-to-b from-rose-500 to-rose-600 rounded-b-xl left-1/2 -translate-x-1/2 overflow-hidden border-x-2 border-b-2 border-rose-700 shadow-inner">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-b from-yellow-300 to-yellow-500" />
                  <div className="absolute top-1/2 left-0 w-full h-6 -translate-y-1/2 bg-gradient-to-r from-yellow-300 to-yellow-500" />
                </div>
                {/* Nắp hộp */}
                <div className="absolute top-8 w-28 h-8 bg-gradient-to-b from-rose-400 to-rose-500 rounded-lg left-1/2 -translate-x-1/2 z-10 border-2 border-rose-600 shadow-md">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-b from-yellow-300 to-yellow-400" />
                </div>
                {/* Nơ */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 border-[6px] border-yellow-400 rounded-full rounded-tr-none -rotate-45 translate-x-2 shadow-sm bg-yellow-200/50" />
                  <div className="w-5 h-5 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full absolute z-20 shadow-md border border-yellow-600" />
                  <div className="w-10 h-10 border-[6px] border-yellow-400 rounded-full rounded-tl-none rotate-45 -translate-x-2 shadow-sm bg-yellow-200/50" />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex justify-center gap-2 mt-4 text-rose-400/60 animate-pulse">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Trượt để xem thêm</span>
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

const AudioWishes = ({ onPlay, onStop }: { onPlay: () => void; onStop: () => void }) => {
  const wishesData = [
    {
      name: "Hai mẹ con 🎙️",
      audioSrc: `${import.meta.env.BASE_URL}gallery/ghiam.m4a`,
      text: "Bấm play để nghe lời chúc sinh nhật gửi riêng đến bố! 🎂"
    }
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWish, setCurrentWish] = useState<typeof wishesData[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playRandomWish = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      onStop(); // tiếp tục nhạc nền
      return;
    }

    const randomWish = wishesData[Math.floor(Math.random() * wishesData.length)];
    setCurrentWish(randomWish);
    setIsPlaying(true);
    onPlay(); // tắt nhạc nền

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(randomWish.audioSrc);
    audioRef.current = newAudio;

    newAudio.onended = () => {
      setIsPlaying(false);
      onStop(); // tiếp tục nhạc nền khi ghi âm kết thúc
    };

    newAudio.play().catch(e => {
      console.error("Audio play failed:", e);
      setIsPlaying(false);
      onStop();
    });
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      onStop(); // đảm bảo nhạc nền resume khi rời trang
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={playRandomWish}
        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-colors ${isPlaying ? 'bg-indigo-100 text-indigo-400' : 'bg-indigo-500 text-white'}`}
      >
        {isPlaying ? <Volume2 size={40} className="animate-pulse" /> : <Play size={40} className="ml-2" />}
      </motion.button>
      <div className="h-32 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {currentWish && (
            <motion.div
              key={currentWish.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold shadow-sm">
                Từ: {currentWish.name}
              </span>
              <p className="text-indigo-700 font-medium italic px-4 text-center">
                "{currentWish.text}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BirthdayCountdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-2 my-4">
      {[
        { label: 'Ngày', value: timeLeft.days },
        { label: 'Giờ', value: timeLeft.hours },
        { label: 'Phút', value: timeLeft.minutes },
        { label: 'Giây', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-rose-500/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center text-rose-600 font-bold text-base shadow-sm border border-rose-200">
            {item.value}
          </div>
          <span className="text-[9px] text-rose-700 mt-1 font-bold uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const DynamicWishes = () => {
  const wishes = [
    "Chúc mừng sinh nhật bố! 🎉",
    "Bố là người tuyệt vời nhất! 🌟",
    "Hai mẹ con yêu bố nhiều lắm! ❤️",
    "Luôn vững vàng bố nhé! 😊",
    "Tuổi mới thành công! ✨",
    "Mọi điều tốt đẹp nhất! 🎁",
    "Chỗ dựa của gia đình! 🏠",
    "Mãi bên nhau nhé! 👨‍👩‍👧"
  ];

  return (
    <div className="relative h-32 overflow-hidden my-4 bg-rose-50/50 rounded-2xl border border-rose-100">
      {wishes.map((wish, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -100, y: Math.random() * 80 + 10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: idx * 1.2,
            ease: "linear"
          }}
          className="absolute whitespace-nowrap px-3 py-1 rounded-full text-rose-600 font-romantic font-bold text-sm shadow-sm bg-white/80 border border-rose-100"
          style={{ top: `${(idx * 25) % 80 + 10}%` }}
        >
          {wish}
        </motion.div>
      ))}
    </div>
  );
};

const PhotoRunner = ({ images }: { images: string[] }) => (
  <div className="relative w-full overflow-hidden py-4 mb-8">
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="flex gap-4 w-max"
    >
      {[...images, ...images].map((src, idx) => (
        <div
          key={idx}
          className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-3"
        >
          <img
            src={src}
            alt={`Memory ${idx}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent to-transparent pointer-events-none" />
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState<{ id: number, delay: number, x: number, size: number }[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [selectedGiftIndex, setSelectedGiftIndex] = useState<number | null>(null);
  const [dismissedGifts, setDismissedGifts] = useState<number[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio element 1 lần duy nhất
  useEffect(() => {
    // Link nhạc MP3 trực tiếp – hoạt động trên cả mobile lẫn desktop
    const audio = new Audio(`${import.meta.env.BASE_URL}gallery/nhacnen.mp3`);
    audio.loop = true;
    audio.volume = 0.4;
    audio.muted = true;
    bgAudioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  // Đồng bộ trạng thái mute/unmute với audio element
  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const playPopSound = () => {
    if (isMuted) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { });
  };

  const handleOpenGift = (message: string, index: number) => {
    playPopSound();
    setSelectedGift(message);
    setSelectedGiftIndex(index);
  };

  const handleCloseGiftPopup = () => {
    if (selectedGiftIndex !== null) {
      setDismissedGifts(prev => [...prev, selectedGiftIndex]);
    }
    setSelectedGift(null);
    setSelectedGiftIndex(null);
  };

  const birthdayData = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    // Ngày sinh nhật năm nay
    let bday = new Date(currentYear, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);

    // Nếu đã qua sinh nhật năm nay thì tính cho năm sau
    if (today > bday && today.toDateString() !== bday.toDateString()) {
      bday = new Date(currentYear + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
    }

    const isToday = today.toDateString() === new Date(today.getFullYear(), BIRTHDAY_MONTH - 1, BIRTHDAY_DAY).toDateString();
    const diffTime = bday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Tính tuổi (tính từ năm sinh)
    const bdayThisYear = new Date(today.getFullYear(), BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
    const age = isToday
      ? today.getFullYear() - BIRTHDAY_YEAR
      : (today > bdayThisYear
        ? today.getFullYear() + 1 - BIRTHDAY_YEAR
        : today.getFullYear() - BIRTHDAY_YEAR);

    return {
      status: isToday ? "today" : (diffDays <= 30 ? "soon" : "far"),
      targetDate: bday,
      age
    };
  }, []);

  const birthdayStatus = birthdayData.status;

  useEffect(() => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      x: Math.random() * 100,
      size: 24 + Math.floor(Math.random() * 20)
    }));
    setHearts(newHearts);
  }, []);

  const nextStep = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsMuted(false);
      // Kích hoạt nhạc bằng user gesture (cần thiết trên mobile)
      if (bgAudioRef.current) {
        bgAudioRef.current.muted = false;
        bgAudioRef.current.play().catch(() => { });
      }
    }
    if (step < MESSAGES.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  const currentMessage = useMemo(() => {
    const msg = { ...MESSAGES[step] };
    if (msg.type === 'birthday_intro') {
      const age = birthdayData.age;
      if (birthdayStatus === "today") {
        msg.title = `Hôm nay bố tròn ${age} tuổi! 🎂`;
        msg.content = `Chúc mừng sinh nhật ${age} tuổi người bố tuyệt vời của gia đình! 🎉`;
      } else if (birthdayStatus === "soon") {
        msg.title = `Sắp đến sinh nhật bố rồi... ✨`;
        msg.content = `Hai mẹ con đang đếm ngược từng phút để cùng bố đón tuổi ${age} đấy!`;
      } else {
        msg.title = "Và đặc biệt hơn hết...";
        msg.content = `Bố sắp bước sang tuổi ${age} rồi — hai mẹ con luôn có những lời chúc bí mật dành riêng cho bố!`;
      }
    }
    return msg;
  }, [step, birthdayStatus, birthdayData.age]);

  const isBirthday = currentMessage.type.startsWith('birthday');
  const isPhotoRunner = currentMessage.type === 'photo_runner';

  return (
    <div className={`h-[100dvh] w-full overflow-hidden bg-gradient-to-br ${currentMessage.bg} transition-colors duration-1000 flex flex-col items-center justify-center p-4 md:p-6 relative`}>
      {/* Background Music – HTML5 Audio (works on mobile) */}

      {/* Background Decorations */}
      {currentMessage.type === 'birthday_upcoming' ? <RadiatingBalloons /> : <FlowerFall />}
      {isBirthday ? <Confetti /> : hearts.map(h => (
        <FloatingHeart key={h.id} delay={h.delay} x={h.x} size={h.size} />
      ))}

      {/* Music Toggle */}
      <button
        onClick={() => {
          const next = !isMuted;
          setIsMuted(next);
          if (bgAudioRef.current) {
            bgAudioRef.current.muted = next;
            if (!next && !hasStarted) {
              bgAudioRef.current.play().catch(() => { });
            }
          }
        }}
        className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-rose-600 hover:bg-white/40 transition-all z-50"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/40 text-center relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: isBirthday ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`inline-block mb-6 ${isBirthday ? 'text-orange-500' : isPhotoRunner ? 'text-purple-500' : 'text-rose-500'}`}
          >
            {currentMessage.type === 'final' ? <Sparkles size={48} /> :
              currentMessage.type === 'birthday_intro' ? <Cake size={48} /> :
                currentMessage.type === 'birthday_gifts' ? <PartyPopper size={48} /> :
                  currentMessage.type === 'photo_runner' ? <Camera size={48} /> :
                    <Heart size={48} fill="currentColor" />}
          </motion.div>

          <h1 className={`text-3xl md:text-4xl font-romantic font-bold mb-4 leading-tight ${isBirthday ? 'text-orange-700' : isPhotoRunner ? 'text-purple-700' : 'text-rose-700'
            }`}>
            {currentMessage.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-700 mb-8 font-medium leading-relaxed">
            {currentMessage.content}
          </p>

          {/* Slideshow ảnh ở màn hình giới thiệu */}
          {currentMessage.type === 'intro' && (
            <div className="mb-4">
              <IntroPhotoSlideshow photos={INTRO_PHOTOS} />
              {birthdayStatus !== "today" && (
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Đếm ngược đến sinh nhật bố</p>
                  <BirthdayCountdown targetDate={birthdayData.targetDate} />
                </div>
              )}
            </div>
          )}

          {isPhotoRunner && currentMessage.images && (
            <PhotoRunner images={currentMessage.images} />
          )}

          {currentMessage.type === 'birthday_gifts' && (
            <GiftSlider
              gifts={currentMessage.gifts || []}
              dismissedGifts={dismissedGifts}
              onOpenGift={handleOpenGift}
            />
          )}

          {currentMessage.type === 'audio_wishes' && (
            <AudioWishes
              onPlay={() => bgAudioRef.current?.pause()}
              onStop={() => {
                if (bgAudioRef.current && !isMuted) {
                  bgAudioRef.current.play().catch(() => { });
                }
              }}
            />
          )}

          {currentMessage.type === 'final' && (
            <div className="mb-4">
              <div className="w-full h-72 rounded-2xl overflow-hidden mb-3 shadow-inner border-4 border-white">
                <img
                  src={`${import.meta.env.BASE_URL}gallery/2.jpg`}
                  alt="Cover"
                  className="w-full h-full object-cover object-[50%_40%] scale-[1.15]"
                />
              </div>

              {birthdayStatus === "today" && (
                <DynamicWishes />
              )}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className={`group relative inline-flex items-center justify-center font-bold text-white transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg overflow-hidden ${currentMessage.type === 'final' ? 'px-6 py-3 text-sm' : 'px-8 py-4'
              } ${isBirthday ? 'bg-orange-500 focus:ring-orange-500 shadow-orange-200' :
                isPhotoRunner ? 'bg-purple-500 focus:ring-purple-500 shadow-purple-200' :
                  'bg-rose-500 focus:ring-rose-500 shadow-rose-200'
              }`}
          >
            <span className="relative flex items-center gap-2">
              {currentMessage.button}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {currentMessage.isFinal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-rose-400 text-sm font-medium"
            >
              Cả nhà yêu bố rất nhiều 💋
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer Decoration */}
      <div className={`absolute bottom-6 left-0 right-0 text-center font-romantic text-xl pointer-events-none ${isBirthday ? 'text-orange-400/60' : isPhotoRunner ? 'text-purple-400/60' : 'text-rose-400/60'
        }`}>
        {isBirthday ? "Happy Birthday My Love" : isPhotoRunner ? "Our Beautiful Memories" : "Forever & Always"}
      </div>

      {/* Gift Popup */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={handleCloseGiftPopup}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-500 text-white p-4 rounded-full shadow-lg">
                <PartyPopper size={32} />
              </div>
              <h3 className="text-2xl font-romantic font-bold text-rose-600 mb-4 mt-4">Lời chúc dành cho bố</h3>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                {selectedGift}
              </p>
              <button
                onClick={handleCloseGiftPopup}
                className="w-full py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors"
              >
                Đóng lại ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}