import { siteContent } from './site-data.js';

const page = document.body.dataset.page || 'home';

const createLinkCard = ({ label, href, hint }) => {
  const anchor = document.createElement('a');
  anchor.className = 'link-card';
  anchor.href = href;
  if (href.startsWith('http')) {
    anchor.target = '_blank';
    anchor.rel = 'noreferrer noopener';
  }

  const title = document.createElement('strong');
  title.textContent = label;

  const sub = document.createElement('span');
  sub.textContent = hint || '';

  anchor.append(title, sub);
  return anchor;
};

const createPill = (text) => {
  const pill = document.createElement('span');
  pill.className = 'tag';
  pill.textContent = text;
  return pill;
};

const createMiniStat = ({ value, label }) => {
  const stat = document.createElement('article');
  stat.className = 'mini-stat';

  const statValue = document.createElement('strong');
  statValue.textContent = value;

  const statLabel = document.createElement('span');
  statLabel.textContent = label;

  stat.append(statValue, statLabel);
  return stat;
};

const createTagRow = (items) => {
  const wrap = document.createElement('div');
  wrap.className = 'tag-row';
  items.forEach((item) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = item;
    wrap.appendChild(tag);
  });
  return wrap;
};

const createCard = ({ title, summary, tags, href }) => {
  const card = document.createElement(href ? 'a' : 'article');
  card.className = 'panel card';
  if (href) {
    card.href = href;
    if (href.startsWith('http')) {
      card.target = '_blank';
      card.rel = 'noreferrer noopener';
    }
  }

  const heading = document.createElement('h3');
  heading.textContent = title;

  const text = document.createElement('p');
  text.textContent = summary;

  card.append(heading, text, createTagRow(tags));
  return card;
};

const createSkillCard = ({ title, items }) => {
  const card = document.createElement('article');
  card.className = 'panel card';

  const heading = document.createElement('h3');
  heading.textContent = title;

  card.append(heading, createTagRow(items));
  return card;
};

const createBarSkillCard = ({ title, items }) => {
  const card = document.createElement('article');
  card.className = 'panel card';

  const heading = document.createElement('h3');
  heading.textContent = title;

  const list = document.createElement('div');
  list.className = 'bar-list';
  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'bar-row';

    const label = document.createElement('span');
    label.textContent = item.label;

    const value = document.createElement('span');
    value.textContent = `${item.value}%`;

    const track = document.createElement('div');
    track.className = 'bar-track';
    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.width = `${item.value}%`;
    track.appendChild(fill);

    row.append(label, value, track);
    list.appendChild(row);
  });

  card.append(heading, list);
  return card;
};

const createTimelineCard = ({ title, period, summary }) => {
  const card = document.createElement('article');
  card.className = 'timeline-card';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const periodElement = document.createElement('p');
  periodElement.className = 'timeline-period';
  periodElement.textContent = period;

  const summaryElement = document.createElement('p');
  summaryElement.textContent = summary;

  card.append(periodElement, titleElement, summaryElement);
  return card;
};

const renderHome = () => {
  const { person, points, learning, funFact, skills, experience, education, certifications, projects, contacts, resources } = siteContent;

  document.getElementById('hero-name').textContent = person.name;
  document.getElementById('hero-role').textContent = person.role;
  document.getElementById('hero-summary').textContent = person.summary;
  document.getElementById('about-copy').textContent = person.about;
  document.getElementById('hero-fact').textContent = funFact;
  document.getElementById('contact-copy').textContent = `${person.email.replace('mailto:', '')} · ${person.github}`;

  const pointsWrap = document.getElementById('hero-points');
  points.forEach((point) => pointsWrap.appendChild(createPill(point)));

  const miniStats = document.getElementById('hero-stats');
  [
    { value: person.experienceYears, label: 'Experience' },
    { value: person.projectsDone, label: 'Projects' },
    { value: person.style, label: 'Focus' },
  ].forEach((stat) => miniStats.appendChild(createMiniStat(stat)));

  const learningWrap = document.getElementById('hero-learning');
  learning.forEach((item) => learningWrap.appendChild(createPill(item)));

  const heroLinks = document.getElementById('hero-links');
  [
    { label: 'Email', href: person.email, hint: 'Contatto diretto' },
    { label: 'GitHub', href: person.github, hint: 'Codice e repository' },
  ].forEach((link) => heroLinks.appendChild(createLinkCard(link)));

  const skillsGrid = document.getElementById('skills-grid');
  skills.forEach((group) => skillsGrid.appendChild(createBarSkillCard(group)));

  const experienceGrid = document.getElementById('experience-grid');
  experience.forEach((item) => experienceGrid.appendChild(createTimelineCard(item)));

  const educationGrid = document.getElementById('education-grid');
  education.forEach((item) => educationGrid.appendChild(createTimelineCard(item)));

  const certGrid = document.getElementById('certifications-grid');
  certifications.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'panel card cert-card';

    const heading = document.createElement('h3');
    heading.textContent = item.title;

    const meta = document.createElement('p');
    meta.className = 'timeline-period';
    meta.textContent = `${item.year} · ${item.issuer}`;

    card.append(meta, heading);
    certGrid.appendChild(card);
  });

  const projectsGrid = document.getElementById('projects-grid');
  projects.forEach((project) => projectsGrid.appendChild(createCard(project)));

  // Blog section intentionally removed for minimal layout

  const resourcesGrid = document.getElementById('resources-grid');
  resources.forEach((resource) => resourcesGrid.appendChild(createLinkCard(resource)));

  const contactsGrid = document.getElementById('contacts-grid');
  contacts.forEach((contact) => contactsGrid.appendChild(createLinkCard(contact)));

};

const renderCv = () => {
  const { person, skills, experience, education, certifications, projects, resources } = siteContent;
  const root = document.getElementById('cv-root');
  document.title = `${person.name} | CV sintetico`;

  root.innerHTML = `
    <div class="cv-head">
      <div>
        <p class="eyebrow">CV sintetico</p>
        <h1>${person.name}</h1>
        <p class="hero-role">${person.role}</p>
      </div>
      <div class="cv-meta">
        <span>Portfolio black/red</span>
        <span>Formato compatto</span>
      </div>
    </div>

    <div class="panel-inner">
      <p>${person.summary}</p>
      <div class="tag-row" style="margin-top:14px;">
        ${['Web Development', 'UI/UX Design', 'Cybersecurity', 'Creative Coding'].map((item) => `<span class="tag">${item}</span>`).join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Competenze</h2>
      <div class="grid-2 cv-grid">
        ${skills
          .map(
            (group) => `
              <article class="panel card">
                <h3>${group.title}</h3>
                <div class="bar-list">
                  ${group.items
                    .map(
                      (item) => `
                        <div class="bar-row">
                          <span>${item.label}</span>
                          <span>${item.value}%</span>
                          <div class="bar-track"><div class="bar-fill" style="width:${item.value}%"></div></div>
                        </div>
                      `,
                    )
                    .join('')}
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Experience</h2>
      <div class="stack">
        ${experience
          .map(
            (item) => `
              <article class="timeline-card">
                <p class="timeline-period">${item.period}</p>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Education</h2>
      <div class="stack">
        ${education
          .map(
            (item) => `
              <article class="timeline-card">
                <p class="timeline-period">${item.period}</p>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Certifications & Awards</h2>
      <div class="grid-2 cv-grid">
        ${certifications
          .map(
            (item) => `
              <article class="panel card cert-card">
                <p class="timeline-period">${item.year} · ${item.issuer}</p>
                <h3>${item.title}</h3>
              </article>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Progetti selezionati</h2>
      <div class="grid-2 cv-grid">
        ${projects
          .map(
            (project) => `
              <article class="panel card">
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </div>

    <!-- Blog removed for a concise CV -->

    <div class="section-mini">
      <h2>Additional Links</h2>
      <div class="grid-2 cv-grid">
        ${resources
          .map(
            (resource) => `
              <a class="link-card" href="${resource.href}" target="_blank" rel="noreferrer noopener">
                <strong>${resource.label}</strong>
                <span>${resource.hint}</span>
              </a>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="section-mini">
      <h2>Contatti rapidi</h2>
      <div class="grid-2 cv-grid">
        <a class="link-card" href="${person.email}"><strong>Email</strong><span>${person.email.replace('mailto:', '')}</span></a>
        <a class="link-card" href="${person.github}" target="_blank" rel="noreferrer noopener"><strong>GitHub</strong><span>${person.github}</span></a>
      </div>
    </div>
  `;
};

if (page === 'cv') {
  renderCv();
} else {
  renderHome();
}