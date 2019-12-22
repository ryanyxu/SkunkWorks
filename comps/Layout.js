// components/Layout.js

import Header from './Header';
import Footer from './Footer'


const withLayout = Page => {
  return () => (
    <div>
      <Header />
      <Page />
      <Footer/>
    </div>
  );
};

export default withLayout;