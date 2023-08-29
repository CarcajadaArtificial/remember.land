# Changelog

## v0.0.43

### Added an authentication access wall for the API.
  - `/routes/api/entries/create.tsx`
  - `/routes/api/entries/find.tsx`
  - `/routes/api/entries/[id]/delete.tsx`
  - `/routes/api/entries/[id]/index.tsx`
  - `/routes/api/entries/[id]/update.tsx`

## Roadmap

### v0.1.0

- [x] Finish planning phase.
  - [x] BD schema.
  - [x] Services that will access the information.
- [x] Plan the interface.
  - [x] Define components and their properties.
  - [x] Define pages.
- [ ] Pages
  - [ ] ⏳ Home
    - [ ] Instructions for first time users.
    - [ ] Limit notes to only the ones today.
    - [x] Navigation bar for accessing other routes.
    - [ ] Show future events and uncompleted tasks.
  - [ ] ⏳ Archive
    - [ ] Contribution calendar
    - [ ] Query builder
- [ ] Components
  - [ ] ⏳ Contribution Calendar
  - [ ] ⏳ Note
    - [x] Add an update note information functionality onclick and onkeyup enter.
    - [x] Remove id and created_at Texts.
    - [x] Relocate NoteMark
    - [x] Focus and hover must change background.
    - [x] Add the URL NoteMark interaction.
    - [x] Press backspace to delete a note.
    - [ ] Strikethrough entries that contain the "task" and "done" tags.
    - [ ] Move handlers to their own file.
  - [x] ✅ Input Note
    - [x] Better focus background.
    - [x] Add a hover state.
    - [x] Add tag "link" if the entry mark is a url.
- [x] Rename "Note" to "Entry"
- [ ] Move /db/middleware.ts to /db/entry.ts
- [x] Solve the iEntry id conundrum.
- [ ] Change updateEntriesSignal to the one in ./utils/signals.ts.
- [x] Put API behind a authentication wall that always redirects to /signin.
- [ ] Implement quick day created indexing.
  - [ ] On signing in, create the file data/app.json if not already created.
  - [ ] Register the date of first sign in inside data/app.json
  - [ ] Add daycount to iEntry that keeps track of the day number relative to the first day of use.
- [x] Create a database middleware file.
  - Controls if the projet stores entries on the client's localstorage or on a server db.
  - [x] Function that gets the next id for a new Entry.
  - [x] Function that sets new information for an Entry, it can create or update.
  - [x] Function that deletes an Entry.
  - [x] Function that searches for entries given a query object.

### v0.2.0

  - Backlog
    - [x] Include single password authentication method.
    - [ ] Include FileDB database.
    - [ ] Parse the EntryMark as a possible date for events and tasks.
    - [ ] Save entry search queries for future uses.
    - [ ] Implement parsing a date somewhere in an entry.
    - [ ] Download DB as JSON.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.