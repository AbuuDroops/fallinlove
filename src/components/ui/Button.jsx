import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-primary text-white hover:bg-secondary shadow-lg shadow-primary/25',
  ghost:
    'border border-white/10 text-muted hover:text-white hover:border-white/30',
};

const sizes = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-medium tracking-wide transition-colors duration-300 cursor-pointer
        ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
