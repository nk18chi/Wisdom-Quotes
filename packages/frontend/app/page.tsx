import * as React from 'react';
import { AppBar, Hero, ArticleList } from '@/components';

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
