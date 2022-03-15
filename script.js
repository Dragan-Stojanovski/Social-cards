"use strict"
var mainContainer = document.querySelector(".main-container");
const loadMoreBtn = document.querySelector('.load-more')
loadMoreBtn.classList.add("btn")
let cards = []

function printCards(data) {
    data.forEach(el => {
        let likeNm = el.likes
        var divInsta=document.createElement("div");
        var div=document.createElement("div");
        var divName=document.createElement("div")
        var divProfileImg=document.createElement("div");
        var mainPhotoDiv=document.createElement("div");
        var likesDiv=document.createElement("div");
        var likesCounter=document.createElement("div");
        
        var profileImg=document.createElement("img");
        profileImg.src=el.profile_image;
        divProfileImg.appendChild(profileImg);
        
        var name=document.createElement("h3");
        name.textContent=el.name;
        divName.appendChild(name);
        
        var myDate = new Date(el.date);
        var output = myDate.getDate() + " " +  myDate.toLocaleString('default', { month: 'long' }) + " " + myDate.getFullYear();
        
        myDate.toLocaleString('it-IT', { month: 'long' })
        var date=document.createElement("p");
        date.textContent=output;
        divName.appendChild(date);
        
        let anchorTag = document.createElement("a")
        anchorTag.href = el.source_link
        anchorTag.target = "_blank"
        let instaIcon=document.createElement("img");
        instaIcon.src = el.source_type + "-logo.svg";
        anchorTag.appendChild(instaIcon)
        divInsta.appendChild(anchorTag);
        
        var mainPhoto=document.createElement("img");
        mainPhoto.src=el.image;
        mainPhotoDiv.appendChild(mainPhoto);
        var mainCaption=document.createElement("p");
        mainCaption.textContent=el.caption;
        mainPhotoDiv.appendChild(mainCaption);
        mainCaption.classList.add("post-img2")

        var likes=document.createElement("img");
        likes.src="heart.svg";
        likesDiv.appendChild(likes);
        
        var likesNumber=document.createElement("p");
        likesNumber.classList.add("changeNumber")
        likesNumber.textContent = likeNm;
        likesCounter.appendChild(likesNumber);
        
        divName.style.width="130px";
        divName.style.fontSize="80%"
        divName.style.float="left";
        divProfileImg.style.float="left";
        divInsta.style.float="right";
        
       
        
        mainPhoto.classList.add("post-img");
        
        div.classList.add("whole");
        mainPhotoDiv.style.paddingBottom="20px";
        
        likesDiv.classList.add("position")
        mainCaption.style.marginTop="20px";
        divName.style.marginTop="5%";
        divInsta.style.marginTop="5%";
        
        likes.classList.add("changeLikes");
        let isLiked = false
        likes.addEventListener("click",function(){
            let liked = likesNumber
            isLiked=!isLiked;
            if(isLiked){
                likes.style.backgroundColor="blue";
                liked.textContent = parseInt(liked.textContent) + 1
            }else{
                likes.style.backgroundColor="transparent";
                liked.textContent = parseInt(liked.textContent) - 1
            }
        })
        
        profileImg.classList.add("profile-pic");
        likesCounter.classList.add("position");
        likesCounter.classList.add("likes-counter");
      
        
        div.style.position="relative";
        
        div.appendChild(divProfileImg);
        div.appendChild(divName);
        
        div.appendChild(divInsta);
        div.appendChild(mainPhotoDiv);
        div.appendChild(likesDiv);
        div.appendChild(likesCounter);
        mainContainer.appendChild(div);
        
        
    })
}

fetch("data.json")
.then(res => res.json())
.then(function(data){
    printCards(data.slice(0, 4))
    cards = data.slice(4)
})

loadMoreBtn.addEventListener('click', function() {
    printCards(cards.splice(0, 4))
    if (cards.length <= 0) {
        loadMoreBtn.style.visibility = 'hidden'
    }
})
