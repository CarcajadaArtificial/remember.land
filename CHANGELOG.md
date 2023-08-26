# Changelog

## v0.0.31

### Relocated the NoteMark
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
- [ ] Make a localStorage middleware file.
  - [ ] Make it trivial to change to another database.

### v0.2.0

  - [ ] Include single password authentication method.
  - [ ] Include FileDB database.