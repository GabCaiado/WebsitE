import '@styles/globals.css'

export const metadata = {
  title: "WebsitE",
  description: 'Buying Gift-Cards has never been this easier!'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=Michroma&display=swap');
        </style>
      </head>
      <body>
        <main className='app'>
          <div className='navBar'>
            <p className='navTitle'>WebsitE</p>

            <div className='flex items-center gap-4'>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
