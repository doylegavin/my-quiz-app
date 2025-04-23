/**
 * Exam Data Update Script
 * 
 * This script does two things:
 * 1. Scrapes exam papers from examinations.ie (if --scrape flag is used)
 * 2. Processes raw data into a usable format for the application
 * 
 * Usage:
 *   npm install puppeteer
 *   node scripts/updateExamData.js          // Process existing data only
 *   node scripts/updateExamData.js --scrape // Scrape new data and process
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configuration
const CONFIG = {
  SKIP_FILLED: true,         // Skip years/subjects already in data
  ONLY_CURRENT_YEAR: true,   // Only scrape current year
  TIMEOUT: 500,              // Timeout between requests to avoid rate limiting
};

// Website selectors for examinations.ie
const SELECTORS = {
  AGREE_BUTTON: '#agreementButton',
  MATERIAL_TYPE_SELECT: '#ddlExamMaterialType',
  YEAR_SELECT: '#ddlExamYear',
  EXAM_SELECT: '#ddlExamID',
  SUBJECT_SELECT: '#ddlExamSubject',
  LANGUAGE_SELECT: '#ddlExamLanguage',
  VIEW_BUTTON: '#btnViewDocs',
  FILE_LINK: 'a[title*="PDF"]',
  FILE_DETAILS: '.examdocdetails',
};

// Type converter for exam material types
const TYPE_CONVERTER = {
  'exampapers': 'Exam Paper',
  'markingschemes': 'Marking Scheme',
  'samplepaper': 'Sample Paper',
  'samplemarkingscheme': 'Sample Marking Scheme',
  'examinersreport': 'Examiner Report',
  'attendanceanddataverificationforms': 'Attendance and Data Verification Forms',
};

/**
 * Initialize data structure with existing data if available
 */
function initializeData() {
  const dataFilePath = path.join(__dirname, '../src/data/data.json');
  let data = { lc: {}, jc: {}, lb: {} };
  
  if (fs.existsSync(dataFilePath)) {
    try {
      data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
      console.log('Loaded existing data from data.json');
    } catch (err) {
      console.error('Error loading existing data:', err);
    }
  }
  
  return { data, dataFilePath };
}

/**
 * Scrape exam papers from examinations.ie
 */
async function scrapeExamPapers() {
  const { data, dataFilePath } = initializeData();
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to examinations.ie archive...');
    await page.goto('https://www.examinations.ie/exammaterialarchive/');
    
    // Accept terms
    await page.click(SELECTORS.AGREE_BUTTON);
    await page.waitForNavigation();
    
    // Get all available material types
    const materialTypes = await page.evaluate((selector) => {
      return Array.from(document.querySelector(selector).options)
        .filter(option => option.value)
        .map(option => ({ value: option.value, text: option.text }));
    }, SELECTORS.MATERIAL_TYPE_SELECT);
    
    for (const materialType of materialTypes) {
      if (!TYPE_CONVERTER[materialType.value.toLowerCase()]) continue;
      
      console.log(`Processing material type: ${materialType.text}`);
      await page.select(SELECTORS.MATERIAL_TYPE_SELECT, materialType.value);
      await page.waitForTimeout(CONFIG.TIMEOUT);
      
      // Get all available years
      const years = await page.evaluate((selector) => {
        return Array.from(document.querySelector(selector).options)
          .filter(option => option.value)
          .map(option => ({ value: option.value, text: option.text }));
      }, SELECTORS.YEAR_SELECT);
      
      // If only current year, filter to most recent year
      const yearsToProcess = CONFIG.ONLY_CURRENT_YEAR ? [years[0]] : years;
      
      for (const year of yearsToProcess) {
        console.log(`Processing year: ${year.text}`);
        await page.select(SELECTORS.YEAR_SELECT, year.value);
        await page.waitForTimeout(CONFIG.TIMEOUT);
        
        // Get all available exams
        const exams = await page.evaluate((selector) => {
          return Array.from(document.querySelector(selector).options)
            .filter(option => option.value)
            .map(option => ({ value: option.value, text: option.text.trim() }));
        }, SELECTORS.EXAM_SELECT);
        
        for (const exam of exams) {
          // Map exam types to our data structure keys
          let examType;
          if (exam.text.toLowerCase().includes('leaving cert')) {
            examType = exam.text.toLowerCase().includes('applied') ? 'lb' : 'lc';
          } else if (exam.text.toLowerCase().includes('junior')) {
            examType = 'jc';
          } else {
            continue; // Skip unknown exam types
          }
          
          console.log(`Processing exam: ${exam.text} (${examType})`);
          await page.select(SELECTORS.EXAM_SELECT, exam.value);
          await page.waitForTimeout(CONFIG.TIMEOUT);
          
          // Get all available subjects
          const subjects = await page.evaluate((selector) => {
            return Array.from(document.querySelector(selector).options)
              .filter(option => option.value)
              .map(option => ({ value: option.value, text: option.text.trim() }));
          }, SELECTORS.SUBJECT_SELECT);
          
          for (const subject of subjects) {
            // Skip if we already have this subject/year and SKIP_FILLED is true
            if (CONFIG.SKIP_FILLED && 
                data[examType][subject.text] && 
                data[examType][subject.text][year.text] && 
                data[examType][subject.text][year.text].length > 0) {
              console.log(`Skipping ${subject.text} (${year.text}) - already in data`);
              continue;
            }
            
            console.log(`Processing subject: ${subject.text}`);
            await page.select(SELECTORS.SUBJECT_SELECT, subject.value);
            await page.waitForTimeout(CONFIG.TIMEOUT);
            
            // Click view button
            await page.click(SELECTORS.VIEW_BUTTON);
            await page.waitForTimeout(CONFIG.TIMEOUT);
            
            // Extract paper URLs and details
            const papers = await page.evaluate((selectors, typeConverter, materialTypeValue) => {
              const results = [];
              const links = document.querySelectorAll(selectors.FILE_LINK);
              const details = document.querySelectorAll(selectors.FILE_DETAILS);
              
              for (let i = 0; i < links.length; i++) {
                const url = links[i].href;
                const detailText = details[i] ? details[i].textContent.trim() : '';
                
                results.push({
                  url,
                  details: detailText,
                  type: typeConverter[materialTypeValue.toLowerCase()] || materialTypeValue
                });
              }
              
              return results;
            }, SELECTORS, TYPE_CONVERTER, materialType.value);
            
            // Add to data structure
            if (!data[examType][subject.text]) {
              data[examType][subject.text] = {};
            }
            
            if (!data[examType][subject.text][year.text]) {
              data[examType][subject.text][year.text] = [];
            }
            
            data[examType][subject.text][year.text] = [
              ...data[examType][subject.text][year.text],
              ...papers
            ];
            
            // Write progress to file
            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
            
            // Go back to material selection
            await page.goto('https://www.examinations.ie/exammaterialarchive/');
            await page.click(SELECTORS.AGREE_BUTTON);
            await page.waitForNavigation();
            await page.select(SELECTORS.MATERIAL_TYPE_SELECT, materialType.value);
            await page.waitForTimeout(CONFIG.TIMEOUT);
            await page.select(SELECTORS.YEAR_SELECT, year.value);
            await page.waitForTimeout(CONFIG.TIMEOUT);
            await page.select(SELECTORS.EXAM_SELECT, exam.value);
            await page.waitForTimeout(CONFIG.TIMEOUT);
          }
        }
      }
    }
    
    console.log('Scraping completed successfully');
    return data;
  } catch (error) {
    console.error('Error during scraping:', error);
    // Write whatever data we have
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return data;
  } finally {
    await browser.close();
  }
}

/**
 * Process scraped data into a more usable format
 */
function processScrapedData(skipScraping = true) {
  const { data, dataFilePath } = skipScraping ? initializeData() : { data: null, dataFilePath: null };
  
  if (skipScraping && !data) {
    console.error('No data to process');
    return;
  }
  
  console.log('Processing data...');
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write to public/data.json
  const publicDataPath = path.join(publicDir, 'data.json');
  fs.writeFileSync(publicDataPath, JSON.stringify(data, null, 2));
  
  console.log('Data processing completed');
  console.log(`Data saved to: ${dataFilePath}`);
  console.log(`Data saved to: ${publicDataPath}`);
}

/**
 * Main function
 */
async function main() {
  console.log('Starting exam data update process...');
  
  // Check if we should scrape data
  const shouldScrape = process.argv.includes('--scrape');
  
  let data;
  if (shouldScrape) {
    console.log('Scraping mode enabled');
    data = await scrapeExamPapers();
  } else {
    console.log('Processing mode only (use --scrape to fetch new data)');
  }
  
  // Process data
  processScrapedData(shouldScrape ? false : true);
  
  console.log('Exam data update process completed');
}

// Run the main function
main().catch(console.error); 