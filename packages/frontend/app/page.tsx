import * as React from 'react';
import { AppBar, ArticleList, Hero } from '@/components';

function Index() {
  return (
    <React.Fragment>
      <AppBar />
      <Hero />
      <ArticleList />
    </React.Fragment>
  );
}

export default Index;
