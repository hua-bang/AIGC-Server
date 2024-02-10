import { SceneModule } from '../typings';

export const MockScene: SceneModule[] = [
  {
    id: '1',
    name: 'Scene 1',
    description: 'This is scene 1',
    prompts: [
      "What is the main character's name?",
      'Where does the scene take place?',
    ],
  },
  {
    id: '2',
    name: 'Scene 2',
    description: 'This is scene 2',
    prompts: [
      'What is the main conflict in this scene?',
      'What are the goals of the characters in this scene?',
    ],
  },
];
