# Minuteur — plugin NeoBase

Un minuteur simple pour NeoBase : choisis une durée, démarre, et NeoBase te prévient à la fin. Il
retient ta dernière durée.

C'est aussi un exemple de plugin NeoBase entièrement autonome : il ne demande que la permission
`storage` et tourne dans le bac à sable, sans accès au reste de NeoBase.

## Installer

Dans NeoBase : **NeoStore → À découvrir → Minuteur → Installer**. NeoStore trouve ce dépôt grâce au
topic `neobase-plugin` et télécharge l'archive de la dernière Release.

## Développer

Voir le [SDK des plugins NeoBase](https://github.com/NDesumeur/neobase-sdk). Le format est dans
[`plugin.json`](plugin.json), le code dans [`index.js`](index.js).
