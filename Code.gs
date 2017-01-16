function getAttachmentsFromStarredThreads() {
  // max 10 threads
  var blobs = [];
  var starredThreads = GmailApp.getStarredThreads(0, 10);
  var attachmentNumber = 0;
  
  // iterate over starred threads
  for (var i = 0; i < starredThreads.length; i++) {
    var messages = starredThreads[i].getMessages();
    
    // iterate over messages
    for (var j = 0; j < messages.length; j++) {
      var attachments = messages[j].getAttachments();
      
      // iterate over attachments per message
      for (var k = 0; k < attachments.length; k++) {
        var newAttachment = attachments[k].copyBlob();
        newAttachment.setName(attachmentNumber++ + "_" + newAttachment.getName())
        blobs.push(newAttachment);
      }
    }
  }
  
  return blobs;
}

function doGet(e) { 
  var blobs = getAttachmentsFromStarredThreads();
  
  if (blobs.length == 0) {
    return ContentService.createTextOutput("No attachments.");
  }

  var zip = Utilities.zip(blobs, "downloadAttachments.zip");

  return ContentService.createTextOutput(zip.getDataAsString()).downloadAsFile("allAttachments.zip");  
}
