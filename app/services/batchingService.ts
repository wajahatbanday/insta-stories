export default class ViewedStoriesService {
  private viewedStoryBatches: number[][] = [];
  private moveToBatchInterval: number = 30000;
  private sendBatchInterval: number = 60000;

  constructor() {
    this.initializeService();
  }

  // Initialize the service
  private initializeService() {
    this.startMoveToBatchProcess();
    this.startBatchSendProcess();
  }

  // Fetch viewed individual stories, add to batches, and clear individual stories
  private fetchViewedStories() {
    try {
      const storedStories = localStorage.getItem("viewedIndividualStories");
      if (storedStories) {
        const viewedStories = JSON.parse(storedStories) as number[];
        if (viewedStories.length > 0) {
          this.viewedStoryBatches.push(viewedStories);
          localStorage.setItem(
            "viewedStoryBatches",
            JSON.stringify(this.viewedStoryBatches)
          );
          localStorage.removeItem("viewedIndividualStories");
        }
      }
    } catch (error) {
      console.error("Error fetching viewed stories from localStorage", error);
    }
  }

  // Move viewedIndividualStories to batch every 30 seconds
  private startMoveToBatchProcess() {
    setInterval(() => {
      this.fetchViewedStories();
    }, this.moveToBatchInterval);
  }

  // Log batches every 60 seconds (simulating sending to API)
  private startBatchSendProcess() {
    setInterval(() => {
      this.sendBatchToApi();
    }, this.sendBatchInterval);
  }

  // Simulate sending the batch to an API and log it
  private sendBatchToApi() {
    const storedBatches = localStorage.getItem("viewedStoryBatches");
    if (storedBatches) {
      const viewedStoryBatches = JSON.parse(storedBatches) as number[][];
      if (viewedStoryBatches.length > 0) {
        console.log("Batches Sent:", viewedStoryBatches);
        this.clearBatches();
      } else {
        console.log("No batches to send");
      }
    }
  }

  // Clear the viewedStoryBatches after sending
  private clearBatches() {
    this.viewedStoryBatches = [];
    localStorage.removeItem("viewedStoryBatches");
    console.log("Batches cleared from local storage");
  }
}
