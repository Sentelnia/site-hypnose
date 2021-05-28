document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);



//creation d'une div ou taper son mdp pour valider les chagements du profil.
const $editProfilDiv = document.querySelector('#edit_profil')
const $button = document.querySelector('#buttonEdit')
const $edit = document.querySelector("#edit")
const $confirmMdp = document.createElement('label');
const $champMdp = document.createElement('input');
const $buttonValid = document.createElement('button');



$champMdp.name = 'password'
$champMdp.type = 'password'
$confirmMdp.innerHTML = 'Veuillez tapez votre Mot de passe pour éditer vos infos perso'
$buttonValid.innerHTML = 'Editer mes infos perso'


// ajout du label mdp dans le form
$button.addEventListener("click", () => {
  $edit.appendChild($confirmMdp)
  $confirmMdp.appendChild($champMdp)
  $edit.appendChild($buttonValid)
  $editProfilDiv.removeChild($button)
})