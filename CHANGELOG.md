# Changelog

## v0.1.15

- Added an interface and API for creating and getting tags.

### Changes so far

- Added the Lunchbox fonts.
- Removed static styles.

### v0.2

  - Features
    - Tag pages, autocomplete and utilities.
      - [x] Update prod db to remove spaces in tag names and changes them to underscores.
      - [x] Update the tag adding stystem to automatically change spaces to underscores.
      - [x] Create an interface and API for creating and getting tags.
      - [ ] Route `/api/tag/index.ts` responds with an array of all tags
      - [ ] Route `/api/tag/create.ts` creates a new tag and prevents name duplication
      - [ ] Route `/api/tag/get/[name].ts` responds with all the entries that match that tag.
      - [ ] Route `/tag/index.ts` that shows all tags.
      - [ ] Route `/tag/[name].ts` that shows all entries of that certain tag.
    - Create threads of entries.
    - Create similar/opposite relations between tags.
  - UI Revamp and upgrade to Lunchbox v0.3
    - `<Contribution Calendar/>`
      - [ ] Add css-in-js styles.
    - `<EntryTypeIndicator/>`
      - [x] Use tabler icons instead of characters.
    - `<EntryInput/>`
      - [x] Use a contenteditable instead of a textarea.
      - [ ] This same component might be used to substitute EntryQuery, make the onSubmit action configurable to searching instead of submiting.
      - [ ] `@media (pointer:none)` That changes the UI adding a submit button, an "add tag" button, and collapses into a floating icon menu on smaller screens.
    - `<EntryList/>`
      - [ ] Use loader component.
      - [ ] Change datetime to ptera.
      - [ ] Move `<ContributionCalendar/>` inside a new Layout before the list of entries.
  - Backlog
    - [x] Include single password authentication method.
    - [x] Include FileDB database.
    - [x] Fix entry x overflow on long single words.
    - [ ] Parse the EntryMark as a possible date for events and tasks.
    - [ ] Add equally smooth mobile experience.
    - [ ] Add a middleware file in /routes/api for all auth redirection and responding {} when not signed in.
    - [ ] Make type safe all requests and responses in the API.
    - [ ] Add a Navigation 
    - [ ] Add n queries as argument to findEntries.
      - Returns n lists of entries, instead of calling and filtering n times all entries.

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