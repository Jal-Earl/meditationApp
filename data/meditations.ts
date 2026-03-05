export type MeditationTechnique = {
  id: string;
  title: string;
  description: string;
  duration: string;
  about: string;
  instructions: string[];
};

export const meditationTechniques: MeditationTechnique[] = [
  {
    id: 'breathing-basics',
    title: 'Breathing Basics',
    description: 'A simple breathing exercise to calm your mind in a few minutes.',
    duration: '5 min',
    about:
      'This beginner technique helps improve focus and reduce stress by gently slowing your breath.',
    instructions: [
      'Sit comfortably with your back straight and shoulders relaxed.',
      'Inhale slowly through your nose for 4 counts.',
      'Exhale gently through your mouth for 4 counts.',
      'Repeat for 10 rounds while noticing each breath.',
    ],
  },
  {
    id: 'body-scan',
    title: 'Body Scan Relaxation',
    description: 'Release physical tension by bringing awareness to each part of your body.',
    duration: '8 min',
    about:
      'Body scanning increases awareness and helps you identify where you hold stress in the body.',
    instructions: [
      'Lie down or sit in a comfortable position.',
      'Start by noticing your breath for 30 seconds.',
      'Move attention from head to toe, one body part at a time.',
      'Soften and relax each area as you breathe out.',
    ],
  },
  {
    id: 'gratitude-pause',
    title: 'Gratitude Pause',
    description: 'A quick reflection exercise to build a positive mindset.',
    duration: '6 min',
    about:
      'Practicing gratitude can improve emotional resilience and support a balanced daily routine.',
    instructions: [
      'Close your eyes and take 3 slow breaths.',
      'Think of one person, one moment, and one strength you appreciate.',
      'Say each gratitude thought silently to yourself.',
      'Finish by taking one deep breath and opening your eyes slowly.',
    ],
  },
  {
    id: 'mindful-walk',
    title: 'Mindful Walk',
    description: 'Turn a short walk into a calming meditation practice.',
    duration: '10 min',
    about:
      'Mindful walking combines movement and awareness, making meditation easier for active beginners.',
    instructions: [
      'Walk at a gentle pace in a quiet area.',
      'Notice each step: heel, mid-foot, toe.',
      'Bring attention to sounds, air, and body movement.',
      'If distracted, return focus to your next step.',
    ],
  },
];
