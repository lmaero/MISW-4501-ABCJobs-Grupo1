import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'es'],
  localePrefix: 'always',
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
