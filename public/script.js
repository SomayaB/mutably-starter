console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllAlbums()

  function getAllAlbums(){
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
      url: 'http://mutably.herokuapp.com/albums'
    }).done(function(result){
      console.log(result.albums)
    }).catch(function(error){
      console.log(error)
    })
  }

});
