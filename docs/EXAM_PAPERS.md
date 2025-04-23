# Exam Papers Feature Documentation

This document explains how the exam papers feature works, including the data structure, components, and update process.

## Overview

The exam papers feature allows users to browse, filter, and download past exam papers from the State Examinations Commission website (examinations.ie). The implementation uses a static data approach where exam paper information is periodically scraped and stored in a JSON file.

## Data Structure

Exam paper data is stored in `src/data/data.json` and `public/data.json` with the following structure:

```json
{
  "lc": {  // Leaving Certificate
    "Mathematics": {  // Subject name
      "2023": [  // Year
        {
          "details": "Higher Level", 
          "url": "path/to/file.pdf",
          "type": "Exam Paper"
        },
        {
          "details": "Higher Level",
          "url": "path/to/markingscheme.pdf",
          "type": "Marking Scheme"
        }
      ]
    }
  },
  "jc": {  // Junior Certificate/Cycle
    // Similar structure as LC
  },
  "lb": {  // Leaving Certificate Applied
    // Similar structure as LC
  }
}
```

## Components

The exam papers feature consists of several key components:

1. **ExamPaperExplorer**: Main component for browsing and filtering exam papers
   - Located at `src/components/ExamPaperExplorer.tsx`
   - Manages state for filtering and favorite subjects
   - Uses static data for performance and reliability

2. **PaperList**: Displays a list of exam papers as cards
   - Shows paper type, details, and download link
   - Color-coded based on paper type

3. **Slicing**: Visualizes available papers across years in a grid layout
   - Makes it easy to identify patterns and gaps in paper availability

4. **Autocomplete & Select**: Custom components for filtering options
   - Allows searching subjects by typing
   - Supports favorite subjects for quick access

## Utility Functions

Key utility functions for working with exam paper data:

- `getPapersFromStaticData`: Retrieves and filters papers based on selection criteria
- `getSubjectsForExamType`: Gets available subjects for a specific exam type
- `getFavoriteSubjects` & `toggleFavoriteSubject`: Manage user's favorite subjects

## Updating Exam Data

To update the exam paper data:

1. **Run the update script**:
   ```bash
   # Install dependencies
   npm install puppeteer
   
   # Run without scraping (processes existing data only)
   node scripts/updateExamData.js
   
   # Run with scraping (fetches new data from examinations.ie)
   node scripts/updateExamData.js --scrape
   ```

2. **Configuration options** (in `scripts/updateExamData.js`):
   - `SKIP_FILLED`: Skip years/subjects already in data (default: true)
   - `ONLY_CURRENT_YEAR`: Only scrape current year (default: true)
   - `TIMEOUT`: Time between requests to avoid rate limiting (default: 500ms)

The update process:
1. Scrapes raw data from examinations.ie using Puppeteer (if --scrape flag used)
2. Processes the data into a more usable format
3. Saves to both `public/data.json` and `src/data/data.json`

## Usage

Users can:
1. Access the Exam Papers page from the sidebar
2. Filter papers by exam type, subject, year, level, and language
3. Star favorite subjects for quick access
4. Use the Slicing visualization to browse papers across years
5. Download papers directly with a single click

## Implementation Notes

- The feature uses static data instead of API calls for reliability and performance
- Favorite subjects are stored in localStorage for persistence
- The UI is responsive and adapts to different screen sizes
- The component filters subjects based on the selected exam type automatically 