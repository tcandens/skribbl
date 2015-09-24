module.exports = {
  dev: {
    bsFiles: {
      src: [
        'public/sass/**/*.scss',
        'public/js/**/*.js'
      ]
    },
    options: {
      proxy: 'localhost:8000',
      watchTask: true,
      reloadDelay: 3000
    }
  }
};
