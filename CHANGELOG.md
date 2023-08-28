# Changelog

## v0.0.34

### Added Archive Page with the EntryQuery island
  - `/routes/archive.tsx`
  - `/islands/EntryQuery/index.tsx`
  - `/islands/EntryQuery/style.scss`

### Added the specification of the findEntries function
  - `/utils/db/middleware.ts`

### Minor updates
  - `/routes/index.tsx`
  - `/index.scss`

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
    - [ ] Strikethrough notes with past events and done tasks.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
    - [x] Better focus background.
    - [x] Add a hover state.
    - [ ] Add tag "link" if the entry mark is a url.
- [ ] Rename "Note" to "Entry"
- [ ] Create a database middleware file.
  - Controls if the projet stores entries on the client's localstorage or on a server db.
  - [x] Function that gets the next id for a new Entry.
  - [x] Function that sets new information for an Entry, it can create or update.
  - [x] Function that deletes an Entry.
  - [ ] Function that searches for entries given a query object.

### v0.2.0

  - [ ] Include single password authentication method.
  - [ ] Include FileDB database.
  - [ ] Parse the EntryMark as a possible date for events and tasks.
  - [ ] Save entry search queries for future uses.
  - [ ] Implement parsing a date somewhere in an entry.