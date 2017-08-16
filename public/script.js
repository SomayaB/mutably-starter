console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllAlbums()

  function showAllAlbums(albums){
    albums.forEach(function(album){
      $('.list-group').append(`
        <li class='list-group-item' id=${album._id}>
          <p class='list-title'>${album.name}</p>
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
              <h2 class='card-title'>${album.name}</h2>
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
    })
    showViewCard()
  }

  function showViewCard(){
    $('.view-btn').on('click', function(event){
      event.stopPropagation();
      event.preventDefault()
      $(this).closest('.list-group-item').next().find('.card-block').slideToggle();
    })
  }

  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      url: 'http://mutably.herokuapp.com/albums'
    }).done(function(allAlbums){
      showAllAlbums(allAlbums.albums)
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
      data: JSON.stringify(albumDetails)
    }).done(function(addedAlbum){
      //call function to append content to album list
      console.log(addedAlbum)
    }).catch(function(error){
      console.log(error)
    })
  }

  function editAlbumDetails(id, editedAlbumDetails){
    $.ajax({
      method: 'PUT',
      url:`http://mutably.herokuapp.com/albums/${id}`,
      data: JSON.stringify(updatedAlbumDetails)
    }).done(function(editedAlbum){
      //call function to update single album view
        console.log(editedAlbum)
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
