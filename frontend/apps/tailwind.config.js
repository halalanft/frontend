module.exports = {
    content: [
        "./devhtml/**/*.{html,js,ts,jsx,tsx}",
        "./src/**/*.rs"
    ],
    theme: {
        extend: {
            colors: {
              'halalanft-green': '#7ed957'
          }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }