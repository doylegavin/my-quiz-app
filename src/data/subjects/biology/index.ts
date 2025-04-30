import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

// Export the biology subject with both higher and ordinary level structures
export const biology = {
  ...higherLevel.biology
};

// Export both level structures for use elsewhere in the app
export { higherLevel, ordinaryLevel };