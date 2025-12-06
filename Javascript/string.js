/* 
   WHAT IS A STRING?
   - Sequence of characters (text)
   - Immutable - cannot change individual characters
   - Primitive type but has methods (auto-boxed to String object)
   - UTF-16 encoded in JavaScript
   - Can be created with single quotes, double quotes, or backticks
*/

// ============================================
// 1️⃣ CREATING STRINGS
// ============================================

//✅ String Literals
const str1 = 'Hello World'; // Single quotes
const str2 = "Hello World"; // Double quotes
const str3 = `Hello World`; // Template literals (backticks)

//✅ String Constructor (avoid - creates object, not primitive)
const str4 = new String('Hello'); // Returns String object
const str5 = String(123); // Converts to string primitive
console.log(typeof str4); // 'object'
console.log(typeof str5); // 'string'

//✅ Template Literals (ES6) - Supports interpolation
const name = 'Alice';
const age = 25;
const greeting = `Hello, ${name}! You are ${age} years old.`;
console.log(greeting); // "Hello, Alice! You are 25 years old."

// Multi-line strings
const multiline = `
  Line 1
  Line 2
  Line 3
`;

// Expression evaluation
const price = 10;
const quantity = 3;
console.log(`Total: $${price * quantity}`); // "Total: $30"

//✅ Tagged Templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) =>
        result + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), ''
    );
}
const user = 'Bob';
const tagged = highlight`User: ${user}`;
console.log(tagged); // "User: <strong>Bob</strong>"

// ============================================
// 2️⃣ STRING PROPERTIES & BASIC ACCESS
// ============================================

const text = 'JavaScript';

//✅ Length Property
console.log(text.length); // 10

//✅ Character Access
console.log(text[0]); // 'J'
console.log(text[text.length - 1]); // 't'
console.log(text[100]); // undefined (out of bounds)

//✅ charAt() - Get character at index
console.log(text.charAt(0)); // 'J'
console.log(text.charAt(100)); // '' (empty string, not undefined)

//✅ charCodeAt() - Get Unicode value
console.log(text.charCodeAt(0)); // 74 (Unicode for 'J')

//✅ codePointAt() - Get Unicode code point (for emojis)
const emoji = '😀';
console.log(emoji.codePointAt(0)); // 128512

//✅ String.fromCharCode() - Create string from Unicode values
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // 'Hello'

//✅ String.fromCodePoint() - Create string from code points
console.log(String.fromCodePoint(128512)); // '😀'

// ============================================
// 3️⃣ STRING SEARCH & FINDING METHODS
// ============================================

const sample = 'The quick brown fox jumps over the lazy dog';

//✅ indexOf() - Find first occurrence - O(n*m)
console.log(sample.indexOf('quick')); // 4
console.log(sample.indexOf('cat')); // -1 (not found)
console.log(sample.indexOf('the')); // 31 (case-sensitive)

// With start position
console.log(sample.indexOf('o', 20)); // 26

//✅ lastIndexOf() - Find last occurrence
console.log(sample.lastIndexOf('o')); // 41
console.log(sample.lastIndexOf('the')); // 31

//✅ includes() - Check if substring exists - O(n*m)
console.log(sample.includes('fox')); // true
console.log(sample.includes('cat')); // false
console.log(sample.includes('FOX')); // false (case-sensitive)

//✅ startsWith() - Check if starts with substring
console.log(sample.startsWith('The')); // true
console.log(sample.startsWith('quick', 4)); // true (from index 4)

//✅ endsWith() - Check if ends with substring
console.log(sample.endsWith('dog')); // true
console.log(sample.endsWith('lazy', 43)); // true (within first 43 chars)

//✅ search() - Search with regex - O(n)
console.log(sample.search(/quick/)); // 4
console.log(sample.search(/cat/)); // -1

//✅ match() - Match with regex
console.log(sample.match(/o/)); // ['o', index: 12, ...]
console.log(sample.match(/o/g)); // ['o', 'o', 'o', 'o'] (all matches)
console.log(sample.match(/(\w+)/g)); // All words

//✅ matchAll() - Returns iterator of all matches
const matches = sample.matchAll(/o/g);
for (let match of matches) {
    console.log(match.index, match[0]);
}

// ============================================
// 4️⃣ STRING MODIFICATION METHODS
// (All return new strings - strings are immutable)
// ============================================

const original = 'Hello World';

//✅ replace() - Replace first occurrence
console.log(original.replace('World', 'JavaScript')); // 'Hello JavaScript'
console.log(original.replace('o', '0')); // 'Hell0 World' (only first)

// With regex
console.log(original.replace(/o/g, '0')); // 'Hell0 W0rld' (all occurrences)

//✅ replaceAll() - Replace all occurrences
console.log(original.replaceAll('o', '0')); // 'Hell0 W0rld'

// With function
const newStr = original.replace(/\w+/g, (match) => match.toUpperCase());
console.log(newStr); // 'HELLO WORLD'

//✅ toLowerCase() / toUpperCase()
console.log(original.toLowerCase()); // 'hello world'
console.log(original.toUpperCase()); // 'HELLO WORLD'

//✅ toLocaleLowerCase() / toLocaleUpperCase()
const turkish = 'İstanbul';
console.log(turkish.toLocaleLowerCase('tr-TR')); // 'istanbul'

//✅ trim() - Remove whitespace from both ends
const padded = '  Hello World  ';
console.log(padded.trim()); // 'Hello World'
console.log(padded.trimStart()); // 'Hello World  '
console.log(padded.trimEnd()); // '  Hello World'

//✅ padStart() / padEnd() - Pad string to length
console.log('5'.padStart(3, '0')); // '005'
console.log('5'.padEnd(3, '0')); // '500'

//✅ repeat() - Repeat string n times
console.log('Ha'.repeat(3)); // 'HaHaHa'

// ============================================
// 5️⃣ STRING EXTRACTION METHODS
// ============================================

const phrase = 'JavaScript Programming';

//✅ slice() - Extract substring - O(n)
console.log(phrase.slice(0, 10)); // 'JavaScript'
console.log(phrase.slice(11)); // 'Programming'
console.log(phrase.slice(-11)); // 'Programming' (from end)
console.log(phrase.slice(-11, -5)); // 'Progra'

//✅ substring() - Similar to slice (no negative indices)
console.log(phrase.substring(0, 10)); // 'JavaScript'
console.log(phrase.substring(11)); // 'Programming'
// Negative values treated as 0
console.log(phrase.substring(-5)); // 'JavaScript Programming'

//✅ substr() - DEPRECATED (start, length)
console.log(phrase.substr(11, 7)); // 'Program'

//✅ split() - Split into array - O(n)
console.log(phrase.split(' ')); // ['JavaScript', 'Programming']
console.log('a,b,c'.split(',')); // ['a', 'b', 'c']
console.log('hello'.split('')); // ['h', 'e', 'l', 'l', 'o']

// With limit
console.log('a-b-c-d-e'.split('-', 3)); // ['a', 'b', 'c']

// With regex
console.log('a1b2c3'.split(/\d/)); // ['a', 'b', 'c', '']

// ============================================
// 6️⃣ STRING CONCATENATION & JOINING
// ============================================

//✅ concat() - Concatenate strings
const str6 = 'Hello';
const str7 = ' ';
const str8 = 'World';
console.log(str6.concat(str7, str8)); // 'Hello World'

//✅ + Operator (more common)
console.log(str6 + str7 + str8); // 'Hello World'

//✅ Template Literals (best for many variables)
const first = 'Hello';
const second = 'World';
console.log(`${first} ${second}`); // 'Hello World'

//✅ Array join()
const parts = ['Hello', 'Beautiful', 'World'];
console.log(parts.join(' ')); // 'Hello Beautiful World'

// ============================================
// 7️⃣ STRING COMPARISON
// ============================================

//✅ Equality Comparison (===)
console.log('hello' === 'hello'); // true
console.log('hello' === 'Hello'); // false (case-sensitive)

//✅ Lexicographic Comparison (< > <= >=)
console.log('a' < 'b'); // true
console.log('apple' < 'banana'); // true
console.log('Apple' < 'apple'); // true (uppercase comes first)

//✅ localeCompare() - Language-aware comparison
console.log('a'.localeCompare('b')); // -1 (a comes before b)
console.log('b'.localeCompare('a')); // 1 (b comes after a)
console.log('a'.localeCompare('a')); // 0 (equal)

// Case-insensitive comparison
console.log('hello'.localeCompare('HELLO', undefined, { sensitivity: 'base' })); // 0

// ============================================
// 8️⃣ STRING ITERATION
// ============================================

const word = 'hello';

//✅ for...of loop (best for Unicode)
for (let char of word) {
    console.log(char); // h, e, l, l, o
}

//✅ for loop
for (let i = 0; i < word.length; i++) {
    console.log(word[i]);
}

//✅ Array methods (after splitting)
[...word].forEach(char => console.log(char));

//✅ String iterator
const iterator = word[Symbol.iterator]();
console.log(iterator.next().value); // 'h'
console.log(iterator.next().value); // 'e'

// ============================================
// 9️⃣ COMMON INTERVIEW PATTERNS
// ============================================

//🔥 PATTERN 1: Reverse String - O(n)
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Alternative (two pointers)
function reverseString2(str) {
    let left = 0;
    let right = str.length - 1;
    const arr = str.split('');

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }

    return arr.join('');
}
console.log(reverseString('hello')); // 'olleh'

//🔥 PATTERN 2: Check Palindrome - O(n)
function isPalindrome(str) {
    // Clean string: remove non-alphanumeric, lowercase
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Two pointers (more efficient)
function isPalindrome2(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true

//🔥 PATTERN 3: Anagram Check - O(n)
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = {};

    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }

    return true;
}
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world')); // false

//🔥 PATTERN 4: First Non-Repeating Character - O(n)
function firstNonRepeating(str) {
    const freq = {};

    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }

    for (let char of str) {
        if (freq[char] === 1) return char;
    }

    return null;
}
console.log(firstNonRepeating('leetcode')); // 'l'
console.log(firstNonRepeating('aabbcc')); // null

//🔥 PATTERN 5: Longest Substring Without Repeating Characters - O(n)
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let maxLen = 0;
    let start = 0;

    for (let end = 0; end < s.length; end++) {
        while (seen.has(s[end])) {
            seen.delete(s[start]);
            start++;
        }
        seen.add(s[end]);
        maxLen = Math.max(maxLen, end - start + 1);
    }

    return maxLen;
}
console.log(lengthOfLongestSubstring('abcabcbb')); // 3 ('abc')
console.log(lengthOfLongestSubstring('bbbbb')); // 1 ('b')

//🔥 PATTERN 6: Count Vowels and Consonants - O(n)
function countVowelsConsonants(str) {
    const vowels = 'aeiouAEIOU';
    let vowelCount = 0;
    let consonantCount = 0;

    for (let char of str) {
        if (/[a-zA-Z]/.test(char)) {
            if (vowels.includes(char)) {
                vowelCount++;
            } else {
                consonantCount++;
            }
        }
    }

    return { vowels: vowelCount, consonants: consonantCount };
}
console.log(countVowelsConsonants('Hello World')); // {vowels: 3, consonants: 7}

//🔥 PATTERN 7: String Compression - O(n)
function compress(str) {
    if (!str) return '';

    let result = '';
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i] + (count > 1 ? count : '');
            count = 1;
        }
    }

    return result.length < str.length ? result : str;
}
console.log(compress('aabcccccaaa')); // 'a2bc5a3'
console.log(compress('abc')); // 'abc' (no compression)

//🔥 PATTERN 8: Remove Duplicates - O(n)
function removeDuplicates(str) {
    return [...new Set(str)].join('');
}

// Preserve order
function removeDuplicatesOrdered(str) {
    const seen = new Set();
    let result = '';

    for (let char of str) {
        if (!seen.has(char)) {
            seen.add(char);
            result += char;
        }
    }

    return result;
}
console.log(removeDuplicates('programming')); // 'progamin'

//🔥 PATTERN 9: Reverse Words in String - O(n)
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

function reverseWordsInPlace(str) {
    return str.split(' ')
        .map(word => word.split('').reverse().join(''))
        .join(' ');
}
console.log(reverseWords('Hello World')); // 'World Hello'
console.log(reverseWordsInPlace('Hello World')); // 'olleH dlroW'

//🔥 PATTERN 10: Title Case / Capitalize Words - O(n)
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
console.log(toTitleCase('hello world from javascript')); // 'Hello World From Javascript'

// ============================================
// 🔟 INTERVIEW QUESTIONS WITH SOLUTIONS
// ============================================

//❓ Q1: Valid Parentheses
function isValidParentheses(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };

    for (let char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }

    return stack.length === 0;
}
console.log(isValidParentheses('()[]{}')); // true
console.log(isValidParentheses('(]')); // false

//❓ Q2: Longest Common Prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return '';

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return '';
        }
    }

    return prefix;
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // 'fl'

//❓ Q3: Group Anagrams
function groupAnagrams(strs) {
    const map = new Map();

    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }

    return Array.from(map.values());
}
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

//❓ Q4: Longest Palindromic Substring
function longestPalindrome(s) {
    if (!s || s.length < 1) return '';

    let start = 0, maxLen = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i); // Odd length
        const len2 = expandAroundCenter(i, i + 1); // Even length
        const len = Math.max(len1, len2);

        if (len > maxLen) {
            maxLen = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLen);
}
console.log(longestPalindrome('babad')); // 'bab' or 'aba'

//❓ Q5: String to Integer (atoi)
function myAtoi(s) {
    let i = 0;
    let sign = 1;
    let result = 0;

    // Skip whitespace
    while (s[i] === ' ') i++;

    // Check sign
    if (s[i] === '+' || s[i] === '-') {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    // Convert digits
    while (i < s.length && /\d/.test(s[i])) {
        result = result * 10 + parseInt(s[i]);

        // Check overflow
        if (result * sign > 2147483647) return 2147483647;
        if (result * sign < -2147483648) return -2147483648;

        i++;
    }

    return result * sign;
}
console.log(myAtoi('   -42')); // -42
console.log(myAtoi('4193 with words')); // 4193

//❓ Q6: Implement strStr() / indexOf()
function strStr(haystack, needle) {
    if (!needle) return 0;

    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }

    return -1;
}
console.log(strStr('hello', 'll')); // 2

//❓ Q7: Longest Repeating Character Replacement
function characterReplacement(s, k) {
    let maxCount = 0;
    let maxLen = 0;
    let start = 0;
    const count = {};

    for (let end = 0; end < s.length; end++) {
        count[s[end]] = (count[s[end]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[end]]);

        // If length - most frequent char > k, shrink window
        while (end - start + 1 - maxCount > k) {
            count[s[start]]--;
            start++;
        }

        maxLen = Math.max(maxLen, end - start + 1);
    }

    return maxLen;
}
console.log(characterReplacement('AABABBA', 1)); // 4 ('AABA')

//❓ Q8: Minimum Window Substring
function minWindow(s, t) {
    if (!s || !t || s.length < t.length) return '';

    const need = {};
    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
    }

    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = Object.keys(need).length;
    let formed = 0;
    const windowCounts = {};

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts[char] = (windowCounts[char] || 0) + 1;

        if (need[char] && windowCounts[char] === need[char]) {
            formed++;
        }

        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            const leftChar = s[left];
            windowCounts[leftChar]--;
            if (need[leftChar] && windowCounts[leftChar] < need[leftChar]) {
                formed--;
            }
            left++;
        }
    }

    return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}
console.log(minWindow('ADOBECODEBANC', 'ABC')); // 'BANC'

//❓ Q9: ZigZag Conversion
function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) return s;

    const rows = Array(numRows).fill('');
    let currentRow = 0;
    let goingDown = false;

    for (let char of s) {
        rows[currentRow] += char;

        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        currentRow += goingDown ? 1 : -1;
    }

    return rows.join('');
}
console.log(convert('PAYPALISHIRING', 3)); // 'PAHNAPLSIIGYIR'

//❓ Q10: Count and Say Sequence
function countAndSay(n) {
    if (n === 1) return '1';

    let result = '1';

    for (let i = 2; i <= n; i++) {
        let temp = '';
        let count = 1;

        for (let j = 0; j < result.length; j++) {
            if (result[j] === result[j + 1]) {
                count++;
            } else {
                temp += count + result[j];
                count = 1;
            }
        }

        result = temp;
    }

    return result;
}
console.log(countAndSay(4)); // '1211'
// 1 -> 11 -> 21 -> 1211

// ============================================
// 1️⃣1️⃣ ADVANCED STRING ALGORITHMS
// ============================================

//🔥 KMP Pattern Matching - O(n + m)
function kmpSearch(text, pattern) {
    function buildLPS(pattern) {
        const lps = [0];
        let len = 0;
        let i = 1;

        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }

    const lps = buildLPS(pattern);
    const matches = [];
    let i = 0; // text index
    let j = 0; // pattern index

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return matches;
}
console.log(kmpSearch('ababcabcabababd', 'ababd')); // [10]

//🔥 Rabin-Karp Algorithm - O(n + m) average
function rabinKarp(text, pattern) {
    const d = 256; // Number of characters
    const q = 101; // Prime number
    const m = pattern.length;
    const n = text.length;
    let p = 0; // Hash for pattern
    let t = 0; // Hash for text
    let h = 1;
    const matches = [];

    // h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate hash for pattern and first window
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Slide pattern over text
    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            // Check characters one by one
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) matches.push(i);
        }

        // Calculate hash for next window
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t += q;
        }
    }

    return matches;
}

//🔥 Manacher's Algorithm - Longest Palindromic Substring O(n)
function longestPalindromeManacher(s) {
    // Transform string: 'abc' -> '#a#b#c#'
    const t = '#' + s.split('').join('#') + '#';
    const p = new Array(t.length).fill(0);
    let center = 0, right = 0;
    let maxLen = 0, maxCenter = 0;

    for (let i = 0; i < t.length; i++) {
        const mirror = 2 * center - i;

        if (i < right) {
            p[i] = Math.min(right - i, p[mirror]);
        }

        // Expand around center
        while (i + p[i] + 1 < t.length &&
            i - p[i] - 1 >= 0 &&
            t[i + p[i] + 1] === t[i - p[i] - 1]) {
            p[i]++;
        }

        // Update center and right boundary
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }

        // Track max palindrome
        if (p[i] > maxLen) {
            maxLen = p[i];
            maxCenter = i;
        }
    }

    const start = (maxCenter - maxLen) / 2;
    return s.substring(start, start + maxLen);
}

// ============================================
// 1️⃣2️⃣ EDGE CASES & GOTCHAS
// ============================================

//⚠️ String Immutability
const str9 = 'hello';
str9[0] = 'H'; // Doesn't work - strings are immutable!
console.log(str9); // 'hello' - unchanged

// To modify, create new string
const str10 = 'H' + str9.slice(1); // 'Hello'

//⚠️ String vs String Object
const primitive = 'hello';
const object = new String('hello');
console.log(primitive === object); // false (different types!)
console.log(primitive == object); // true (coercion)
console.log(typeof primitive); // 'string'
console.log(typeof object); // 'object'

//⚠️ Unicode and Emojis
const emoji2 = '👨‍👩‍👧‍👦'; // Family emoji
console.log(emoji2.length); // 11 (not 1!) - multi-codepoint
console.log([...emoji2].length); // 7 - still not 1!

// Proper emoji counting
const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
console.log([...segmenter.segment(emoji2)].length); // 1

//⚠️ Escape Characters
const escaped = 'Line 1\nLine 2\tTabbed';
console.log(escaped);
// Line 1
// Line 2    Tabbed

const quote = 'He said, "Hello"';
const quote2 = "It's a nice day";
const quote3 = `Both "quotes" and 'apostrophes' work`;

//⚠️ String Comparison Quirks
console.log('10' > '9'); // false ('1' < '9' lexicographically)
console.log('10' > '2'); // false ('1' < '2')
console.log(10 > 9); // true (numeric comparison)

//⚠️ Whitespace Characters
const whitespace = ' \t\n\r\v\f';
console.log(whitespace.trim()); // '' (all removed)

// ============================================
// 1️⃣3️⃣ PERFORMANCE TIPS
// ============================================

/*
   TIME COMPLEXITY:
   Access by index: O(1)
   indexOf/includes: O(n*m) where m is search string length
   replace/replaceAll: O(n*m)
   split/join: O(n)
   slice/substring: O(n)
   toLowerCase/toUpperCase: O(n)
   
   BEST PRACTICES:
   1. Use template literals for concatenation with variables
   2. Avoid repeated concatenation in loops - use array join
   3. Use includes() instead of indexOf() for existence checks
   4. Cache length in loops if not changing
   5. Use regex for complex pattern matching
*/

//💡 Bad: String concatenation in loop - O(n²)
let result = '';
for (let i = 0; i < 1000; i++) {
    result += i.toString(); // Creates new string each time!
}

//💡 Good: Use array join - O(n)
const arr = [];
for (let i = 0; i < 1000; i++) {
    arr.push(i.toString());
}
const result2 = arr.join('');

// ============================================
// 1️⃣4️⃣ USEFUL STRING UTILITIES
// ============================================

//🎯 Generate Random String
function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
console.log(randomString(10)); // e.g., 'aB3xK9mQp2'

//🎯 Slugify URL
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
console.log(slugify('Hello World! This is a Test')); // 'hello-world-this-is-a-test'

//🎯 Truncate with Ellipsis
function truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}
console.log(truncate('This is a very long string', 15)); // 'This is a ve...'

//🎯 Word Count
function wordCount(str) {
    return str.trim().split(/\s+/).filter(Boolean).length;
}
console.log(wordCount('  Hello   World  ')); // 2

//🎯 Mask String (for sensitive data)
function maskString(str, visibleStart = 4, visibleEnd = 4) {
    if (str.length <= visibleStart + visibleEnd) return str;
    const start = str.slice(0, visibleStart);
    const end = str.slice(-visibleEnd);
    const masked = '*'.repeat(str.length - visibleStart - visibleEnd);
    return start + masked + end;
}
console.log(maskString('1234567890123456', 4, 4)); // '1234********3456'

//🎯 Levenshtein Distance (Edit Distance)
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }

    return dp[m][n];
}
console.log(levenshteinDistance('kitten', 'sitting')); // 3

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. Strings are immutable - all methods return new strings
   2. Common patterns: two pointers, sliding window, hashing
   3. Be aware of Unicode/emoji edge cases
   4. Use Map/Set for frequency counting
   5. Template literals for clean string interpolation
   6. split/join for array conversions
   7. Regex for complex pattern matching
   8. Time complexity: most operations are O(n)
   9. Classic problems: palindrome, anagram, substring search
   10. Advanced: KMP, Rabin-Karp, Manacher's algorithm
   ============================================ */
