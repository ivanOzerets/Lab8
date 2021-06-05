describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    var includesEntry = await page.url().includes('/#entry1');

    expect(includesEntry).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    const header = await page.$eval('h1', (elem) => {
      return elem.innerText;
    })

    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        
        let truth = true;
        const title = await page.$eval('entry-page', (entry) => {return entry.shadowRoot.querySelector('.entry-title').innerText}); 
        const date = await page.$eval('entry-page', (entry) => {return entry.shadowRoot.querySelector('.entry-date').innerText}); 
        const content = await page.$eval('entry-page', (entry) => {return entry.shadowRoot.querySelector('.entry-content').innerText}); 
        const src = await page.$eval('entry-page', (entry) => {return entry.shadowRoot.querySelector('.entry-image').src}); 
        const alt = await page.$eval('entry-page', (entry) => {return entry.shadowRoot.querySelector('.entry-image').alt}); 
    
        if (title != 'You like jazz?') {
          truth = false;
        }
        if (date != '4/25/2021') {
          truth = false;
        }
        if (content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") {
          truth = false;
        }
        if (src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455') {
          truth = false;
        }
        if (alt != 'bee with sunglasses') {
          truth = false;
        }
        expect(truth).toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    expect(await page.$eval('body', (elem) => { return elem.className })).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    await page.click('img');

    expect(page.url().includes('/#settings')).toBe(true);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    expect(await page.$eval('h1', (elem) => { return elem.innerText; })).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    expect(await page.$eval('body', (elem) => { return elem.className })).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();

    expect(page.url().includes('/#entry1')).toBe(true);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();

    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    expect(await page.$eval('h1', (elem) => { return elem.innerText })).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    expect(await page.$eval('body', (elem) => { return elem.className })).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.$$eval('journal-entry', (entries) => {
      entries[1].click();
    })

    expect(page.url().includes('/#entry2')).toBe(true); 
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const temp = await page.$eval('h1', (elem) => { return elem.innerText; });
    
    expect(temp).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    let truth = true;
    const title = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-title').innerText; });
    const date = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-date').innerText; });
    const content = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-content').innerText; });
    const src = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-image').src; });
    const alt = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-image').alt; });
    
    if (title != 'Run, Forrest! Run!'){
      truth = false;
    }
    if (date != '4/26/2021') {
      truth = false;
    }
    if (content != "Mama always said life was like a box of chocolates. You never know what you're gonna get.") {
      truth = false;
    }
    if (src != 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg') {
      truth = false;
    }
    if (alt != 'forrest running') {
      truth = false;
    }
    expect(truth).toBe(true);
  }, 10000);

  // create your own test 17
  it('Test17: Verify the url is correct when clicking on the third entry', async() => {
    await page.goBack();
    
    await page.$$eval('journal-entry', (entries) => {
      entries[2].click();
    })

    expect(page.url().includes('/#entry3')).toBe(true);
  });

  // create your own test 18
  it('Test18: Verify the title is current when clicking on the third entry', async() => {
    expect(await page.$eval('h1', (elem) => { return elem.innerText; })).toBe('Entry 3');
  });

  // create your own test 19
  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test19: Verify the entry page contents is correct when clicking on the third entry', async() => {
    let truth = true;
    const title = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-title').innerText; });
    const date = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-date').innerText; });
    const content = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-content').innerText; });
    const src = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-image').src; });
    const alt = await page.$eval('entry-page', (elem) => { return elem.shadowRoot.querySelector('.entry-image').alt; });
    
    if (title != 'Ogres are like onions'){
      truth = false;
    }
    if (date != '4/27/2021') {
      truth = false;
    }
    if (content != "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.") {
      truth = false;
    }
    if (src != "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg" ) {
      truth = false;
    }
    if (alt != "shrek and donkey looking confused") {
      truth = false;
    }
    expect(truth).toBe(true);
  }, 10000);

  // create your own test 20
  it('Test17: Verify the url is correct when clicking on the forth entry', async() => {
    await page.goBack();
    
    await page.$$eval('journal-entry', (entries) => {
      entries[3].click();
  })

  expect(page.url().includes('/#entry4')).toBe(true);
  });
  
});
