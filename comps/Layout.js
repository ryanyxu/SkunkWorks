// components/Layout.js

import Header from './Header';


const withLayout = Page => {
  return () => (
    <div>
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;