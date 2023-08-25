# Changelog

## v0.0.28

### Added better focus and hover states for the Entry and InputNote islands
  - `/islands/Entry/style.scss`
  - `/islands/InputNote/style.scss`

### Removed NoteMark, id and created_at Texts from the Entry island
  - `/islands/Entry/index.tsx`

### Added global color variables
  - `/index.scss`

### Minor updates
  - `/components/InputNoteField/index.tsx`
  - `/islands/InputNote/index.tsx`

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

