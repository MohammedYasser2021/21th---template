// settings box
let settingBtn = document.querySelector('.setting-btn')
let settingBtnIcon = document.querySelector('.setting-btn i')
let settingsBox = document.querySelector('.settings-box')

settingBtn.addEventListener('click', function () {
  settingsBox.classList.toggle('opened')
  settingBtnIcon.classList.toggle('fa-spin')
})

/* start navbar */
let bars = document.querySelectorAll('.bars')
let closeBtn = document.querySelectorAll('.close')
let links = document.querySelectorAll('.links')

// fixed navbar on scroll
$(function () {
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('.fixed-nav').slideDown(500)
      $('.fixed-nav').css('display', 'flex')
    } else {
      $('.fixed-nav').slideUp(500)
    }
  })
})

// display navbar on click on bars btn
bars.forEach((item) => {
  item.addEventListener('click', function () {
    links.forEach((ele) => {
      ele.style.transform = 'scale(1)'
    })
  })
})

// hide navbar on click on close btn
closeBtn.forEach((item) => {
  item.addEventListener('click', function () {
    links.forEach((ele) => {
      ele.style.transform = 'scale(0)'
    })
  })
})

// on click on escape key on keyboard close the navbar
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    links.forEach((ele) => {
      ele.style.transform = 'scale(0)'
    })
  }
})

// auto writing
let heading = document.querySelector('.intro-text')
let headingText = heading.dataset.text
let headingTextArr = Array.from(headingText)
let i = 0

const autoWriting = () => {
  heading.innerHTML += headingTextArr[i]
  i++
  if (i > headingTextArr.length) {
    heading.innerHTML = ''
    i = 0
  }
}

let writingInterval = setInterval(autoWriting, 300)

// switch colors
const colorsLi = document.querySelectorAll('.colors-list li')
let mainColors = localStorage.getItem('color-option')
// if local storge has color change --main-color to color that saved in local storage
if (mainColors) {
  // add color saved in local storage to --main-color in root
  document.documentElement.style.setProperty('--main-color', mainColors)

  // add class selected on li that his color is saved in local storage
  colorsLi.forEach((ele) => {
    if (ele.dataset.color === mainColors) {
      ele.classList.add('selected')
    }
  })
}
// on click on li
colorsLi.forEach((ele) => {
  ele.addEventListener('click', function (e) {
    // set color on root
    document.documentElement.style.setProperty(
      '--main-color',
      e.target.dataset.color,
    )

    // remove class selected from all lis and add class on clicked li
    colorsLi.forEach((el) => {
      el.classList.remove('selected')
    })
    e.target.classList.add('selected')

    // save color in local storage
    localStorage.setItem('color-option', e.target.dataset.color)
  })
})

// switch random backgrounds
const randomBackgroundsEle = document.querySelectorAll(
  '.random-background span',
)
let landingPage = document.querySelector('.landing-page')
// random background option
let randomBackgroundOption = true
// variable to control the interval
let backgroundInterval

if (localStorage.getItem('background-option') !== null) {
  if (localStorage.getItem('background-option') == 'true') {
    randomBackgroundOption = true
    randomizeImgs()
  } else {
    randomBackgroundOption = false
  }
}

// set class select on last clicked span before loading page
randomBackgroundsEle.forEach((item) => {
  if (
    item.dataset.background === localStorage.getItem('data-backgroundControl')
  ) {
    item.classList.add('select')
  }
})

// on click on span
randomBackgroundsEle.forEach((ele) => {
  ele.addEventListener('click', function (e) {
    // remove class select from all spans and add class select on clicked span
    randomBackgroundsEle.forEach((el) => {
      el.classList.remove('select')
    })
    e.target.classList.add('select')
    // save dataset of clicked span in local storage
    localStorage.setItem('data-backgroundControl', e.target.dataset.background)
    if (e.target.dataset.background === 'yes') {
      // set randomBackgroundOption false
      randomBackgroundOption = true
      // trigger function
      randomizeImgs()

      localStorage.setItem('background-option', true)
    } else {
      // set randomBackgroundOption false
      randomBackgroundOption = false
      // stop interval of random background change
      clearInterval(backgroundInterval)
      // set background of landing page is last img saved in local storage when click on no span
      landingPage.style.backgroundImage = `url(${localStorage.getItem(
        'background-img',
      )})`

      localStorage.setItem('background-option', false)
    }
  })
})
// change background image randomly

let imgsArr = [
  'images/header1.png',
  'images/header8.png',
  'images/header7.jpg',
  'images/header9.jpg',
  'images/header10.jpg',
  'images/header11.jpg',
]

// randomize img function
function randomizeImgs() {
  if (randomBackgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let indexRandom = Math.floor(Math.random() * imgsArr.length)
      let arrImage = imgsArr[indexRandom]
      landingPage.style.backgroundImage = `url(${arrImage})`
      localStorage.setItem('background-img', arrImage)
    }, 10000)
  }
}

// skills progress
let skillsSection = document.querySelector('.our-skills')
let progress = document.querySelectorAll('.progress')
window.addEventListener('scroll', function () {
  let skillsSectionOffset = skillsSection.offsetTop
  let windowHeight = this.innerHeight
  let windowScroll = this.scrollY
  let skillsHeight = skillsSection.offsetHeight

  if (windowScroll > skillsSectionOffset + skillsHeight - windowHeight) {
    progress.forEach((item) => {
      item.style.width = item.dataset.progress + '%'
    })
  } else {
    progress.forEach((item) => {
      item.style.width = 0
    })
  }
})

// gallery
// create popup with the image

let ourGallery = document.querySelectorAll('.gallery .images-box img')

ourGallery.forEach((img) => {
  img.addEventListener('click', function (e) {
    // create overlay element
    let overlay = document.createElement('div')

    // add class to overlay
    overlay.className = 'popup-overlay'

    // append the overlay to the body
    document.body.appendChild(overlay)

    // create the popup box
    let popupBox = document.createElement('div')

    // add class to the popup box
    popupBox.className = 'popup-box'

    // add alternate text
    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement('h3')

      // create the text of heading
      let imgHeadingText = document.createTextNode(img.alt)

      // append text to the heading
      imgHeading.appendChild(imgHeadingText)

      // append the heading to the popup box
      popupBox.appendChild(imgHeading)
    }

    // create the image
    let thePopupImage = document.createElement('img')

    // change src of image to the src of the clicked image
    thePopupImage.src = img.src

    // add image to popup box
    popupBox.appendChild(thePopupImage)

    // append the popup box to body
    document.body.appendChild(popupBox)

    // create close span
    let spanClose = document.createElement('span')

    // add classname to close span
    spanClose.className = 'popup-close'

    // create close icon
    let spanCloseIcon = document.createElement('i')
    spanCloseIcon.className = 'fa fa-times'

    // append spanCloseIcon to spanClose
    spanClose.appendChild(spanCloseIcon)

    // append close span to popup box
    popupBox.appendChild(spanClose)

    // on click on span close
    spanClose.addEventListener('click', function () {
      // remove popup box and popup overlay
      popupBox.remove()
      overlay.remove()
    })

    // on click on escape key on keyboard close the popupBox and overlay
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        popupBox.remove()
        overlay.remove()
      }
    })
  })
})

// navigation bullets
let allBullets = document.querySelectorAll('.nav-bullets .bullet')

// loop on bullets
allBullets.forEach((bullet) => {
  bullet.addEventListener('click', function (e) {
    document.querySelector(e.target.dataset.scroll).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// scroll to sections by links
let allLinks = document.querySelectorAll('.links li a')

// loop on links
allLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    allLinks.forEach((ele) => {
      ele.classList.remove('active')
    })
    link.classList.add('active')
    document.querySelector(e.target.dataset.scroll).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// add class active to main links in reach landing page
let mainLinks = document.querySelectorAll('.main-link')
let homePage = document.querySelector('.landing-page')
window.addEventListener('scroll', function () {
  if (this.scrollY <= homePage.offsetTop) {
    allLinks.forEach((el) => {
      el.classList.remove('active')
    })
    mainLinks.forEach((ele) => {
      ele.classList.add('active')
    })
  }
})

// bullets option
let bulletsSpan = document.querySelectorAll('.bullets-option span')
let bulletsContainer = document.querySelector('.nav-bullets')

let bulletLocalItem = localStorage.getItem('bullets-option')

if (bulletLocalItem) {
  bulletsSpan.forEach((span) => {
    span.classList.remove('select')
  })
  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block'
    document.querySelector('.bullets-option .yes').classList.add('select')
  } else {
    bulletsContainer.style.display = 'none'
    document.querySelector('.bullets-option .no').classList.add('select')
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener('click', function () {
    bulletsSpan.forEach((item) => {
      item.classList.remove('select')
    })
    span.classList.add('select')
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block'
      localStorage.setItem('bullets-option', 'block')
    } else {
      bulletsContainer.style.display = 'none'
      localStorage.setItem('bullets-option', 'none')
    }
  })
})

// reset button

let resetBtn = document.querySelector('.reset')

resetBtn.addEventListener('click', function () {
  localStorage.clear()
  window.location.reload()
  document.querySelector('.random-background .no').classList.add('select')
})

// scroll to top

// show span
let scrollBtn = document.querySelector('.scroll-to-top')

window.addEventListener('scroll', function () {
  this.scrollY >= 200
    ? (scrollBtn.style.right = '15px')
    : (scrollBtn.style.right = '-60px')
})

// on click on span scroll to top
scrollBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})
