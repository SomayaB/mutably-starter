console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllAlbums()

  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
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
    }).done(function(addedBook){
      console.log(addedBook);
    }).catch(function(error){
      console.log(error)
    })
  }

});
