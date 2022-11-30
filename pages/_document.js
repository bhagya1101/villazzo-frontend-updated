import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>          
          {/* eslint-disable-next-line */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/*Below we add the modal wrapper*/}
          <div id="modal-root"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
