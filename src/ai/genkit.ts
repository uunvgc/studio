import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This is the global Genkit instance.
// We configure the plugins here, but we recommend specifying the model
// in each individual prompt's config for clarity and maintainability.
export const ai = genkit({
  plugins: [googleAI()],
});
