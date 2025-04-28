//sharing of the UI components between routes

import React from 'react'

export default function WishlistLayout({children}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
