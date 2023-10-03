# Changelog

## v0.1.6

- Added styles to `<EntryTypeIndicator/>`.
- Updated `<EntryInput/>` to use a contenteditable instead of a textarea.
- Added the `styles` module.

### Changes so far

- Added the Lunchbox fonts.
- Removed static styles.

### v0.2

  - UI Revamp and upgrade to Lunchbox v0.3
    - `<EntryTypeIndicator/>`
      - [x] Use tabler icons instead of characters.
    - `<EntryInput/>`
      - [x] Use a contenteditable instead of a textarea.
      - [ ] Use '#' character detection inside the content for tags instead of an input.
      - [ ] This same component might be used to substitute EntryQuery, make the onSubmit action configurable to searching instead of submiting.
    - `<EntryList/>`
      - [ ] Use loader component.
  - Backlog
    - [x] Include single password authentication method.
    - [x] Include FileDB database.
    - [ ] Parse the EntryMark as a possible date for events and tasks.
    - [ ] Save entry search queries for future uses.
    - [ ] Implement parsing a date somewhere in an entry.
    - [ ] Download DB as JSON.
    - [ ] Add equally smooth mobile experience.
    - [ ] Fix entry x overflow on long single words.
    - [ ] Add a middleware file in /routes/api for all auth redirection and responding {} when not signed in.
    - [ ] Make type safe all requests and responses in the API.
    - [ ] Add n queries as argument to findEntries.
      - Returns n lists of entries, instead of calling and filtering n times all entries.
  - [ ] Input Note
    - [ ] Lock entry information with Alt+Space when on NoteMark and Tag inputs.
      - [ ] Make the icon an invisible button that changes onlcick as well.
      - [ ] When the lock is applied change the button from invisible to panel.
  - [ ] Pages
    - [ ] Day, Month and Year view. `/[year].tsx/[month].tsx/[day].tsx` in numbers.
    - [ ] Tag view `/tag/[tag].tsx`.