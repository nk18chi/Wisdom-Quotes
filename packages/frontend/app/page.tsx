import * as React from 'react';
import { Hero, ArticleList } from '@/components';
import OwnArticleList from '@/components/List/OwnArticleList';

async function Index() {
  return (
    <React.Fragment>
      <Hero />
      <ArticleList />
      <OwnArticleList />
    </React.Fragment>
  );
}

export default Index;
