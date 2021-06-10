document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//-------------------EDITION DES INFOS PERSOS DANS LE DASHBOARD---------------------//

//creation d'une div ou taper son mdp pour valider les chagements du profil.
const $editProfilDiv = document.querySelector('#edit_profil')
const $button = document.querySelector('#buttonEdit')
const $edit = document.querySelector("#edit")
const $confirmMdp = document.createElement('label');
const $h2 = document.createElement('h2');
const $p = document.createElement('p');
const $champMdp = document.createElement('input');
const $buttonValid = document.createElement('button');

$buttonValid.setAttribute("id", "confirm-button")
$champMdp.required = true;


$champMdp.name = 'password'
$champMdp.type = 'password'
$h2.innerHTML = 'Mot de passe'
$p.innerHTML = 'Veuillez entrer votre mot de passe pour enregistrer vos modifications'
$buttonValid.innerHTML = 'Confirmer les modifications'


// ajout du label mdp dans le form, ajout du boutton dans le form pour valider le changement des infos perso
$button.addEventListener("click", () => {
  $edit.appendChild($confirmMdp)
  $confirmMdp.appendChild($h2)
  $confirmMdp.appendChild($p)
  $confirmMdp.appendChild($champMdp)
  $edit.appendChild($buttonValid)
  $editProfilDiv.removeChild($button)
})