import * as migration_20260909_135432_initial from './20260909_135432_initial';
import * as migration_20260909_140831_news_ordering from './20260909_140831_news_ordering';
import * as migration_20260910_070008_jobs from './20260910_070008_jobs';
import * as migration_20260921_125256_3_90_upgrade from './20260921_125256_3_90_upgrade';
import * as migration_20260923_082817_submissions from './20260923_082817_submissions';
import * as migration_20260923_085700_drop_enquiry_subject from './20260923_085700_drop_enquiry_subject';

export const migrations = [
  {
    up: migration_20260909_135432_initial.up,
    down: migration_20260909_135432_initial.down,
    name: '20260909_135432_initial',
  },
  {
    up: migration_20260909_140831_news_ordering.up,
    down: migration_20260909_140831_news_ordering.down,
    name: '20260909_140831_news_ordering',
  },
  {
    up: migration_20260910_070008_jobs.up,
    down: migration_20260910_070008_jobs.down,
    name: '20260910_070008_jobs',
  },
  {
    up: migration_20260921_125256_3_90_upgrade.up,
    down: migration_20260921_125256_3_90_upgrade.down,
    name: '20260921_125256_3_90_upgrade',
  },
  {
    up: migration_20260923_082817_submissions.up,
    down: migration_20260923_082817_submissions.down,
    name: '20260923_082817_submissions',
  },
  {
    up: migration_20260923_085700_drop_enquiry_subject.up,
    down: migration_20260923_085700_drop_enquiry_subject.down,
    name: '20260923_085700_drop_enquiry_subject'
  },
];
