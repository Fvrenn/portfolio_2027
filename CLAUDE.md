# CLAUDE.md

Portfolio de Timothé — site vitrine **React 19 + Vite 7** (SPA, pas de routeur, pas de backend). Stack : TypeScript 5.8 (strict), Tailwind 4 (`@tailwindcss/vite`, tokens dans `src/index.css`), GSAP 3 + ScrollTrigger (`@gsap/react`, via `@/lib/gsap`), Lenis (scroll lissé), d3-contour (courbes de niveau). Alias `@/` → `src/`.

## Contenu et objectifs

Le but du portfolio, son public et ce qu'il doit montrer (ou éviter) sont définis dans `STRATEGIE-PORTFOLIO.md`. Tout nouveau texte, section ou projet doit respecter sa checklist (§7).

## Conventions de code

Les règles complètes sont dans `GUIDE-CODE-PROPRE.md` ; l'essentiel :

- **Pas de commentaires explicatifs** dans le code : on garde uniquement les directives fonctionnelles (`eslint-disable*`, `@ts-*`, `prettier-ignore`). Code auto-documenté.
- **Les textes affichés vivent dans `src/content/`**, en français (langue par défaut) et en anglais : `{ fr, en }` lus via `useLocalized`. Jamais de texte en dur dans les composants.
- **La logique (calculs, effets DOM) vit dans `src/lib/` et `src/hooks/`**, les composants affichent.
- Avant de conclure une tâche : `npm run build` (qui lance `tsc -b`) doit passer.

## Git

- **Identité des commits** : toujours `Fvrenn <hegetimothe@gmail.com>`. Avant de commiter, vérifier `git config user.name` et `git config user.email` ; si ce n'est pas cette identité, la configurer pour le dépôt (`git config user.name Fvrenn` et `git config user.email hegetimothe@gmail.com`).
- **Ne jamais signer les commits** : aucune ligne `Co-Authored-By`, aucune mention de Claude, d'Anthropic ou d'un outil d'IA dans les messages de commit ou de pull request. L'auteur est uniquement Timothé.

## Commandes

- Dev : `npm run dev`
- Build : `npm run build`
- Aperçu du build : `npm run preview`
