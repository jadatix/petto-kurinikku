import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className='section'>
        <Head />
        <body className="section">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}