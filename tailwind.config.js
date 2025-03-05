module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        in: 'enter 50ms ease-out', // This changes the default duration from 150ms to 50ms
        out: 'exit 50ms ease-in', // This changes the default duration from 150ms to 50ms
      },
    },
  },
};
