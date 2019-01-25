//how many list
const liNum = 10;
// let dataSet;
// connect to API and fetch data
const connectToAPIs = () => {
  fetch('https://demo.bonp.me/clients/aeon')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    // dataSet = data;
    drawList();
    getData(data);
  })
};

//retrieve img data and set it to img tags
function getData(data){
  //grab img tags and captions tags
  const imgs = document.querySelectorAll('.listItem .img');
  const formImg = document.querySelector('.listItem .formImg');
  const captions = document.querySelectorAll('.listItem .text');

  //iterate img tags to set different src and set it to attributes
  imgs.forEach( (img,index) => {

    //get random num between 0-19
    const random = Math.floor( Math.random() * 20 );

    //get src and title of img from data obj with random num
    const imgSrc = data[random].image;
    const capText = data[random].title;

    //set img attributes
    img.setAttribute('src', imgSrc);

    //replace caption text
    captions[index].innerHTML = capText;
  });

  //formImg
  const random = Math.floor( Math.random() * 20 );
  const formImgSrc = data[random].image;
  formImg.setAttribute('src',formImgSrc);

}

//draw ul for li and append it to #container
function drawList(){
  //draw li
  function list(num){

    //to make lists depending on num
    for (let i = 0; i < num; i++) {

      const li = document.createElement('li');
      li.classList.add('listItem');

      const img = document.createElement('img');
      img.classList.add('img');
      img.setAttribute('alt',`img${i}`);

      const div = document.createElement('div');
      div.classList.add('text');

      //append img and div to li
      li.appendChild(img);
      li.appendChild(div);
      //append li to ul
      ul.appendChild(li);
    }

  }

  const ul = document.createElement('ul');
  ul.classList.add('listItemContainer');

  list(liNum);

  //insert ul before formContainer
  const container = document.getElementById('container');
  const formContainer = document.getElementById('frmContainer');
  container.insertBefore(ul,formContainer);

} //drawList

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//to add a list as user enter
function add(){

  // -------------------------- Refactor needed --------------------
  const li = document.createElement('li');
  li.classList.add('listItem');

  const img = document.createElement('img');
  const imgSrc = document.querySelector('div.listItem.center .formImg').getAttribute('src');
  img.classList.add('img');
  img.setAttribute('alt','foodImg');
  img.setAttribute('src',imgSrc);

  const div = document.createElement('div');
  div.classList.add('text');
  div.innerHTML = desc;

  //append img and div to li
  li.appendChild(img);
  li.appendChild(div);

  //append li to ul
  document.getElementsByClassName('listItemContainer')[0].appendChild(li);
  // -------------------------- Refactor needed --------------------

  modal.style.display = "none";
}// add function

let desc;
//Add btn event listener
document.myForm.add.addEventListener('click', e => {

  desc = document.myForm.desc.value;

  if(desc === ""){
    alert('please fill in the description');
    e.preventDefault();
  }else{
    connectToAPIs();
    add();
  }

});

connectToAPIs();
