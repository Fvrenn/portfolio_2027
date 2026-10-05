# Reprendre le projet

Ce document résume **où en est le portfolio, ce qu'on veut faire ensuite et comment le reprendre sur un autre PC**. Il contient aussi tous les prompts de génération d'images.

À lire avec :
- `CLAUDE.md` : résumé technique et conventions ;
- `GUIDE-CODE-PROPRE.md` : règles de code, à respecter strictement ;
- `STRATEGIE-PORTFOLIO.md` : pourquoi ce portfolio, pour qui, ce qu'il faut montrer ou éviter ;
- `PLAN-SITE.md` : pages, sections, palette et feuille de route.

---

## 1. Installer le projet sur un nouveau PC

```bash
git clone https://github.com/Fvrenn/portfolio_2027.git
cd portfolio_2027
git checkout parcours        # branche de travail actuelle
npm install
npm run dev                  # http://localhost:5173
npm run build                # doit passer avant chaque commit
```

Il faut Node.js 22 ou plus récent.

### Fichiers absents de git, à copier à la main si besoin

| Fichier | Pourquoi il n'est pas dans git | Utilité |
|---|---|---|
| `design/calques/*_upscayl_*` | Trop lourds (environ 240 Mo) | Versions agrandies ×5 des calques du hero. Les WebP déjà générés sont dans `public/images/hero/`, donc ces fichiers ne servent que pour régénérer les WebP |
| `exemple/` | Photos personnelles | Photos de rando de référence pour le personnage (`IMG_20260812_161605.jpg`, seul sur la photo) |

---

## 2. Les branches

- **`main`** : version stable. Elle contient le hero peint, l'approche, le sentier des projets sur carte topographique, le sac animé, le sommet (contact), et la version bilingue FR/EN.
- **`parcours`** : branche de travail. Le portfolio y devient **une journée d'ascension** (voir section 3).

---

## 3. Ce qu'on veut faire sur la branche `parcours`

### 3.1 L'idée

Le visiteur suit **une journée de randonnée**. Chaque section est un **lieu** et une **heure de la journée**. Le randonneur (Timothé) avance d'une scène à l'autre, le ciel change de couleur et l'altimètre monte.

| Heure | Lieu | Section | Contenu |
|---|---|---|---|
| Matin | Le belvédère | Hero | Identité, déjà fait |
| Matin | Le départ | Approche | Phrase « créateur de produits », déjà faite |
| Midi | Le sentier | Projets | La carte topographique reste. Le point GPS « Vous êtes ici » devient **un petit randonneur peint qui marche** le long de l'itinéraire |
| Après-midi | Le col | Le sac (méthode) | Fond peint d'un col au soleil d'après-midi, avec le sac posé dans l'herbe. **5ᵉ objet : les pochettes de rangement**, pour « un code rangé comme mon sac » |
| Fin d'après-midi | Le refuge | Parcours | Escalier de 5 cartes reliées par le sentier au scroll, chacune portant un élément peint : 4 ans chez Trialog en 5 paliers (2 stages, 3 ans d'alternance), formation en parallèle (BUT MMI, mastère Efrei), scoutisme présenté comme des compétences |
| Nuit | Le bivouac | Équipement (stack) et carnet de bord (qualité du code) | Feu de camp, tente éclairée, étoiles, lumière tamisée |
| Aube | Le sommet | Contact | Lever de soleil sur une mer de nuages, randonneur au sommet. « Et si la prochaine étape, on la faisait ensemble ? » |

### 3.2 Le positionnement à garder partout

- **Créateur de produits.** Le code est un moyen, pas une fin. Timothé s'investit dans le produit : le problème qu'il résout, ce qu'il propose, ce qui le fait avancer, autant par le code que par ses propositions.
- **Méthodique.** Un code bien organisé, rangé et maintenable. Il faut le **montrer** (preuves vérifiables), pas seulement le dire.
- **Français par défaut**, avec un bouton FR / EN. Tout texte est écrit dans les deux langues.

### 3.3 La stack : la rendre concrète

- Une nouvelle section au bivouac, « on fait le point sur le matériel ».
- **Pas de barres en %, pas de niveaux inventés.** Les outils sont groupés par usage réel : « Au quotidien », « Utilisé en projet », « En exploration ».
- Chaque outil a son logo et son nom. Au survol, on voit **dans quel projet** il a été utilisé, avec un lien.
- Les données vont dans `src/content/stack.ts` (bilingue `{ fr, en }`, une seule source).

### 3.4 La qualité du code : la montrer

- **Le carnet de bord**, au bivouac : l'arborescence réelle de `src/`, animée, chaque dossier avec son rôle (content, components, hooks, lib).
- **Des outils à ajouter au projet** (à valider), qui serviront aussi de preuves sur le site :
  - ESLint et Prettier, pour un format uniforme ;
  - Vitest, pour tester les fonctions pures de `src/lib/` ;
  - une CI GitHub Actions qui bloque un changement si le build ou les tests cassent.
- Un lien vers le dépôt public et vers `GUIDE-CODE-PROPRE.md`.

### 3.5 À faire, dans l'ordre

1. [x] Générer les images (section 4) et les déposer dans `design/parcours/`.
   - [ ] Optionnel : passer les grandes scènes dans Upscayl ×5 « high-fidelity » puis ajouter les largeurs 2560 et 3840 (`SCENE_WIDTHS` dans `src/components/scene/scenes.ts`). Les WebP actuels s'arrêtent à 1536 px.
2. [ ] Fournir la vraie stack, en trois listes (au quotidien / utilisé en projet / en exploration). La liste actuelle dans `src/content/stack.ts` est **un exemple**. « Où je l'ai utilisé » est calculé à partir du champ `stack` de chaque projet (`src/content/projects.ts`) : les noms doivent être écrits pareil des deux côtés. Les logos ne sont pas encore affichés.
3. [ ] Valider l'ajout d'ESLint, Prettier, Vitest et de la CI.
4. [x] Coder dans cet ordre :
   - [x] le marcheur sur la carte (`TrailMarkers`, `useTrailProgress`) : il se retourne selon le sens du sentier et marche pendant le scroll ;
   - [x] le col derrière le sac et le 5ᵉ objet (les pochettes) ;
   - [x] le bivouac avec la stack et le carnet de bord (`sections/Bivouac.tsx`, `components/bivouac/`) ;
   - [x] le sommet à l'aube (`sections/Summit.tsx`) ;
   - [x] les fondus de couleur : col → nuit en dégradé, nuit → aube par la ligne de crête, heure de la journée dans chaque surtitre.
   - [x] le refuge : section « Parcours » (`sections/Journey.tsx`, `components/journey/`, contenu dans `content/journey.ts`) ;
   - [x] l'image du refuge (prompt 8) derrière le titre de la section Parcours ;
   - [ ] compléter le parcours : un résultat concret ou un chiffre par palier chez Trialog (utilisateurs d'OCPPVS, clients, retours…) ;
   - [ ] Vérifier le rendu sur mobile (non testé).
5. [ ] Remplir les vrais projets dans `src/content/projects.ts` : textes FR + EN, captures 1440 × 900 dans `design/projets/`.
6. [ ] Remplir le contact dans `src/content/contact.ts` : ce que tu recherches, e-mail, LinkedIn, GitHub, CV en PDF dans `public/`.

### 3.6 Images déjà générées

| Fichier | Statut |
|---|---|
| `design/parcours/marcheur-casquette.png` | Prompt 1, **retenu** → `public/images/parcours/walker.webp` |
| `design/parcours/marcheur-lunettes.png` | Prompt 1, variante non retenue |
| `design/parcours/col-fond.png` | Prompt 2 → `col-<largeur>.webp` |
| `design/parcours/pochettes.png` | Prompt 3 → `public/images/bag/pouches.webp` |
| `design/parcours/bivouac-fond.png` | Prompt 4 → `bivouac-<largeur>.webp` |
| `design/parcours/bivouac-camp.png` | Prompt 5 → `bivouac-camp-<largeur>.webp` |
| `design/parcours/sommet-fond.png` | Prompt 6 → `sommet-<largeur>.webp` |
| `design/parcours/sommet-perso.png` | Prompt 7 → `sommet-perso-<largeur>.webp` |
| `design/parcours/refuge-fond.png` | Prompt 8 → `refuge-<largeur>.webp` |
| `design/parcours/profil-crete.png` | Prompt 9, **non utilisé** |
| `design/parcours/asset/*.png` | Éléments peints générés avec Copilot, un par étape du parcours, posés sur le haut des cartes en escalier (fleurs, sapins, chalet, rochers, cairn et drapeau ; `sapin.png` non utilisé) → `public/images/parcours/scenery/*.webp`, associés aux étapes dans `content/journey.ts` |

Les scènes sont déclinées en 768 et 1536 px dans `public/images/parcours/` et déclarées une seule fois dans `src/components/scene/scenes.ts`.

---

## 4. Les prompts de génération d'images

### Méthode

1. Ouvrir une nouvelle conversation avec l'IA de génération d'images.
2. Coller le **message de contexte** (4.1) en joignant :
   - 2 ou 3 calques du hero pour le style : `design/calques/02-mountains.png`, `04-forest.png`, `05-foreground.png` ;
   - la photo de rando où Timothé est seul : `exemple/IMG_20260812_161605.jpg`.
3. Envoyer les prompts **un par un, dans l'ordre**.
4. Si l'IA s'écarte du style, renvoyer les images de référence en commençant le prompt par « Même style et mêmes règles qu'avant : ».
5. Vérifier que chaque fond « transparent » l'est vraiment (pas de damier dessiné). Sinon, demander un fond vert uni `#00FF00`.

### 4.1 Message de contexte

```
Je crée des illustrations pour mon portfolio web. Elles seront utilisées comme calques séparés et animés (effet de parallaxe), donc chaque image doit respecter des règles précises.

CONTEXTE
Le portfolio raconte une journée de randonnée en montagne : le matin au belvédère, l'après-midi au col, la nuit au bivouac autour d'un feu de camp, et l'aube au sommet. Le personnage principal, c'est moi : un randonneur.

IMAGES JOINTES
- Les illustrations de paysage jointes sont des RÉFÉRENCES DE STYLE uniquement. Ne les recopie pas : reprends leur rendu.
- La photo jointe me représente : c'est la référence pour le personnage.

STYLE À RESPECTER POUR TOUTES LES IMAGES
- Peinture gouache / aquarelle, texture granuleuse visible, aplats doux, comme les références.
- Couleurs franches et modernes, pas d'effet vieilli, pas de sépia, pas de parchemin.
- Palette des références : bleu ciel, bleus profonds, vert sapin, touches de jaune et d'orange.
- Lumière cohérente avec l'heure de la journée demandée dans chaque prompt.

LE PERSONNAGE (quand il apparaît)
- Homme, silhouette fine, cheveux courts bruns.
- Casquette vert kaki, lunettes de soleil rondes.
- T-shirt noir, short de randonnée bleu marine foncé, chaussures de randonnée marron.
- Grand sac à dos de trek orange rouille avec une veste bleue roulée attachée sur le dessus.
- Foulard scout jaune et orange autour du cou.
- Toujours le même personnage d'une image à l'autre.

RÈGLES TECHNIQUES
- Fond réellement transparent (PNG avec canal alpha) dès que le prompt dit « transparent ». Pas de damier dessiné, pas de fond blanc. Si la transparence est impossible : fond vert uni #00FF00, sans dégradé ni ombre.
- Les images « opaques » couvrent toute la surface.
- Aucun texte, aucun logo, aucune marque, aucun cadre, aucune signature, aucun filigrane.
- Objets et personnages entiers, jamais coupés par le bord, sauf indication contraire.
- Quand je dis « même cadrage que l'image jointe », le premier plan doit se superposer exactement à cette image de fond.

Je vais t'envoyer les images à générer une par une. Réponds juste « OK » et attends la première.
```

### 4.2 Prompt 1 — `marcheur.png`, le petit randonneur sur la carte *(déjà généré, à choisir)*

```
Format carré 1024 × 1024. Le randonneur de la photo jointe (casquette vert kaki, t-shirt noir, short bleu marine, grand sac à dos orange avec une veste bleue roulée dessus) vu de profil, en train de marcher vers la droite, en pleine foulée, entier de la tête aux pieds, centré, occupant 80 % de la hauteur. Aucun sol, aucun décor, aucune ombre. Même style peint. Fond transparent.
```

### 4.3 Prompt 2 — `col-fond.png`, l'après-midi au col (fond opaque)

```
Format paysage 1536 × 1024, entièrement opaque. Un col de montagne en début d'après-midi, lumière dorée chaude venant de la droite. Au premier plan, une prairie d'alpage plate avec quelques fleurs, des rochers et un cairn, avec un replat d'herbe dégagé dans le tiers droit, où un sac à dos sera posé (laisser cet endroit vide). Au loin, une vallée et des sommets enneigés, plus hauts et plus proches que dans les images jointes (on a monté depuis le matin). Le tiers gauche est calme et peu détaillé (ciel et pente douce) pour y mettre du texte. Même style peint, même palette, ciel un peu plus chaud.
```

### 4.4 Prompt 3 — `pochettes.png`, le 5ᵉ objet du sac

```
Format carré 1024 × 1024. Trois pochettes de rangement de randonnée (stuff sacks) compressées, empilées proprement, de couleurs différentes (bleu, jaune moutarde, vert sapin), avec cordons de serrage. Objet isolé, entier, légèrement incliné. Même style peint. Fond transparent.
```

### 4.5 Prompt 4 — `bivouac-fond.png`, la nuit (fond opaque)

```
Format paysage 1536 × 1024, entièrement opaque. Nuit claire en montagne : ciel bleu nuit profond rempli d'étoiles et la Voie lactée en diagonale, silhouettes de sommets sombres avec un reste de lueur bleutée à l'horizon, un lac sombre qui reflète quelques étoiles. Pas de personnage, pas de feu, pas de tente. Le bas de l'image est un sol d'herbe et de rochers sombres, presque noir. Même style peint, palette froide bleu nuit.
```

### 4.6 Prompt 5 — `bivouac-camp.png`, le campement (premier plan transparent)

Joindre l'image `bivouac-fond.png` générée juste avant, et la photo de Timothé.

```
Format paysage 1536 × 1024, même cadrage que l'image jointe, fond réellement transparent. Uniquement le premier plan du campement, dans le tiers gauche : une petite tente orange éclairée de l'intérieur par une lampe (lueur chaude), un feu de camp avec des flammes orangées et des braises, et le randonneur de la photo assis sur un rocher près du feu, vu de dos de trois quarts, casquette, sac à dos orange posé à côté de lui. La lumière du feu éclaire chaudement le personnage et le sol autour, le reste du sol est sombre. Tout le reste de l'image est transparent.
```

### 4.7 Prompt 6 — `sommet-fond.png`, l'aube au sommet (fond opaque)

```
Format paysage 1536 × 1024, entièrement opaque. Lever de soleil vu depuis un très haut sommet : une mer de nuages qui remplit les vallées, quelques pointes de montagnes qui en émergent au loin, le soleil qui se lève à l'horizon au centre-gauche avec un ciel dégradé du bleu nuit (haut) au rose puis à l'orange doré (horizon). Pas de personnage, pas de premier plan rocheux. Même style peint.
```

### 4.8 Prompt 7 — `sommet-perso.png`, le randonneur au sommet (premier plan transparent)

Joindre l'image `sommet-fond.png` générée juste avant, et la photo de Timothé.

```
Format paysage 1536 × 1024, même cadrage que l'image jointe, fond réellement transparent. Uniquement le premier plan : la pointe rocheuse du sommet dans le tiers droit, avec un petit cairn, et le randonneur de la photo debout dessus, vu de dos, sac à dos orange, regardant le lever de soleil, un bras levé. Contre-jour : le personnage et la roche sont éclairés par une lumière rose-orangée sur les bords. Tout le reste est transparent.
```

### 4.9 Prompt 8 — `refuge-fond.png`, la fin d'après-midi au refuge (fond opaque)

```
Format paysage 1536 × 1024, entièrement opaque. Un refuge de montagne en pierre et bois, au toit de lauzes, posé sur un replat d'alpage en fin d'après-midi : lumière dorée rasante venant de la droite, longues ombres, fenêtres légèrement éclairées. Le refuge occupe le tiers droit, avec un banc et un sac à dos orange posé contre le mur. Derrière, un sentier en lacets qui descend vers la vallée, et des sommets enneigés teintés d'orange. Le tiers gauche est calme et peu détaillé (ciel chaud et pente douce) pour y mettre du texte. Pas de personnage. Même style peint, même palette, ciel plus chaud que l'après-midi.
```

### 4.10 Prompt 9 — `profil-crete.png`, la crête du parcours (fond transparent)

Images jointes (2 maximum) : `design/calques/02-mountains.png` et `design/parcours/refuge-fond.png`.

```
Format paysage 1536 × 1024, fond réellement transparent au-dessus de la montagne. Une seule longue crête de montagne vue de profil, qui monte régulièrement du coin inférieur gauche jusqu'au haut du bord droit, sur toute la largeur de l'image. La ligne de crête est continue, sans surplomb ni pic isolé, avec cinq petits replats doux régulièrement espacés (vers 10 %, 30 %, 50 %, 70 % et 90 % de la largeur). Au début de la crête, sur la gauche, elle est à environ 85 % de la hauteur ; à droite, elle arrive à environ 15 % de la hauteur. La végétation évolue avec l'altitude : prairie d'alpage fleurie à gauche, puis forêt de sapins, puis éboulis et rochers, puis neige près du sommet à droite. Lumière dorée de fin d'après-midi venant de la droite. La montagne remplit tout le bas de l'image jusqu'au bord inférieur. Aucun personnage, aucun sentier, aucun ciel, aucun nuage : tout ce qui est au-dessus de la crête est transparent. Même style peint, même palette.
```

Image testée puis abandonnée : une peinture détourée sur le fond crème flottait « au milieu de rien ». Le parcours est finalement un escalier de cartes reliées par le pointillé du sentier, chaque carte portant un élément peint.

---

## 5. Notes techniques utiles pour la suite

- **Conversion des images** : les PNG sources vont dans `design/`, et les WebP utilisés par le site dans `public/images/`. Chaque calque plein écran est décliné en 1280, 1920, 2560 et 3840 px (`<nom>-<largeur>.webp`) et servi via `srcSet` (`src/lib/responsiveImage.ts`). Les calques sont déclarés une seule fois dans `src/components/landscape/layers.ts`.
- **Découpage d'éléments multiples** (nuages, objets du sac) : une image contenant plusieurs éléments séparés est découpée automatiquement par zones transparentes, un fichier WebP par élément.
- **Superposition** : une scène = un fond opaque + un premier plan transparent au même cadrage, chacun avec sa profondeur de parallaxe (`data-parallax-depth`).
- **Transitions entre sections** : des lignes de crête tirées de la vraie silhouette des montagnes peintes (`src/components/decor/RidgeEdge.tsx`).
- **Bilingue** : chaque fichier de `src/content/` exporte `{ fr, en }`, où `en` est typé `typeof fr`. Les composants lisent le contenu avec `useLocalized(...)`.
- **Animations** : GSAP et ScrollTrigger, importés uniquement depuis `@/lib/gsap`, toujours dans `useGSAP`, avec une version sans mouvement quand « animations réduites » est activé.
