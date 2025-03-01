// Function to load the Calendly script
const loadCalendlyScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Calendly) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Calendly'));
    document.body.appendChild(script);
  });
};

export const openCalendly = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  window.location.href = 'https://calendly.com/cleanagentai/30min';
}; 