export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/rents',
        '/cars',
        '/bookmarks',
        '/profile',
        '/rentals',
    ]
}