module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'nav-text-hover': '#FD4717'
      }
    },
    fontFamily: {
      'body': ["eczar"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
