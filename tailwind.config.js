module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'do-later': '#0F2E32',
        'do-first': '#0F3D2C',
        'delegate': '#423714',
        'eliminate': '#3D170F',

        'do_first-text': '#22c55e',   // A balanced green tone
        'do_later-text': '#0ea5e9',   // A balanced blue tone
        'delegate-text': '#fbbf24',   // A balanced yellow tone
        'eliminate-text': '#ef4444',  // A balanced red tone

        'modal-btn': "#F2BD1D"
      },
    },

  },
  plugins: [],
}
