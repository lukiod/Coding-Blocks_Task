// *********  DATA ********** //
const data = [
  {
    videoId: 'bUZgmUXMUw4',
    title: 'Bhailang',
    category: 'javascript',
    favorite: true,
  },
  {
    videoId: 'g9b7x2g9cJk',
    title: 'fullstack roadmap',
    category: 'html',
    favorite: false,
  },
  
  {
    videoId: 'XXYlFuWEuKI',
    title: 'weekend music',
    category: 'music',
    favorite: false,
  },
  {
    videoId: 'hMQCVMh4Aig',
    title: 'Life at Park+',
    category: 'javascript',
    favorite: true,
  },
  
  

];

// *********  UTILITY FUNCTIONS  ********* //
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

// *********  HTML COMPONENT FUNCTIONS  ********* //
// Add Video Button / Modal
// https://getbootstrap.com/docs/5.0/components/modal/#live-demo
const videoBtnModal = () => {
  const domString = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-video">
    Add Video
    </button>

    <!-- Modal -->
    <div class="modal fade" id="add-video" tabindex="-1" aria-labelledby="add-video" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Video</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
          <form>
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Video ID" id="videoId" aria-label="video id" required>
            <label for="videoId">YouTube Video ID</label>
          </div>
      
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Title" id="title" aria-label="title" required>
            <label for="title">Title</label>
          </div>
      
          <div class="form-floating mb-3">
            <select class="form-select form-control-lg" id="category" aria-label="category" required>
              <option value="">Select a category</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="music">Music</option>
            </select>
            <label for="category">Category</label>
          </div>
          
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="favorite">
            <label class="form-check-label" for="favorite">
              Favorite
            </label>
          </div>
      
          <button 
            type="submit" 
            class="btn btn-success" 
          >
            Submit
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  `;
  renderToDom('#createBtnContainer', domString);
};

// Video component with default arg value
const videoPlayer = (videoId = 'g9b7x2g9cJk') => {
  const domString = `
  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
  renderToDom('#videoPlayer', domString);
};

// Filter Button Row
const filterButtons = () => {
  let domString = `
  <div class="d-flex flex-wrap justify-content-between my-3">
    <button class="btn btn-secondary btn-lg buttonRow" id="music">Music</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="javascript">Javascript</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="css">CSS</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="html">HTML</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="favorite">Favorites</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="clear">Clear Filter</button>
  </div>
  `;
  renderToDom('#filterContainer', domString);
};

// Cards
const cardsOnDom = (array) => {
  let domString = '';
  for (const item of array) {
    domString += `
    <div class="mb-3 d-flex align-items-center" style="background: white; padding: 20px; border: 1px solid black; border-radius: 10px;">
    <div class="flex-shrink-0">
      <img src="./assets/images/${item.category}.png" style="width: 120px; height: 120px; border-radius: 20px;" alt="${item.category} icon">
    </div>
    <div class="flex-grow-1 ms-3">
      <h2 style="font-size: 24px; font-weight: bold; padding: 0px; margin: 0px">${item.favorite ? '⭐' : ''} ${item.title}</h2>
      <p><b>Category:</b> ${item.category.toUpperCase()}</p>
      <button class="btn btn-dark" id="watch--${item.videoId}">Watch Video</button>
    </div>
    <div>
      <button class="btn btn-danger" id="delete--${item.videoId}">X</button>
    </div>
  </div>
    `;
  }
  renderToDom('#cardContainer', domString);
};

// *********  EVENT LISTENERS  *********  //
const eventListeners = () => {
  // Bootstrap for grabbing modal so can manually open and close
  const formModal = new bootstrap.Modal(document.querySelector('#add-video'));
  
  // FILTER BUTTON ROW
  document.querySelector('#filterContainer').addEventListener('click', (e) => {
    // filter on category (either use .filter or a loop)
    // rerender DOM with new array (use the cardsOnDom function)
    if (e.target.id === 'clear') {
      cardsOnDom(data);
    } else if (e.target.id === 'favorite') {
      cardsOnDom(data.filter((vid) => vid.favorite));
    } else if (e.target.id) {
      cardsOnDom(data.filter((vid) => vid.category === e.target.id));
    }
  });

  // BUTTONS ON CARDS
  document.querySelector('#cardContainer').addEventListener('click', (e) => {
    // check to make sure e.target.id is not empty
    if (e.target.id) {
      const [, videoId] = e.target.id.split('--');
      const index = data.findIndex((vid) => vid.videoId === videoId);

      // only listen for events with "watch" or "delete" included in the string

      // if watch: grab the ID and rerender the videoPlayer with that ID as an argument
      if (e.target.id.includes('watch')) {
        videoPlayer(data[index].videoId);
        document.location = '#';
      }

      // if delete: find the index of item in array and splice
      // NOTE: if 2 videos have the same videoId, this will delete the first one in the array
      if (e.target.id.includes('delete')) {
        data.splice(index, 1);
        // rerender DOM with updated data array (use the cardsOnDom function)
        cardsOnDom(data);
      }
    }
  });

  // FORM SUBMIT
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // this goes in EVERY form submit to prevent page reload
    // grab the values from the form inputs and create an object
    const newVideoObj = {
      videoId: document.querySelector('#videoId').value,
      title: document.querySelector('#title').value,
      category: document.querySelector('#category').value,
      favorite: document.querySelector('#favorite').checked,
    };

    // push that object to the data array
    data.push(newVideoObj);
    
    // rerender cards using the cardsOnDom function and pass it the updated data array
    cardsOnDom(data);
    formModal.hide()
    form.reset();
  });
};

// *********  FUNCTION TO START APPLICATION  *********  //
const startApp = () => {
  videoBtnModal();
  videoPlayer();
  filterButtons();
  cardsOnDom(data);
  eventListeners(); // always last
};

startApp();