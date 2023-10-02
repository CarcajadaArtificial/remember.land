# Changelog

## v0.1.1

### Upgraded to Deno Fresh 1.4.3

### v0.2

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