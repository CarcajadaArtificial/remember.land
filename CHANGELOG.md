# Changelog

## v0.0.27

### Added the Entry and Entry List islands
  - `/islands/Entry/index.tsx`
  - `/islands/Entry/style.scss`
  - `/islands/EntryList/index.tsx`
  - `/routes/index`

### `/utils/handlers/InputNote.ts`
  - Added the input step hooks to the inputNote handler.
  - Added a field reset after creating a new note.
  - Added the `handleCreateNoteShortcut()` handler for the cmd+enter and ctl+enter shortcuts.
  - Removed the `handleCreateNote` handler.

### `/islands/InputNote/index.tsx`
  - Removed the `handleCreateNote` handler.
  - Added the `iInputNote` interface.
  - Added the `updateLocalStorage` signal.

### Minor updates
  - `/index.scss`
  - `/components/NoteTypeIndicator/index.tsx`

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
    - [ ] Add an update note information functionality onclick and onkeyup enter.
    - [ ] Remove id and created_at Texts.
    - [ ] Relocate NoteMark
    - [ ] Focus and hover must change background.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
    - [ ] Better focus background.
    - [ ] Add a hover state.
- [ ] Rename "Note" to "Entry"

