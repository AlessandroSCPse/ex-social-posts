const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "06-25-2021"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "09-03-2021"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "05-15-2021"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "04-03-2021"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "03-05-2021"
    }
];

drawAllPosts(posts);

// ----------------
// EVENTE LISTENERS
// ----------------
const allLikeButtons = document.querySelectorAll('.js-like-button');
const allLikeCounters = document.querySelectorAll('.js-likes-counter');
for(let i = 0; i < allLikeButtons.length; i++) {
    const thisLikeButton = allLikeButtons[i];
    // Al click sul tasto Mi piace
    thisLikeButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        // prendere il counter relativo al mi piace 
        // che è stato cliccato
        // il counter sarà l'elemento in allLikeCounters[i]
        const relatedCounter = allLikeCounters[i];

        // Leggo il numero nel counter relativo
        let relatedCounterNumber = parseInt(relatedCounter.innerHTML);

        // Aggiungi il like solo se l'elemento
        // su cui si è cliccato non ha già il like
        if(!this.classList.contains('like-button--liked')) {
            // aggiungere la classe like-button--liked 
            // sull'elemento cliccato (this)
            this.classList.add('like-button--liked');

            // lo incremento di 1
            relatedCounterNumber++;

            // stampo il nuovo numero dentro il counter relativo
            relatedCounter.innerHTML = relatedCounterNumber;
        } else {
            // rimuovere la classe like-button--liked 
            // sull'elemento cliccato (this)
            this.classList.remove('like-button--liked');

            // lo decremento di 1
            relatedCounterNumber--;

            // stampo il nuovo numero dentro il counter relativo
            relatedCounter.innerHTML = relatedCounterNumber;
        }
    }); 
}

// ----------------
// FUNCTIONS
// ----------------

// Funzione che stampa in pagina tutti i post
// postsArray -> array di post
function drawAllPosts(postsArray) {
    const postsList = document.querySelector('.posts-list');

    // Scorriamo tutti i post
    for(let i = 0; i < postsArray.length; i++) {
        const thisPost = postsArray[i];
        const {id, content, media, author, likes, created} = thisPost;
        
        // Per ogni post creo il template e lo aggiungo
        // a posts-list
        const postHtmlTemplate = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${author.image ? getProfilePictureImg(author) : getProfileDefaultInitials(author)}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${translateDate(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
        `;

        postsList.innerHTML += postHtmlTemplate;
    }
}

// Accetta una data in formato americano e torna la data tradotta in formato italiano
// americanDate -> stringa che rappresenta una data in formato americano (mm-dd-yyyy)
// return: stringa con americanDate tradotta in formato italiano (dd/mm/yyyy)
function translateDate(americanDate) {
    // Trasformare americanDate in un array utilizzando split
    const dateArray = americanDate.split('-');
    const [month, day, year] = dateArray;

    // ricostruisco la stringa della data in formato italiano
    return `${day}/${month}/${year}`;
}

function getProfilePictureImg(authorInfo) {
    return `<img class="profile-pic" src="${authorInfo.image}" alt="${authorInfo.name}">`;
}

function getProfileDefaultInitials(authorInfo) {
    const authorNameArray = authorInfo.name.split(' ');
    const [name, lastname] = authorNameArray;
    return `<div class="profile-pic-default"><span>${name[0] + lastname[0]}</span></div>`;
}