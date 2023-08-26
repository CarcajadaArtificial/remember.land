# Changelog

## v0.0.29

### Added background color utility classes
  - `/index.scss`

### Added feature to edit entries
  - `/islands/Entry/index.tsx`
  - `/islands/EntryList/index.tsx`
  - `/islands/InputNote/index.tsx` An artificial focus was added for a better experience.
  - `/utils/handlers/InputNote.ts`

### Minor updates
  - `/components/InputNoteField/index.tsx`
  - `/components/NoteTypeIndicator/index.tsx`
  - `/routes/index.tsx`
  - `/islands/Entry/style.scss`

## Roadmap

### v0.1.0

- [x] Finish planning phase.
  - [x] BD schema.
  - [x] Services that will access the information.
- [x] Plan the interface.
  - [x] Define components and their properties.
  - [x] Define pages.
- [x] Create blank project
  - [ ] Include single password authentication method.
  - [ ] Include FileDB database.
- [ ] Components
  - [ ] ⏳ Contribution Calendar
  - [ ] ⏳ Note
    - [x] Add an update note information functionality onclick and onkeyup enter.
    - [x] Remove id and created_at Texts.
    - [ ] Relocate NoteMark
    - [x] Focus and hover must change background.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
    - [x] Better focus background.
    - [x] Add a hover state.
- [ ] Rename "Note" to "Entry"

