/**
 * Holostaff journey stages for OpnForm.
 *
 * Added by the Holostaff deploy agent (deploy v4).
 * Tells the copilot which part of the customer journey a visitor is in,
 * so it knows whether someone is signing up, adopting, or expanding.
 * Everything else (spotting a stall, what to say, whether to say
 * anything at all) is decided from the journey map, not from this file.
 *
 * Safe to edit. The routes below came from the scan; if one is wrong,
 * change it here rather than in your pages. https://docs.holostaff.ai
 */
// Journey stages, by the route the visitor is on. First match wins.
const STAGE_ROUTES = [
  [/^\/forms\/[^/]+\/show\/submissions$/, 'adoption'], // Manage Submissions
  [/^\/forms\/create\/guest$/, 'onboarding'], // Guest Form Creation
  [/^\/forms\/[^/]+\/show$/, 'adoption'], // Manage Submissions
  [/^\/forms\/create$/, 'adoption'], // Create a Form
  [/^\/pricing$/, 'mutual_commit'], // Sign Up
  [/^\/register$/, 'mutual_commit'], // Sign Up
  [/^\/home$/, 'adoption'], // Create a Form
  [/^\/$/, 'mutual_commit'], // Sign Up
]

function stageForPath(path) {
  const match = STAGE_ROUTES.find(([pattern]) => pattern.test(path))
  return match ? match[1] : null
}

export default defineNuxtPlugin(() => {
  const router = useRouter()

  // Dynamic import on purpose: a static one would pull the SDK into the
  // entry chunk and make every visitor evaluate it during hydration.
  import('@holostaff/sdk')
    .then(({ holostaff }) => {
      let currentStage = null

      const markStage = (path) => {
        const stage = stageForPath(path)
        if (stage && stage !== currentStage) {
          currentStage = stage
          holostaff.markStageEntry(stage)
        }
      }

      markStage(router.currentRoute.value.path)
      router.afterEach((to) => markStage(to.path))
    })
    .catch((error) => {
      console.warn('Holostaff journey stages did not load', error)
    })
})
