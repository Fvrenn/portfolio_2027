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

### 2. Page projet `/projets/:nom` — « La halte »

Ouvrir un projet, c'est **quitter le sentier pour une pause** : on s'assoit sur un rocher, on pose le sac, on sort les jumelles et on observe le paysage. Le projet, c'est ce paysage. **Une seule scène peinte commune aux 3 projets** ; seul le contenu change.

Règle de la stratégie (§3.1, §4) : le résumé est lisible tout de suite, sans scroller ni attendre une animation ; les animations racontent autour, elles ne cachent rien.

| # | Moment | Contenu | Animation / interaction |
|---|---|---|---|
| 1 | On s'arrête | **Fiche d'observation** : nom, problème et pour qui en une phrase, rôle, durée, résultat principal, « Essayer » / « Voir le code » | Sur ordinateur, les étapes 1 à 3 sont **une seule scène épinglée** sur le même panorama |
| 2 | La brume | **Le problème** | La brume monte dans la vallée puis se dissipe |
| 3 | Les jumelles | **Ce que j'ai construit** (fonctionnalités clés) | Le personnage s'efface, la vue s'assombrit, les jumelles suivent la souris ; le scroll passe d'un repère à l'autre et la carte affiche la capture de chaque fonctionnalité |
| 3 bis | Les clichés | **Galerie de captures** (ordinateur et mobile) | Défilement horizontal épinglé sur ordinateur, glissement au doigt sur mobile |
| 4 | Le carnet de terrain | **2 ou 3 décisions et leur pourquoi** | Pages du carnet qui se tournent au scroll |
| 5 | Essayer | **Démo interactive** (clone du projet) | « Prendre les jumelles » ouvre la démo en grand dans la page |
| 6 | Les relevés | **Le résultat** (chiffres réels) | Chiffres qui défilent comme l'altimètre |
| 7-8 | Le soleil baisse, on reprend la route | **Ce que j'ai appris**, stack, carte « Prochaine étape » | Une seule scène du soir : le ciel doré se fond dans le panorama réchauffé, le personnage debout repart |

**Faune cachée** (chamois sur l'arête de la cascade, marmotte dans le pré du hameau, aigle qui tourne dans le ciel) : visible **uniquement à travers les jumelles**, à découvrir en les promenant sur le paysage. Positions dans `components/halte/landmarks.ts`. L'aigle est immobile en mouvement réduit.

**Altimètre** : présent aussi sur la page projet ; il monte de l'altitude du projet (`altitudeM` dans `content/projects.ts`) jusqu'au belvédère (+ 120 m).

**Démo du clone** : site statique autonome avec données inventées (aucune donnée réelle), servi depuis le portfolio (`/demos/<projet>/`) dans une iframe chargée au clic, avec capture et vidéo courte avant le clic, bouton « Réinitialiser », plein écran sur mobile.

**Par projet** : captures 1440 × 900, vidéo de 20 à 30 s (enregistrement d'écran muet en boucle), croquis de décisions en option.

### 3. À propos `/a-propos` — « Le camp de base »

Le camp d'où l'on part et où l'on revient : pour la première fois, on voit Timothé **de face**. Altimètre de 980 m (parking) à 1 050 m (le camp).

| # | Moment | Contenu | Mise en scène |
|---|---|---|---|
| 1 | On arrive au camp | Accroche « Au collège, je créais des visuels et je montais des vidéos pour des youtubeurs. Aujourd'hui, je crée des produits. » + bio courte | Camp peint, personnage assis de face avec une tasse, carte de texte à gauche |
| 2 | Le fil à linge | 6 vraies photos (fun, naturelles) en polaroïd | Les photos tombent sur la corde au scroll puis se balancent |
| 3 | La carte punaisée | D'où je viens : collège, seconde, BUT MMI, Trialog + Efrei ; lien vers le parcours détaillé de l'accueil | Fil rouge qui se tend de punaise en punaise au scroll |
| 4 | Les écussons | Le scoutisme en 6 compétences, chacune avec sa preuve | Les écussons viennent se coudre sur le foulard |
| 5 | En ce moment au camp | La dernière expédition (Mont Buet) avec chiffres, + 4 petites cartes perso | Les cartes, empilées, s'étalent sur la table de camp au scroll |
| 6 | Prochain départ | Ce que je recherche, contact, projets | Dégradé de lever de soleil |

Contenu dans `src/content/about.ts` (textes guides entre crochets à remplacer), images dans `public/images/about/`.

## Éléments transverses

- **Navigation** : pilule flottante (initiale ou photo, liens, bouton « Me contacter »).
- **Boussole = navigation** : un clic sur l'étiquette mène à la section indiquée.
- **Altimètre** : progression de la page.
- **Curseur GPS** : point bleu « Vous êtes ici » avec halo qui suit ; orange et agrandi au survol d'un élément cliquable, avec une étiquette quand l'élément porte `data-cursor-label`. Souris uniquement, curseur normal dans les champs de texte et quand la démo est ouverte.
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
- [x] Routeur (React Router 7, mode déclaratif)
- [x] Pages projet « La halte » (scène commune, démo intégrée) — structure et animations faites, contenus à remplir
- [x] Page À propos « Le camp de base » — structure et animations faites, photos et textes à fournir
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
