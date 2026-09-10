import * as migration_20260909_135432_initial from './20260909_135432_initial';
import * as migration_20260909_140831_news_ordering from './20260909_140831_news_ordering';

export const migrations = [
  {
    up: migration_20260909_135432_initial.up,
    down: migration_20260909_135432_initial.down,
    name: '20260909_135432_initial',
  },
  {
    up: migration_20260909_140831_news_ordering.up,
    down: migration_20260909_140831_news_ordering.down,
    name: '20260909_140831_news_ordering'
  },
];
