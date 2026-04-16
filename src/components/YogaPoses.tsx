// Yoga Pose SVGs - Reusable components
export const PoseTree = ({ className = "" }) => (
  <svg viewBox="0 0 100 200" className={className} fill="currentColor">
    {/* Tree Pose (Vrksasana) */}
    <circle cx="50" cy="20" r="8" />
    {/* Body */}
    <line
      x1="50"
      y1="28"
      x2="50"
      y2="70"
      stroke="currentColor"
      strokeWidth="3"
    />
    {/* Left arm up */}
    <line
      x1="50"
      y1="40"
      x2="30"
      y2="30"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Right arm up */}
    <line
      x1="50"
      y1="40"
      x2="70"
      y2="30"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Left leg */}
    <line
      x1="50"
      y1="70"
      x2="50"
      y2="120"
      stroke="currentColor"
      strokeWidth="3"
    />
    {/* Right leg - bent */}
    <line
      x1="50"
      y1="85"
      x2="40"
      y2="65"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="40" cy="65" r="4" />
  </svg>
);

export const PoseDownwardDog = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    {/* Downward Dog (Adho Mukha Svanasana) */}
    <path d="M 20 80 L 50 30 L 80 80" strokeLinecap="round" />
    {/* Body triangle */}
    <line x1="50" y1="30" x2="30" y2="90" />
    <line x1="50" y1="30" x2="70" y2="90" />
    {/* Ground feet */}
    <circle cx="30" cy="100" r="4" fill="currentColor" />
    <circle cx="70" cy="100" r="4" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

export const PoseLotus = ({ className = "" }) => (
  <svg viewBox="0 0 100 120" className={className} fill="currentColor">
    {/* Lotus (Padmasana) */}
    <circle cx="50" cy="20" r="7" />
    {/* Body */}
    <ellipse cx="50" cy="50" rx="12" ry="20" />
    {/* Left leg */}
    <path
      d="M 45 70 Q 35 75 30 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Right leg */}
    <path
      d="M 55 70 Q 65 75 70 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Arms in prayer */}
    <line
      x1="45"
      y1="45"
      x2="50"
      y2="35"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="55"
      y1="45"
      x2="50"
      y2="35"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const PoseWarrior = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 140"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    {/* Warrior I (Virabhadrasana I) */}
    <circle cx="50" cy="15" r="6" fill="currentColor" />
    {/* Body */}
    <line x1="50" y1="22" x2="50" y2="60" strokeWidth="2.5" />
    {/* Left arm up */}
    <line x1="50" y1="30" x2="25" y2="15" strokeLinecap="round" />
    {/* Right arm down */}
    <line x1="50" y1="35" x2="70" y2="50" strokeLinecap="round" />
    {/* Front leg lunge */}
    <line
      x1="50"
      y1="60"
      x2="40"
      y2="115"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Back leg straight */}
    <line
      x1="50"
      y1="60"
      x2="65"
      y2="120"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PoseChild = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    {/* Child's Pose (Balasana) */}
    {/* Head down */}
    <circle cx="50" cy="60" r="6" />
    {/* Body folded */}
    <ellipse cx="50" cy="40" rx="10" ry="15" />
    {/* Arms alongside */}
    <line
      x1="42"
      y1="45"
      x2="38"
      y2="70"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="58"
      y1="45"
      x2="62"
      y2="70"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Legs folded */}
    <path
      d="M 50 50 Q 30 65 28 75"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M 50 50 Q 70 65 72 75"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const PoseTriangle = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 120"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    {/* Triangle (Trikonasana) */}
    <circle cx="50" cy="15" r="6" fill="currentColor" />
    {/* Body */}
    <line x1="50" y1="22" x2="50" y2="55" strokeWidth="2" />
    {/* Left arm down */}
    <line x1="50" y1="30" x2="20" y2="90" strokeLinecap="round" />
    {/* Right arm up */}
    <line x1="50" y1="30" x2="75" y2="15" strokeLinecap="round" />
    {/* Left leg */}
    <line
      x1="50"
      y1="55"
      x2="25"
      y2="105"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Right leg */}
    <line
      x1="50"
      y1="55"
      x2="80"
      y2="105"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PoseStanding = ({ className = "" }) => (
  <svg viewBox="0 0 100 160" className={className} fill="currentColor">
    {/* Standing position with open arms */}
    <circle cx="50" cy="15" r="7" />
    {/* Neck */}
    <line
      x1="50"
      y1="22"
      x2="50"
      y2="35"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Body */}
    <line
      x1="50"
      y1="35"
      x2="50"
      y2="75"
      stroke="currentColor"
      strokeWidth="3"
    />
    {/* Left arm */}
    <line
      x1="50"
      y1="40"
      x2="15"
      y2="35"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Right arm */}
    <line
      x1="50"
      y1="40"
      x2="85"
      y2="35"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Left leg */}
    <line
      x1="50"
      y1="75"
      x2="35"
      y2="155"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    {/* Right leg */}
    <line
      x1="50"
      y1="75"
      x2="65"
      y2="155"
      stroke="currentColor"
      strokeWidth="2.5"
    />
  </svg>
);
