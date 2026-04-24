// This app uses a fixed creatorAddress, not subdomain-based routing.
// The base package's server middleware incorrectly detects "mint" (from mint.aex.design)
// as a subdomain, causing useAppTitle() to return shortAddress('mint') instead of the
// configured title. This plugin clears that state immediately on the server.
export default defineNuxtPlugin(() => {
  const subdomain = useState<string | null>('subdomain')
  subdomain.value = null
})
