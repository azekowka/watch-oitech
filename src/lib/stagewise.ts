// 1. Import the toolbar
import { initToolbar } from '@21st-extension/toolbar';

// 2. Define your toolbar configuration
const stagewiseConfig = {
  plugins: [],
};

// 3. Initialize the toolbar when your app starts
// Framework-agnostic approach - call this when your app initializes
function setupStagewise() {
  // Only initialize once and only in development mode and on client side
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    initToolbar(stagewiseConfig);
  }
}

// Export the setup function instead of calling it immediately
export { setupStagewise }; 