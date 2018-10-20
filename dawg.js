$(function () {
    var $breedSelection = null;

    var init = function () {
        $('#ctr').html(`

    <div class="form-group">
  <select class="form-control">
  <option>Select breed</option>
  </select>
</div>
 

   <p> 
    <button type="button" class=" btn btn-primary">Go</button>
    </p>
    
    
    `);
    getBreeds();
    }

    var loadBreedToSelect = function(s){
        $breedSelection = $('#ctr div select');
        for(var i in s){
            $breedSelection.append(`<option>${i}</option>`);
            if(s[i].length){
                for(var ii=0; ii< s[i].length;ii++ ){
                    console.log(i+'/'+s[i][ii]);
                    $breedSelection.append(`<option value="${i}/${s[i][ii]}">&raquo;&nbsp;${s[i][ii]}</option>`);

                }
            }

        }
    }

    var getBreeds = function(){
        $.ajax({
            url : "https://dog.ceo/api/breeds/list/all",
            method : "GET",
            dataType : "json"
        }).done(function(r){
            console.log(r.message);
            loadBreedToSelect(r.message);  
        })
    }



    init();

});