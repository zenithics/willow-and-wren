import * as migration_20260714_173605 from './20260714_173605';
import * as migration_20260715_181318_add_homepage_blocks from './20260715_181318_add_homepage_blocks';

export const migrations = [
  {
    up: migration_20260714_173605.up,
    down: migration_20260714_173605.down,
    name: '20260714_173605',
  },
  {
    up: migration_20260715_181318_add_homepage_blocks.up,
    down: migration_20260715_181318_add_homepage_blocks.down,
    name: '20260715_181318_add_homepage_blocks'
  },
];
