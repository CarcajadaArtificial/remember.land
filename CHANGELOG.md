# Changelog

## v0.1.47

- Added `EntryInput/InputTags` subisland.
- Added Tag database module with `createTags` and `getTags`.
- Added creation of standard tags on account creation.
- Added the utility function `kvIteratorToEntryArray`.

### Changes so far

- Added the Lunchbox fonts.
- Removed static styles in favor of css-in-js.
- Added user authentication with GitHub OAuth.

### v0.2

  - Islands
    - `<EntryInput />`
      - [x] Input Content and mark.
      - [ ] Create a new tag on input.
      - [ ] Remove tags from entry
      - [ ] Automatically add tags on content shortcuts.
      - [ ] Autocomplete existing tags.
      - [ ] Automatically add the link tag when a mark is a link.
      - [ ] Create entry in db when pressiong Cmd+Enter, TBD on mobile, maybe double enter.
      - [ ] Adapt to mobile.
    - `<Entry />`
      - [ ] Add hovering and "shift" interaction for expanded information.
      - [ ] Keystroke for copying the id, tapping a button on mobile.
    - `<EditableEntry />`
      - [ ] Switch between Entry and EntryInput after Shift+Enter
      - [ ] Deletes an entry after pressing backspace and confirming.
  - Backlog
    - [ ] Add css-in-js styles to `<Contribution Calendar/>`
    - [x] Create standard entry tags on account creation.
    - [ ] Make type safe all requests and responses in the API.
    - [ ] Revamp 404 error page.

### v0.3

- Features
  - [ ] Create, update, edit, and view entry queries, with their pages.
  - [ ] Date views: year, month, day.

### v1.0

- Features
  - [ ] Dockerize this project.
  - [ ] KV Auth using github.
    - [ ] Make entries user based.
    - [ ] Encrypt database entries.
    - [ ] Add a Stripe account for users with more than 50,000 entries.
  - [ ] Backup download in JSON format.
    - [ ] Restore using backup and handle conflicts.