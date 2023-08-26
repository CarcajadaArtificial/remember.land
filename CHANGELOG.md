# Changelog

## v0.0.31

### Refactored the localStorage DB
  - `/islands/Entry/index.tsx`
  - `/islands/EntryList/index.tsx`
  - `/islands/InputNote/index.tsx`
  - `/routes/index.tsx`
  - `/utils/handlers/InputNote.ts`
  - `/utils/db/middleware.ts`

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
    - [ ] Navigation bar for accessing other routes.
- [ ] Components
  - [ ] ⏳ Contribution Calendar
  - [ ] ⏳ Note
    - [x] Add an update note information functionality onclick and onkeyup enter.
    - [x] Remove id and created_at Texts.
    - [x] Relocate NoteMark
    - [x] Focus and hover must change background.
    - [x] Add the URL NoteMark interaction.
    - [ ] Press backspace to delete a note.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
    - [x] Better focus background.
    - [x] Add a hover state.
- [ ] Rename "Note" to "Entry"
- [x] Create a database middleware file.
  - Controls if the projet stores entries on the client's localstorage or on a server db.
  - [x] Function that gets the next id for a new Entry.
  - [x] Function that sets new information for an Entry, it can create or update.
  - [x] Function that deletes an Entry.

### v0.2.0

  - [ ] Include single password authentication method.
  - [ ] Include FileDB database.