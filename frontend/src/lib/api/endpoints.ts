/**
 * Central API endpoint registry.
 * Prevents stringly-typed paths from being scattered across features.
 * Paths are relative to `NEXT_PUBLIC_API_URL`.
 */

export const endpoints = {
  /* ─── Auth ─────────────────────────────────────────── */
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    avatar: "/auth/me/avatar",
    verifyEmail: "/auth/verify-email",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    mfaSetup: "/auth/mfa/setup",
    mfaVerify: "/auth/mfa/verify",
    mfaDisable: "/auth/mfa/disable",
  },

  /* ─── Dashboard ────────────────────────────────────── */
  dashboard: {
    overview: "/dashboard/overview",
    commandCenter: "/dashboard/command-center",
  },

  /* ─── Organizations & users ────────────────────────── */
  organizations: {
    list: "/organizations",
    current: "/organizations/current",
    update: (id: string) => `/organizations/${id}`,
    settings: "/organizations/current/settings",
    members: "/organizations/current/members",
    invite: "/organizations/current/members/invite",
    removeMember: (userId: string) => `/organizations/current/members/${userId}`,
    updateRole: (userId: string) => `/organizations/current/members/${userId}/role`,
    usage: "/organizations/current/usage",
    auditLogs: "/organizations/current/audit-logs",
  },

  /* ─── Platform (super admin) ───────────────────────── */
  platform: {
    stats: "/platform/stats",
    health: "/platform/health",
    audit: "/platform/audit",
    workspaces: "/platform/workspaces",
    workspace: (id: string) => `/platform/workspaces/${id}`,
    extendTrial: (id: string) => `/platform/workspaces/${id}/extend-trial`,
    users: "/platform/users",
    setPlatformAdmin: (id: string) => `/platform/users/${id}/platform-admin`,
  },

  users: {
    list: "/users",
    detail: (id: string) => `/users/${id}`,
    me: "/users/me",
    updateProfile: "/users/me/profile",
    updatePreferences: "/users/me/preferences",
    activity: (id: string) => `/users/${id}/activity`,
    invites: "/users/invites",
    revokeInvite: (id: string) => `/users/invites/${id}`,
  },

  /* ─── Clients ──────────────────────────────────────── */
  clients: {
    list: "/clients",
    create: "/clients",
    detail: (id: string) => `/clients/${id}`,
    update: (id: string) => `/clients/${id}`,
    archive: (id: string) => `/clients/${id}/archive`,
    businessInfo: (id: string) => `/clients/${id}/business`,
    contacts: (id: string) => `/clients/${id}/contacts`,
    access: (id: string) => `/clients/${id}/access`,
    health: (id: string) => `/clients/${id}/health`,
    lifecycle: (id: string) => `/clients/${id}/lifecycle`,
    onboarding: (id: string) => `/clients/${id}/onboarding`,
    memory: (id: string) => `/clients/${id}/memory`,
    files: (id: string) => `/clients/${id}/files`,
  },

  /* ─── Leads & CRM ──────────────────────────────────── */
  leads: {
    list: "/leads",
    create: "/leads",
    detail: (id: string) => `/leads/${id}`,
    update: (id: string) => `/leads/${id}`,
    delete: (id: string) => `/leads/${id}`,
    import: "/leads/import",
    export: "/leads/export",
    score: (id: string) => `/leads/${id}/score`,
    reassign: (id: string) => `/leads/${id}/reassign`,
    activities: (id: string) => `/leads/${id}/activities`,
    followUps: "/leads/follow-ups",
    sources: "/leads/sources",
  },

  opportunities: {
    list: "/opportunities",
    create: "/opportunities",
    detail: (id: string) => `/opportunities/${id}`,
    update: (id: string) => `/opportunities/${id}`,
    moveStage: (id: string) => `/opportunities/${id}/stage`,
  },

  pipeline: {
    board: "/pipeline/board",
    forecast: "/pipeline/forecast",
    summary: "/pipeline/summary",
  },

  deals: {
    list: "/deals",
    detail: (id: string) => `/deals/${id}`,
    close: (id: string) => `/deals/${id}/close`,
    reopen: (id: string) => `/deals/${id}/reopen`,
  },

  contacts: {
    list: "/contacts",
    create: "/contacts",
    detail: (id: string) => `/contacts/${id}`,
  },

  companies: {
    list: "/companies",
    detail: (id: string) => `/companies/${id}`,
  },

  /* ─── Projects & tasks ─────────────────────────────── */
  projects: {
    list: "/projects",
    create: "/projects",
    detail: (id: string) => `/projects/${id}`,
    update: (id: string) => `/projects/${id}`,
    archive: (id: string) => `/projects/${id}/archive`,
    milestones: (id: string) => `/projects/${id}/milestones`,
    deliverables: (id: string) => `/projects/${id}/deliverables`,
    tasks: (id: string) => `/projects/${id}/tasks`,
    files: (id: string) => `/projects/${id}/files`,
    discussions: (id: string) => `/projects/${id}/discussions`,
    health: "/projects/health",
  },

  tasks: {
    list: "/tasks",
    create: "/tasks",
    detail: (id: string) => `/tasks/${id}`,
    update: (id: string) => `/tasks/${id}`,
    delete: (id: string) => `/tasks/${id}`,
    moveStatus: (id: string) => `/tasks/${id}/status`,
    assign: (id: string) => `/tasks/${id}/assign`,
    myTasks: "/tasks/my-tasks",
    board: "/tasks/board",
  },

  /* ─── Approvals ────────────────────────────────────── */
  approvals: {
    list: "/approvals",
    detail: (id: string) => `/approvals/${id}`,
    approve: (id: string) => `/approvals/${id}/approve`,
    reject: (id: string) => `/approvals/${id}/reject`,
    requestChanges: (id: string) => `/approvals/${id}/request-changes`,
    pending: "/approvals/pending",
    history: "/approvals/history",
  },

  /* ─── Proposals, contracts, invoices, payments ───── */
  proposals: {
    list: "/proposals",
    create: "/proposals",
    detail: (id: string) => `/proposals/${id}`,
    update: (id: string) => `/proposals/${id}`,
    send: (id: string) => `/proposals/${id}/send`,
    accept: (id: string) => `/proposals/${id}/accept`,
    reject: (id: string) => `/proposals/${id}/reject`,
    templates: "/proposals/templates",
    pdf: (id: string) => `/proposals/${id}/pdf`,
  },

  contracts: {
    list: "/contracts",
    create: "/contracts",
    detail: (id: string) => `/contracts/${id}`,
    sign: (id: string) => `/contracts/${id}/sign`,
    templates: "/contracts/templates",
    pdf: (id: string) => `/contracts/${id}/pdf`,
  },

  invoices: {
    list: "/invoices",
    create: "/invoices",
    detail: (id: string) => `/invoices/${id}`,
    update: (id: string) => `/invoices/${id}`,
    send: (id: string) => `/invoices/${id}/send`,
    void: (id: string) => `/invoices/${id}/void`,
    pdf: (id: string) => `/invoices/${id}/pdf`,
  },

  payments: {
    list: "/payments",
    detail: (id: string) => `/payments/${id}`,
    record: "/payments",
    initialize: "/payments/initialize",
    verify: "/payments/verify",
  },

  /* ─── Campaigns, content, brand, SEO ──────────────── */
  campaigns: {
    list: "/campaigns",
    create: "/campaigns",
    detail: (id: string) => `/campaigns/${id}`,
    update: (id: string) => `/campaigns/${id}`,
    pause: (id: string) => `/campaigns/${id}/pause`,
    resume: (id: string) => `/campaigns/${id}/resume`,
    performance: (id: string) => `/campaigns/${id}/performance`,
    attribution: "/campaigns/attribution",
    channels: "/campaigns/channels",
    calendar: "/campaigns/calendar",
  },

  content: {
    list: "/content",
    create: "/content",
    detail: (id: string) => `/content/${id}`,
    update: (id: string) => `/content/${id}`,
    approve: (id: string) => `/content/${id}/approve`,
    requestChanges: (id: string) => `/content/${id}/request-changes`,
    calendar: "/content/calendar",
    pipeline: "/content/pipeline",
    library: "/content/library",
    performance: "/content/performance",
  },

  brand: {
    assets: "/brand/assets",
    uploadAsset: "/brand/assets/upload",
    deleteAsset: (id: string) => `/brand/assets/${id}`,
    guidelines: "/brand/guidelines",
    approvals: "/brand/approvals",
    revisions: "/brand/revisions",
  },

  seo: {
    overview: "/seo/overview",
    technical: "/seo/technical",
    content: "/seo/content",
    backlinks: "/seo/backlinks",
    rankings: "/seo/rankings",
    local: "/seo/local",
    audit: "/seo/audit",
  },

  website: {
    overview: "/website/overview",
    pages: "/website/pages",
    performance: "/website/performance",
    experiments: "/website/experiments",
    createExperiment: "/website/experiments",
    updateExperiment: (id: string) => `/website/experiments/${id}`,
  },

  reputation: {
    overview: "/reputation/overview",
    reviews: "/reputation/reviews",
    respond: (id: string) => `/reputation/reviews/${id}/respond`,
    sentiment: "/reputation/sentiment",
  },

  /* ─── Analytics & intelligence ─────────────────────── */
  analytics: {
    overview: "/analytics/overview",
    events: "/analytics/events",
    eventDetail: (id: string) => `/analytics/events/${id}`,
    utm: "/analytics/utm",
    dataSources: "/analytics/data-sources",
    connectSource: "/analytics/data-sources",
    disconnectSource: (id: string) => `/analytics/data-sources/${id}`,
    warehouse: "/analytics/warehouse",
    explorer: "/analytics/explorer",
  },

  intelligence: {
    anomalies: "/intelligence/anomalies",
    anomalyDetail: (id: string) => `/intelligence/anomalies/${id}`,
    bottlenecks: "/intelligence/bottlenecks",
    recommendations: "/intelligence/recommendations",
    whyDid: "/intelligence/why-did",
    health: "/intelligence/health",
    revenueLeak: "/intelligence/revenue-leak",
    autopilot: "/intelligence/autopilot",
    experiments: "/intelligence/experiments",
    experimentDetail: (id: string) => `/intelligence/experiments/${id}`,
  },

  alerts: {
    list: "/alerts",
    dismiss: (id: string) => `/alerts/${id}/dismiss`,
    rules: "/alerts/rules",
    createRule: "/alerts/rules",
    updateRule: (id: string) => `/alerts/rules/${id}`,
  },

  /* ─── Automation & AI ──────────────────────────────── */
  automation: {
    workflows: "/automation/workflows",
    createWorkflow: "/automation/workflows",
    workflowDetail: (id: string) => `/automation/workflows/${id}`,
    runWorkflow: (id: string) => `/automation/workflows/${id}/run`,
    triggers: "/automation/triggers",
    runs: "/automation/runs",
    runDetail: (id: string) => `/automation/runs/${id}`,
  },

  ai: {
    research: "/ai/research",
    strategy: "/ai/strategy",
    reporting: "/ai/reporting",
    content: "/ai/content",
    sales: "/ai/sales",
    operations: "/ai/operations",
  },

  /* ─── Reporting & briefs ───────────────────────────── */
  reports: {
    list: "/reports",
    create: "/reports",
    detail: (id: string) => `/reports/${id}`,
    generate: "/reports/generate",
    templates: "/reports/templates",
    scheduled: "/reports/scheduled",
    dispatch: (id: string) => `/reports/${id}/dispatch`,
    pdf: (id: string) => `/reports/${id}/pdf`,
  },

  briefs: {
    list: "/briefs",
    detail: (id: string) => `/briefs/${id}`,
    archive: "/briefs/archive",
    current: "/briefs/current",
  },

  roadmap: {
    detail: "/roadmap",
    generate: "/roadmap/generate",
    approve: "/roadmap/approve",
    update: "/roadmap",
  },

  /* ─── Finance ──────────────────────────────────────── */
  finance: {
    overview: "/finance/overview",
    profitability: "/finance/profitability",
    clientProfitability: (clientId: string) =>
      `/finance/profitability/clients/${clientId}`,
    serviceProfitability: "/finance/profitability/services",
    expenses: "/finance/expenses",
    subscriptions: "/finance/subscriptions",
    reports: "/finance/reports",
  },

  /* ─── Team & capacity ──────────────────────────────── */
  team: {
    members: "/team/members",
    memberDetail: (id: string) => `/team/members/${id}`,
    invite: "/team/members/invite",
    capacity: "/team/capacity",
    timesheets: "/team/timesheets",
    utilization: "/team/utilization",
  },

  /* ─── Portfolio ────────────────────────────────────── */
  portfolio: {
    list: "/portfolio",
    health: "/portfolio/health",
    expansion: "/portfolio/expansion",
  },

  /* ─── Knowledge ────────────────────────────────────── */
  knowledge: {
    list: "/knowledge",
    sops: "/knowledge/sops",
    sopDetail: (id: string) => `/knowledge/sops/${id}`,
    playbooks: "/knowledge/playbooks",
    templates: "/knowledge/templates",
    frameworks: "/knowledge/frameworks",
    search: "/knowledge/search",
  },

  /* ─── Messaging ────────────────────────────────────── */
  messaging: {
    conversations: "/messaging/conversations",
    conversation: (id: string) => `/messaging/conversations/${id}`,
    sendMessage: (id: string) => `/messaging/conversations/${id}/messages`,
    channels: "/messaging/channels",
    whatsapp: "/messaging/whatsapp",
    whatsappSend: "/messaging/whatsapp/send",
  },

  /* ─── Notifications ────────────────────────────────── */
  notifications: {
    list: "/notifications",
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: "/notifications/read-all",
    preferences: "/notifications/preferences",
    unreadCount: "/notifications/unread-count",
  },

  /* ─── Strategy call bookings ───────────────────────── */
  bookings: {
    create: "/bookings",
    detail: (id: string) => `/bookings/${id}`,
  },

  /* ─── Growth sheet downloads (lead gate) ───────────── */
  sheetDownloads: {
    create: "/sheet-downloads",
    list: "/sheet-downloads",
    file: (id: string) => `/sheet-downloads/${id}/file`,
  },

  /* ─── Assessment & X-Ray ───────────────────────────── */
  assessment: {
    start: "/assessment",
    submit: "/assessment",
    detail: (token: string) => `/assessment/${token}`,
    score: "/assessment/score",
    report: (token: string) => `/assessment/${token}/report`,
    submissions: "/assessment/submissions",
  },

  xray: {
    run: "/xray",
    result: (domain: string) => `/xray/${domain}`,
    history: "/xray/history",
  },

  /* ─── Services & packages ──────────────────────────── */
  services: {
    list: "/services",
    detail: (slug: string) => `/services/${slug}`,
    packages: "/services/packages",
    engagements: "/services/engagements",
    pricing: "/services/pricing",
  },

  /* ─── Integrations & webhooks ──────────────────────── */
  integrations: {
    list: "/integrations",
    connect: (provider: string) => `/integrations/${provider}/connect`,
    disconnect: (provider: string) => `/integrations/${provider}/disconnect`,
    status: (provider: string) => `/integrations/${provider}/status`,
    sync: (provider: string) => `/integrations/${provider}/sync`,
  },

  webhooks: {
    list: "/webhooks",
    create: "/webhooks",
    update: (id: string) => `/webhooks/${id}`,
    delete: (id: string) => `/webhooks/${id}`,
    test: (id: string) => `/webhooks/${id}/test`,
    deliveries: (id: string) => `/webhooks/${id}/deliveries`,
  },

  /* ─── Files & uploads ──────────────────────────────── */
  uploads: {
    init: "/uploads/init",
    complete: "/uploads/complete",
    signedUrl: "/uploads/signed-url",
  },

  files: {
    list: "/files",
    detail: (id: string) => `/files/${id}`,
    delete: (id: string) => `/files/${id}`,
    folders: "/files/folders",
  },

  /* ─── Search ───────────────────────────────────────── */
  search: {
    global: "/search",
    quick: "/search/quick",
  },

  /* ─── Health ───────────────────────────────────────── */
  health: {
    check: "/health",
  },
} as const;

export type Endpoints = typeof endpoints;
