console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllAlbums()

  function displayInitialList(albums){
    albums.forEach(function(album){
      displayAlbum(album)
    })
  }

  function displayAlbum(album){
      $('.list-group').append(`
        <li class='list-group-item' id=${album._id}>
          <p class='list-name'>${album.name}</p>
          <div class='list-btns'>
            <button type='button' class='btn btn-default view-btn'>View</button>
            <button type='button' class='btn btn-default edit-btn'>Edit</button>
            <button type='button' class='btn btn-default delete-btn'>Delete</button>
          </div>
          `)
      $('.list-group').append(`
      <div class='view-card'>
        <div class='row'>
          <div class='col-sm-9 details-box'>
            <div class=card-block>
              <h2 class='card-name'>${album.name}</h2>
              <p class='card-text'>Artist: ${album.artistName}</p>
              <p class='card-text'>Release Date: ${album.releaseDate}</p>
              <p class='card-text'>Genres: ${Object.values(album.genres).join(', ')}</p>
              <button class='btn btn-primary close-btn'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    `)
    $('.list-group').append(`
    <div class='edit-card'>
      <div class='row'>
        <div class='col-sm-9 details-box'>
          <div class=card-block>
          <h2>Edit Album</h2>
          <form class='add-form'>
           <div class='input-section'>
             <label for='name' class='col-sm-4 col-form-label'>Title</label>
             <div class='form-input col-sm-9'>
               <input type='text' class='form-control' id='name' value='${album.name}'>
             </div>
            </div>
           <div class='input-section'>
             <label for='artist' class='col-sm-4 col-form-label'>Artist</label>
             <div class='form-input col-sm-9'>
               <input type='text' class='form-control' id='artist' value='${album.artistName}'>
             </div>
            </div>
           <div class='input-section'>
             <label for='date' class='col-sm-4 col-form-label'>Release Date</label>
             <div class='form-input col-sm-9'>
               <input type='text' class='form-control' id='date' value='${album.releaseDate}'>
             </div>
           </div>
           <div class='input-section'>
             <label for='genres' class='col-sm-4 col-form-label'>Genres</label>
             <div class='form-input col-sm-9'>
               <input type='text' class='form-control' id='genres' value='${Object.values(album.genres).join(', ')}'>
             </div>
           </div>
           <div class='edit-footer'>
           <button class='btn btn-primary save-edit-btn'>Save</button>
           </div>
          </div>
        </div>
      </div>
    </div>
  </li>
  `)
  }

  function displayUpdatedAlbum(id, updatedAlbum){
    $(document).find(`#${id}`).html(`
      <p class='list-title'>${updatedAlbum.name}</p>
      <div class='list-btns'>
        <button type='button' class='btn btn-default view-btn'>View</button>
        <button type='button' class='btn btn-default edit-btn'>Edit</button>
        <button type='button' class='btn btn-default delete-btn'>Delete</button>
      </div>
    `)
   $(document).find(`#${id}`).next().find('.card-block').html(`
    <div class='view-card'>
      <div class='row'>
        <div class='col-sm-9 details-box'>
          <div class=card-block>
            <h2 class='card-name'>${updatedAlbum.name}</h2>
            <p class='card-text'>Artist: ${updatedAlbum.artistName}</p>
            <p class='card-text'>Release Date: ${updatedAlbum.releaseDate}</p>
            <p class='card-text'>Genres: ${Object.values(updatedAlbum.genres).join(', ')}</p>
            <button class='btn btn-primary close-btn'>Close</button>
          </div>
        </div>
      </div>
    </div>
  </li>
  `)
  }

  $(document).on('click', '.view-btn', function(event){
    event.preventDefault()
    $(this).closest('.list-group-item').next().find('.card-block').slideToggle()
  })

  $(document).on('click', '.edit-btn', function(event){
    event.preventDefault()
    $(this).closest('.list-group-item').next().next().find('.card-block').slideToggle()
    //turn edit button into save button
  })

  $(document).on('click', '.save-edit-btn', function(event){
    event.preventDefault()

    //better way of getting this? closest not working
    const id = $(this).parent().parent().parent().parent().parent().parent().prev().prev().attr('id')
    // $(this).parent().parent().parent().parent().parent().parent().hide()
    getEditAlbumDetails.call(this, id)
    //turn edit button into save button
    //bug once save button is clicked edit button isn't working anymore
    //bug updated cards toggle weirdly
  })

  function getEditAlbumDetails(id){

      var name = $(this).parent().parent().find('input#name').val()
      var artistName = $(this).parent().parent().find('input#artist').val()
      var releaseDate = $(this).parent().parent().find('input#date').val()
      var genres = $(this).parent().parent().find('input#genres').val()
      var albumDetails = {
        name,
        artistName,
        releaseDate,
        genres
      }
      editAlbumDetails(id, albumDetails)

  }

  //put all buttons on document instead of IIFEs?
  ;(function openNewAlbumModal(){
    $('.add-btn').on('click', function(event){
      event.stopPropagation()
      event.preventDefault()
      $('.modal-new-album').css({display: 'block'})
    })
  })()


  ;(function getNewAlbumDetails(){
    $('.save-btn').on('click', function(event){
      event.preventDefault()
      var name = $(this).parent().prev().find('input#name').val()
      var artistName = $(this).parent().prev().find('input#artist').val()
      var releaseDate = $(this).parent().prev().find('input#date').val()
      var genres = $(this).parent().prev().find('input#genres').val()
      var albumDetails = {
        name,
        artistName,
        releaseDate,
        genres
      }
      addNewAlbum(albumDetails)
    })
  })()


  ;(function closeNewAlbumModal(){
    $('.modal-close').on('click', function(){
      $('.modal-new-album').css({display: 'none'})
    })
    $('.modal-new-album').on('click', function(event){

      if(event.target === $('.modal-new-album')[0]) {
        $('.modal-new-album').css({display: 'none'})
      }
    })
  })()


//Fetching data
  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      url: 'http://mutably.herokuapp.com/albums'
    }).done(function(allAlbums){
      displayInitialList(allAlbums.albums)
    }).catch(function(error){
      console.log(error)
    })
  }

  function getOneAlbum(id){
    $.ajax({
      method: 'GET',
      url: `http://mutably.herokuapp.com/albums/${id}`
    }).done(function(oneAlbum){
      console.log(oneAlbum)
    }).catch(function(error){
      console.log(error)
    })
  }

  function addNewAlbum(albumDetails){
    $.ajax({
      method: 'POST',
      url: 'http://mutably.herokuapp.com/albums',
      data: albumDetails //don't need to stringify?
    }).done(function(album){
      $('.modal-new-album').hide()
      displayAlbum(album)
    }).catch(function(error){
      console.log(error)
    })
  }

  function editAlbumDetails(id, editedAlbumDetails){
    $.ajax({
      method: 'PUT',
      url:`http://mutably.herokuapp.com/albums/${id}`,
      data: editedAlbumDetails
    }).done(function(editedAlbum){
      displayUpdatedAlbum(id, editedAlbum)
    }).catch(function(error){
      console.log(error)
    })
  }

  function deleteAlbum(id){
    $.ajax({
      method: 'DELETE',
      url:`http://mutably.herokuapp.com/albums/${id}`
    }).done(function(albumToDelete){
      //maybe call function to remove the view but might already be deleted.
      console.log(albumToDelete)
    })
  }

});
