// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_app from './routes/_app.tsx';
import * as $_middleware from './routes/_middleware.tsx';
import * as $api_entries_id_delete from './routes/api/entries/[id]/delete.ts';
import * as $api_entries_id_index from './routes/api/entries/[id]/index.ts';
import * as $api_entries_id_update from './routes/api/entries/[id]/update.ts';
import * as $api_entries_get from './routes/api/entries/get.ts';
import * as $api_entries_new from './routes/api/entries/new.ts';
import * as $api_tags_id_delete from './routes/api/tags/[id]/delete.ts';
import * as $api_tags_id_index from './routes/api/tags/[id]/index.ts';
import * as $api_tags_id_update from './routes/api/tags/[id]/update.ts';
import * as $api_tags_get from './routes/api/tags/get.ts';
import * as $api_tags_new from './routes/api/tags/new.ts';
import * as $archive from './routes/archive.tsx';
import * as $index from './routes/index.tsx';
import * as $signin from './routes/signin.tsx';
import * as $signout from './routes/signout.tsx';
import * as $tags_name_ from './routes/tags/[name].tsx';
import * as $tags_index from './routes/tags/index.tsx';
import * as $EntryEdit_index from './islands/EntryEdit/index.tsx';
import * as $EntryInput_index from './islands/EntryInput/index.tsx';
import * as $EntryQuery_index from './islands/EntryQuery/index.tsx';
import * as $TagQuery_index from './islands/TagQuery/index.tsx';
import { type Manifest } from '$fresh/server.ts';

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/_middleware.tsx': $_middleware,
    './routes/api/entries/[id]/delete.ts': $api_entries_id_delete,
    './routes/api/entries/[id]/index.ts': $api_entries_id_index,
    './routes/api/entries/[id]/update.ts': $api_entries_id_update,
    './routes/api/entries/get.ts': $api_entries_get,
    './routes/api/entries/new.ts': $api_entries_new,
    './routes/api/tags/[id]/delete.ts': $api_tags_id_delete,
    './routes/api/tags/[id]/index.ts': $api_tags_id_index,
    './routes/api/tags/[id]/update.ts': $api_tags_id_update,
    './routes/api/tags/get.ts': $api_tags_get,
    './routes/api/tags/new.ts': $api_tags_new,
    './routes/archive.tsx': $archive,
    './routes/index.tsx': $index,
    './routes/signin.tsx': $signin,
    './routes/signout.tsx': $signout,
    './routes/tags/[name].tsx': $tags_name_,
    './routes/tags/index.tsx': $tags_index,
  },
  islands: {
    './islands/EntryEdit/index.tsx': $EntryEdit_index,
    './islands/EntryInput/index.tsx': $EntryInput_index,
    './islands/EntryQuery/index.tsx': $EntryQuery_index,
    './islands/TagQuery/index.tsx': $TagQuery_index,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
