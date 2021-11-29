module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    SCOPE: process.env.SCOPE,
    TOKEN_HASH: process.env.TOKEN_HASH
  }
}
