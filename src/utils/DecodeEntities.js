// src/utils/decodeEntities.js

/**
 * Decode HTML entities in a string and retain HTML tags.
 * Uses DOMParser to parse the encoded string as HTML and returns the innerHTML of the body.
 * @param {string} encodedStr - A string containing HTML entities (e.g. "&lt;p&gt;Hello&lt;/p&gt;")
 * @returns {string} The decoded HTML string (e.g. "<p>Hello</p>")
 */
export function decodeEntities(encodedStr) {
  if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    return encodedStr
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(encodedStr, 'text/html')
  // Return body.innerHTML to keep the HTML tags
  return doc.body.innerHTML || ''
}
