const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'eHJklaqVM3wbhhDc6HDy62NJ6HO4ApNOzvqs-cEkAog';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/*
// Create Elements for links & photos, Add to the DOM
function displayPhotos() {
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		item.setAttribute('href', photo.link.html);
		item.setAttribute('target', '_blank');
		item.setAttribute('rel', 'noreferrer');
		// Create ,img. for photo
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);
		// Put <img> inside <a>, then put both inside the imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}
*/

// Check if all images were loaded
function imageLoaded () {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
		apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	}

}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
			rel: 'noreferrer',
		});
		// Create ,img. for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, then put both inside the imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch errors
	}
}

// Check to see if scrooling near botton of the page, Load more photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();