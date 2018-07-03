import React from 'react';
import ArticleContainer from './ArticleContainer';
import NavbarWrapper from './NavbarWrapper';
import SideBarWrapper from './SidebarWrapper';

const PageWrapper = () => (
  <main id="page-wrapper">
    <NavbarWrapper />
    <div id="page-body">
      <ArticleContainer />
      <SideBarWrapper />
    </div>
  </main>
);
// }

export default PageWrapper;
