# Armando Francisco Denardi — Portfolio

Live site: **https://kawmy.github.io/**

A colorful, responsive engineering portfolio with thirteen project and contribution case studies, category filters, accessible dialogs, interactive code explanations, four substantial enterprise-experience case studies, and a downloadable résumé aligned with the supplied October 27 résumé.

## Stack

The portfolio shell uses plain HTML, CSS, and JavaScript with no package installation or build step. The prebuilt Flutter demonstration is under `demos/tenantflow/`; its source and Flutter build instructions are in [tenantflow-flutter](https://github.com/kawmy/tenantflow-flutter). GitHub Pages serves `main` from the repository root. `.nojekyll` preserves Flutter's underscore-prefixed runtime assets. Hosting uses the free included address.

## Files

- `index.html`: page content, project gallery, background, and contact links.
- `styles.css`: responsive layout, project illustrations, focus states, and reduced-motion support.
- `portfolio.js`: project filters, case studies, explanatory interactions, dialog focus management, and email-copy feedback.
- `assets/`: optimized portrait, favicon, and phone-free PDF résumé.
- `404.html`, `robots.txt`, and `sitemap.xml`: navigation and discovery.

## Preview

Run `python -m http.server 8000` from the repository and open `http://localhost:8000`. No installation is required if Python is already available.

## Content and attribution

The personal repositories and open-source contributions are labeled separately. Case-study visuals and interactions explain the linked public code; they do not represent live deployments or real payment transactions. Professional background follows the supplied résumé, with the latest contract shown as completed.

The portrait, résumé, and personal content belong to Armando Francisco Denardi. Linked projects retain their respective ownership and licenses.
