import { holostaff } from '@holostaff/sdk'

export default defineNuxtPlugin(() => {
  holostaff.init({
    tenantId: 'workspace_xY8Ee8Lo7aZc09uYvTdo6yzNvWm1',
    sourceId: 'ks_msivmf8a_3dfha8',
  })
})
