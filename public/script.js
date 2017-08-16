console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllAlbums()

  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      url: 'http://mutably.herokuapp.com/albums'
    }).done(function(allAlbums){
      //pass the result to view function
      console.log(allAlbums.albums)
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
