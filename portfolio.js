'use strict';
// Progressive enhancement. Repository, contact and resume links work without JS.
const projects = {
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
  if (key === 'dotnet') {
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
