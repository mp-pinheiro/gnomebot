const fetchComments = require("youtube-comment-api");

module.exports = {
  name: "checkvideo",
  description: "Determines if a video contains gnomes.",
  execute(message, args) {
    const id = args[0];
    analyseVideoComments(id)
      .then(() => {
        message.channel.send();
      })
      .catch(() => {});
  }
};

async function analyseVideoComments(video_id) {
  try {
    let comment_page = await fetchComments(video_id);

    while (comment_page) {
      for (let comment of comment_page.comments) {
        let str = comment.text;
        let matches = str.match("([Gg]s*[Nn]s*[Oo]s*[Mm]s*[Ee])");

        if (matches && matches.length > 0) {
          return true;
        }
      }

      if (comment_page.nextPageToken) {
        comment_page = await fetchComments(video_id, comment_page.nextPageToken);
      } else {
        break;
      }
    }
  } catch (err) {
    console.log("An error occurred while fetching youtube comments.");
  }
  return false;
}
