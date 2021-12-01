// When the button is clicked, inject setPageBackgroundColor into current page
changeColor1.addEventListener("click", async () => {

  let [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});


openTab.addEventListener("click", async () => {
  window.open("chrome-extension://nogkfnmeeefojkmmlldmaeodefddbmim/tab/newTab.html")
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color  }) => {
    document.body.style.backgroundColor = color;
  });
}

let num = 0;
numBtn.addEventListener("click", function(){
  num++;
  $("#number").text(num);
})

