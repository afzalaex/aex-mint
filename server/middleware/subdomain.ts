export default defineEventHandler(({ node, context }) => {
  const hostname: string = node.req.headers.host?.split(':')[0] as string

  // Don't treat localhost / 127.0.0.1 / IPs as subdomains
  if (!hostname || hostname === 'localhost' || hostname.startsWith('127.') || /^\d+\.\d+/.test(hostname)) {
    return
  }

  const configuredDomain = process.env.NUXT_PUBLIC_DOMAIN
  if (!configuredDomain) return

  const sub = hostname.split('.')[0]?.toLowerCase() as string
  const main = configuredDomain.split('.')[0]?.toLowerCase()

  if (sub !== main) {
    context.subdomain = sub
  }
})
