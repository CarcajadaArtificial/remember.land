# Changelog

## v0.0.30

### Removed the InputNoteField component
  - `/components/InputNoteField/index.tsx`

### `/islands/InputNote/index.tsx`
  - Refactored the InputNoteField component.
  - Added a default focus interaction.
  - Added the handleNoteMarkInput handler.

### Added the handleNoteMarkInput handler
  - `/utils/handlers/InputNote.ts`

### Added a URL NoteMark interaction feature
  - `/islands/Entry/index.tsx`
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
    - [x] Add the URL NoteMark interaction.
  - [ ] ⏳ Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
    - [x] Better focus background.
    - [x] Add a hover state.
- [ ] Rename "Note" to "Entry"

