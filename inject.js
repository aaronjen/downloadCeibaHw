// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function clickIcon() {
	console.log("click")
    chrome.tabs.executeScript(null,
      {file: "script.js	"});
}

chrome.browserAction.onClicked.addListener(clickIcon);
