/**
 * Utility functions for mobile optimization
 */

/**
 * Checks if the current device is a mobile device
 * @returns {boolean} True if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Delays non-critical operations on mobile devices
 * @param {Function} fn - Function to execute
 * @param {number} delay - Delay in milliseconds
 */
export const deferNonCriticalForMobile = (fn: () => void, delay = 1000): void => {
  if (isMobileDevice()) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
};

/**
 * Applies passive event listeners for better scroll performance
 * @param {string} eventType - Event type (e.g., 'scroll', 'touchstart')
 * @param {EventListener} handler - Event handler function
 * @param {HTMLElement | Window} element - DOM element or window
 */
export const addPassiveEventListener = (
  eventType: string,
  handler: EventListener,
  element: HTMLElement | Window = window
): void => {
  element.addEventListener(eventType, handler, { passive: true });
};

/**
 * Optimizes image loading for mobile devices
 * @param {HTMLImageElement} imgElement - Image element
 * @param {string} src - Image source
 * @param {string} lowResSrc - Low resolution image source for mobile
 */
export const optimizeImageLoading = (
  imgElement: HTMLImageElement,
  src: string,
  lowResSrc?: string
): void => {
  if (isMobileDevice() && lowResSrc) {
    imgElement.src = lowResSrc;
  } else {
    imgElement.src = src;
  }
  
  // Add loading="lazy" attribute for non-critical images
  imgElement.loading = 'lazy';
};

/**
 * Reduces animation complexity on mobile devices
 * @param {HTMLElement} element - DOM element
 * @param {string} desktopClass - CSS class for desktop
 * @param {string} mobileClass - CSS class for mobile (with reduced animations)
 */
export const applyReducedAnimations = (
  element: HTMLElement,
  desktopClass: string,
  mobileClass: string
): void => {
  if (isMobileDevice()) {
    element.classList.add(mobileClass);
  } else {
    element.classList.add(desktopClass);
  }
}; 