/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// This file figures out whether we should use the browser-xml functionality or xmldom.

// 1. Check if we are in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

let DOMImplementationClass;
let XMLSerializerClass;

(async () => {
  if (isBrowser) {
    // Browser: Use the built-in implementation
    DOMImplementationClass = window.document.implementation;
    XMLSerializerClass = window.XMLSerializer;
  } else {
    // Node: Dynamically load the package
    try {
      const {DOMImplementation: NodeDOMImplementation, XMLSerializer} = await import('@xmldom/xmldom');
      DOMImplementationClass = NodeDOMImplementation;
      XMLSerializerClass = XMLSerializer;
    } catch {
      console.error('Failed to load @xmldom/xmldom in Node.js environment.');
    }
  }
})();

export { DOMImplementationClass, XMLSerializerClass };