# Plan du site

Feuille de route du portfolio. Le **pourquoi** (public, messages, à faire / à éviter) est dans `STRATEGIE-PORTFOLIO.md`, le **comment coder** dans `GUIDE-CODE-PROPRE.md`.

Inspiration : la structure du site de Zainab Kabira (hero → preuves → études de cas → à propos). On reprend des **mécanismes**, jamais ses contenus, ses visuels ni ses textes. Le fil conducteur ici est **l'ascension** : le visiteur monte, l'altimètre suit, la page se termine au sommet (le contact).

---

## Pages

### 1. Accueil `/` — l'ascension

| # | Section | Rôle | Éléments marquants |
|---|---|---|---|
| 1 | **Hero** | Accroche mémorable | Paysage peint en parallaxe, titre roulant, boussole-navigation, altimètre (existant, retravaillé plus tard) |
| 2 | **Le départ** (approche) | Me situer en 30 s | Une phrase forte révélée mot par mot au scroll, fond de courbes de niveau |
| 3 | **Le sentier** (projets) | Preuves principales | Carte topographique moderne générée (forêts, lacs, courbes, quadrillage, nord, échelle), itinéraire orange qui se trace au scroll avec un point GPS « Vous êtes ici », chaque projet = vraie capture dans un cadre de navigateur + problème → résultat |
| 4 | **Le sac** (méthode) | Jugement et façon de travailler | Section épinglée : à chaque palier de scroll un objet (carte, corde, frontale, tente) tombe dans mon sac et son principe s'affiche ; le sac se ferme à la fin. Statique sur mobile et en mouvement réduit |
| 5 | **Carnet de route** (témoignages) | Preuve sociale | **Uniquement avec de vraies citations**, sinon la section n'existe pas |
| 6 | **Le sommet** (contact) | Conversion | Ciel de fin de journée, ce que je recherche, liens, CV ; l'altimètre arrive en haut |

### 2. Page projet `/projets/:nom` — fiche d'itinéraire

En-tête avec un **profil d'altitude** du projet : le temps en abscisse, la difficulté en ordonnée, et des repères pour les étapes clés. Ensuite, dans l'ordre de `STRATEGIE-PORTFOLIO.md` §3.1 : le problème et pour qui → mon rôle → 2 ou 3 décisions et leur pourquoi → le résultat → ce que j'ai appris → la stack, puis une carte « Prochaine étape » vers le projet suivant.

### 3. À propos `/a-propos`

- **Parcours** : carte topographique de l'itinéraire (formation et expériences), chaque étape orientée vers ce que j'y ai appris ou apporté.
- **Hors code** : montagne et scoutisme, présentés comme des compétences (encadrement, organisation, autonomie).
- **Terrain de jeu** (optionnel) : les expériences techniques du site (boussole, générateur de courbes de niveau…).

## Éléments transverses

- **Navigation** : pilule flottante (initiale ou photo, liens, bouton « Me contacter »).
- **Boussole = navigation** : un clic sur l'étiquette mène à la section indiquée.
- **Altimètre** : progression de la page.
- **Transition entre pages** : les nuages crème se ferment puis s'ouvrent.
- **Mode nuit** : lune et étoiles à la place du soleil, calques de nuit.
- **Loader** : compteur d'altitude, très court.
- **Pied de page** : signature, liens, mention du code public.

## Phases

### Phase 1 — l'essentiel pour postuler *(en cours)*
- [x] Navigation flottante + pied de page
- [x] Section « Le départ » (approche)
- [x] Section « Le sentier » (projets) avec tracé animé
- [x] Section « Le sac » (méthode)
- [x] Section « Le sommet » (contact)
- [x] Boussole cliquable vers les sections
- [ ] Contenus réels fournis par Timothé (projets, recherche, liens) — les textes actuels sont des exemples

### Phase 2 — profondeur
- [ ] Routeur (React Router) — change la règle « pas de routeur » de `CLAUDE.md`
- [ ] Pages projet (fiche d'itinéraire + profil d'altitude)
- [ ] Page À propos
- [ ] Section « Carnet de route » si témoignages

### Phase 3 — finitions
- [ ] Mode nuit
- [ ] Transition nuages entre pages
- [ ] Loader altimètre
- [ ] Terrain de jeu

## Transitions entre sections

Chaque section commence par une **ligne de crête en deux plans** (`components/decor/RidgeEdge.tsx`) tracée à partir de la silhouette réelle du calque de montagnes peint (`ridgeProfile.ts`, extraite une fois). Chaque passage utilise une fenêtre différente du profil pour ne pas répéter la même forme. Pas de nuages vectoriels.

## Palette

Pas de brun ni d'effet vieilli dans les sections : fond blanc cassé neutre, carte en bleu-gris / vert doux / bleu lac, accent **orange vif** (`--color-trail`) pour l'itinéraire et les repères, bleu GPS pour la position. Le laiton reste réservé à la boussole du hero (objet).

## Images à générer plus tard

Même méthode que le hero : même style peint (gouache, grain, palette du site), fond transparent quand c'est un élément, puis agrandissement ×5 « high-fidelity ». Les sources vont dans `design/`.

| Image | Où | Remarques |
|---|---|---|
| Ciel de coucher de soleil + silhouette de sommets | Section « Le sommet » | Mêmes montagnes que le hero, lumière orangée / rose |
| Calques de nuit (ciel étoilé, montagnes et forêt de nuit) | Mode nuit | Même cadrage exact que les calques de jour |
| Portrait peint de dos ou de trois quarts | Navigation / À propos | À partir d'une photo de référence |
| Carte topographique peinte | À propos (parcours) | Fond pour l'itinéraire |

---

## Branche `parcours` — une journée d'ascension

Idée : le visiteur suit **une journée de randonnée**. Chaque section est un **lieu** et une **heure** ; le randonneur (Timothé) avance d'une scène à l'autre, le ciel change, l'altimètre monte. La branche `main` garde la version précédente.

| Heure | Lieu | Section | Contenu |
|---|---|---|---|
| Matin | Le belvédère | Hero | Identité (existant) |
| Matin | Le départ | Approche | Phrase « créateur de produits » (existant) |
| Midi | Le sentier | Projets | Carte topo ; le point GPS devient un petit randonneur peint qui marche le long de l'itinéraire |
| Après-midi | Le col | Le sac (méthode) | Fond peint d'un col au soleil d'après-midi, le sac posé dans l'herbe ; 5ᵉ objet : les pochettes de rangement = **un code rangé** |
| Fin d'après-midi | Le refuge | Parcours | Escalier de 5 cartes reliées par le sentier au scroll, chacune portant un élément peint : 4 ans chez Trialog en 5 paliers (2 stages, 3 ans d'alternance), formation en parallèle (BUT MMI, mastère Efrei), scoutisme présenté comme des compétences |
| Nuit | Le bivouac | Équipement (stack) + Carnet de bord (qualité du code) | Feu de camp, tente éclairée, étoiles, lumière tamisée. Stack concrète groupée par usage ; carnet de bord = arborescence réelle du projet + pratiques de qualité vérifiables |
| Aube | Le sommet | Contact | Lever de soleil sur une mer de nuages, randonneur au sommet ; « Et si la prochaine étape, on la faisait ensemble ? » |

### Stack : règles

- Pas de barres en %, pas de « niveaux » inventés. Groupes par **usage réel** : « Au quotidien », « Je m'en sers en projet », « En exploration ».
- Chaque outil = logo + nom ; au survol, **où je l'ai utilisé** (lien vers le projet).
- Données dans `src/content/stack.ts` (bilingue), une seule source.

### Qualité du code : la montrer, pas la dire

- Carnet de bord : l'arborescence `src/` de ce site, animée, chaque dossier avec son rôle (contenu / composants / hooks / lib).
- Preuves vérifiables : TypeScript strict, guide de code écrit, lint + format, tests des fonctions pures, CI qui bloque si le build casse, lien vers le dépôt.
