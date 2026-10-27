'use strict';
// Progressive enhancement. Repository, contact and resume links work without JS.
const projects = {
  tenantflow: {
    kind: 'Featured public sample / C# / ASP.NET Core', title: 'TenantFlow API',
    summary: 'A C#/.NET 10 API that protects tenant boundaries, handles duplicate requests, and delivers integration events through a transactional outbox.',
    problem: 'Multi-tenant APIs need their most important boundaries to survive retries and concurrent requests: tenant identity cannot come from a caller-controlled header, duplicate writes need a durable outcome, and stale updates must not silently overwrite newer work.',
    approach: 'The .NET 10 API derives tenant identity from a server-side API-key fixture, scopes reads and writes by tenant, commits the work item, idempotency receipt, and outbox insert in one transaction, and uses strong numeric ETags for If-Match updates. It includes a compiled Azure Service Bus topic adapter behind IEventPublisher, while local logging stays the default.',
    result: 'Six integration tests pass across tenant isolation, concurrent replay, mismatch conflicts, stale ETags, CORS, and outbox retry behavior. A live HTTP smoke check verifies create, replay, update, isolation, and local event dispatch.',
    scope: 'Personal portfolio demonstration under kawmy. The walkthrough describes checked-in source and tests; it does not represent production healthcare, finance, or cloud infrastructure.',
    source: 'https://github.com/kawmy/tenantflow-dotnet', detail: 'https://github.com/kawmy/tenantflow-dotnet/blob/main/README.md', color: '#c3e5d7',
    stages: [
      ['Tenant boundary', 'X-Api-Key resolves tenant identity server-side. A caller-supplied tenant header is not used, and another tenant\'s identifier returns 404.'],
      ['One durable write', 'Work item + idempotency receipt + outbox message share one database transaction. Same normalized request replays; a changed payload returns 409.'],
      ['Safe delivery', 'ETags reject stale PUTs with 412 before another event is created. A local publisher is default; the compiled Azure Service Bus adapter remains optional.']
    ]
  },
  deliveryboard: {
    kind: 'Featured public sample / C# / Blazor web', title: 'DeliveryBoard',
    summary: 'A C# and Blazor web workbench that makes release readiness explainable, with evidence requirements and protection against stale edits.',
    problem: 'A nearly complete checklist can still hide a failed or pending critical gate. A browser save also needs to refuse a stale revision rather than silently replace a newer decision.',
    approach: 'DeliveryBoard keeps release policy in pure C#, renders an interactive Blazor web UI, and persists its illustrative board through a revision-controlled JSON file adapter. The adapter serializes saves, checks the expected revision under the same lock, and atomically replaces a same-directory temporary file.',
    result: 'Seventeen domain, persistence, and concurrency tests pass. A real browser save recalculates readiness and survives a reload. Tests also cover stale-write races, rejected edits preserving bytes, and corrupt storage.',
    scope: 'Personal portfolio demonstration under kawmy. Blazor is used here as a server-rendered web application, not as a mobile product or a production release system.',
    source: 'https://github.com/kawmy/deliveryboard-blazor', detail: 'https://github.com/kawmy/deliveryboard-blazor/blob/main/README.md', color: '#f2d955',
    stages: [
      ['Make risk visible', 'Weighted readiness remains explanatory: a failed gate or pending critical gate blocks release even when the score looks high.'],
      ['Protect the save', 'The browser supplies an expected revision. A stale write is rejected under the same process-local lock that serializes file replacement.'],
      ['Keep its boundary', 'The durable JSON file and lock are a deliberate local-demo adapter. Multi-instance hosting requires shared transactional storage and authorization.']
    ]
  },
  tenantflowflutter: {
    kind: 'Featured public sample / Flutter companion', title: 'TenantFlow Flutter',
    summary: 'A new Flutter companion demonstration for the TenantFlow C# API, with a local demo workspace and an optional connection to a developer-run API.',
    problem: 'An uncertain network response can tempt a user to create a duplicate task, while an out-of-date screen can overwrite newer work. The client needs to preserve request intent and make conflicts understandable.',
    approach: 'The app starts in clearly labeled in-memory demo mode and can connect to a local TenantFlow API. It keeps an idempotency key for a retry of the same normalized create, starts a new identity for changed content, and turns HTTP 409 and 412 responses into direct user feedback.',
    result: 'All ten client and widget tests pass, analysis reports no issues, and the release web build succeeds. Try the live demo to filter synthetic tasks, create work items, and move them through their workflow.',
    scope: 'Personal portfolio demonstration under kawmy. Demo data is in memory and contains no customer data; API connection is optional and local.',
    source: 'https://github.com/kawmy/tenantflow-flutter', detail: 'https://kawmy.github.io/demos/tenantflow/', color: '#d4cafa',
    stages: [
      ['Start safely', 'Demo workspace: in-memory fixtures, no server connection. The UI makes that status visible before any API connection is attempted.'],
      ['Preserve intent', 'The same normalized create keeps its idempotency key. Changed content creates a new request identity instead of reusing the old key.'],
      ['Explain conflicts', 'A 409 points to changed data with an existing request key. A 412 says the item changed elsewhere and asks the user to refresh.']
    ]
  },
  dotnet: {
    kind: 'Personal project / .NET deployment sample', title: 'The deployment lab',
    summary: 'A small, public .NET sample that connects application code, a container build, Kubernetes configuration, and SpecFlow scenarios.',
    problem: 'A deployment is more than application code. The build, runtime image, deployment configuration, and tests each describe a different part of how a service is expected to run.',
    approach: 'The repository brings an ASP.NET application together with a multi-stage .NET 7 Dockerfile, a Kubernetes deployment and load-balancer service, and a separate SpecFlow test project. The deployment configuration declares four replicas and explicit CPU and memory requests and limits.',
    result: 'A concrete learning sample with source files you can inspect side by side: build and publish stages, deployment YAML, and readable behavior scenarios. It is presented here as a sample repository, with no claim of a current production deployment.',
    scope: 'Personal learning project under kawmy. The interactive walkthrough illustrates the checked-in build, deployment, and test files.',
    source: 'https://github.com/kawmy/.NETDockerK8sSpecFlow', detail: 'https://github.com/kawmy/.NETDockerK8sSpecFlow/blob/main/kubernetesTest/deployment.yaml', color: '#d4cafa'
  },
  docker: {
    kind: 'Open-source contribution / Docker CLI / Go', title: 'Keeping Docker in order',
    summary: 'A focused change to preserve Swarm service mount ordering when a force update does not actually change the mounts.',
    problem: 'A force update was passing existing mounts through mount-update logic even when no mount flags had changed. That could reorder the mount list and create configuration drift unrelated to the requested restart.',
    approach: 'I guarded updateMounts behind a check for changed mount-add or mount-remove flags. The regression test uses deliberately unsorted volume targets and verifies both the incremented force-update counter and the unchanged mount order.',
    result: 'Pull request #7227 was merged into docker/cli. The change preserves existing ordering for force-only updates while keeping explicit mount edits on the mount-update path.',
    scope: 'My contribution to Docker CLI: the focused mount-order fix and regression test in PR #7227. Docker CLI is maintained by the Docker project. The interactive example explains this change.',
    source: 'https://github.com/docker/cli/pull/7227', detail: 'https://github.com/docker/cli/pull/7227/files', color: '#ff866b'
  },
  stellar: {
    kind: 'Open-source contribution / StellarGate / Rust', title: 'Making settlement agree',
    summary: 'One shared decision for payment verification and production reconciliation, keeping the verdict and its metadata consistent.',
    problem: 'Payment verification and reconciliation needed to derive the same outcome from the cumulative amount paid. Separate comparisons risked allowing the verdict, stored status, webhook event, and amount delta to drift apart.',
    approach: 'I separated intent matching from settlement derivation and introduced a pure SettlementDecision consumed by both paths. It carries the verdict, status, event, and delta together. The production path derives it after the idempotent insert and authoritative ledger re-sum.',
    result: 'Pull request #416 was merged. The same amount comparison now supplies exact-payment, overpayment, and underpayment outcomes. Related merged work addresses webhook retry-backoff overflow (#415) and safe Horizon URL construction (#407).',
    scope: 'My contribution to StellarGateLabs/StellarGate: shared settlement derivation in PR #416, plus related fixes in #415 and #407. Example amounts illustrate the logic; no payment is sent.',
    source: 'https://github.com/StellarGateLabs/StellarGate/pull/416', detail: 'https://github.com/StellarGateLabs/StellarGate/pull/416/files', color: '#c3e5d7'
  },
  git: {
    kind: 'Personal repository / Git investigation guide', title: 'Following the Git trail',
    summary: 'A practical guide for finding an author’s changed files and collecting the history and current versions needed to review them.',
    problem: 'When reviewing or moving work between branches, a list of commits alone may not provide the file-level context you need. Finding the changed files, their diffs, and the current versions can become a repetitive task.',
    approach: 'The guide starts with git log filtered by author, deduplicates the file list, and collects per-file diffs and current copies. It includes PowerShell, Windows CMD, and Bash examples.',
    result: 'A public, reusable reference for author-focused Git investigation. The workflow helps make the review material easier to inspect. It is a guide, not an automated migration tool or a claim that all branch differences belong to one author.',
    scope: 'Personal guide under kawmy, with PowerShell, CMD, and Bash examples. The interactive walkthrough uses fictional commits to explain author filtering.',
    source: 'https://github.com/kawmy/Guide-Tracking-Changes-by-an-Author-in-a-Git-Branch', detail: 'https://github.com/kawmy/Guide-Tracking-Changes-by-an-Author-in-a-Git-Branch/blob/main/README.md', color: '#c3e5d7'
  }
};

Object.assign(projects, {
  "fluxora": {
    "kind": "Open-source contribution / Fluxora Backend / Tooling",
    "title": "One toolchain, fewer surprises",
    "summary": "A consistent pnpm workflow across contributor setup, CI, and container builds.",
    "problem": "The repository tracked both npm and pnpm lockfiles even though CI already used frozen pnpm installs. Two dependency graphs made it unclear which toolchain and dependency resolution were authoritative.",
    "approach": "I made pnpm 9.15.9 authoritative, added a dependency-free package-manager guard, removed the conflicting npm lockfile, and aligned setup and Docker workflows around Corepack and frozen installs.",
    "result": "PR #1343 was merged. Supported workflows now point to one package manager, while wrong versions and foreign lockfiles fail early with remediation. No dependencies were upgraded.",
    "scope": "My focused contribution to Fluxora-Org/Fluxora-Backend. The walkthrough explains the merged toolchain change.",
    "source": "https://github.com/Fluxora-Org/Fluxora-Backend/pull/1343",
    "detail": "https://github.com/Fluxora-Org/Fluxora-Backend/pull/1343/files",
    "color": "#c3e5d7",
    "stages": [
      [
        "The ambiguity",
        "npm lockfile + pnpm lockfile\nTwo independently resolved dependency graphs"
      ],
      [
        "The change",
        "One authoritative pnpm 9.15.9 toolchain\nCorepack + frozen installs in setup, CI, and Docker"
      ],
      [
        "The guard",
        "Reject unsupported package managers and versions\nReject foreign lockfiles with actionable remediation"
      ]
    ]
  },
  "vero": {
    "kind": "Open-source contribution / Vero Core Engine / TypeScript",
    "title": "A cache that knows its limits",
    "summary": "Preserving an LRU size bound when a background revalidation writes an entry back into the cache.",
    "problem": "A stale cache entry could be evicted while its asynchronous refresh was still pending. When that refresh completed, revalidation could reinsert the entry without enforcing maxEntries.",
    "approach": "I called evictIfNeeded() immediately after a successful background-revalidation write and added a deterministic deferred-promise regression test covering eviction during a pending refresh.",
    "result": "PR #225 was merged. Revalidation now follows the same cache-size bound as the cache-miss path, preserving existing stale-while-revalidate behavior and error handling.",
    "scope": "My focused contribution to Vero-protocol/vero-core-engine. The timeline illustrates the race covered by the regression test.",
    "source": "https://github.com/Vero-protocol/vero-core-engine/pull/225",
    "detail": "https://github.com/Vero-protocol/vero-core-engine/pull/225/files",
    "color": "#d4cafa",
    "stages": [
      [
        "Refresh begins",
        "Entry A is stale.\nA background revalidation starts."
      ],
      [
        "Eviction happens",
        "Other writes evict A while its refresh is pending.\nThe configured maxEntries bound still applies."
      ],
      [
        "Refresh completes",
        "Reinsert refreshed A → evictIfNeeded()\nThe LRU bound is enforced after the write."
      ]
    ]
  },
  "ecotask": {
    "kind": "Open-source contribution / EcoTask Backend / Workflow reliability",
    "title": "No proof left stranded",
    "summary": "An escalation path for inconclusive proof verification when no community validators are available.",
    "problem": "A proof could remain in VERIFYING indefinitely when automatic verification was inconclusive and the community validator pool was empty.",
    "approach": "I added a zero-validator escalation that atomically returns the proof to the existing PENDING admin-review state, records an idempotent manual-review marker, and exposes the reason through the review API.",
    "result": "PR #97 was merged. The path preserves existing admin approval/rejection behavior, avoids duplicate retry effects, and does not overwrite a proof already resolved by a concurrent finalizer.",
    "scope": "My focused contribution to ecotask-network/EcoTask-backend. State labels in the walkthrough explain the merged escalation path.",
    "source": "https://github.com/ecotask-network/EcoTask-backend/pull/97",
    "detail": "https://github.com/ecotask-network/EcoTask-backend/pull/97/files",
    "color": "#f2d955",
    "stages": [
      [
        "Verification stalls",
        "Automatic verification is inconclusive.\nNo community validators are available."
      ],
      [
        "Escalation",
        "Guarded update: status must still be VERIFYING.\nReturn to PENDING + idempotent review marker."
      ],
      [
        "Review path",
        "GET /api/proofs/review?reviewReason=no_validators\nThe existing admin approve/reject flow handles review."
      ]
    ]
  },
  "edupay": {
    "kind": "Open-source contribution / StellarEduPay / Node.js",
    "title": "Getting the backend moving again",
    "summary": "A small import fix that restored payment-route parsing and backend startup.",
    "problem": "paymentRoutes.js declared requireSchoolAuth twice with module-scope const destructuring. Node failed while parsing the route, which prevented the importing backend application from starting.",
    "approach": "I consolidated payment-route dependencies into one contiguous import block and ensured requireAdminAuth and requireSchoolAuth were each imported once.",
    "result": "PR #1308 was merged. The duplicate declaration was removed without changing route or middleware behavior. The contribution targets the startup failure rather than unrelated repository failures.",
    "scope": "My focused contribution to StellarEdu/StellarEduPay. The walkthrough illustrates the original parsing failure and its resolution.",
    "source": "https://github.com/StellarEdu/StellarEduPay/pull/1308",
    "detail": "https://github.com/StellarEdu/StellarEduPay/pull/1308/files",
    "color": "#ff866b",
    "stages": [
      [
        "The failure",
        "Duplicate const declaration of requireSchoolAuth\nSyntaxError before the payment route could load"
      ],
      [
        "The fix",
        "One contiguous import block\nImport each authentication dependency exactly once"
      ],
      [
        "The behavior",
        "Payment route can parse and load.\nExisting routes and middleware behavior stay intact."
      ]
    ]
  },
  "kraal": {
    "kind": "Open-source contribution / Stellar Kraal / CI",
    "title": "A more predictable CI pipeline",
    "summary": "Immutable GitHub Actions references with readable versions and preserved workflow behavior.",
    "problem": "Remote action references needed stable, verifiable identities so the workflow did not depend only on mutable version tags.",
    "approach": "I pinned remote actions in the CI workflow to verified full commit SHAs, retained readable version comments, preserved explicit stable/nightly Rust inputs, and documented the pinning policy.",
    "result": "PR #157 was merged. The change pinned remote action references while preserving workflow triggers, permissions, matrices, commands, caching behavior, and job structure.",
    "scope": "My focused contribution to Stellar-kraal/stellar-kraal-contract. The walkthrough explains action-reference pinning, not a new CI platform.",
    "source": "https://github.com/Stellar-kraal/stellar-kraal-contract/pull/157",
    "detail": "https://github.com/Stellar-kraal/stellar-kraal-contract/pull/157/files",
    "color": "#d4cafa",
    "stages": [
      [
        "Identify",
        "Find each remote action reference in ci.yml.\nResolve the intended upstream version."
      ],
      [
        "Pin",
        "Use the verified full commit SHA.\nKeep a readable version comment beside the pin."
      ],
      [
        "Preserve",
        "Keep existing workflow structure and permissions.\nRetain explicit stable and nightly toolchain inputs."
      ]
    ]
  },
  "stenion": {
    "kind": "Open-source contribution / Stenion / Public API",
    "title": "Making coverage visible",
    "summary": "A separate public API for protocols assessed but not scored on the live leaderboard.",
    "problem": "Coverage needed to explain assessed-but-not-scored protocols without mixing them into the scored leaderboard or presenting an unsupported safety score.",
    "approach": "I added GET /api/v1/coverage with reason, verification paths, and asOf metadata. The endpoint keeps entries separate from the live leaderboard and includes CORS, rate limiting, error handling, and a one-hour shared-cache TTL.",
    "result": "PR #62 was merged. The public API contract was documented and coverage became available independently from the scored-protocol endpoint.",
    "scope": "My focused contribution to stenion-lab/stenion. The walkthrough describes the API contract rather than displaying live protocol data.",
    "source": "https://github.com/stenion-lab/stenion/pull/62",
    "detail": "https://github.com/stenion-lab/stenion/pull/62/files",
    "color": "#c3e5d7",
    "stages": [
      [
        "Separate",
        "Coverage: assessed but not scored\nLeaderboard: scored protocols\nNo entry belongs to both."
      ],
      [
        "Explain",
        "GET /api/v1/coverage\nEach entry includes reason, verify, and asOf."
      ],
      [
        "Serve",
        "CORS + rate limiting + error handling\nOne-hour shared-cache TTL\nNo safetyScore field or numeric JSON values."
      ]
    ]
  }
});

const filters = document.querySelector('.filters');
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const selected = button.dataset.filter;
  filters.querySelectorAll('button').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('.more-work-heading').hidden = selected === 'personal';
  let count = 0;
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = selected !== 'all' && project.dataset.kind !== selected;
    if (!project.hidden) count++;
  });
  document.querySelector('#project-count').textContent = `${count} ${selected === 'all' ? 'selected projects' : selected === 'personal' ? 'personal projects' : 'open-source contributions'}`;
});

const dialog = document.querySelector('#case-study');
const demo = document.querySelector('#case-demo');
let lastTrigger;
function setDemo(markup) { demo.innerHTML = markup; }
function renderDemo(key) {
  if (projects[key].stages) {
    setDemo('<p class="demo-label">Explore the design</p><div class="demo-controls"><button type="button" data-stage="0" aria-pressed="true">01 / Problem</button><button type="button" data-stage="1" aria-pressed="false">02 / Approach</button><button type="button" data-stage="2" aria-pressed="false">03 / Result</button></div><p class="demo-stage-title" style="margin-top:20px"></p><div class="demo-output" role="status" aria-live="polite"></div>');
    const update = button => {
      const stage = projects[key].stages[Number(button.dataset.stage)];
      demo.querySelectorAll('[data-stage]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      demo.querySelector('.demo-stage-title').textContent = stage[0];
      demo.querySelector('.demo-output').textContent = stage[1];
    };
    demo.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => update(button)));
    update(demo.querySelector('[data-stage]'));
  } else if (key === 'dotnet') {
    setDemo('<p class="demo-label">Explore the checked-in pieces</p><div class="demo-controls"><button type="button" data-step="0" aria-pressed="true">01 / Build</button><button type="button" data-step="1" aria-pressed="false">02 / Deploy</button><button type="button" data-step="2" aria-pressed="false">03 / Describe behavior</button></div><div class="demo-output" role="status" aria-live="polite"></div>');
    const steps = ['Dockerfile\n.NET 7 SDK → restore → build → publish\nFinal image: ASP.NET 7 runtime', 'deployment.yaml\n4 replicas · CPU & memory limits\nLoadBalancer service → container port 80', 'Calculator.feature\nGiven the first number is 50\nAnd the second number is 70\nWhen the two numbers are added\nThen the result should be 120'];
    const update = button => { demo.querySelectorAll('[data-step]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); demo.querySelector('.demo-output').textContent = steps[Number(button.dataset.step)]; };
    demo.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => update(button)));
    update(demo.querySelector('[data-step]'));
  } else if (key === 'docker') {
    setDemo('<p class="demo-label">Interactive explanation / Force-only update</p><p class="demo-stage-title">Restart the service. Keep the order.</p><div class="demo-output" role="status" aria-live="polite">Mounts: /data/z → /data/a → /data/m\nForceUpdate: 0</div><div class="demo-controls"><button type="button" data-action="force">Try a force update ↗</button><button type="button" data-action="reset">Reset example</button></div><p class="demo-description">Illustration of the merged regression: no mount-add or mount-remove flags are changed.</p>');
    let forceCount = 0;
    const update = () => { demo.querySelector('.demo-output').textContent = `Mounts: /data/z → /data/a → /data/m\nForceUpdate: ${forceCount}\n${forceCount ? '✓ Original mount order preserved.' : 'Ready for a force update.'}`; };
    demo.querySelector('[data-action="force"]').addEventListener('click', () => { forceCount++; update(); });
    demo.querySelector('[data-action="reset"]').addEventListener('click', () => { forceCount = 0; update(); });
  } else if (key === 'stellar') {
    setDemo('<p class="demo-label">Interactive explanation / Expected amount: 10.00</p><p class="demo-stage-title">Different amounts. One decision path.</p><div class="demo-controls"><button type="button" data-amount="exact" aria-pressed="true">Pay 10.00</button><button type="button" data-amount="over" aria-pressed="false">Pay 12.50</button><button type="button" data-amount="under" aria-pressed="false">Pay 7.50</button></div><div class="demo-output" role="status" aria-live="polite"></div><p class="demo-description">Illustrative values. No payment is sent. Both verification and reconciliation consume the shared decision.</p>');
    const outcomes = {exact:'Verdict: Completed\nStatus: completed\nEvent: payment.completed\nDelta: none',over:'Verdict: Overpaid\nStatus: completed\nEvent: payment.overpaid\nDelta: 2.5',under:'Verdict: Underpaid\nStatus: underpaid\nEvent: payment.underpaid\nDelta: 2.5'};
    const update = button => { demo.querySelectorAll('[data-amount]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); demo.querySelector('.demo-output').textContent = outcomes[button.dataset.amount]; };
    demo.querySelectorAll('[data-amount]').forEach(button => button.addEventListener('click', () => update(button)));
    update(demo.querySelector('[data-amount]'));
  } else {
    setDemo('<p class="demo-label">Interactive explanation / Illustrative commit history</p><p class="demo-stage-title">A file list, through one author’s lens.</p><div class="demo-controls"><button type="button" data-author="all" aria-pressed="true">All authors</button><button type="button" data-author="A" aria-pressed="false">Author A</button><button type="button" data-author="B" aria-pressed="false">Author B</button></div><div class="demo-output" role="status" aria-live="polite"></div><p class="demo-description">A fictional three-commit sample explains the filter. The linked guide contains the actual commands.</p>');
    const commits = [{author:'A',file:'Controllers/Orders.cs'},{author:'B',file:'Services/Notifications.cs'},{author:'A',file:'Tests/OrdersTests.cs'}];
    const update = button => { demo.querySelectorAll('[data-author]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); const author = button.dataset.author; demo.querySelector('.demo-output').textContent = commits.filter(c => author === 'all' || c.author === author).map(c => `Author ${c.author}  /  ${c.file}`).join('\n'); };
    demo.querySelectorAll('[data-author]').forEach(button => button.addEventListener('click', () => update(button)));
    update(demo.querySelector('[data-author]'));
  }
}
document.querySelectorAll('[data-case]').forEach(trigger => trigger.addEventListener('click', () => {
  if (!dialog.showModal) { window.location.href = projects[trigger.dataset.case].source; return; }
  const key = trigger.dataset.case;
  const project = projects[key];
  lastTrigger = trigger;
  ['kind','title','summary','problem','approach','result','scope'].forEach(field => { document.querySelector(`#case-${field}`).textContent = project[field]; });
  document.querySelector('#case-source').href = project.source;
  document.querySelector('#case-detail').href = project.detail;
  document.querySelector('#case-detail').textContent = trigger.dataset.case === 'tenantflowflutter' ? 'Try the live demo ↗' : 'See the implementation ↗';
  demo.style.backgroundColor = project.color;
  renderDemo(key);
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.close-dialog').focus();
}));
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href]')].filter(control => control.getClientRects().length);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastTrigger?.focus({preventScroll:true}); });

const copyButton = document.querySelector('.copy-email');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try { await navigator.clipboard.writeText('armandofranciscodenardi004@gmail.com'); status.textContent = 'Email copied. Let’s talk!'; }
    catch { status.textContent = 'Please select the email above to copy it, or use Say hello.'; }
  });
}
