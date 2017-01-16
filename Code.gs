function saveStarredAttachments() {
  // max 10 threads
  var starredThreads = GmailApp.getStarredThreads(0, 10);
  var blobs = [];
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
  
  if (blobs.length == 0) {
    return "No attachments.";
  }
  
  var zip = Utilities.zip(blobs, "downloadAttachments.zip");  
  DriveApp.addFile(DriveApp.createFile(zip));
  
  return "Successfully saved attachments of starred images to your Google Drive.";
}

function doGet(e) { 
  // um, this doesn't work when ran directly from the Google script editor, so I should build out a web interface for it instead
  //ContentService.createTextOutput(zip.getDataAsString()).downloadAsFile("allAttachments.zip");
  
  var message = saveStarredAttachments();
  
  return ContentService.createTextOutput(message);
}
