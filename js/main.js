const nav = document.querySelectorAll('.nav-entry');
const slider = document.querySelector('.slider-entries');
const upButton = document.querySelector('.uplist').firstChild;
const downButton = document.querySelector('.downlist').firstChild;
const displayImage = document.querySelector('img');
const displayVideo = document.querySelector('video');
const opacityFilter = document.querySelector('.opacity-filter');
const credentials = document.querySelector('.credits');
const contactPage = document.querySelector('.contact')
let navSwitch = "works";


// -- xml file loader --

  // Create a connection to the file.
  const getXmlFile = new XMLHttpRequest();
  // Define which file to open and
  // send the request.
  getXmlFile.open("GET", "xml/projets.xml", false);
  getXmlFile.setRequestHeader("Content-Type", "text/xml");
  getXmlFile.send(null);
  // Place the response in an XML document.
  const xmlDoc = getXmlFile.responseXML;
  const worksData = xmlDoc.querySelector('works');
  const archivesData = xmlDoc.querySelector('archives');
  console.log(worksData, archivesData)


// -- nav behavior and slider fill --

  // reading passed data corresponding to xml structure file
  function fillSlider (xmlData) {
    let prevEntry;
    items = xmlData.querySelectorAll('item');
    for (let n = 0; n < items.length; n++) {
      const item = items[(items.length - 1) - n];
      const entry = document.createElement("div");
      const entryContent = document.createTextNode(item.getAttribute('name'));
      entry.appendChild(entryContent);
      entry.classList.add('slider-entry');
      if ((items.length - 1) - n > 8) {
        entry.classList.add('hidden');
        slider.insertBefore(entry, prevEntry);
      } else if (n > 0) {
        slider.insertBefore(entry, prevEntry);
      } else {
        slider.insertBefore(entry, null);
      }
      prevEntry = entry;
    }
  }

  // the function name is enough clear..
  function clearSlider() {
    const sliderEntries = slider.querySelectorAll('.slider-entry');
    for (let n = 0; n < sliderEntries.length; n++) {
      const entry = sliderEntries[n];
      entry.parentNode.removeChild(entry);
    }
  }


  // -- nav behavior --

  function fadeDisplay() {
    if (!opacityFilter.classList.contains('hidden')) {
      if (navSwitch === "contact") {
        displayVideo.pause();
        displayVideo.currentTime = 0;
        credentials.classList.remove('fade');
        // displayVideo.classList.remove('fade');
        displayVideo.classList.add('hidden');

        setTimeout(() => {
          credentials.classList.add('hidden');
        }, 10);

      } else if (!credentials.classList.contains('hidden')) {
        displayVideo.pause();
        displayVideo.currentTime = 0;
        opacityFilter.classList.remove('fadeFilter');
        credentials.classList.remove('fade');
        // displayVideo.classList.remove('fade');
        displayVideo.classList.add('hidden');

        setTimeout(() => {
         opacityFilter.classList.add('hidden');
        credentials.classList.add('hidden');

        }, 500);
      }
    }
  }

  opacityFilter.addEventListener('click', function() {
    fadeDisplay();
  });
  credentials.addEventListener('click', function() {
    fadeDisplay();
  });
  const header = document.querySelector('header');
  header.addEventListener('click', function() {
    fadeDisplay();
  });


  fillSlider(worksData);
  fillDisplay();
  for (let n = 0; n < nav.length; n++) {
    if (n === 0) {
      nav[n].addEventListener("click", function() {
        if (navSwitch !== "works") {
          if (navSwitch === "contact") {
            opacityFilter.classList.remove('fadeFilter');
            contactPage.classList.remove('fade');
            slider.parentElement.classList.remove('hidden');
            setTimeout(() => {
              opacityFilter.classList.add('hidden');
              contactPage.classList.add('hidden');
              slider.parentElement.classList.remove('fadeout');
            }, 10);
          }
          navSwitch = "works";
          clearSlider();
          fillSlider(worksData);
          fillDisplay();
    console.log(navSwitch)
  };
      });
    } else if (n === 1) {
      nav[n].addEventListener("click", function() {
        if (navSwitch !== "archives") {
          if (navSwitch === "contact") {
            opacityFilter.classList.remove('fadeFilter');
            contactPage.classList.remove('fade');
            slider.parentElement.classList.remove('hidden');
            setTimeout(() => {
              opacityFilter.classList.add('hidden');
              contactPage.classList.add('hidden');
              slider.parentElement.classList.remove('fadeout');
            }, 10);
          }
          navSwitch = "archives";
          clearSlider();
          fillSlider(archivesData);
          fillDisplay();
    console.log(navSwitch)
  };
      });
    }
      else if (n === 2){
        nav[n].addEventListener("click", function() {
          if (navSwitch !== "contact") {
            navSwitch = "contact"
            opacityFilter.classList.remove('hidden');
            contactPage.classList.remove('hidden');
            slider.parentElement.classList.add('fadeout');
            setTimeout(() => {
              opacityFilter.classList.add('fadeFilter');
              contactPage.classList.remove('fade');
              slider.parentElement.classList.add('hidden');
            }, 10);
    console.log(navSwitch)
  };
      });
  }

}

// -- displayfiller --
const credentialsContent = credentials.querySelectorAll('p');
console.log(credentialsContent)
function fillDisplay() {
  const sliderEntries = slider.querySelectorAll('.slider-entry'); 
  sliderEntries.forEach(entry => {
    //video launcher
    entry.addEventListener('click', function () {
      displayImage.classList.add('hidden');
      opacityFilter.classList.remove('hidden');
      credentials.classList.remove('hidden');
      setTimeout(() => {
        opacityFilter.classList.add('fadeFilter');
        // displayVideo.classList.add('fade');
        credentials.classList.add('fade');
        displayVideo.classList.remove('hidden');
      }, 10);


      if (navSwitch === "works") {
        displayVideo.setAttribute('src', `flv/${worksData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute('film')}`);
        displayVideo.autoplay = true;
        credentialsContent.forEach(element => {
          element.innerHTML =`${element.className}: ${worksData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute(element.className)}`;
        });
      }
      else if (navSwitch === "archives") {
        console.log(entry)
  
        displayVideo.setAttribute('src', `flv/${archivesData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute('film')}`);
        credentialsContent.forEach(element => {
          element.innerHTML = `${element.className}: ${archivesData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute(element.className)}`;
        });
      }
      displayVideo.autoplay = true;
      displayVideo.load(); 
    });

    //image preview
    entry.addEventListener('mouseover', function () {
      if (navSwitch === "works") {
        displayImage.classList.remove('hidden');
        displayImage.setAttribute('src', `images/${worksData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute('preview')}`);
      }
      else if (navSwitch === "archives") {
        displayImage.classList.remove('hidden');
        displayImage.setAttribute('src', `images/${archivesData.querySelector(`item[name="${entry.innerHTML}"]`).getAttribute('preview')}`);
      }
    });
    entry.addEventListener('mouseout', function () {
        displayImage.classList.add('hidden');
        displayImage.setAttribute('src', ``);
    });
  });
}

// -- Slider - up and down button behavior --

upButton.addEventListener('click', function () {
  const sliderEntries = slider.querySelectorAll('.slider-entry');
  if (sliderEntries[0].classList.contains('hidden')) {
    let prevEntry = 0; //must be not hidden
    sliderEntries
    for (let n = 0; sliderEntries[n].classList.contains('hidden'); n++) {
      const entry = sliderEntries[n];
      if (entry.classList.contains('hidden')) {
        prevEntry = n;
      }
    }
    sliderEntries[prevEntry].classList.remove('hidden');
    sliderEntries[prevEntry + 9].classList.add('hidden');
    if (prevEntry + 9 === 9)
      upButton.classList.add('unactive');
    else
      downButton.classList.remove('unactive');
  }
});
downButton.addEventListener('click', function () {
  const sliderEntries = slider.querySelectorAll('.slider-entry');
  if (sliderEntries[sliderEntries.length - 1].classList.contains('hidden')) {
    let prevEntry = 0; //must be not hidden
    for (let n = 0; !sliderEntries[n + 8].classList.contains('hidden'); n++) {
      const entry = sliderEntries[n];
      if (!entry.classList.contains('hidden') && sliderEntries[0].classList.contains('hidden') ) {
        prevEntry = n;
      }
    }
    console.log(prevEntry)
    sliderEntries[prevEntry].classList.add('hidden');
    sliderEntries[prevEntry + 9].classList.remove('hidden');
    if (prevEntry + 9 === sliderEntries.length - 1)
      downButton.classList.add('unactive');
    else
      upButton.classList.remove('unactive');
  }    
});