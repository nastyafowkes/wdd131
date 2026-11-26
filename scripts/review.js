const parameters = new URLSearchParams(window.location.search);
const validProducts = ["fc-1888", "fc-2050", "fs-1987", "ac-2000", "jj-1969"];
const rating = parameters.get("rating");
const installationDate = parameters.get("installationDate");
const isSubmission = validProducts.includes(parameters.get("product"))
  && /^[1-5]$/.test(rating ?? "")
  && /^\d{4}-\d{2}-\d{2}$/.test(installationDate ?? "");

const title = document.querySelector("#confirmation-title");
const message = document.querySelector("#confirmation-message");
const counter = document.querySelector("#review-count");
const storageMessage = document.querySelector("#storage-message");

if (isSubmission) {
  title.textContent = "Thank you for your review!";
  message.textContent = "Your review form was completed successfully.";
} else {
  title.textContent = "No completed review yet";
  message.textContent = "Please complete the product review form first. This visit has not added a review.";
}

try {
  const savedCount = Number(localStorage.getItem("reviewCount"));
  let reviewCount = Number.isSafeInteger(savedCount) && savedCount >= 0 ? savedCount : 0;
  // Count on the confirmation page, as required by the assignment.
  if (isSubmission) {
    reviewCount += 1;
    localStorage.setItem("reviewCount", String(reviewCount));
  }
  counter.textContent = String(reviewCount);
} catch {
  counter.textContent = "unavailable";
  storageMessage.textContent = "Browser storage is unavailable, so your review count could not be saved.";
}
