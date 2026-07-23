import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import FloatingHearts from '../ui/FloatingHearts';
import html2canvas from 'html2canvas';

const letterParagraphs = [
  "Untuk Ratna,",
  "Surat ini sudah aku tulis berulang kali di kepalaku. Setiap kali, aku hapus dan mulai lagi, karena kata-kata seolah tak pernah cukup.",
  "Ada sesuatu tentang dirimu yang membuat dunia terasa lebih lembut, lebih terang—seperti alam semesta akhirnya memutuskan untuk menunjukkan padaku arti keindahan.",
  "Aku tak tahu apa yang akan terjadi ke depannya. Tapi yang aku tahu, saat aku membayangkan masa depanku, kamu ada di setiap versinya.",
  "Terima kasih sudah ada. Terima kasih sudah menjadi dirimu.",
  "Dengan segenap hati,",
];

export default function CeremonySection({ onDone }) {
  const [phase, setPhase] = useState('sign');
  const [signatureData, setSignatureData] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const finalRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const existing = canvas.toDataURL();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.strokeStyle = '#F43F5E';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (hasDrawn && existing.length > 1000) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = existing;
    }
  }, [hasDrawn]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getPos]);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasDrawn(true);
  }, [isDrawing, getPos]);

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  const handleResmikan = () => {
    const data = canvasRef.current.toDataURL();
    setSignatureData(data);
    setPhase('celebrate');
  };

  useEffect(() => {
    if (phase === 'celebrate') {
      const t = setTimeout(() => setPhase('final'), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'final') {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [phase]);

  const handleClosing = useCallback(() => {
    setPhase('closing');
  }, []);

  useEffect(() => {
    if (phase !== 'closing') return;
    const t = setTimeout(() => {
      document.body.style.overflow = '';
      onDone?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const handleDownload = async () => {
    if (!finalRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(finalRef.current, {
        backgroundColor: '#09090B',
        scale: 3,
      });
      const link = document.createElement('a');
      link.download = 'surat-cinta-untuk-ratna.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden">
      <FloatingHearts active />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-xl mx-auto w-full z-10">
        <AnimatePresence mode="wait">
          {phase === 'sign' && (
            <motion.div
              key="sign"
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl shadow-primary/5 text-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent rounded-b-3xl opacity-50" />

              <motion.span
                className="text-5xl block mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📜
              </motion.span>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sign">
                Surat Keputusan Hati
              </h2>

              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                Dengan ini diresmikan bahwa{' '}
                <span className="text-primary font-semibold">Ratna</span> adalah
                pacar dari <span className="text-primary font-semibold">Abu</span>.
                Terhitung mulai hari ini dan seterusnya.
              </p>

              <div className="border-t border-white/10 pt-8 mb-8">
                <p className="text-muted text-sm mb-6">Yang bertanda tangan di bawah ini:</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">Pihak Pertama</p>
                    <span className="text-4xl text-primary/80 font-signature">abu</span>
                    <p className="text-muted text-xs mt-2">Abu</p>
                  </div>

                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">Pihak Kedua</p>
                    <div className="relative mx-auto" style={{ width: 180, height: 80 }}>
                      <canvas
                        ref={canvasRef}
                        className="w-full h-full rounded-lg bg-white/[0.03] border border-white/10 cursor-crosshair"
                        style={{ touchAction: 'none' }}
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={stopDraw}
                      />
                      {!hasDrawn && (
                        <span className="absolute inset-0 flex items-center justify-center text-muted/40 text-xs pointer-events-none select-none">
                          Tanda tangan di sini
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      {hasDrawn && (
                        <button
                          onClick={clearCanvas}
                          className="text-xs text-muted/50 hover:text-muted transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <p className="text-muted text-xs mt-1">Ratna</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button
                  onClick={handleResmikan}
                  disabled={!hasDrawn}
                  className={`px-10 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 cursor-pointer ${
                    hasDrawn
                      ? 'bg-primary text-white shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95'
                      : 'bg-white/5 text-muted/40 cursor-not-allowed'
                  }`}
                >
                  ❤️ Resmikan
                </button>
              </motion.div>
            </motion.div>
          )}

          {phase === 'celebrate' && (
            <motion.div
              key="celebrate"
              className="text-center py-20"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="text-8xl block mb-6"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎉
              </motion.span>
              <motion.h2
                className="text-5xl md:text-7xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Yeay! 🥳
              </motion.h2>
              <motion.p
                className="text-xl text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Sekarang resmi ya!
              </motion.p>
            </motion.div>
          )}

          {phase === 'final' && (
            <motion.div
              key="final"
              className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-sm overflow-y-auto py-8 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-xl my-auto">
              <div ref={finalRef} className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl shadow-primary/5">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent rounded-b-3xl opacity-50" />

                <div className="text-center mb-8">
                  <span className="text-4xl block mb-4">💌</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-sign">
                    Surat untuk Ratna
                  </h2>
                </div>

                <div className="space-y-6 mb-10">
                  {letterParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed ${
                        i === 0 || i === letterParagraphs.length - 1
                          ? 'font-semibold text-white'
                          : 'text-white/70'
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <p className="text-muted text-sm mb-6 text-center">Telah ditandatangani oleh:</p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <div className="text-center">
                      <p className="text-white/60 text-xs mb-1">Pihak Pertama</p>
                      <span className="text-4xl text-primary/80 font-signature">abu</span>
                      <p className="text-muted text-xs mt-1">Abu</p>
                    </div>

                    <div className="text-center">
                      <p className="text-white/60 text-xs mb-1">Pihak Kedua</p>
                      {signatureData && (
                        <img
                          src={signatureData}
                          alt="Tanda tangan Ratna"
                          className="h-16 mx-auto"
                        />
                      )}
                      <p className="text-muted text-xs mt-1">Ratna</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex items-center justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {downloading ? 'Mengunduh...' : '⬇ Unduh Surat'}
                </button>
                <button
                  onClick={handleClosing}
                  className="px-8 py-3 rounded-full border border-white/20 text-muted hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 bg-transparent"
                >
                  Lanjut →
                </button>
              </motion.div>
            </div>
            </motion.div>
          )}

          {phase === 'closing' && (
            <motion.div
              key="closing"
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="text-7xl md:text-8xl block mb-8"
                animate={{ scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                💖
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white text-center px-6"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Terima kasih sudah
                <br />
                bilang iya ❤️
              </motion.h2>
              <motion.p
                className="text-muted text-lg mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Aku akan menjaga kamu selalu.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
