# Project specifications

## Models

### Note - `notes.json`

- **Id**: `number` - The consecutive unique identifier for the note.
- **Created at**: `datetime` - The moment the note was created.
- **Content**: `string` - The text inside the note.
- **North notes**: `number[]` - The ids of the notes that originated this one.
- **South noted**: `number[]` - The ids of the notes that originated from this
  one.
- **West notes**: `number[]` - The ids of the notes that are similar to this
  one.
- **East notes**: `number[]` - The ids of the notes that are opposite to this
  one.
- **Tags**: `string[]` - The tags that categorize the note. The tags "task",
  "done", "event", "permanent", and "question" are hardcoded to have different
  colors and special extra native uses.
- **Reference**: `string` - This string is meant to be one of two things:
  Firstly a string that references something in particular, like a chapter in a
  book or a scene in a movie or really anything of the such. Lastly, it can be a
  valid URL that adds a link to the note.

### Tags

Not a model, simple strings inside every note.

---

## UI Components

### Input Note - `<InputNote/>`

- Input field where the note can be written.
- Detect characters in the content:
  - "`?`": Adds the tag "question".
  - "`[ ]`" or "`[]`": Adds the tag "task" and removes "event".
  - "`[x]`": Adds the tag "task" if not already present or removes "event", and
    adds "done".
  - "`o`": Adds the tag "event" and removes "task".
  - "`-`": Removes the tags "event", "task", or "done" if present.
  - "`*`": Adds the tag "permanent" and removes "event", "task", or "done" if
    present.
- Display the note's id subtly.
- Input field where tags can be added.
- Input field where related notes can be added.
- Input field where a reference can be added.

### Note - `<Note/>`

- The note's content is visible and clickable to edit it in place.
- A type indicator with:
  - A '`☐`' [(U+2610)](https://www.compart.com/en/unicode/U+2610) character
    indicates tasks and a '`☑`'
    [(U+2611)](https://www.compart.com/en/unicode/U+2611) marks it as done.
  - A '`○`' [(U+25CB)](https://www.compart.com/en/unicode/U+25CB) character
    indicates future or present events and a '`●`'
    [(U+25CF)](https://www.compart.com/en/unicode/U+25CF) character for past
    events.
  - A '`-`' [(U+002D)](https://www.compart.com/en/unicode/U+002D) character (the
    common dash or "Hyphen-Minus") for a common note.
  - A '`*`' [(U+002A)](https://www.compart.com/en/unicode/U+002A) character for
    a permanent note.
- A checkbox (if it is a task) to add or remove the "done" tag.
- Tags are clickable and take you to their tag view.
- The note's reference must be visible, as text or as a link.
- The length of the content is visible as a number of characters.
- The intended navigation is using the keyboard, but the mouse could also work.
  - Every note starts only with the content and type indicator visible.
  - Every note must have a tab index, and when focused, displays the tags,
    length, reference, and related notes.

### ContributionCalendar - `<ContributionCalendar/>`

- This component is highly inspired by the same component used in GitHub's
  profile page.
- Displays a grid of small squares, seven squares tall, and as many weeks as the
  year needs.
- Months must be separated from one another and all are clickable and redirects
  to the month view.
- Subtly displays the year and the names of the weekdays.

---

## Pages

### Home - `/`

- Focus on the input field for a new note.
- Show a list of the notes that have been created today.
- A git-like timeline of the year.
- A random note that isn't tagged or related that changes every day.

### Tag view - `/tag/[tag-name]`

- Shows a chronological list of notes that includes notes created this week and
  permanent notes with that tag.
- Input field for a new note, with the current tag set by default.

### Month view - `/past/[year]/[month]`

- This page is meant to display the most important information of the month.
- A git-like timeline of the month.
- A vertical list of the days in the month with a weekday abbreviated to two
  characters and the events scheduled every day.
- A list of all remaining tasks that are open.
- A list of the permanent notes that were created in the past 30 days.
- A list of all tags without tags or relations that were created in the past 15
  days.

---

## Services

### Authentication

- Create a user with a GitHub account.
- When a new user is created, create a JSON file with the user id.

### Get Notes

- Returns an array of notes.
- **Id**: `number?` - It would match with 1 or 0 notes.
- **Created before**: `datetime?` - Notes created before that date.
- **Created after**: `datetime?` - Notes created after that date.
- **Has tags**: `string[]?` - Notes that contain all the tags listed.
- **Has reference**: `boolean?` - Notes that contain any reference.
- Has relation: `boolean?` - True for notes that contain any type of relation,
  false if it has none.

### Get Contributions

- Returns an array of pair values:
  - **Day**: `datetime`
  - **Contributions**: `number`
- **Created before**: `datetime?` - Counts the notes created per day before that
  date.
- **Created after**: `datetime?` - Counts the notes created per day after that
  date.

---

## Future Pages

### Year view - `/past/[year]`

### Day view - `/past/[year]/[month]/[day]`

### Search view - `/search`

### Questions view - `/questions`

### Search view - `/search`

### Profile view - `/profile`
