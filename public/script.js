console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  // getAllAlbums()

  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
      url: 'http://mutably.herokuapp.com/albums'
    }).done(function(result){
      //pass the result to view function
      console.log(result.albums)
    }).catch(function(error){
      console.log(error)
    })
  }

  function getOneAlbum(id){
    $.ajax({
      method: 'GET',
      url: `http://mutably.herokuapp.com/albums/${id}`
    }).done(function(result){
      console.log(result)
    }).catch(function(error){
      console.log(error)
    })
  }
});
