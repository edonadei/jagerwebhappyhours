# Synopsis - Jäger

## Notice d'installation

- Installer Node.Js pour votre OS 
- Installer MongoDB pour votre OS
- Cloner/Télécharger le repo
- Lancer Launch mongoDB.bat
- Lancer en invite de commandes app.js
- Dans votre navigateur, accédez à l'application à l'url locale: http://localhost:8080/ 

## Analyser

**Problématique:** Les boutiques ont toutes des périodes &quot;creuses&quot; leur faisant perdre du chiffre, car les frais salariaux et administratifs restent les mêmes selon chaque heure de la journée, alors que les rentrées non. Cela correspond souvent aux périodes moins fréquentées (matinées, jour de la semaine,etc… ). Mais aussi simplement pour faire un coup de pub à son activité.

**Sous-problèmes:**

- Problème de légalité de l&#39;offre
  - Peut on proposer n&#39;importe quelle promotion ?
  - Durant n&#39;importe quelle période de l&#39;année
- Problème de rentabilité par rapport à la promotion
  - Suffisamment de ventes pour égaler une période pleine ?
  - Promotion suffisante pour attirer du public ?
- Problème d&#39;adaptabilité par rapport au secteur d&#39;activité
  - Promotions différentes selon le secteur
  - Système de promotion horaire curieux
- Public suffisant pour remplir des &quot;happy hours&quot;
  - Cible locale avant tout, pas de possibilité de prévoir son déplacement
  - Cible jeune pour commencer
  - Réduit beaucoup le nombre de prospects intéressés

**Solution:** Étendre le concept de &quot;happy hours&quot; des bars à toutes les boutiques, en adaptant au mieux les solutions à chaque type de commerce

1. Se renseigner sur la possibilité légale de faire cette offre
2. Calcul d&#39;exemple sur une possible rentabilité en fonction des premiers publics, éventuel business plan pour démontrer une rentabilité sous 1,2 ou 3 ans
3. Entretiens et pourparlers avec entreprise pour discuter de la possibilité et du véritable intérêt de l&#39;offre pour eux
4. Besoin de communication progressive et locale, création de supports de communication pour les boutiques directement

**Solution apportée par une application:** Facile et rapide d&#39;utilisation, fait écho à l&#39;émergence de nombreux sites comme Loisirs-enchères et Dealabs. Les gens étant capable de sacrifier 30s de monitoring pour faire des économies sur plusieurs sujets. Ils aiment avoir l&#39;exclusivité sur une promotion, cela permettant de les valoriser. Le côté fun et &quot;chasse au trésor&quot; et aussi à mettre en avant, car cela demande un travail (minime) pour obtenir son prix, nous souhaitons donc rendre ludique et faire rejoindre les intérêts des consommateurs et des professionnels.

**But** : Jäger a pour but de mettre en relation des personnes cherchant des offres et des boutiques. Pour cela, nous allons utiliser la géolocalisation des utilisateurs pour leur afficher des offres au plus proche d&#39;eux. L&#39;application et le site regrouperont un interface permettant aux professionnelles d&#39;ajouter leur magasin, leur offre, les possibles réductions à certains horaires ou leur clientèle est plus faible. Les particuliers, eux, pourront rechercher les offres proposées en fonction de leur géolocalisation. Le but final du projet sera de réduire les dépenses que les consommateurs peuvent faire dans la vie de tous les jours mais aussi de combler le planning des entreprises.

Prenons l&#39;exemple d&#39;un coiffeur, il a forcément à un moment de la semaine où son planning aura des trous par manque de clientèle. Grâce à Jäger, il pourra alors proposer une petite réduction sur la coupe qu&#39;il effectue à ce moment là. Pour le coiffeur, c&#39;est une occasion de ne pas perdre son temps dans sa boutique et pour l&#39;utilisateur du service, qui était disponible à certains horaires, c&#39;est l&#39;occasion d&#39;avoir une réduction. Que ce soit dans le cas du particulier ou du professionnel les deux sont gagnants, c&#39;est le but principal du projet.

**Format:** Site web

## Planifier

**Départ officiel du travail** : **Février**

**Phase d&#39;apprentissage** : (Mois de Février)

- HTML/CSS/Bootstrap
- Javascript
- Node.Js
- MongoDB
- React
- Créations de projets intermédiaires d&#39;apprentissage
  - Agar.io
  - Système de cartographie

**Phase de prototypage:** (Mois de mars)

Construction d&#39;une première solution type

- Faire tester à des utilisateurs pour vérifier problèmes
- Développer les fonctionnalités
- Travailler le design de l&#39;application

**Phase de production:** (Mois d&#39;avril)

Test unitaire des fonctions

Passage sur docker pour lancement sur machine debian automatique

## Définir un prototype initial

Voici, le prototype de la page d&#39;accueil de notre site. Il est composé dans la bande supérieur, qu&#39;une possibilité de connexion et donc implicitement d&#39;inscription. L&#39;inscription permet à la fois à l&#39;utilisateur, de plus facilement parcourir notre page et d&#39;avoir de nombreuses fonctionnalités, mais aussi pour nous propriétaire du site de fidéliser le client.

Plus bas, vous avez la possibilité de rechercher un magasin ou un service pour affiner votre recherche. Les nombreuses fenêtres représentées permettent à l&#39;utilisateur de voir les offres attractives près de lui. Pour finir, nous serons très présent sur les réseaux sociaux car pour l&#39;équipe Jäger, c&#39;est par ce moyen là que l&#39;on peut plus facilement se faire connaître si notre projet est intéressant pour tout le monde.

Un très gros point fort de notre projet, c&#39;est la carte interactive ! Sur cette carte, vous pourrez y retrouver votre position, le cercle rouge, ainsi que les magasins proposant des offres. Lorsque vous cliquerez sur un magasin des informations importantes apparaîtront comme les horaires de l&#39;happy hour ou encore le tarif proposé.