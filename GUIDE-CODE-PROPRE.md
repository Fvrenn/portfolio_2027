# Guide de code propre — Portfolio

Objectif : un code **facile à maintenir, à faire évoluer et à compléter**, quel que soit l'auteur (humain ou IA). Ce document fixe les règles ; les commandes sont dans `CLAUDE.md`.

---

## 1. Sources de vérité et code de référence

### React 19 / Vite 7 / Tailwind 4
- **La doc officielle à la version du `package.json` fait foi**, puis les typings de `node_modules/react` et `node_modules/vite`.
- **Jamais la mémoire** : une API, une option ou un comportement se vérifie avant d'être utilisé. Tailwind 4 en particulier diffère beaucoup de la v3 (config CSS-first avec `@theme` et `@utility`, plus de `tailwind.config.js`).

### Le code à imiter
| Sujet | Fichiers (sous `src/`) |
|---|---|
| Contenu éditable séparé de l'affichage | `content/hero.ts` → `components/hero/Hero.tsx` |
| Hook navigateur (abonnement externe) | `hooks/useMediaQuery.ts` (`useSyncExternalStore`) |
| Hook d'animation (écriture directe dans le DOM) | `hooks/useCompassNeedle.ts`, `hooks/useFitScale.ts` |
| Animation au scroll (GSAP + ScrollTrigger) | `hooks/useHeroParallax.ts`, `hooks/useAltimeter.ts` |
| Illustration peinte en calques | `components/landscape/layers.ts` → `Landscape.tsx`, `ParallaxLayer.tsx` |
| Fonctions pures | `lib/math.ts`, `lib/spring.ts`, `lib/topography.ts`, `lib/cn.ts` |
| Petit composant d'affichage réutilisable | `components/ui/SplitLetters.tsx`, `components/ui/SectionHeading.tsx` |
| Section de page (contenu + apparition au scroll) | `content/projects.ts` → `components/sections/Trail.tsx` |
| Animation épinglée au scroll (timeline GSAP) | `hooks/usePackingTimeline.ts` → `components/sections/Bag.tsx` |
| Tokens de design | `index.css` (`@theme`, `@utility`) |

**Écarts connus dans le code, à ne pas imiter** : aucun à ce jour.

---

## 2. Les principes

### Un fichier = une responsabilité
Un fichier fait **une seule chose**. Si on doit utiliser « et » pour décrire ce qu'il fait, il faut le découper.
- ✅ `lib/math.ts` calcule (fonctions pures).
- ✅ `hooks/useCompassNeedle.ts` anime l'aiguille ; `components/compass/Needle.tsx` la dessine.
- ❌ un composant qui contient ses textes **et** sa physique d'animation **et** son rendu SVG.

### Une règle = un seul endroit
Une même logique (calcul d'angle, media query, valeur de design) n'est **jamais copiée** : on crée une fonction, un hook ou un token et on l'appelle. Une copie finit toujours par diverger.

**Nuance : même règle ≠ ressemblance par hasard.** On factorise une *même règle* (`angleDelta`, `usePrefersReducedMotion`). Deux codes qui se ressemblent mais représentent des choses différentes restent séparés.

### Simple avant « malin »
Pas d'abstraction sans **au moins deux usages réels**. Pas de classe là où une fonction suffit, pas de hook custom pour un seul composant (sauf pour sortir une logique d'animation lourde du rendu), pas de contexte React pour passer une prop sur deux niveaux, pas de librairie pour ce que quelques lignes font.

---

## 3. Règles Clean Code appliquées à React

Tirées de *Clean Code* (R. C. Martin), traduites pour TypeScript / React.

### 3.1 Commentaires
**Pas de commentaire explicatif dans le code.** Un commentaire n'est pas vérifié par le compilateur : quand le code bouge, il ment. Avant d'en vouloir un : renommer, extraire une fonction ou un sous-composant, nommer une variable ou une constante.

**✅ Seules exceptions : les directives fonctionnelles**
- `eslint-disable*`, `@ts-expect-error`, `prettier-ignore`.
- Toujours avec leur **raison après `--`**, c'est le seul endroit où un *pourquoi* vit dans le code.

**❌ À supprimer**
| Type | Exemple | À faire |
|---|---|---|
| Redondant | `/** Join class names */` au-dessus de `cn` | supprimer |
| Bannière | `/* ════ Design tokens ════ */` | supprimer ; si le fichier en a besoin, il est trop gros → le découper |
| Code commenté (TS ou JSX) | `{/* <OldPanel /> */}` | supprimer : git le garde |
| Paraphrase du JSX | `{/* bezel */}` au-dessus du cadran | supprimer ou extraire un sous-composant bien nommé (`Bezel`) |
| Unité ou intention en commentaire | `const IDLE_AFTER = 2500 // ms` | la mettre dans le nom : `IDLE_DELAY_MS` |
| `TODO` | `// TODO: version mobile` | le faire, ou le noter ailleurs |

### 3.2 Nommage
- **Le code est en anglais**, les textes affichés en français et en anglais (ils vivent dans `src/content/`). On ne mélange pas les langues dans un même nom.
- **Bilingue** : chaque fichier de `src/content/` exporte un objet `Localized<T>` (`{ fr, en }`), où `en` est typé `typeof fr` pour qu'aucune clé ne manque. Les données non traduisibles (liens, images, stack, ids de section) sont déclarées **une seule fois** hors des blocs `fr`/`en`. Les composants lisent le contenu avec `useLocalized(content)` ; les formats (nombres, points cardinaux) dépendent de la langue (`lib/format.ts`, `i18n/locale.ts`). Les ids d'ancre vivent dans `content/sections.ts`.
- **Le nom dit l'intention et l'unité** : `durationMs`, `angleDeg`, `maxScale` ; pas `d`, `tmp`, `data2`.
- **Un mot par concept, partout** :
  | Préfixe / suffixe | Sens | Exemple |
  |---|---|---|
  | `get…` | renvoie une valeur, **sans effet de bord** | `getHeadingLabel` |
  | `is… / has… / can…` | booléen, formulé **au positif** | `isRolling`, `prefersReducedMotion` |
  | `use…` | hook React | `useMediaQuery`, `useHeroScale` |
  | `handle…` | gestionnaire d'événement défini dans un composant | `handlePointerMove` |
  | `on…` | prop qui reçoit un gestionnaire | `onChange` |
  | `to… / build…` | convertit / construit une forme (fonction pure) | `toCardinal` |
  | `…Props` | props d'un composant | `SplitLettersProps` |
  | `…Content` | contenu éditable de `src/content/` | `heroContent` |
  | `…Ref` | ref React | `heroRef`, `needleRef` |
- **Pas de mots vides** (`Data` seul, `Info`, `Manager`, `Helper`), **pas d'encodage** (`_champ`, `IInterface`).
- **Pas de valeur magique** : une constante nommée en `SCREAMING_SNAKE_CASE` déclarée une fois (`STIFFNESS`, `DAMPING`) ; une couleur, une police, une animation → un token `@theme` dans `index.css`.
- **Le nom du composant = le nom du fichier** : `CompassRose.tsx` → `CompassRose`. Hooks `useXxx.ts`, fichiers de `lib/` et `content/` en `camelCase`.
- **La longueur suit la portée** : `i` dans une boucle de 3 lignes, un nom complet pour une fonction exportée.

### 3.3 Fonctions
- **Petites et une seule chose** ; si on peut en extraire une fonction au nom qui ne soit pas une reformulation, elle en fait plusieurs.
- **Un seul niveau d'abstraction** : un composant de section **assemble** des sous-composants nommés.
- **Lecture de haut en bas** : le composant ou la fonction exporté, puis juste en dessous ce qu'il appelle.
- **0 à 3 arguments** ; au-delà, un objet typé. **Pas de booléen qui change le comportement** : deux fonctions ou deux variantes bien nommées.
- **Faire OU renvoyer** : une fonction modifie un état ou renvoie une information, pas les deux.
- **Conditions lisibles** : une condition complexe devient une fonction ou une variable nommée.
- **Calculs en fonctions pures** (sans React, sans DOM) dans `src/lib/`.

### 3.4 Composants et hooks
- **Une seule raison de changer** :
  - un **contenu** (`src/content/`) porte les textes et données affichées ;
  - un **composant** affiche et réagit aux événements ;
  - un **hook** (`src/hooks/`) porte un état ou un effet réutilisable, ou une logique d'animation trop lourde pour le composant ;
  - une **lib** (`src/lib/`) calcule (fonctions pures).
- **Animations** : CSS / Tailwind d'abord (`transition`, `@keyframes` dans `@theme`). JavaScript seulement quand il faut suivre le pointeur ou le scroll ; dans ce cas, écrire dans le DOM via une ref dans une boucle `requestAnimationFrame` et garder dans le state React seulement ce qui s'affiche (modèle : `useCompassNeedle`).
- **Scroll et parallaxe** : GSAP + ScrollTrigger, importés **uniquement** depuis `@/lib/gsap` (enregistrement des plugins en un seul endroit), dans `useGSAP` pour le nettoyage automatique ; conditions de mouvement via `gsap.matchMedia(MOTION_ALLOWED_QUERY)`. Le scroll lissé (Lenis) est initialisé une seule fois par `useSmoothScroll` dans `App`. Les éléments animés sont ciblés par attribut `data-*` (`data-parallax-depth`, `data-hero-content`), pas par classe Tailwind.
- **Illustrations** : le paysage du hero est fait de calques peints (WebP avec transparence, même cadrage 3:2) dans `public/images/hero/`, déclinés en plusieurs largeurs (`<nom>-<largeur>.webp`) et servis via `srcSet`/`sizes` (`lib/responsiveImage.ts`). Ils sont listés une seule fois dans `components/landscape/layers.ts` avec leur profondeur de parallaxe et leurs largeurs disponibles. Les sources (PNG d'origine et versions agrandies ×4) restent dans `design/calques/`, hors build. Les motifs générés (courbes de niveau, bord de nuages) sont calculés par des fonctions pures de `lib/` avec une graine fixe, au niveau du module.
- **Accessibilité** : respecter `prefers-reduced-motion` (`usePrefersReducedMotion`, variantes `motion-safe:`), `aria-hidden="true"` sur le décoratif, `sr-only` pour le texte que l'animation rend illisible.
- **Effets propres** : chaque `useEffect` qui s'abonne (événement, `requestAnimationFrame`, observer) renvoie sa fonction de nettoyage.
- **Signaux d'alerte** : fichier > 250 lignes, fonction > 30 lignes, > 3 paramètres, composant > ~150 lignes de JSX, plus de ~5 `useState` dans un composant. Invitation à découper.
- **Exposer le minimum** : n'exporter que ce qui est utilisé ailleurs ; les sous-composants propres à un fichier restent non exportés.
- **Ne parler qu'à ses voisins** : un composant parle à un autre par ses props.
- **Pas de code mort** : fonction jamais appelée, variable inutilisée, `console.log` de test → supprimé (`noUnusedLocals` / `noUnusedParameters` sont activés).

### 3.5 Erreurs et types
- **Ne pas avaler une erreur en silence** ; une API navigateur absente (SSR, vieux navigateur) a une valeur de repli explicite (ex. le `getServerSnapshot` de `useMediaQuery`).
- **Préférer une valeur vide à `null`** : `[]`, `''`. Une ref DOM, elle, est typée `HTMLElement | null` et vérifiée avant usage.
- **Typer au lieu de `any`** ; `unknown` pour ce qui n'est pas encore connu. `import type` pour les imports de types seuls (`verbatimModuleSyntax` est activé).

### 3.6 Mise en forme et cohérence
- **Style** : pas de point-virgule, guillemets simples, indentation 2 espaces, virgule finale (comme le code existant).
- **Ordre dans un composant** : refs (`useRef`) → `useState` → hooks custom → valeurs dérivées (`useMemo` seulement si le calcul est coûteux) → effets → `handle…` → `return` JSX. Les sous-composants et fonctions pures locales vont **sous** le composant exporté ou dans leur propre fichier.
- **Classes Tailwind** : classes conditionnelles avec `cn` (`@/lib/cn`) ; une longue liste de classes réutilisée devient une constante nommée (ex. `headingLine` dans `Hero.tsx`) ; un visuel trop dense pour des classes devient une `@utility` dans `index.css`. Couleurs, polices et animations via les tokens de `@theme`, pas de valeur en dur. Un point de rupture spécifique se déclare en token (`--breakpoint-desktop` → variante `desktop:`) : jamais `min-[1101px]:`, car Tailwind ordonne mal une valeur en px face aux points de rupture en rem et la règle est silencieusement écrasée.
- **Ce qui va ensemble est proche** : une constante juste au-dessus de la fonction qui l'utilise ; une fonction interne juste sous celle qui l'appelle.
- **Cohérence avant préférence** : un nouveau code s'écrit comme les fichiers de référence (§1). Si une convention change, elle change partout, et dans ce guide.

### 3.7 La règle du boy-scout
Laisser un fichier un peu plus propre qu'on ne l'a trouvé : renommer une variable obscure, supprimer un commentaire inutile, extraire une fonction trop longue. Petites améliorations, dans le fichier touché, sans refonte hors sujet dans la même modification.

### 3.8 Checklist de relecture
- [ ] Chaque nom dit ce que fait la chose, sans commentaire.
- [ ] Aucun commentaire hors directives ; chaque directive a sa raison après `--`.
- [ ] Chaque fonction fait une chose, en peu de lignes, avec ≤ 3 arguments et sans booléen de sélection.
- [ ] Aucune logique copiée : elle existe déjà (`lib/`, `hooks/`) ou a été extraite.
- [ ] Les textes affichés sont dans `src/content/`.
- [ ] Les animations respectent `prefers-reduced-motion` ; les effets se nettoient.
- [ ] Pas de valeur magique, pas de couleur en dur, pas de code mort, pas de `console.log`, pas de `any`.
- [ ] `npm run build` passe.

---

## 4. Où ranger quoi

```
src/
├── main.tsx            ← point d'entrée (montage React)
├── App.tsx             ← assemble les sections de la page
├── index.css           ← Tailwind, tokens @theme, @utility
├── content/            ← textes et données affichés, un fichier par section
├── components/
│   ├── ui/             ← petites briques d'affichage réutilisables
│   ├── sections/       ← sections de la page (Approach, Trail, Bag…)
│   └── <bloc>/         ← composants d'un bloc complexe (hero/, compass/)
├── hooks/              ← hooks React réutilisables ou d'animation
└── lib/                ← fonctions pures
public/                 ← fichiers servis tels quels (favicon, images)
```

| Besoin | Emplacement | Exemple |
|---|---|---|
| Texte ou donnée affichée | `content/<section>.ts` | `heroContent` |
| Nouvelle section de page | `components/sections/` + ajout dans `App.tsx` | `Bag` |
| Composant réutilisé partout | `components/ui/` | `SplitLetters` |
| Composant propre à un bloc | `components/<bloc>/` | `compass/Needle` |
| État ou effet réutilisable | `hooks/` | `useMediaQuery` |
| Calcul pur | `lib/` | `angleDelta` |
| Couleur, police, animation | `index.css` (`@theme`) | `--color-gold` |
