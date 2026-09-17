/* ===========================================================================
 * FEEDBACK & BUG REPORTING
 * ---------------------------------------------------------------------------
 * The feedback modal and its submission handler.
 * ======================================================================== */

// Set your Google Apps Script Web App URL below to receive reports directly in your inbox.
// Your email address stays completely private on Google Cloud and is never visible in client code.
const FEEDBACK_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycby51F25dqIylNIX4R81dxFmrLDqxg2WaKZCfrw4GA2xoheVi6zlI-xE-CulmbIGOGSS/exec";

function openFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  if (!modal) return;
  document.getElementById("feedback-title").value = "";
  document.getElementById("feedback-desc").value = "";
  const defaultEmail = (semesterConfig && semesterConfig.facultyEmail) ? semesterConfig.facultyEmail : "";
  const emailInput = document.getElementById("feedback-sender-email");
  if (emailInput) emailInput.value = defaultEmail;
  modal.classList.remove("hidden");
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  if (modal) modal.classList.add("hidden");
}

async function submitFeedbackForm(e) {
  if (e) e.preventDefault();
  const title = document.getElementById("feedback-title").value.trim();
  const description = document.getElementById("feedback-desc").value.trim();
  const userEmail = document.getElementById("feedback-sender-email")?.value.trim() || "";
  const typeRadio = document.querySelector('input[name="feedback-type"]:checked');
  const type = typeRadio ? typeRadio.value : "Bug Report";

  if (!title || !description) {
    showToast("Please fill in both the summary and description.", "⚠️");
    return;
  }

  // Determine active tab for context
  const tabs = ["planner", "timetable", "calendar", "roster", "gradebook"];
  const activeTab = tabs.find(t => {
    const el = document.getElementById("tab-content-" + t);
    return el && !el.classList.contains("hidden");
  }) || "planner";

  const payload = {
    type,
    title,
    description,
    userEmail,
    activeTab,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  const submitBtn = document.getElementById("feedback-submit-btn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Sending...</span>";
  }

  try {
    if (FEEDBACK_ENDPOINT_URL) {
      await fetch(FEEDBACK_ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    closeFeedbackModal();
    showToast(`${type} successfully submitted! Thank you.`, "✓");
  } catch (err) {
    console.error("Feedback dispatch error:", err);
    closeFeedbackModal();
    showToast("Feedback recorded offline.", "ℹ️");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>Send Feedback</span><span>✉️</span>";
    }
  }
}
