/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };
     
    result.SearchTerm = searchTerm;
    if(searchTerm.length==0 || scannedTextObj.length==0){
        return result
    }
    
    // for loop to go through each book 
    for (let x = 0; x<scannedTextObj.length; x++){
        book = scannedTextObj[x];
        // for loop to got through each Content item in the book
        for (let y = 0; y < scannedTextObj[x].Content.length; y++) {
            let text = scannedTextObj[x].Content[y]['Text'];
            let found = searchText(searchTerm,text);
            if (found){
                result.Results.push({'ISBN':book['ISBN'],"Page":book.Content[y]['Page'],'Line':book.Content[y]['Line']});
            }
        }
    }
    return result; 
}

/**
 * Helper function to do the searching in a given line of text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {string} line - The current line of text we're searching.
 * @returns {boolean}- returns true if match found, else false.
 */
function searchText(searchTerm,line){
    var pointer1 = 0;
    // count is used to track how many matching letter we have so far.
    // if count equals the length of the searchTerm, we know we found
    // the searchTerm.
    var count = 0; 
    let n = searchTerm.length;
    for (let pointer2 = 0; pointer2 < line.length; pointer2++){
        letter = line[pointer2];
        if (letter==searchTerm[pointer1]){
            count+=1;
            pointer1+=1;
            if (count == n){
                // we found a match
                return true;
            }
        }else{
            // reset count and pointer1
            count = 0;
            pointer1 = 0;
        }
    }
    return false;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/**
 * 
 * UNIT TEST INPUTS AND OUTPUTS
 */
    // Unit Test 3
const phraseOut3 ={
    'SearchTerm': 'went on by',
    'Results':[
        {'ISBN': '9780000528531','Page':31, 'Line':8 }
    ]
}
    // Unit Test 4
const notFoundOut4 ={
    'SearchTerm': 'cat',
    'Results':[]
}

    // Unit Test 5
const caseOut5= {
    'SearchTerm': 'canadian\'s',
    'Results':[]
}

    // Unit Test 6
const emptyIn6 = []
const emptyOut6 ={
    'SearchTerm': 'the',
    'Results':[]
}

    // Unit Test 7
const emptyIn7 = []
const emptyOut7 ={
    'SearchTerm': '',
    'Results':[]
}

    // Unit Test 8
const emptyOut8={
    'SearchTerm': '',
    'Results':[]
}

    // Unit Test 9
const multipleIn9 = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Thirty Hundred Lines Above the Sun",
        "ISBN": "9780000528530",
        "Content": [
            {
                "Page": 41,
                "Line": 10,
                "Text": "He ran"
            },
            {
                "Page": 41,
                "Line": 10,
                "Text": "She sung"
            },
            {
                "Page": 41,
                "Line": 11,
                "Text": "They asked"
            } 
        ] 
    }
]

const multipleOut9 = {
    'SearchTerm': 'asked',
    'Results':[
        {'ISBN': '9780000528531','Page':31, 'Line':10 },
        {'ISBN':  '9780000528530','Page':41, 'Line': 11}
    ]
}



/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Positive Unit Test */
/** We can check if given a phrase with multiple words as the searchTerm, we get a positive result.
 * This test makes sure that phrase are recognized in the case that the searchTerm is a sentence.
 */
const test3result = findSearchTermInBooks("went on by", twentyLeaguesIn); 
if (JSON.stringify(phraseOut3) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", phraseOut3);
    console.log("Received:", test3result);
}

/** Negative Unit Test */
/** We can check that given a searchTerm that does not exist in the scannedTextObj, we get an empty Results array. */
const test4result = findSearchTermInBooks("cat", twentyLeaguesIn);
if (JSON.stringify(notFoundOut4) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", notFoundOut4);
    console.log("Received:", test4result);
}

/** Case Sensitivity Unit Test */
/**
 * Given the searchTerm "canadian's", we should not find a result in the book.
 * Although "Canadian's" does exist, our search term is not capitalized.
 */
const test5result = findSearchTermInBooks("canadian\'s", twentyLeaguesIn);
if (JSON.stringify(caseOut5) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", caseOut5);
    console.log("Received:", test5result);
}



/** Edge Case: We can check that, given a nonempty searchTerm and an empty scannedTextObj, we get an empty Results array. */
const test6result = findSearchTermInBooks("the", emptyIn6); 
if (JSON.stringify(emptyOut6) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", emptyOut6);
    console.log("Received:", test6result);
}

/** Edge Case: We can check that, given an empty searchTerm and an empty scannedTextObj, we get an empty result object. */
const test7result = findSearchTermInBooks("", emptyIn7); 
if (JSON.stringify(emptyOut7) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", emptyOut7);
    console.log("Received:", test7result);
}

/** Edge Case: Given an empty searchTerm and a nonempty scannedTextObj, we get an empty Results array. */
const test8result = findSearchTermInBooks("", twentyLeaguesIn); 
if (JSON.stringify(emptyOut8) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", emptyOut8);
    console.log("Received:", test8result);
}


/** Edge Case: Given multiple (2) books that both contain the searchTerm, we should get two results. */

const test9result = findSearchTermInBooks("asked", multipleIn9); 
if (test9result.Results.length == 2) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", multipleOut9.Results.length);
    console.log("Received:", test9result.Results.length);
}



