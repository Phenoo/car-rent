import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

interface StepProps {
  step: number;
  currentStep: number;
}


const Step:React.FC<StepProps> = ({step, currentStep}) => {
  let status = 
      currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";


      return (
    <motion.div className='relative' animate={status} initial={status}>
      <motion.div
          transition={rippleTransition}
          variants={rippleVariants}
          className='absolute inset-0 rounded-full' 
        />
        <motion.div
          variants={backgroundVariants}
          transition={backgroundTransition}
          className='relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-400 bg-white font-semibold text-slate-500'>
            <div className='relative flex items-center justify-center'>
              <AnimatePresence>
                {
                  status === 'complete' ? (
                    <CheckIcon className='h-6 w-6 text-white' />
                  ) : (
                    <motion.span
                      key="step"
                      animate={{ opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0}}
                      className='absolute'
                    >
                      {step}
                    </motion.span>
                  )
                }
              </AnimatePresence>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Step

let x = 1;
const t = (v : any) => x * v;

let backgroundTransition = { duration: t(0.2) };
let backgroundVariants = {
  inactive: {
    background: "#fff",
    borderColor: "#708090",
    color: "#808080",
  },
  active: {
    background: "var(--white)",
    borderColor: "var(--green)",
    color: "#FFF",
  },
  complete: {
    background: "var(--green)",
    borderColor: "var(--green)",
  },
};

let rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};


function CheckIcon(props : any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

let rippleVariants = {
  inactive: {
    background: "var(--green)",
  },
  active: {
    background: "var(--green)",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "var(--green)",
    scale: 1.25,
  },
};

let checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};
let checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};