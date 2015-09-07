module.exports = {
  sass: {
    files: 'public/sass/**/*.scss',
    tasks: ['build']
  },
  scripts: {
    files: 'public/js/**/*.js',
    tasks: ['eslint']
  }
};
