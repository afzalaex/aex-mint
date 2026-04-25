// This app uses a fixed creatorAddress and does not use subdomain-based routing.
// This middleware overrides the base package's subdomain detection to prevent
// the hostname prefix (e.g. "mint" from mint.aex.design) from being treated
// as a subdomain, which would corrupt the page title.
export default defineEventHandler(() => {})
